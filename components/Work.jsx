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
            <div className="work-info">
              <span className="work-title">{project.title}</span>
              <span className="work-desc">{project.description}</span>

              <span className="work-stack">
                {project.stack.map((tech) => (
                  <span key={tech} className="work-badge">
                    {tech}
                  </span>
                ))}
              </span>

              <span className="work-meta">
                {project.role && <span>{project.role}</span>}
                {project.date && <span>{project.date}</span>}
              </span>
            </div>

            <div className="work-actions">
              {project.demoHref && (
                <a href={project.demoHref} className="work-action">
                  Live demo ↗
                </a>
              )}
              {project.codeHref && (
                <a href={project.codeHref} className="work-action work-action--ghost">
                  Code ↗
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
