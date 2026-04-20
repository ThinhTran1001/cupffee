"use client";

export default function ChatFab() {
  return (
    <button
      type="button"
      className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-md bg-[#2d6a4f] text-white shadow-lg transition hover:bg-[#1b4332] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2d6a4f] focus-visible:ring-offset-2"
      aria-label="Chat hỗ trợ"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 0 1-4-.84L3 20l1.16-3.56A7.96 7.96 0 0 1 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8Z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
