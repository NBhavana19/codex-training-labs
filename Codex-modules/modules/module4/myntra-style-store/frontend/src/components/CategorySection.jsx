import "./CategorySection.css";

function CategorySection({ categories }) {
  return (
    <section className="section-block" id="categories">
      <h2 className="section-heading">Shop by Category</h2>
      <div className="category-grid">
        {categories.map((category) => (
          <div key={category} className="category-card">
            <h3>{category}</h3>
            <p>Browse handpicked {category.toLowerCase()} fashion essentials.</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CategorySection;
