import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductList from "./ProductList";
import { API_MAP } from "../utils/apiData";

const Kids = () => {
  const [kidsData, setKidsData] = useState([]);

  const getKidsProducts = async () => {
    try {
      // 👉 tops ko kids treat kar rahe hain
      const res = await axios.get(`${API_MAP.kids}`);
      setKidsData(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getKidsProducts();
  }, []);



  if (!kidsData.length)
    return <h1 className="text-center mt-10">Loading...</h1>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 mt-16">
      
      {/* Heading */}
      <h1 className="text-3xl font-bold text-center mb-6">
        Kids Collection 
      </h1>

      {/* Products */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {kidsData.map((item) => (
          <ProductList key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default Kids;