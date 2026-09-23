import { projects } from "../lib/data";

export default function Work() {
  return (
    <section id="work" className="section">
      <div className="section-head">
        <h2>Selected work</h2>
        <span className="section-count">{String(projects.length).padStart(2, "0")}</span>
      </div>

      <ul className="work-list">
        {projects.map((project) => (
          <li key={project.title} className="work-item">
            <a href={project.href} className="work-link">
              <span className="work-title">{project.title}</span>
              <span className="work-desc">{project.description}</span>
              <span className="work-meta">
                <span>{project.stack}</span>
                <span>{project.year}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
