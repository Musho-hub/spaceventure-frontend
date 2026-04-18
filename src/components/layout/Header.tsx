"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Container from "../ui/Container";
import MobileHeader from "./MobileHeader";
import SocialLinks from "../ui/SocialLinks";

const navLinks = [
  { href: "/", label: "Hjem" },
  { href: "/spacecraft", label: "Rumfærgen" },
  { href: "/gallery", label: "Galleri" },
  { href: "/safety", label: "Sikkerhed" },
  { href: "/contact", label: "Kontakt" },
];

function isActiveLink(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const pathname = usePathname();
  const toursIsActive = isActiveLink(pathname, "/tours");

  return (
    <>
      <MobileHeader />

      <div className="hidden bg-white lg:block">
        <Container className="flex items-center py-4">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo/logo.png"
              width={150}
              height={150}
              alt="SpaceVenture logo"
            />
          </Link>
        </Container>
      </div>

      <div className="sticky top-0 z-50 hidden bg-primary-dark text-white shadow-md lg:block">
        <Container className="flex items-center justify-between">
          <nav className="flex flex-wrap items-center gap-4">
            {navLinks.slice(0, 2).map((link) => {
              const isActive = isActiveLink(pathname, link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={[
                    "border-t-2 px-4 py-4 text-sm font-medium transition",
                    isActive
                      ? "border-accent bg-white/10 text-white"
                      : "border-primary text-white hover:border-accent hover:bg-white/10",
                  ].join(" ")}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="group relative">
              <Link
                href="/tours"
                aria-current={toursIsActive ? "page" : undefined}
                className={[
                  "inline-flex border-t-2 px-4 py-4 text-sm font-medium transition",
                  toursIsActive
                    ? "border-accent bg-white/10 text-white"
                    : "border-primary text-white hover:border-accent hover:bg-white/10",
                ].join(" ")}
              >
                Ture
              </Link>

              <div className="invisible absolute top-full left-0 z-50 min-w-44 bg-white opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100">
                <Link
                  href="/tours/velkommen-til-manen"
                  className="block px-4 py-3 text-sm text-primary-dark hover:bg-surface hover:text-accent"
                >
                  Månen
                </Link>

                <Link
                  href="/tours/velkommen-til-mars"
                  className="block px-4 py-3 text-sm text-primary-dark hover:bg-surface hover:text-accent"
                >
                  Mars
                </Link>
              </div>
            </div>

            {navLinks.slice(2).map((link) => {
              const isActive = isActiveLink(pathname, link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={[
                    "border-t-2 px-4 py-4 text-sm font-medium transition",
                    isActive
                      ? "border-accent bg-white/10 text-white"
                      : "border-primary text-white hover:border-accent hover:bg-white/10",
                  ].join(" ")}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <SocialLinks
            className="hidden items-center gap-4 lg:flex"
            linkClassName="text-sm hover:text-accent"
          />
        </Container>
      </div>
    </>
  );
}
