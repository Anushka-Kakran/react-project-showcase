import { useEffect, useState } from 'react';

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("https://dummyjson.com/products");
        const data = await res.json();
        setProducts(data.products);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchProducts();
  }, []);

  return { products, error };
}