// src/components/EngineeringDiagram.jsx
import "./EngineeringDiagram.css";

export default function EngineeringDiagram() {
  return (
    <div className="hero-visual relative w-full max-w-[460px] mx-auto aspect-[0.92] rounded-3xl border overflow-hidden">
      <div className="hero-energy-system">
        <span className="hero-energy-system__ambient hero-energy-system__ambient--one" />
        <span className="hero-energy-system__ambient hero-energy-system__ambient--two" />

        <svg
          className="hero-energy-flow"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {/* Solar array -> inverter */}
          <path className="hero-energy-flow__base" d="M29,80 C38,70 46,56 55,47" />
          <path className="hero-energy-flow__live" d="M29,80 C38,70 46,56 55,47" />

          {/* Inverter -> storage */}
          <path className="hero-energy-flow__base" d="M61,42 C70,38 78,35 84,32" />
          <path className="hero-energy-flow__live" d="M61,42 C70,38 78,35 84,32" />

          {/* Inverter -> home */}
          <path className="hero-energy-flow__base" d="M58,53 C65,64 71,74 76,83" />
          <path className="hero-energy-flow__live" d="M58,53 C65,64 71,74 76,83" />

          <circle className="hero-energy-flow__node" cx="29" cy="80" r="1.6" />
          <circle className="hero-energy-flow__node hero-energy-flow__node--two" cx="84" cy="32" r="1.6" />
          <circle className="hero-energy-flow__node hero-energy-flow__node--three" cx="76" cy="83" r="1.6" />
        </svg>

        <div className="hero-sun">
          <span className="hero-sun__rays" />
          <span className="hero-sun__core" />
        </div>

        <div className="hero-solar-generator">
          <div className="hero-solar-generator__stand" />
          <div className="hero-solar-generator__surface">
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i} className="hero-solar-generator__cell" />
            ))}
          </div>
          <span className="hero-system-label">Solar Array</span>
        </div>

        <div className="hero-power-controller">
          <div className="hero-power-controller__top">
            <span>Inverter</span>
            <span className="hero-power-controller__status" />
          </div>
          <div className="hero-power-controller__screen">
            <span className="hero-power-controller__bolt" />
          </div>
          <span className="hero-system-label">Smart Inverter</span>
        </div>

        <div className="hero-storage">
          <div className="hero-storage__body">
            <span className="hero-storage__cell" />
            <span className="hero-storage__cell" />
            <span className="hero-storage__cell" />
            <span className="hero-storage__cell" />
          </div>
          <span className="hero-system-label">Storage</span>
        </div>

        <div className="hero-smart-home">
          <div className="hero-smart-home__roof" />
          <div className="hero-smart-home__body">
            <span className="hero-smart-home__window" />
            <span className="hero-smart-home__door" />
          </div>
          <span className="hero-system-label">Home / Business</span>
        </div>

        <div className="hero-energy-metric hero-energy-metric--generation">
          <small>Generation</small>
          <strong>5.2 kW</strong>
        </div>

        <div className="hero-energy-metric hero-energy-metric--live">
          <span className="hero-energy-metric__dot" />
          Live Energy Flow
        </div>
      </div>
    </div>
  );
}
