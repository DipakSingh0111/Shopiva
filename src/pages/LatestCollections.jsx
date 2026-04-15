import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductList from "./ProductList";
import { API_MAP } from "../utils/apiData"; // 👈 yaha se import

const LatestCollections = () => {
  const [latest, setLatest] = useState([]);

  const getTshirts = async () => {
    try {
      const res = await axios.get(API_MAP.latest);
      setLatest(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTshirts();
  }, []);

  if (!latest.length)
    return <h1 className="text-center mt-10">Loading...</h1>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 mt-16">
      <h1 className="text-3xl font-bold text-center mb-8">
        Latest Collection
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {latest.map((item) => (
          <ProductList key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default LatestCollections;