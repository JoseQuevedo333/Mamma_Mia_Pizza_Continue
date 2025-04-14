import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { CartContext } from "./context/CartContext";
import { UserContext } from "./context/UserContext";

function Navbar() {
  const { total } = useContext(CartContext);
  const { token, logout } = useContext(UserContext);

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
        <NavLink to="/" className="navbar-brand btn btn-outline-secondary me-2">
          🍕 Home
        </NavLink>

        <div className="d-flex">
          {token ? (
            <>
              <NavLink to="/Profile" className="btn btn-outline-success me-2">
                🔓 Profile
              </NavLink>

              <button onClick={logout} className="btn btn-outline-danger me-2">
                🔒 Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/LoginSheet"
                className="btn btn-outline-primary me-2"
              >
                🔐 Login
              </NavLink>
              <NavLink
                to="/RegisterSheet"
                className="btn btn-outline-secondary me-2"
              >
                🔐 Register
              </NavLink>
            </>
          )}

          <NavLink to="/CartSheet" className="btn btn-outline-warning">
            🛒 Carrito{" "}
            {total > 0 && <span className="ms-1">({formatTotal(total)})</span>}
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
