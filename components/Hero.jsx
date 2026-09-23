import { profile } from "../lib/data";

export default function Hero() {
  return (
    <section id="top" className="hero">
      {/* data-parallax: ikut bergeser tipis mengikuti pointer (lihat lib/blackHole.js) */}
      <div className="hero-inner" data-parallax="0.25">
        <h1 className="hero-title">
          {profile.headline.map((line, i) => (
            <span className="line" key={line}>
              <span style={{ "--i": i }}>{line}</span>
            </span>
          ))}
        </h1>

        <p className="hero-sub">{profile.intro}</p>

        <div className="hero-actions">
          <a className="btn btn--solid" href="#work">
            See my work
          </a>
          <a className="btn btn--ghost" href="#contact">
            Get in touch
          </a>
        </div>
      </div>
    </section>
  );
}
