import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { API_MAP } from '../utils/apiData';
import ProductList from './ProductList';

const Womens = () => {
      const [womens, setWomens] = useState([]);

  const getTshirts = async () => {
    try {
      const res = await axios.get(API_MAP.women);
      setWomens(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTshirts();
  }, []);

  if (!womens.length)
    return <h1 className="text-center mt-10">Loading...</h1>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 mt-16">
      <h1 className="text-3xl font-bold text-center mb-8">
        Womens Collection
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {womens.map((item) => (
          <ProductList key={item.id} data={item} />
        ))}
      </div>
    </div>
  )
}

export default Womens
