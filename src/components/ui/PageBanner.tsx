import Image from "next/image";

type PageBannerProps = {
  title: string;
  image: string;
  alt: string;
};

export default function PageBanner({ title, image, alt }: PageBannerProps) {
  return (
    <section className="relative min-h-80 overflow-hidden md:min-h-80">
      <Image
        src={image}
        alt={alt}
        fill
        className="object-cover animate-banner-float"
        priority
      />

      <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
        <h1 className="text-4xl font-bold text-white md:text-6xl">{title}</h1>
      </div>
    </section>
  );
}
