import React from "react";
import { useContext } from "react";
import { useUser } from "./context/UserContext";
import "./components/css/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navigate, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import Footer from "./Footer";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import Cart from "./Cart";
import NotFoundPage from "./NotFoundPage";
import Profile from "./Profile";
import Pizza from "./Pizza";
import Pizzas from "./Pizzas";
import ProtectedRoute from "./ProtectedRoute";
import Logout from "./Logout";

function App() {
  const { token } = useUser();

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pizza/:id" element={<Pizza />} />
        <Route
          path="/RegisterSheet"
          element={token ? <Navigate to="/" /> : <RegisterPage />}
        />{" "}
        <Route
          path="/LoginSheet"
          element={token ? <Navigate to="/" /> : <LoginPage />}
        />{" "}
        <Route path="/CartSheet" element={<Cart />} />{" "}
        <Route
          path="/Profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />{" "}
        <Route path="*" element={<NotFoundPage />} />{" "}
        <Route path="/logout" element={<Logout />} />
        <Route path="/pizzas" element={<Pizzas />} />{" "}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
