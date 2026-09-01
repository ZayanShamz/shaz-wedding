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
    <main className="flex flex-col items-center w-full">
      <div className="w-full max-w-xl md:min-w-xl p-6">
        <h1 className="text-midnight-violet text-fluid-xl font-cg font-semibold mb-4 text-center cursor-default">
          RSVP Summary
        </h1>

        <div className="grid grid-cols-4 gap-4 mb-6 cursor-default">
          <div className="rounded-lg border py-2 text-center bg-midnight-purple">
            <p className="text-fluid-lg text-burn-pink font-bold">
              {totalGuests}
            </p>
            <p className="text-fluid-xs text-burn-pink/70 sm:px-3">Actions</p>
          </div>
          <div className="rounded-lg border py-2 text-center bg-midnight-purple">
            <p className="text-fluid-lg text-burn-pink text-center font-bold">
              {attendingCount}
            </p>
            <p className="text-fluid-xs text-burn-pink/70 sm:px-3">Accepts</p>
          </div>
          <div className="rounded-lg border py-2 text-center bg-midnight-purple">
            <p className="text-fluid-lg text-burn-pink font-bold">
              {decliningCount}
            </p>
            <p className="text-fluid-xs text-burn-pink/70 sm:px-3">Declines</p>
          </div>
          <div className="rounded-lg border py-2 text-center bg-midnight-purple">
            <p className="text-fluid-lg text-burn-pink font-bold">
              {messageCount}
            </p>
            <p className="text-fluid-xs text-burn-pink/70 sm:px-3">Mssgs</p>
          </div>
        </div>

        <RsvpTabs guests={allGuests} notes={notes} declines={declines} />
      </div>
    </main>
  );
}
