import React from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./pages/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import ProductsDetails from "./components/ProductsDetails";

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product/:id/:slug" element={<ProductsDetails />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
