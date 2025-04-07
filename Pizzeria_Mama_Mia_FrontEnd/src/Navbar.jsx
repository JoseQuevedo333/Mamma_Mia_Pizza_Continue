import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./context/CartContext";

function Navbar() {
  const { total } = useContext(CartContext);

  const formatTotal = (amount) => {
    return amount.toLocaleString("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand btn btn-outline-secondary me-2">
          🍕 Home
        </Link>

        <div className="d-flex">
          <>
            <Link to="/Profile" className="btn btn-outline-success me-2">🔓 Profile</Link>
            <button className="btn btn-outline-danger me-2">🔒 Logout</button>
          </>

          <>
            <Link to="/LoginSheet" className="btn btn-outline-primary me-2">
              🔐 Login
            </Link>
            <Link to="/RegisterSheet" className="btn btn-outline-secondary me-2">
              🔐 Register
            </Link>
          </>

          <Link to="/CartSheet" className="btn btn-outline-warning">
            🛒 Carrito {total > 0 && <span className="ms-1">({formatTotal(total)})</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
