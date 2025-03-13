import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white-500 text-green p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">Yala Safari</Link>
        <div className="space-x-4">
          <Link href="/">Home</Link>
          <Link href="/safari-packages">Safari Packages</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/blog">Blog</Link>
        </div>
      </nav>
    </header>
  )
}