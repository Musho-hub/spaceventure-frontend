import Link from "next/link";
import { FiPhone, FiMail, FiSend } from "react-icons/fi";
import Container from "@/components/ui/Container";
import ButtonLink from "../ui/ButtonLink";
import SocialLinks from "../ui/SocialLinks";
import { getFooter } from "@/api/footer";

const footerLinksColumnOne = [
  { href: "/spacecraft", label: "Rumfærgen" },
  { href: "/tours", label: "Ture" },
  { href: "/team", label: "Vores team" },
];

const footerLinksColumnTwo = [
  { href: "/gallery", label: "Galleri" },
  { href: "/safety", label: "Sikkerhed" },
];

export default async function Footer() {
  const footer = await getFooter();

  return (
    <footer className="mt-12 text-white">
      <section className="bg-primary">
        <Container className="flex flex-col justify-evenly gap-10 py-12 lg:flex-row lg:justify-between">
          <section className="flex-col">
            <h2 className="mb-6 text-sm text-center font-bold uppercase tracking-wide lg:text-start">
              Kontakt
            </h2>

            <section className="flex justify-center">
              <article className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <FiPhone className="text-accent" />
                  <span>{footer.phone}</span>
                </div>

                <div className="flex items-center gap-3">
                  <FiMail className="text-accent" />
                  <span>{footer.email}</span>
                </div>

                <div className="flex items-center gap-3">
                  <FiSend className="text-accent" />
                  <p>{footer.address}</p>
                </div>
              </article>
            </section>
          </section>

          <section>
            <h3 className="mb-6 text-sm text-center font-bold uppercase tracking-wide lg:text-start">
              Hurtig links
            </h3>

            <section className="flex flex-col gap-8">
              <article className="flex flex-col gap-8 lg:flex-row">
                <nav className="flex flex-row justify-center gap-3 text-sm lg:flex-col">
                  {footerLinksColumnOne.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="hover:text-accent"
                    >
                      • {link.label}
                    </Link>
                  ))}
                </nav>

                <nav className="flex flex-row justify-center gap-3 text-sm lg:flex-col lg:justify-start">
                  {footerLinksColumnTwo.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="hover:text-accent"
                    >
                      • {link.label}
                    </Link>
                  ))}
                </nav>
              </article>

              <div className="flex justify-center lg:justify-start">
                <ButtonLink
                  href="/contact"
                  className="bg-accent text-white hover:bg-emerald-500"
                >
                  Kontakt
                </ButtonLink>
              </div>
            </section>
          </section>
        </Container>
      </section>

      <section className="bg-primary-dark">
        <Container className="flex flex-col-reverse items-center gap-4 py-4 text-xs text-white/70 lg:grid lg:grid-cols-3">
          <p>© 2021 {footer.name}. All rights reserved.</p>

          <SocialLinks
            className="flex justify-center gap-4"
            linkClassName="text-sm hover:text-accent"
          />
        </Container>
      </section>
    </footer>
  );
}
