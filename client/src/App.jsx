import { useMemo, useState } from "react";

const heroImage = "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80";
const structuralImage = "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=80";
const mepImage = "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1600&q=80";
const civilImage = "https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?auto=format&fit=crop&w=1600&q=80";
const renderingImage = "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1600&q=80";


const serviceCards = [
  {
    title: "Structural",
    description:
      "Analysis, detailing, and documentation that make structures safe, efficient, and buildable."
  },
  {
    title: "MEP",
    description:
      "Mechanical, electrical, and plumbing designs coordinated for performance and clean installation."
  },
  {
    title: "Civil",
    description:
      "Site grading, drainage, and infrastructure solutions engineered for durability and compliance."
  },
  {
    title: "Architectural",
    description:
      "Design development, code-ready documentation, and constructability review."
  },
  {
    title: "Rendering",
    description:
      "Photo-real visualization for approvals, presentations, and stakeholder alignment."
  }
];

const highlights = [
  {
    label: "Disciplines",
    value: "5 Integrated Disciplines"
  },
  {
    label: "Project Types",
    value: "Residential, Commercial, Industrial + Specialty"
  },
  {
    label: "Delivery",
    value: "Coordinated, precise, dependable"
  }
];

const capabilities = [
  "Cross-discipline coordination that reduces RFIs and site conflicts",
  "Construction-ready drawings and specifications",
  "Responsive revisions with clear communication",
  "Value-driven solutions without compromising design intent",
  "Rendering packages that streamline approvals and stakeholder buy-in"
];

const sectors = [
  {
    title: "Structural Systems",
    description: "Steel, concrete, and hybrid structures engineered for performance.",
    image: structuralImage
  },
  {
    title: "MEP Coordination",
    description: "HVAC, electrical, and plumbing that install cleanly on site.",
    image: mepImage
  },
  {
    title: "Civil Infrastructure",
    description: "Grading, drainage, and site infrastructure for lasting value.",
    image: civilImage
  },
  {
    title: "Architectural + Rendering",
    description: "Design-forward drawings and visualizations that win buy-in.",
    image: renderingImage
  }
];

const process = [
  {
    title: "Discovery",
    detail: "We align on scope, schedule, budget priorities, and stakeholders."
  },
  {
    title: "Design + Coordination",
    detail: "We deliver coordinated packages across all disciplines with clear milestones."
  },
  {
    title: "Delivery",
    detail: "Final documentation and renderings ready for permitting and construction."
  }
];

