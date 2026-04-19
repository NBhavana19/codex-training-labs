const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5174;

app.use(cors());
app.use(express.json());

const products = [
  { id: 1, name: "Men Printed Hoodie", price: 1999, category: "Men" },
  { id: 2, name: "Women Floral Kurta Set", price: 2499, category: "Women" },
  { id: 3, name: "Kids Casual T-Shirt Pack", price: 899, category: "Kids" },
  { id: 4, name: "Men Running Shoes", price: 3299, category: "Men" },
  { id: 5, name: "Women Handbag", price: 1799, category: "Women" },
  { id: 6, name: "Kids Denim Jacket", price: 1599, category: "Kids" },
];

app.get("/api/products", (req, res) => {
  const curated = products.map((product) => ({
    ...product,
    priceFormatted: new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(product.price),
  }));

  res.json({
    banner: "Top Deals on Fashion",
    curated,
  });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
