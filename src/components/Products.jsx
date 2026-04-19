import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { API_MAP } from "../utils/apiData";

import Pagination from "../components/Pagination";
import ProductList from "./ProductList";

const Products = () => {
  const [product, setProduct] = useState([]);
  const [page, setPage] = useState(1);
  const perPage = 8;
  const gridRef = useRef(null); // 👈 ref banao

  const handleProducts = async () => {
    const response = await axios.get(`${API_MAP.home}`);
    setProduct(response.data.products);
  };

  useEffect(() => {
    handleProducts();
  }, []);

  const paginated = product.slice((page - 1) * perPage, page * perPage);

  return (
    <section className="py-5">
      <h1 className="text-3xl text-center font-bold mt-3 underline">
        Our product
      </h1>

      <div className="max-w-[1320px] mx-auto mt-5">
        {/* 👇 ref yahan lagao */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
        >
          {paginated.map((items) => (
            <ProductList key={items.id} data={items} />
          ))}
        </div>

        <Pagination
          currentPage={page}
          totalPages={Math.ceil(product.length / perPage)}
          totalItems={product.length}
          perPage={perPage}
          onPageChange={(p) => {
            setPage(p);
            // 👇 grid ke upar smoothly scroll karega, pure page top pe nahi
            gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
        />
      </div>
    </section>
  );
};

export default Products;