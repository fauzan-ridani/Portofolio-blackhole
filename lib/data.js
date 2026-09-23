// Semua isi portofolio ada di file ini. Ganti semua placeholder dengan datamu.

export const profile = {
  name: "Fauzan Ridani", // ← GANTI
  email: "developer.fauzan@is.a.dev", // ← GANTI
  // Tiap item = satu baris headline di hero (dibuat 3 baris pendek biar rapi).
  headline: ["Front-end developer", "building interfaces", "that pull you in."],
  intro:
    "I design and build fast, expressive websites with Next.js, from the first sketch to production.",
  contactLine: "Have a project in mind? Send me a note and I'll reply within two days.",
  socials: [
    { label: "GitHub", href: "https:/Zanyrid/github.com/" }, // ← GANTI
    { label: "LinkedIn", href: "https://www.linkedin.com/" }, // ← GANTI
    { label: "Instagram", href: "https://www.instagram.com/" }, // ← GANTI
  ],
};

export const projects = [
  {
    title: "file manager pro ( work)",
    description: "introduce file manager pro, app one in 3 combination shizuku+terminal+zachiver",
    role: "Solo developer", // ← GANTI, mis. "Front-end developer", "Freelance", "Team of 3"
    date: "September 2026", // ← GANTI, bulan + tahun
    stack: ["Dart", "C++", "PostgreSQL"],
    demoHref: "#", // ← GANTI, link live demo. Kosongkan "" kalau tidak ada demo.
    codeHref: "https://github.com/Zanyrid/file_manager_pro", // ← GANTI, link ke repo GitHub. Kosongkan "" kalau privat.
  },
  {
    title: "Working",
    description: "No Information, Just experiment",
    role: "Solo developer",
    date: "Nov 2025",
    stack: ["React", "Framer Motion", "WebGL"],
    demoHref: "#",
    codeHref: "https:/Zanyrid/github.com/",
  },
  {
    title: "working private",
    description: "Private",
    role: "Solo developer",
    date: "Aug 2026",
    stack: ["Next.js", "Prisma", "Stripe"],
    demoHref: "#",
    codeHref: "https:/Zanyrid/github.com/",
  },
  {
    title: "working Private",
    description: "Private",
    role: "Solo developer",
    date: "May 2026",
    stack: ["Vue", "Node.js", "Redis"],
    demoHref: "#",
    codeHref: "https:/Zanyrid/github.com/",
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
