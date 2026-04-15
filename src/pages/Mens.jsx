import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductList from "./ProductList";
import { API_MAP } from "../utils/apiData";

const Mens = () => {
  const [mens, setMens] = useState([]);

  const getMensProducts = async () => {
    try {
      const res = await axios.get(API_MAP.men);
      console.log(res.data); // 👈 check karo
      setMens(res?.data?.products || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMensProducts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 mt-16">
      <h1 className="text-3xl font-bold text-center mb-8">
        Mens Collection
      </h1>

      {/*condition lagao */}
      {mens.length === 0 ? (
        <h1 className="text-center mt-10">Loading...</h1>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {mens.map((item) => (
            <ProductList key={item.id} data={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Mens;