import React from "react";
import { addToCart, removeFromCart } from "../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProductList = ({ data }) => {
  const { title, thumbnail, price, rating, description, id } = data;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart.cart);

  const checkItemInCart = cart.find((obj) => obj.id === id);

  // ✅ slug function
  const createSlug = (text) => {
    return text
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  };

  // 👉 Navigate with slug
  const handleProductClick = () => {
    const slug = createSlug(title);
    navigate(`/product/${id}/${slug}`);
  };

  // 👉 Add to cart
  const addToCartHandler = () => {
    const cartObj = {
      price,
      title,
      image: thumbnail,
      qty: 1,
      description,
      id,
    };
    dispatch(addToCart({ cartObj }));
  };

  // 👉 Remove from cart
  const removeFromCartHandler = () => {
    dispatch(removeFromCart({ id }));
  };

  return (
    <div
      onClick={handleProductClick}
      className="cursor-pointer rounded-2xl border border-gray-200 bg-white p-4 shadow-md hover:shadow-xl transition duration-300 hover:scale-105"
    >
      {/* Image */}
      <div className="w-full h-48">
        <img
          className="mx-auto h-full w-full object-contain"
          src={thumbnail}
          alt={title}
        />
      </div>

      {/* Content */}
      <div className="pt-4">
        <h2 className="text-lg font-semibold line-clamp-2">{title}</h2>

        {/* Rating */}
        <div className="flex items-center mt-2">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-yellow-500">
              {i < Math.floor(rating) ? "★" : "☆"}
            </span>
          ))}
          <span className="ml-2 text-gray-500">({rating})</span>
        </div>

        {/* Price */}
        <p className="text-xl font-bold mt-2">${price}</p>

        {/* Button */}
        <div className="mt-3">
          {checkItemInCart ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeFromCartHandler();
              }}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Remove
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCartHandler();
              }}
              className="bg-indigo-600 text-white px-4 py-2 rounded"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