export default function App() {
  const [formStatus, setFormStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const stats = useMemo(() => highlights, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setFormStatus("loading");
    setErrorMessage("");

    const formData = new FormData(event.target);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || "Unable to send message.");
      }

      event.target.reset();
      setFormStatus("success");
    } catch (error) {
      setFormStatus("error");
      setErrorMessage(error.message || "Something went wrong.");
    }
  }

  return (
    <div className="page">
      <header className="site-header">
        <nav className="nav">
          <div className="logo">
            <img src="/synfinilogo.png" alt="Synfiny Construction LLC" className="logo-image" />
          </div>
          <div className="nav-links">
            <a href="#services">Services</a>
            <a href="#work">Work</a>
            <a href="#process">Process</a>
            <a href="#contact" className="button ghost">Contact</a>
          </div>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <p className="eyebrow">Integrated Construction Design Services</p>
            <h1>Design + engineering services that turn complex construction into clear execution.</h1>
            <p>
              Synfiny Construction LLC provides integrated structural, MEP, civil, architectural, and
              rendering services for residential, commercial, and specialty projects.
            </p>
            <div className="hero-actions">
              <a href="#contact" className="button primary">Start a project</a>
              <a href="#work" className="button secondary">View deliverables</a>
            </div>
            <div className="stats">
              {stats.map((stat) => (
                <div key={stat.label} className="stat-card">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-image">
            <img src={heroImage} alt="Construction cranes at work" loading="lazy" />
            <div className="hero-overlay">
              <div>
                <p className="overlay-title">Coordinated documentation</p>
                <p className="overlay-detail">Drawings, details, and renderings aligned for the field.</p>
              </div>
              <div>
                <p className="overlay-title">Project clarity</p>
                <p className="overlay-detail">Clear scope, reliable schedules, and confident delivery.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="section">
          <div className="section-header">
            <h2>Services built for construction-ready delivery</h2>
            <p>
              We bring technical depth, coordination discipline, and buildability focus across every
              phase of design.
            </p>
          </div>
          <div className="service-grid">
            {serviceCards.map((service) => (
              <div key={service.title} className="service-card">
                <div className="icon">
                  <span className="dot" />
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section split">
          <div className="panel">
            <h2>Why teams choose Synfiny</h2>
            <p>
              We are not limited to any single project type. From residential to complex builds, we
              keep documentation coordinated, visual, and construction-ready.
            </p>
            <ul className="checklist">
              {capabilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="panel highlight">
            <h3>Focus areas</h3>
            <div className="focus-grid">
              <div>
                <span>Structural</span>
                <p>Framing, analysis, and detailing.</p>
              </div>
              <div>
                <span>MEP</span>
                <p>HVAC, electrical, and plumbing layouts.</p>
              </div>
              <div>
                <span>Civil</span>
                <p>Site infrastructure and grading.</p>
              </div>
              <div>
                <span>Architectural</span>
                <p>Concepts to construction-ready plans.</p>
              </div>
              <div>
                <span>Rendering</span>
                <p>High-impact visuals and approvals.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="work" className="section">
          <div className="section-header">
            <h2>Work-ready deliverables</h2>
            <p>Representative deliverables across structural, MEP, civil, and architectural scopes.</p>
          </div>
          <div className="work-grid">
            {sectors.map((item) => (
              <article key={item.title} className="work-card">
                <img src={item.image} alt={item.title} loading="lazy" />
                <div className="work-content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="process" className="section process">
          <div className="section-header">
            <h2>A clear, fast process</h2>
            <p>We stay aligned with your team from kickoff through delivery.</p>
          </div>
          <div className="process-grid">
            {process.map((step) => (
              <div key={step.title} className="process-card">
                <h3>{step.title}</h3>
                <p>{step.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="section contact">
          <div className="section-header">
            <h2>Tell us about your project</h2>
            <p>We respond quickly. Your message will be delivered to contact@synfiniconstruction.org.</p>
          </div>
          <div className="contact-grid">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <label>
                  Full name
                  <input name="name" type="text" placeholder="Your name" required />
                </label>
                <label>
                  Email
                  <input name="email" type="email" placeholder="you@example.com" required />
                </label>
              </div>
              <div className="form-row">
                <label>
                  Company
                  <input name="company" type="text" placeholder="Company name" />
                </label>
                <label>
                  Phone
                  <input name="phone" type="tel" placeholder="(555) 555-1234" />
                </label>
              </div>
              <label className="full">
                Project details
                <textarea name="message" rows="5" placeholder="Tell us about your scope and timeline." required />
              </label>
              <label className="hidden">
                Leave this field empty
                <input name="website" type="text" tabIndex="-1" autoComplete="off" />
              </label>
              <button className="button primary" type="submit" disabled={formStatus === "loading"}>
                {formStatus === "loading" ? "Sending..." : "Send request"}
              </button>
              {formStatus === "success" && (
                <p className="form-message success">Thank you. We will be in touch shortly.</p>
              )}
              {formStatus === "error" && (
                <p className="form-message error">{errorMessage}</p>
              )}
            </form>
            <div className="contact-card">
              <h3>Synfiny Construction LLC</h3>
              <p>
                Integrated structural, MEP, civil, architectural, and rendering services for projects
                that demand clarity and confidence.
              </p>
              <div className="contact-details">
                <div>
                  <span>Email</span>
                  <p>contact@synfiniconstruction.org</p>
                </div>
                <div>
                  <span>Coverage</span>
                  <p>Remote + on-site coordination as needed</p>
                </div>
              </div>
              <div className="contact-badge">
                <strong>Reliable kickoff timelines</strong>
                <span>Clear scope, schedule, and next steps</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div>
          <h3>Synfiny Construction LLC</h3>
          <p>Smart, clean, coordinated documentation for construction teams.</p>
        </div>
        <div className="footer-links">
          <a href="#services">Services</a>
          <a href="#work">Work</a>
          <a href="#process">Process</a>
          <a href="#contact">Contact</a>
        </div>
      </footer>
    </div>
  );
}
