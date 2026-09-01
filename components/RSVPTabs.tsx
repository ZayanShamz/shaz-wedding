"use client";

import { UserRound } from "lucide-react";
import { useState } from "react";

type Tab = "guests" | "messages" | "declines";

type Guest = { name: string; date: string };
type Note = { name: string | null; message: string; date: string };
type Decline = { name: string | null; message: string | null; date: string };

type RsvpTabsProps = {
  guests: Guest[];
  notes: Note[];
  declines: Decline[];
};

function RsvpTabs({ guests, notes, declines }: RsvpTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>("guests");

  const tabs: Tab[] = ["guests", "messages", "declines"];
  const activeIndex = tabs.indexOf(activeTab);

  return (
    <>
      <div className="relative flex bg-gray-100 rounded-md p-0.5 w-full max-w-sm mx-auto mb-6">
        <div
          className="absolute top-0.5 bottom-0.5 left-0.5 w-1/3 bg-white rounded-sm shadow-sm transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(${activeIndex * 100}%)` }}
        />
        <button
          onClick={() => setActiveTab("guests")}
          className={`flex-1 text-center px-3 py-2 rounded-sm relative z-10 transition-all duration-300 cursor-pointer ${
            activeTab === "guests"
              ? "text-midnight-purple font-medium"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          Guests
        </button>
        <button
          onClick={() => setActiveTab("messages")}
          className={`flex-1 text-center px-3 py-2 rounded-sm relative z-10 transition-all duration-300 cursor-pointer ${
            activeTab === "messages"
              ? "text-midnight-purple font-medium"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          Messages
        </button>
        <button
          onClick={() => setActiveTab("declines")}
          className={`flex-1 text-center px-3 py-2 rounded-sm relative z-10 transition-all duration-300 cursor-pointer ${
            activeTab === "declines"
              ? "text-midnight-purple font-medium"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          Declined
        </button>
      </div>

      {activeTab === "guests" && (
        <div className="overflow-x-auto rounded-xl border border-midnight-purple shadow-xl cursor-pointer">
          <table className="w-full text-sm text-left backdrop-blur-xs">
            <caption className="mt-4 text-base">Guest List</caption>
            <tbody>
              {guests.map((guest, i) => (
                <tr
                  key={i}
                  className="text-fluid-base border-b border-b-midnight-purple/30 last:border-b-0"
                >
                  <td className="px-4 py-3 font-medium">{i + 1}</td>
                  <td className="px-4 py-3">{guest.date}</td>
                  <td className="px-4 py-3">{guest.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {activeTab === "messages" && (
        <div className="space-y-3">
          {notes.map((note, i) => (
            <div key={i} className="flex w-full">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white ms-2">
                <UserRound className="h-5 w-5 text-midnight-purple" />
              </div>
              <div className="flex-1 ms-2 px-3 bg-crimson-violet rounded-b-lg rounded-tr-lg">
                <p className="text-fluid-sm text-burn-pink font-semibold my-1">
                  {note.name ?? "Anonymous"}
                </p>
                <p className="text-burn-pink">{note.message}</p>
                <p className="text-right text-burn-pink/80 pb-1">{note.date}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "declines" && (
        <div className="space-y-3">
          {declines.map((decline, i) => (
            <div key={i} className="flex w-full">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white ms-2 shrink-0">
                <UserRound className="h-5 w-5 text-midnight-purple" />
              </div>
              <div className="flex-1 ms-2 px-3 bg-crimson-violet rounded-b-lg rounded-tr-lg">
                <p className="text-fluid-sm text-burn-pink font-semibold my-1">
                  {decline.name ?? "Anonymous"}
                </p>
                <p className="text-burn-pink">
                  {decline.message ?? "No message left."}
                </p>
                <p className="text-right text-burn-pink/80 pb-1">
                  {decline.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default RsvpTabs;
