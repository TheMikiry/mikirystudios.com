import Link from "next/link";
import { XIcon, InstagramIcon, YouTubeIcon, DiscordIcon } from "./SocialIcons";

const socials = [
  { label: "X", href: "#", Icon: XIcon },
  { label: "Instagram", href: "#", Icon: InstagramIcon },
  { label: "YouTube", href: "#", Icon: YouTubeIcon },
  { label: "Discord", href: "#", Icon: DiscordIcon },
];

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 py-12">
        <div className="flex items-center gap-5">
          {socials.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="text-muted transition-colors hover:text-foreground"
            >
              <Icon className="h-7 w-7" />
            </a>
          ))}
        </div>

        <div className="w-full max-w-xs border-t border-border" />

        <div className="flex flex-col items-center gap-2 text-xs text-muted">
          <div className="flex items-center gap-3">
            <Link href="/privacy" className="transition-colors hover:text-foreground">
              Privacy Policy
            </Link>
            <span>|</span>
            <Link href="/terms" className="transition-colors hover:text-foreground">
              Terms &amp; Conditions
            </Link>
          </div>
          <span>
            &copy; {new Date().getFullYear()} mikirystudios — Rigging &amp;
            tools for 3D games &amp; animation
          </span>
        </div>
      </div>
    </footer>
  );
}
