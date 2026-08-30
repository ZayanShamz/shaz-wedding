import { notFound } from "next/navigation";
import { adminDb } from "@/lib/firebase-admin";
import RsvpTabs from "@/components/RSVPTabs";

type PageProps = {
  params: Promise<{ secret: string }>;
};

type Guest = { name: string; date: string };
type Decline = { name: string | null; message: string | null; date: string };
type Note = { name: string | null; message: string; date: string };

export default async function AdminPage({ params }: PageProps) {
  const { secret } = await params;

  if (secret !== process.env.ADMIN_SECRET) {
    notFound();
  }

  const rsvpSnapshot = await adminDb.collection("rsvps").get();
  const notesSnapshot = await adminDb.collection("notes").get();

  let totalGuests = 0;
  let attendingCount = 0;
  let decliningCount = 0;

  const allGuests: Guest[] = [];
  const declines: Decline[] = [];

  rsvpSnapshot.forEach((doc) => {
    const data = doc.data();

    const dateString = data.timestamp?.toDate().toLocaleString() ?? "—";

    if (data.attending) {
      attendingCount += 1;
      totalGuests += data.guestCount ?? 0;

      const names: string[] = data.names ?? [];
      names.forEach((name) => {
        allGuests.push({ name, date: dateString });
      });
    } else {
      decliningCount += 1;
      declines.push({
        name: data.name ?? null,
        message: data.message ?? null,
        date: dateString,
      });
    }
  });

  const notes: Note[] = notesSnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      name: data.name ?? null,
      message: data.message ?? "",
      date: data.timestamp?.toDate().toLocaleString() ?? "—",
    };
  });

  const messageCount = notes.length;

  return (
    <main className="mx-auto max-w-2xl md:min-w-xl p-6">
      <h1 className="text-midnight-violet text-fluid-2xl font-cg font-semibold mb-6 text-center cursor-default">
        RSVP Summary
      </h1>

      <div className="grid grid-cols-4 gap-4 mb-8 cursor-default">
        <div className="rounded-lg border py-4 text-center bg-midnight-purple">
          <p className="text-burn-pink text-3xl font-bold">{totalGuests}</p>
          <p className="text-sm text-burn-pink/70 sm:px-3">Total guests</p>
        </div>
        <div className="rounded-lg border py-4 text-center bg-midnight-purple">
          <p className="text-burn-pink text-center text-3xl font-bold">
            {attendingCount}
          </p>
          <p className="text-sm text-burn-pink/70 sm:px-3">Accepted</p>
        </div>
        <div className="rounded-lg border py-4 text-center bg-midnight-purple">
          <p className="text-3xl text-burn-pink font-bold">{decliningCount}</p>
          <p className="text-sm text-burn-pink/70 sm:px-3">Declined</p>
        </div>
        <div className="rounded-lg border py-4 text-center bg-midnight-purple">
          <p className="text-3xl text-burn-pink font-bold">{messageCount}</p>
          <p className="text-sm text-burn-pink/70 sm:px-3">Messages</p>
        </div>
      </div>

      <RsvpTabs guests={allGuests} notes={notes} declines={declines} />
    </main>
  );
}
