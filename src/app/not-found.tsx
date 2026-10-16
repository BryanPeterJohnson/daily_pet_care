import Link from "next/link";
import { LogoMark } from "@/components/Logo";

export default function NotFound() {
  return (
    <div className="container-x flex flex-col items-center py-24 text-center">
      <LogoMark className="h-20 w-20 text-ink" />
      <h1 className="mt-6 text-4xl font-extrabold tracking-tight">This page wandered off</h1>
      <p className="mt-3 max-w-md text-lg text-muted">The link may be broken or the guide may have moved. Try searching, or start from the homepage.</p>
      <form action="/blog" className="mt-8 flex w-full max-w-md gap-2">
        <label htmlFor="nf-q" className="sr-only">Search guides</label>
        <input id="nf-q" name="q" placeholder="Search guides" className="input rounded-full" />
        <button className="btn btn-ink">Search</button>
      </form>
      <Link href="/" className="mt-6 font-semibold text-collar hover:underline">Go to the homepage</Link>
    </div>
  );
}
