import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_MAP } from "../utils/apiData";
import ProductList from "../pages/ProductList";

const Products = () => {
  const [product, setProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;

  const handleProducts = async () => {
    const response = await axios.get(`${API_MAP.home}`);
    setProduct(response.data.products); // 👈 directly array store karo
  };

  useEffect(() => {
    handleProducts();
  }, []);

  // ✅ Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentProducts = product.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(product.length / itemsPerPage);

  return (
    <section className="py-5">
      <h1 className="text-3xl text-center font-bold mt-3 underline">
        Our product
      </h1>

      {/* ✅ Responsive Grid */}
      <div className="max-w-[1320px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5">
        {currentProducts.map((items) => (
          <ProductList key={items.id} data={items} />
        ))}
      </div>

      {/* ✅ Pagination UI */}
      <div className="flex flex-wrap justify-center mt-8 gap-2">
        
        {/* Prev */}
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Prev
        </button>

        {/* Page Numbers */}
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 py-2 border rounded ${
              currentPage === index + 1
                ? "bg-black text-white"
                : ""
            }`}
          >
            {index + 1}
          </button>
        ))}

        {/* Next */}
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default Products;