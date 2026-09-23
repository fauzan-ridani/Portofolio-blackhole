import { profile } from "../lib/data";

export default function Contact() {
  return (
    <section id="contact" className="section section--contact">
      <p className="contact-line">{profile.contactLine}</p>

      <a className="contact-email" href={`mailto:${profile.email}`}>
        {profile.email}
      </a>

      <footer className="footer">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>

        <ul className="footer-socials">
          {profile.socials.map((social) => (
            <li key={social.label}>
              <a href={social.href} target="_blank" rel="noreferrer">
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </footer>
    </section>
  );
}
