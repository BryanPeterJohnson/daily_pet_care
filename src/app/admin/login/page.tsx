import { redirect } from "next/navigation";
import { getSettings } from "@/lib/settings";
import { isInstalled } from "@/lib/install";
import { LogoMark } from "@/components/Logo";
import { LoginForm } from "./LoginForm";

export const metadata = { title: "Sign in" };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const [{ next }, s, installed] = await Promise.all([searchParams, getSettings(), isInstalled().catch(() => true)]);
  if (!installed) redirect("/admin/setup");
  return (
    <main className="grid min-h-dvh place-items-center bg-fog px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center text-center">
          <LogoMark className="h-14 w-14 text-ink" />
          <h1 className="mt-4 text-2xl font-extrabold tracking-tight">Sign in to {s.site_name}</h1>
          <p className="mt-1 text-sm text-muted">Admin panel for editors and authors</p>
        </div>
        <div className="mt-8 rounded-2xl border border-line bg-paper p-6"><LoginForm next={next} /></div>
        <p className="mt-6 text-center text-sm text-muted">Forgot your password? Ask a site admin to reset it from Users.</p>
      </div>
    </main>
  );
}
