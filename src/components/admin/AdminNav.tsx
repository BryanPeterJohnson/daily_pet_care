"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FileText, Folder, Image as ImageIcon, Inbox, LayoutDashboard, Mail, Menu, Settings, UserCircle, Users, X } from "lucide-react";
import { LogoMark } from "@/components/Logo";
import type { Role } from "@/lib/types";

type Item = { href: string; label: string; icon: React.ElementType; roles?: Role[]; badge?: number };

export function AdminNav({ role, siteName, pending, unread, children }: { role: Role; siteName: string; pending: number; unread: number; children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [pathname]);

  const all: Item[] = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/posts", label: "Posts", icon: FileText, badge: role !== "AUTHOR" ? pending : 0 },
    { href: "/admin/categories", label: "Categories", icon: Folder, roles: ["ADMIN", "EDITOR"] },
    { href: "/admin/media", label: "Media library", icon: ImageIcon },
    { href: "/admin/subscribers", label: "Subscribers", icon: Mail, roles: ["ADMIN", "EDITOR"] },
    { href: "/admin/messages", label: "Messages", icon: Inbox, roles: ["ADMIN", "EDITOR"], badge: unread },
    { href: "/admin/users", label: "Users", icon: Users, roles: ["ADMIN"] },
    { href: "/admin/settings", label: "Site settings", icon: Settings, roles: ["ADMIN"] },
    { href: "/admin/profile", label: "My profile", icon: UserCircle },
  ];
  const items = all.filter((i) => !i.roles || i.roles.includes(role));

  const isActive = (href: string) => (href === "/admin" ? pathname === "/admin" : pathname.startsWith(href));

  const nav = (
    <nav className="flex flex-col gap-1 p-3" aria-label="Admin">
      {items.map((i) => {
        const Icon = i.icon;
        const active = isActive(i.href);
        return (
          <Link key={i.href} href={i.href} aria-current={active ? "page" : undefined}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] font-medium transition-colors ${active ? "bg-ball text-ink" : "text-white/75 hover:bg-white/10 hover:text-white"}`}>
            <Icon size={18} />
            <span className="flex-1">{i.label}</span>
            {!!i.badge && <span className={`rounded-full px-2 text-xs font-bold ${active ? "bg-ink text-white" : "bg-ball text-ink"}`}>{i.badge}</span>}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-dvh bg-fog lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="hidden bg-ink lg:sticky lg:top-0 lg:flex lg:h-dvh lg:flex-col">
        <Link href="/admin" className="flex items-center gap-2 px-6 py-5 text-white">
          <LogoMark className="h-8 w-8 text-ink [&_path]:stroke-white [&>circle:first-child]:stroke-white" />
          <span className="text-lg font-extrabold">{siteName}</span>
        </Link>
        <div className="flex-1 overflow-y-auto">{nav}</div>
        <a href="/" target="_blank" className="m-3 rounded-xl px-3 py-2.5 text-sm text-white/60 hover:bg-white/10 hover:text-white">View live site</a>
      </aside>

      <div className="flex items-center justify-between bg-ink px-4 py-3 text-white lg:hidden">
        <Link href="/admin" className="font-extrabold">{siteName} admin</Link>
        <button onClick={() => setOpen(true)} aria-label="Open menu" className="grid h-10 w-10 place-items-center rounded-full hover:bg-white/10"><Menu size={22} /></button>
      </div>
      {open && (
        <div className="fixed inset-0 z-50 bg-ink lg:hidden" role="dialog" aria-modal="true">
          <div className="flex justify-end p-3">
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="grid h-10 w-10 place-items-center rounded-full text-white hover:bg-white/10"><X size={22} /></button>
          </div>
          {nav}
        </div>
      )}

      <div className="min-w-0">{children}</div>
    </div>
  );
}
