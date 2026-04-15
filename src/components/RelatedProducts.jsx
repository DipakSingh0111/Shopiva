import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_MAP } from "../utils/apiData";
import ProductList from "../pages/ProductList";

const RelatedProducts = ({ category, currentId }) => {
  const [related, setRelated] = useState([]);

  const getRelatedProducts = async () => {
    try {
      const response = await axios.get(
        `${API_MAP.category}/${encodeURIComponent(category)}`,
      );

      // ✅ axios data access fix
      const products = response.data.products;

      // ❌ current product remove
      const filtered = products.filter((item) => item.id !== currentId);

      setRelated(filtered.slice(0, 8)); // max 8 products
    } catch (error) {
      console.log("Related API Error:", error);
    }
  };

  useEffect(() => {
    if (category) {
      getRelatedProducts();
    }
  }, [category, currentId]);

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Related Products</h2>

      {related.length === 0 ? (
        <p className="text-gray-500">No related products found</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {related.map((item) => (
            <ProductList key={item.id} data={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RelatedProducts;
