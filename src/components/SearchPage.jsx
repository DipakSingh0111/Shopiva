import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_MAP } from "../utils/apiData";
import ProductList from "../pages/ProductList";

const SearchPage = () => {
  const { query } = useParams();
  const [products, setProducts] = useState([]);

  const getSearchData = async () => {
    try {
      const res = await axios.get(API_MAP.home);

      // 🔥 filter based on search
      const filtered = res.data.products.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );

      setProducts(filtered);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSearchData();
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 mt-20">
      <h1 className="text-2xl font-bold mb-6">
        Search Results for "{query}"
      </h1>

      {products.length === 0 ? (
        <h2 className="text-center text-gray-500">
          No products found 😢
        </h2>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {products.map((item) => (
            <ProductList key={item.id} data={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;