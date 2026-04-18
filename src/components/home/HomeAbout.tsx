import Link from "next/link";
import RichText from "../ui/RichText";
import ImageTextSection from "../ui/ImageTextSection";
import { getAbout } from "@/api/about";
import { getSpacecraft } from "@/api/spacecraft";
import ButtonLink from "../ui/ButtonLink";

export default async function HomeAbout() {
  const about = await getAbout();
  const spacecraft = await getSpacecraft();

  return (
    <ImageTextSection
      imageSrc={`http://localhost:4444/images/spacecraft/${spacecraft.image}`}
      imageAlt={about.title}
    >
      <section className="text-center md:text-start">
        <p className="mt-3 text-4xl py-4 font-bold text-primary-dark">
          Lidt om os
        </p>

        <h2 className="text-xl font-semibold py-2 uppercase tracking-[0.2em] border-y text-accent md:border-y-0 md:border-b">
          {about.title}
        </h2>
      </section>

      <div className="my-6 text-slate-700">
        <RichText html={about.content} />
      </div>

      <ButtonLink
        href="/contact"
        className="inline-flex w-full justify-center bg-accent px-6 py-3 text-sm font-medium text-white hover:border hover:bg-white hover:text-primary-dark lg:w-fit"
      >
        Kontakt os
      </ButtonLink>
    </ImageTextSection>
  );
}
