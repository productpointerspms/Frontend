type PaystackConstructor = new () => {
  resumeTransaction: (accessCode: string) => void;
};

declare global {
  interface Window {
    PaystackPop?: PaystackConstructor;
  }
}

/** Payment-popup failure whose message is written for attendees. */
export class PaystackError extends Error {
  name = "PaystackError";
}

let loading: Promise<void> | null = null;

function loadPaystack(): Promise<void> {
  if (window.PaystackPop) return Promise.resolve();
  if (!loading) {
    loading = new Promise<void>((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://js.paystack.co/v2/inline.js";
      script.async = true;
      const timeout = window.setTimeout(() => fail(), 15000);
      function fail() {
        window.clearTimeout(timeout);
        script.remove();
        reject(new PaystackError("Paystack could not load. Check your connection and try again."));
      }
      script.onload = () => {
        window.clearTimeout(timeout);
        if (window.PaystackPop) resolve();
        else fail();
      };
      script.onerror = fail;
      document.head.appendChild(script);
    }).catch(error => {
      loading = null;
      throw error;
    });
  }
  return loading;
}

/** Resume the server-initialized transaction using Paystack's own popup. */
export async function openPaystack(paymentLink: string): Promise<void> {
  let url: URL;
  try {
    url = new URL(paymentLink);
  } catch {
    throw new PaystackError("We couldn't open the payment page. Please try again or contact support.");
  }
  const accessCode = url.pathname.split("/").filter(Boolean)[0];
  if (url.protocol !== "https:" || url.hostname !== "checkout.paystack.com" || !accessCode || !/^[a-zA-Z0-9_-]+$/.test(accessCode)) {
    throw new PaystackError("The payment provider returned an unsupported checkout link. Please contact support.");
  }
  await loadPaystack();
  if (!window.PaystackPop) throw new PaystackError("Paystack is unavailable. Please try again.");
  new window.PaystackPop().resumeTransaction(accessCode);
}
