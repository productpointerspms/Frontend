type PaystackConstructor = new () => {
  resumeTransaction: (accessCode: string) => void;
};

declare global {
  interface Window {
    PaystackPop?: PaystackConstructor;
  }
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
        reject(new Error("Paystack could not load. Check your connection and try again."));
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
  const url = new URL(paymentLink);
  const accessCode = url.pathname.split("/").filter(Boolean)[0];
  if (url.protocol !== "https:" || url.hostname !== "checkout.paystack.com" || !accessCode || !/^[a-zA-Z0-9_-]+$/.test(accessCode)) {
    throw new Error("The payment provider returned an unsupported checkout link. Please contact support.");
  }
  await loadPaystack();
  if (!window.PaystackPop) throw new Error("Paystack is unavailable. Please try again.");
  new window.PaystackPop().resumeTransaction(accessCode);
}
