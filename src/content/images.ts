/**
 * Photography slots. Each entry is a description of the photograph that belongs there.
 * `src` is a licensed Unsplash placeholder or undefined (renders a labelled sand matte).
 * Replace `src` with files in /public/photos/ as the real shoot arrives.
 * Per client instruction, CLCB photography stays blank until their own photos are supplied.
 */
export const photos = {
  hero: { label: "Founder in conversation, window light", src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1400&q=80", alt: "A woman in a light office, smiling during a conversation" },
  founder: { label: "Anooshka Soham Bathwal, portrait", src: undefined, alt: "Anooshka Soham Bathwal, Founder and CEO of Dhanvesttor" },
  office: { label: "Dhanvesttor office, Elgin, Kolkata", src: undefined, alt: "" },
  team: { label: "The Dhanvesttor team", src: undefined, alt: "" },
  desk: { label: "Desk detail, notes and tea", src: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=75", alt: "Notebook, pen and documents on a desk" },
  research: { label: "Research desk at work", src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=75", alt: "Charts and notes on a laptop and paper" },
  conversation: { label: "Two women talking over coffee", src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=75", alt: "Colleagues in conversation around a table" },
  clcbWorkshop: { label: "CLCB workshop in progress", src: undefined, alt: "" },
  clcbCircle: { label: "CLCB learning circle", src: undefined, alt: "" },
  clcbQuestion: { label: "A participant asking a question", src: undefined, alt: "" },
  kolkata: { label: "Kolkata, morning light", src: undefined, alt: "" },
} as const;
