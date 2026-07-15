"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/account/profile", label: "Profile" },
  { href: "/account/library", label: "Library" },
];

export default function AccountNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-2 text-base">
      {links.map((link) => {
        const active = pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded-lg py-2.5 font-medium transition-colors hover:text-foreground ${
              active ? "text-foreground" : "text-muted"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
