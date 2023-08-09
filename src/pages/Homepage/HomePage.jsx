import React from "react";
import Navbar from "../../components/Navbar/Navbar";

import Cards from "../../components/Cards/Cards";
import Banner from "../../components/Header/Banner";

const HomePage = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div class="mt-16">
        <Banner />
        <Cards />
      </div>
    </div>
  );
};

export default HomePage;
