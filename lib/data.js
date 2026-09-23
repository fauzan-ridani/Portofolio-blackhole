// Semua isi portofolio ada di file ini. Ganti semua placeholder dengan datamu.

export const profile = {
  name: "Fauzan Ridani", // ← GANTI
  email: "hello@yourname.dev", // ← GANTI
  // Tiap item = satu baris headline di hero (dibuat 3 baris pendek biar rapi).
  headline: ["Front-end developer", "building interfaces", "that pull you in."],
  intro:
    "I’m a solo developer exploring the intersection of AI, web development, and Android systems. I build experimental tools, interfaces, and digital experiences—from ideas and prototypes to working applications.

contactLine: "Have an idea or project in mind? Send me a note and I'll get back to you: [
    { label: "GitHub", href: "https:/fauzan-ridani/github.com/" }, // ← GANTI
    { label: "LinkedIn", href: "https://www.linkedin.com/" }, // ← GANTI
    { label: "Instagram", href: "https://www.instagram.com/" }, // ← GANTI
  ],
};

export const projects = [
  {
    title: "Fachive",
    description: "## 1. Visi proyek
Satu aplikasi Android yang menggabungkan tiga hal: file manager, pengarsip ala ZArchiver (ZIP dan format lain), dan terminal/Termux, dengan akses folder terproteksi lewat Shizuku.
",
    role: "Solo developer", // ← GANTI, mis. "Front-end developer", "Freelance", "Team of 3"
    date: "September 2026", // ← GANTI, bulan + tahun
    stack: ["Dart", "Flutter", "C++"],
    demoHref: "#", // ← GANTI, link live demo. Kosongkan "" kalau tidak ada demo.
    codeHref: "https:/fauzan-ridani/github.com/", // ← GANTI, link ke repo GitHub. Kosongkan "" kalau privat.
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
