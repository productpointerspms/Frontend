"use client";
import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full border-b py-4 px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="font-bold text-lg">ProductPointer</div>
        <nav className="hidden sm:flex gap-3 text-sm text-muted">
          <Link href="/">Home</Link>
          <Link href="/docs">Docs</Link>
        </nav>
      </div>
      <div>
        <Link href="/login" className="px-3 py-1 rounded bg-primary text-white">
          Log in
        </Link>
      </div>
    </header>
  );
}
