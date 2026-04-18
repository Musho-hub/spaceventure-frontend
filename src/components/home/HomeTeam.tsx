import Image from "next/image";
import Container from "../ui/Container";
import { getTeam } from "@/api/team";

export default async function HomeTeam() {
  const team = await getTeam();

  const featuredTeam = team.slice(0, 4);

  return (
    <section className="py-16">
      <Container>
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold text-primary-dark">Vores team</h2>
        </div>
        <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {featuredTeam.map((member) => (
            <article
              key={member._id}
              className="bg-surface"
            >
              <figure className="relative min-h-40 bg-white">
                <Image
                  src={`http://localhost:4444/images/team/${member.image}`}
                  alt={member.name}
                  fill
                  className="object-none"
                  unoptimized
                />
              </figure>

              <div className="flex flex-col items-center space-y-2 p-5">
                <h3 className="text-xl font-semibold text-primary-dark">
                  {member.name}
                </h3>

                <p className="text-sm font-medium text-accent">{member.role}</p>

                <p className="text-sm text-slate-600">{member.phone}</p>
              </div>
            </article>
          ))}
        </section>
      </Container>
    </section>
  );
}
