"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { HiOutlineMenu, HiOutlineDotsVertical } from "react-icons/hi";
import { FaArrowLeft } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Container from "../ui/Container";
import SocialLinks from "../ui/SocialLinks";


const navLinks = [
  { href: "/", label: "Hjem" },
  { href: "/spacecraft", label: "Rumfærgen" },
  { href: "/gallery", label: "Galleri" },
  { href: "/safety", label: "Sikkerhed" },
  { href: "/contact", label: "Kontakt" },
];

function isActiveLink(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function MobileHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isToursOpen, setIsToursOpen] = useState(false);
  const pathname = usePathname();

  const toursIsActive = isActiveLink(pathname, "/tours");

  function toggleMenu() {
    setIsMenuOpen((prev) => !prev);
  }

  function closeMenu() {
    setIsMenuOpen(false);
    setIsToursOpen(false);
  }

  function toggleToursMenu() {
    setIsToursOpen((prev) => !prev);
  }

  return (
    <>
      <div className="sticky top-0 z-50 border-b border-slate-200 bg-white lg:hidden">
        <Container className="flex items-center py-3">
          <button
            type="button"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Luk menu" : "Åbn menu"}
            className="flex h-10 w-10 items-center justify-center text-2xl text-primary-dark"
          >
            <span
              className={[
                "flex items-center justify-center transition-transform duration-300 ease-in-out",
                isMenuOpen ? "rotate-0" : "rotate-180",
              ].join(" ")}
            >
              {isMenuOpen ? <FaArrowLeft /> : <HiOutlineMenu />}
            </span>
          </button>

          <Link
            href="/"
            className="flex items-center justify-center gap-2 text-primary-dark"
          >
            <Image
              src="/images/logo/logo.png"
              width={150}
              height={150}
              alt="SpaceVenture logo"
            />
          </Link>

          <button
            type="button"
            aria-label="Flere muligheder"
            className="ms-auto flex h-10 w-10 items-center justify-center text-2xl text-primary-dark"
          >
            <HiOutlineDotsVertical />
          </button>
        </Container>
      </div>

      <button
        type="button"
        onClick={closeMenu}
        aria-label="Luk menu overlay"
        className={[
          "fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden",
          isMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        ].join(" ")}
      />

      <aside
        className={[
          "fixed top-16.25 left-0 z-50 h-[calc(100vh-65px)] w-72 bg-white text-primary-dark shadow-xl transition-transform duration-300 ease-in-out lg:hidden",
          isMenuOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <div className="flex justify-center border-b border-slate-200 px-4 py-4">
          <SocialLinks
            className="flex items-center gap-4"
            linkClassName="text-lg text-primary-dark hover:text-accent"
          />
        </div>

        <nav className="flex flex-col py-2">
          {navLinks.slice(0, 2).map((link) => {
            const isActive = isActiveLink(pathname, link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                aria-current={isActive ? "page" : undefined}
                className={[
                  "border-b border-slate-100 px-4 py-4 text-sm font-medium transition",
                  isActive
                    ? "bg-accent text-white"
                    : "text-primary-dark hover:bg-surface",
                ].join(" ")}
              >
                {link.label}
              </Link>
            );
          })}

          <button
            type="button"
            onClick={toggleToursMenu}
            aria-current={toursIsActive ? "page" : undefined}
            className={[
              "flex items-center justify-between border-b border-slate-100 px-4 py-4 text-sm font-medium transition",
              toursIsActive
                ? "bg-accent text-white"
                : "text-primary-dark hover:bg-surface",
            ].join(" ")}
          >
            <span>Ture</span>
            <span className="text-lg">
              {isToursOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </span>
          </button>

          {isToursOpen && (
            <div className="border-b border-slate-100 bg-surface/50">
              <Link
                href="/tours/velkommen-til-manen"
                onClick={closeMenu}
                className="block px-8 py-3 text-sm text-primary-dark hover:bg-surface"
              >
                Månen
              </Link>

              <Link
                href="/tours/velkommen-til-mars"
                onClick={closeMenu}
                className="block px-8 py-3 text-sm text-primary-dark hover:bg-surface"
              >
                Mars
              </Link>

              <Link
                href="/tours"
                onClick={closeMenu}
                className="block px-8 py-3 text-sm text-primary-dark hover:bg-surface"
              >
                Alle ture
              </Link>
            </div>
          )}

          {navLinks.slice(2).map((link) => {
            const isActive = isActiveLink(pathname, link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                aria-current={isActive ? "page" : undefined}
                className={[
                  "border-b border-slate-100 px-4 py-4 text-sm font-medium transition",
                  isActive
                    ? "bg-accent text-white"
                    : "text-primary-dark hover:bg-surface",
                ].join(" ")}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
