"use client";

import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

const MAX_GUESTS = 10;

type RSVPFormProps = {
  attending: "yes" | "no" | null;
};

function RSVPForm({ attending }: RSVPFormProps) {
  const [guests, setGuests] = useState([""]);
  const [declinerName, setDeclinerName] = useState("");
  const [wantsToLeaveMessage, setWantsToLeaveMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const updateGuest = (index: number, value: string) => {
    setGuests((prev) => prev.map((g, i) => (i === index ? value : g)));
  };

  const addGuest = () => {
    if (guests.length >= MAX_GUESTS) return;
    setGuests((prev) => [...prev, ""]);
  };

  const removeGuest = (index: number) => {
    setGuests((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const cleanedGuests =
      attending === "yes"
        ? guests.map((g) => g.trim()).filter(Boolean)
        : [declinerName.trim()].filter(Boolean);

    if (cleanedGuests.length === 0) {
      setError(
        attending === "yes"
          ? "Please add at least one guest name."
          : "Please enter your name.",
      );
      return;
    }

    setSubmitting(true);
    try {
      await addDoc(collection(db, "rsvps"), {
        guests: cleanedGuests,
        attending: attending === "yes",
        message: message.trim(),
        timestamp: serverTimestamp(),
      });
      setSubmitted(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section className="px-6 py-16">
        <div className="mx-auto max-w-md text-center">
          <h2 className="text-2xl font-semibold text-gray-900">Thank you!</h2>
          <p className="mt-3 text-base text-gray-600">
            Your RSVP has been received.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`overflow-hidden px-6 transition-all duration-500 ease-out ${
        attending
          ? "max-h-[2000px] translate-y-0 pb-24 pt-16 opacity-100"
          : "max-h-0 translate-y-8 py-0 opacity-0"
      }`}
    >
      <div className="mx-auto max-w-md">
        {attending === "yes" && (
          <>
            <h2 className="text-center text-2xl font-semibold text-gray-900">
              RSVP
            </h2>
            <p className="mt-2 text-center text-sm text-gray-500">
              Kindly respond by [date]
            </p>

            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
              {/* Guest names */}
              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium text-gray-700">
                  Guest name(s)
                </span>

                {guests.map((guest, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={guest}
                      onChange={(e) => updateGuest(index, e.target.value)}
                      placeholder={`Guest ${index + 1} full name`}
                      className="h-12 flex-1 rounded-lg border border-gray-300 px-4 text-base text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:outline-none"
                    />
                    {guests.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeGuest(index)}
                        aria-label="Remove guest"
                        className="h-12 w-12 shrink-0 rounded-lg border border-gray-300 text-gray-500"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}

                {guests.length < MAX_GUESTS && (
                  <button
                    type="button"
                    onClick={addGuest}
                    className="mt-1 h-12 rounded-lg border border-dashed border-gray-300 text-sm font-medium text-gray-600"
                  >
                    + Add another guest
                  </button>
                )}
              </div>

              {/* Optional message */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-gray-700"
                >
                  Message (optional)
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  placeholder="Leave a note for the couple"
                  className="rounded-lg border border-gray-300 px-4 py-3 text-base text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:outline-none"
                />
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="mt-2 h-12 rounded-lg bg-gray-900 text-base font-medium text-white disabled:opacity-50"
              >
                {submitting ? "Submitting..." : "Submit RSVP"}
              </button>
            </form>
          </>
        )}

        {attending === "no" && (
          <>
            <h2 className="text-center text-2xl font-semibold text-gray-900">
              Sorry you can't make it
            </h2>
            <p className="mt-2 text-center text-sm text-gray-500">
              We'll miss you there
            </p>

            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="declinerName"
                  className="text-sm font-medium text-gray-700"
                >
                  Your name
                </label>
                <input
                  id="declinerName"
                  type="text"
                  value={declinerName}
                  onChange={(e) => setDeclinerName(e.target.value)}
                  placeholder="Full name"
                  className="h-12 rounded-lg border border-gray-300 px-4 text-base text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:outline-none"
                />
              </div>

              {!wantsToLeaveMessage ? (
                <button
                  type="button"
                  onClick={() => setWantsToLeaveMessage(true)}
                  className="text-left text-sm font-medium text-gray-600 underline underline-offset-2"
                >
                  Leave a message
                </button>
              ) : (
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium text-gray-700"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    placeholder="Leave a note for the couple"
                    className="rounded-lg border border-gray-300 px-4 py-3 text-base text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:outline-none"
                  />
                </div>
              )}

              {error && <p className="text-sm text-red-600">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="mt-2 h-12 rounded-lg bg-gray-900 text-base font-medium text-white disabled:opacity-50"
              >
                {submitting ? "Submitting..." : "Submit RSVP"}
              </button>
            </form>
          </>
        )}
      </div>
    </section>
  );
}

export default RSVPForm;
