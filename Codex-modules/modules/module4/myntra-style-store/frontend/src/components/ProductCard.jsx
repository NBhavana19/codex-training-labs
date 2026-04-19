import "./ProductCard.css";

function ProductCard({ name, priceFormatted, category }) {
  return (
    <article className="product-card">
      <span className="product-category">{category}</span>
      <h3>{name}</h3>
      <p className="product-price">{priceFormatted}</p>
    </article>
  );
}

export default ProductCard;
