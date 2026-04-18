import Image from "next/image";
import Container from "./Container";

type ImageTextSectionProps = {
  imageSrc: string;
  imageAlt: string;
  children: React.ReactNode;
};

export default function ImageTextSection({
  imageSrc,
  imageAlt,
  children,
}: ImageTextSectionProps) {
  return (
    <section className="py-16">
      <Container>
        <section className="grid gap-10 md:grid-cols-2 md:items-center">
          <figure className="relative min-h-80 overflow-hidden">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
              unoptimized={imageSrc.startsWith("http")}
            />
          </figure>

          <article>{children}</article>
        </section>
      </Container>
    </section>
  );
}
