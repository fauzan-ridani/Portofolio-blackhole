import { about } from "../lib/data";

export default function About() {
  return (
    <section id="about" className="section">
      <div className="about-grid">
        <p className="about-lead">{about.lead}</p>

        <dl className="about-facts">
          {about.facts.map((fact) => (
            <div className="about-fact" key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
