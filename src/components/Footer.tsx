export default function Footer() {
  return (
    <footer className="w-full border-t py-6 px-6 text-sm text-center text-muted">
      © {new Date().getFullYear()} ProductPointer — Built with Next.js
    </footer>
  );
}
