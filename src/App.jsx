import { useEffect, useState } from "react";
import { getProducts } from "./services/productApi";
import ProductList from "./components/ProductList/ProductList";
import { CategoryFilter } from "./components/categoryFilter/CategoryFilter";
import { RecommendationList } from "./components/RecommendationList/RecommendationList";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);

  console.log("selected Product", selectedProduct);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const categories = [...new Set(products.map((product) => product.category))];

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  if (loading) {
    return <h1>Loading</h1>;
  }

  if (error) {
    return <h1>Error: {error}</h1>;
  }

  return (
    <main>
      <h1>Product Recommender</h1>

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <ProductList products={filteredProducts} onSelect={setSelectedProduct}/>

      <RecommendationList selectedProduct={selectedProduct} products={products}/>
    </main>
  );
}

export default App;
