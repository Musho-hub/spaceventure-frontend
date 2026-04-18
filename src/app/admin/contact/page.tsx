import Container from "@/components/ui/Container";
import MarkContactAsReadButton from "@/components/admin/MarkContactAsReadButton";
import { formatDateTime } from "@/lib/date";
import { getContactMessages } from "@/api/contact";

export default async function AdminContactMessagesPage() {
  const messages = await getContactMessages();

  return (
    <main className="py-16">
      <Container>
        <div className="mb-10 max-w-2xl">
          <h1 className="text-4xl font-bold text-primary-dark">
            Kontakt beskeder
          </h1>
          <p className="mt-4 text-slate-600">
            Her kan du se indsendte beskeder fra kontaktformularen.
          </p>
        </div>

        <div className="grid gap-6">
          {messages.map((message) => (
            <article
              key={message._id}
              className={`rounded-md border p-6 ${
                message.read
                  ? "border-slate-200 bg-white"
                  : "border-accent/30 bg-surface"
              }`}
            >
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-semibold text-primary-dark">
                      {message.name}
                    </h2>

                    <span
                      className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                        message.read
                          ? "bg-slate-200 text-slate-600"
                          : "bg-accent text-white"
                      }`}
                    >
                      {message.read ? "Læst" : "Ulæst"}
                    </span>
                  </div>

                  <p className="text-sm text-slate-600">{message.email}</p>
                  <p className="text-sm text-slate-600">{message.phone}</p>

                  <div className="pt-2">
                    <p className="text-sm leading-7 text-slate-700">
                      {message.message}
                    </p>
                  </div>

                  <p className="text-sm text-slate-600">{formatDateTime(message.received)}</p>
                </div>

                <MarkContactAsReadButton
                  messageId={message._id}
                  isRead={message.read}
                />
              </div>
            </article>
          ))}
        </div>
      </Container>
    </main>
  );
}
