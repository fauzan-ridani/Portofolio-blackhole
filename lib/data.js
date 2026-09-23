// Semua isi portofolio ada di file ini. Ganti semua placeholder dengan datamu.

export const profile = {
  name: "Your Name", // ← GANTI
  email: "hello@yourname.dev", // ← GANTI
  // Tiap item = satu baris headline di hero (dibuat 3 baris pendek biar rapi).
  headline: ["Front-end developer", "building interfaces", "that pull you in."],
  intro:
    "I design and build fast, expressive websites with Next.js, from the first sketch to production.",
  contactLine: "Have a project in mind? Send me a note and I'll reply within two days.",
  socials: [
    { label: "GitHub", href: "https://github.com/" }, // ← GANTI
    { label: "LinkedIn", href: "https://www.linkedin.com/" }, // ← GANTI
    { label: "Instagram", href: "https://www.instagram.com/" }, // ← GANTI
  ],
};

export const projects = [
  {
    title: "Project name one",
    description: "One sentence on what it does and what you built.",
    role: "Solo developer", // ← GANTI, mis. "Front-end developer", "Freelance", "Team of 3"
    date: "Jan 2026", // ← GANTI, bulan + tahun
    stack: ["Next.js", "Tailwind", "PostgreSQL"],
    demoHref: "#", // ← GANTI, link live demo. Kosongkan "" kalau tidak ada demo.
    codeHref: "https://github.com/", // ← GANTI, link ke repo GitHub. Kosongkan "" kalau privat.
  },
  {
    title: "Project name two",
    description: "One sentence on what it does and what you built.",
    role: "Solo developer",
    date: "Nov 2025",
    stack: ["React", "Framer Motion", "WebGL"],
    demoHref: "#",
    codeHref: "https://github.com/",
  },
  {
    title: "Project name three",
    description: "One sentence on what it does and what you built.",
    role: "Solo developer",
    date: "Aug 2025",
    stack: ["Next.js", "Prisma", "Stripe"],
    demoHref: "#",
    codeHref: "https://github.com/",
  },
  {
    title: "Project name four",
    description: "One sentence on what it does and what you built.",
    role: "Solo developer",
    date: "May 2025",
    stack: ["Vue", "Node.js", "Redis"],
    demoHref: "#",
    codeHref: "https://github.com/",
  },
];

export const about = {
  lead: "I care about the small details that make a site feel finished: motion with a purpose, type that reads well, and pages that stay fast.",
  facts: [
    { label: "Based in", value: "City, Indonesia" }, // ← GANTI
    { label: "Focus", value: "Front-end, interaction design" },
    { label: "Stack", value: "Next.js, React, TypeScript, CSS" },
    { label: "Open to", value: "Freelance and full-time roles" },
  ],
};
