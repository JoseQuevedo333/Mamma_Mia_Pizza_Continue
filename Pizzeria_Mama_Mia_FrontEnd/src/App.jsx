import React from "react";
import "./components/css/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar";
import Home from "./Home";
import Footer from "./Footer";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import Cart from "./Cart";
import NotFoundPage from "./NotFoundPage";
import Profile from "./Profile";
import Pizzas from "./Pizzas";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/RegisterSheet" element={<RegisterPage />} />{" "}
        <Route path="/LoginSheet" element={<LoginPage />} />{" "}
        <Route path="/CartSheet" element={<Cart />} />{" "}
        <Route path="/Profile" element={<Profile />} />{" "}
        <Route path="*" element={<NotFoundPage />} />{" "}
        <Route
          path="/logout"
          element={() => localStorage.removeItem("token")}
        />{" "}
        <Route path="/pizzas" element={<Pizzas />} />{" "}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
