import React from "react";
import Header from "./Header";
import Pizza from "./Pizza";
import "./components/css/Home.css";

function Home() {
  return (
    <div>
      <Header />
      <div className="container">
        <h1>Nuestras Pizzas</h1>

        <Pizza />
      </div>
    </div>
  );
}

export default Home;
