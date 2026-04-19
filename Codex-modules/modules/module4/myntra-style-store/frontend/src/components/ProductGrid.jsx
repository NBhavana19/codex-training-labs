import ProductCard from "./ProductCard";
import "./ProductGrid.css";

function ProductGrid({ products, loading, error }) {
  return (
    <section className="section-block" id="products">
      <h2 className="section-heading">Featured Products</h2>
      <p className="section-subtext">
        Product data is fetched from the Express backend and rendered through a
        reusable card component.
      </p>

      {loading && <p className="status-message">Loading products...</p>}
      {error && !loading && <p className="status-message error-message">{error}</p>}

      {!loading && !error && (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              priceFormatted={product.priceFormatted}
              category={product.category}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default ProductGrid;
