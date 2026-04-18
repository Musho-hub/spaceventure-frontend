import Container from "@/components/ui/Container";
import ContactMap from "@/components/contact/ContactMap";
import ContactForm from "@/components/contact/ContactForm";
import { getFooter } from "@/api/footer";

export default async function ContactPage() {
  const footer = await getFooter();
  return (
    <main>
      <section className="py-16">
        <Container>
          <ContactMap
            coordinates={footer.coordinates}
            name={footer.name}
            address={footer.address}
          />
          <ContactForm />
        </Container>
      </section>
    </main>
  );
}
