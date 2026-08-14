import { useEffect, useState } from "react";
import { getProducts } from "./services/productApi";
import ProductList from "./components/ProductList/ProductList";
import { CategoryFilter } from "./components/categoryFilter/CategoryFilter";
import { RecommendationList } from "./components/RecommendationList/RecommendationList";
import { PriceFilter } from "./components/PriceFilter/PriceFilter";
import useDebouce from "./hooks/useDebounce";
import { SearchBar } from "./components/SearchBar/SearchBar";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [search, setSearch] = useState("");

  const debounedSearch = useDebouce(search, 1000);

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

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesMinPrice = minPrice === "" || product.price >= Number(minPrice);
    const matchesMaxPrice = maxPrice === "" || product.price <= Number(maxPrice);
    const matchesSearch = product.title.toLowerCase().includes(debounedSearch.toLowerCase());

    return (
      matchesCategory && matchesMinPrice && matchesMaxPrice && matchesSearch
    );
  });

  if (loading) {
    return <h1>Loading</h1>;
  }

  if (error) {
    return <h1>Error: {error}</h1>;
  }

  return (
    <main>
      <h1>Product Recommender</h1>

      <SearchBar search={search} onSearchChange={setSearch} />

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <PriceFilter minPrice={minPrice} maxPrice={maxPrice} onMinPriceChange={setMinPrice} onMaxPriceChange={setMaxPrice} />

      <ProductList products={filteredProducts} onSelect={setSelectedProduct}/>

      <RecommendationList selectedProduct={selectedProduct} products={products}/>
    </main>
  );
}

export default App;
