"use client";

import { useEffect, useState } from "react";
import { profile } from "../lib/data";

const links = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav${scrolled ? " nav--scrolled" : ""}`}>
      <a href="#top" className="nav-brand">
        {profile.name}
      </a>

      <nav aria-label="Main">
        <ul className="nav-links">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      </nav>

      <a href="#contact" className="btn btn--ghost nav-cta">
        Contact
      </a>
    </header>
  );
}
