import React from "react";
import Carousel from "../components/Carousel";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import OurLatestCreations from "../components/OurLatestCreations";

const Home = () => {
  return (
    <div>
      <Carousel />
      <Products />
      <Newsletter />
      <OurLatestCreations />
    </div>
  );
};

export default Home;
