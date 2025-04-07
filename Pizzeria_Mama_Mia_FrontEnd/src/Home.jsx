import React from "react";
import Header from "./Header";
import Pizzas from "./Pizzas";
import "./components/css/Home.css";

function Home() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      <main className="flex-grow-1 py-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="text-center mb-5">
              <h1 className="badge bg-danger" style={{ fontSize: "3rem" }}>
                Nuestras Pizzas
              </h1>
            </div>

            <div className="shadow-sm rounded-4 overflow-hidden">
              <Pizzas />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
