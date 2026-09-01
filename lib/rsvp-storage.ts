const RSVP_STORAGE_KEY = "wedding_rsvp_submitted";

export function hasAlreadySubmitted(): boolean {
  if (typeof window === "undefined") return false; // guards SSR
  return localStorage.getItem(RSVP_STORAGE_KEY) === "true";
}

export function markAsSubmitted() {
  if (typeof window === "undefined") return;
  localStorage.setItem(RSVP_STORAGE_KEY, "true");
}
