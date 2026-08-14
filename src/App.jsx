import { useEffect, useState } from "react";
import { getProducts } from "./services/productApi";
import ProductList from "./components/ProductList/ProductList";
import { CategoryFilter } from "./components/categoryFilter/CategoryFilter";
import { RecommendationList } from "./components/RecommendationList/RecommendationList";
import { PriceFilter } from "./components/PriceFilter/PriceFilter";
import useDebouce from "./hooks/useDebounce";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { Cart } from "./components/Cart/Cart";

const STORAGE_KEY = "product-recommender-state";
const PRODUCTS_CACHE_KEY = "product-recommender-products";
const CACHE_DURATION = 10 * 60 * 1000;

function getSavedState() {
  const savedState = localStorage.getItem(STORAGE_KEY);

  if (!savedState) {
    return null;
  }

  try {
    return JSON.parse(savedState);
  } catch {
    return null;
  }
}

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(() => {
    const savedState = getSavedState();

    return savedState?.selectedCategory ?? "all";
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [minPrice, setMinPrice] = useState(() => {
    const savedState = getSavedState();

    return savedState?.minPrice ?? "";
  });
  const [maxPrice, setMaxPrice] = useState(() => {
    const savedState = getSavedState();

    return savedState?.maxPrice ?? "";
  });
  const [search, setSearch] = useState(() => {
    const savedState = getSavedState();

    return savedState?.search ?? "";
  });
  const [cart, setCart] = useState(() => {
    const savedState = getSavedState();

    return savedState?.cart ?? [];
  });

  console.log("cart", cart);

  const debounedSearch = useDebouce(search, 1000);

  useEffect(() => {
    const stateToSave = {
      cart,
      selectedCategory,
      minPrice,
      maxPrice,
      search,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
  }, [cart, selectedCategory, minPrice, maxPrice, search]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const cachedData = localStorage.getItem(PRODUCTS_CACHE_KEY);

        if (cachedData) {
          const parsedCache = JSON.parse(cachedData);

          const isCacheValid =
            Date.now() - parsedCache.timestamp < CACHE_DURATION;

          if (isCacheValid) {
            setProducts(parsedCache.products);
            setLoading(false);
            return;
          }
        }

        const data = await getProducts();

        setProducts(data);

        localStorage.setItem(
          PRODUCTS_CACHE_KEY,
          JSON.stringify({
            products: data,
            timestamp: Date.now(),
          }),
        );
      } catch (error) {
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = [...new Set(products.map((product) => product.category))];

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesMinPrice =
      minPrice === "" || product.price >= Number(minPrice);
    const matchesMaxPrice =
      maxPrice === "" || product.price <= Number(maxPrice);
    const matchesSearch = product.title
      .toLowerCase()
      .includes(debounedSearch.toLowerCase());

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

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.id === product.id,
      );

      if (existingProduct) {
        return currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  const increaseQuantity = (productId) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    );
  };

  const decreaseQuantity = (productId) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeFromCart = (productId) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== productId),
    );
  };
  return (
    <main>
      <h1>Product Recommender</h1>

      <SearchBar search={search} onSearchChange={setSearch} />

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <PriceFilter
        minPrice={minPrice}
        maxPrice={maxPrice}
        onMinPriceChange={setMinPrice}
        onMaxPriceChange={setMaxPrice}
      />

      <Cart
        cart={cart}
        onRemove={removeFromCart}
        onIncrease={increaseQuantity}
        onDecrease={decreaseQuantity}
      />

      <ProductList
        products={filteredProducts}
        onSelect={setSelectedProduct}
        onAddToCart={addToCart}
      />

      <RecommendationList
        selectedProduct={selectedProduct}
        products={products}
        onAddToCart={addToCart}
      />
    </main>
  );
}

export default App;
