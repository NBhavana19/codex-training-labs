import { useEffect, useState } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import CategorySection from "./components/CategorySection";
import ProductGrid from "./components/ProductGrid";
import { getProducts } from "./services/api";
import "./App.css";

const categories = ["Men", "Women", "Kids"];

function App() {
  const [products, setProducts] = useState([]);
  const [banner, setBanner] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError("");

        const data = await getProducts();
        setProducts(data.curated ?? []);
        setBanner(data.banner ?? "");
      } catch (fetchError) {
        setError(fetchError.message || "Failed to load products.");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  return (
    <div className="app-shell">
      <Header />
      <main className="page-content">
        <HeroSection banner={banner} />
        <CategorySection categories={categories} />
        <ProductGrid products={products} loading={loading} error={error} />
      </main>
    </div>
  );
}

export default App;
