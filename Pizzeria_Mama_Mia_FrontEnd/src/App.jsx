import React from "react";
import "./components/css/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar";
import Home from "./Home";
import Footer from "./Footer";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import Cart from "./Cart";
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
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
