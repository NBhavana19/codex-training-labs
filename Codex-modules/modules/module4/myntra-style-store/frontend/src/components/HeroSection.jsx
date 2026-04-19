import "./HeroSection.css";

function HeroSection({ banner }) {
  return (
    <section className="hero-section section-block">
      <div className="hero-copy">
        <p className="hero-label">Myntra-style fashion store</p>
        <h1>Shop trending looks for every season.</h1>
        <p className="section-subtext">
          Explore a clean React + Express storefront with curated products,
          category discovery, and backend-powered pricing.
        </p>
      </div>
      <div className="hero-banner">{banner || "Latest arrivals loading..."}</div>
    </section>
  );
}

export default HeroSection;
