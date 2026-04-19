import "./Header.css";

function Header() {
  return (
    <header className="store-header">
      <div className="store-logo">MYNTRA STYLE</div>
      <nav className="store-nav" aria-label="Main navigation">
        <a href="#categories">Men</a>
        <a href="#categories">Women</a>
        <a href="#categories">Kids</a>
      </nav>
    </header>
  );
}

export default Header;
