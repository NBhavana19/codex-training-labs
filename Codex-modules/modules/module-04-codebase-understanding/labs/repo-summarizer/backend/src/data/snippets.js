const snippets = [
  {
    id: 'inventory-service',
    name: 'inventoryService.js',
    folder: 'backend/src/services',
    entryPoint: 'calculateAvailability(product)',
    dependencies: ['catalog.json', 'stockThresholds.js'],
    language: 'javascript',
    code: `export function calculateAvailability(product) {
  const lowStock = product.inventory < 5;
  return {
    inStock: product.inventory > 0,
    lowStock,
    badge: lowStock ? 'Only a few left' : 'Ready to ship'
  };
}`
  },
  {
    id: 'products-route',
    name: 'products.js',
    folder: 'backend/src/routes',
    entryPoint: 'router.get("/products")',
    dependencies: ['express', 'productsController.js'],
    language: 'javascript',
    code: `const router = require('express').Router();
const { listProducts } = require('../controllers/productsController');

router.get('/products', listProducts);

module.exports = router;`
  },
  {
    id: 'product-grid',
    name: 'ProductGrid.jsx',
    folder: 'frontend/src/components',
    entryPoint: 'ProductGrid(props)',
    dependencies: ['ProductCard.jsx'],
    language: 'jsx',
    code: `export default function ProductGrid({ products }) {
  return (
    <section className="grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
}`
  }
];

module.exports = snippets;
