import { useEffect, useState } from "react";
import { getProducts } from "./services/productApi";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return <h1>Loading</h1>;
  }

  if (error) {
    return <h1>Error: {error}</h1>;
  }

  return (
    <div>
      <h1>Product Recommender</h1>

      <p>Products : {products.length}</p>

      <pre>{JSON.stringify(products, null, 2)}</pre>
    </div>
  );
}

export default App;
