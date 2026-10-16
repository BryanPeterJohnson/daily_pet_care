import { redirect } from "next/navigation";
import { LogoMark } from "@/components/Logo";
import { isInstalled } from "@/lib/install";
import { SetupForm } from "./SetupForm";

export const metadata = { title: "Set up your site" };

export default async function SetupPage() {
  let installed = false;
  let dbError = "";
  if (!process.env.DATABASE_URL) dbError = "DATABASE_URL isn't set. Add it in your hosting panel's environment variables and redeploy.";
  else {
    try { installed = await isInstalled(); }
    catch (e) { dbError = `Can't reach the database: ${(e as Error).message}`; }
  }
  if (installed) redirect("/admin/login");

  return (
    <main className="grid min-h-dvh place-items-center bg-fog px-4 py-12">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center text-center">
          <LogoMark className="h-14 w-14 text-ink" />
          <h1 className="mt-4 text-2xl font-extrabold tracking-tight">Set up your pet care blog</h1>
          <p className="mt-1 max-w-sm text-sm text-muted">This creates the database tables and your admin account. It only runs once.</p>
        </div>
        <div className="mt-8 rounded-2xl border border-line bg-paper p-6">
          {dbError ? <p className="rounded-xl bg-tint-2 px-4 py-3 text-sm font-medium text-alert" role="alert">{dbError}</p> : <SetupForm />}
        </div>
      </div>
    </main>
  );
}
