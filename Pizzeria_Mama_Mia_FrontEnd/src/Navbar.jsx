import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const token = false;

  const formatTotal = (amount) => {
    return amount.toLocaleString();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand btn btn-outline-secondary me-2">
          🍕 Home
        </Link>

        <div className="d-flex">
          <>
            <Link to="/Profile" as={Link} className="btn btn-outline-success me-2">🔓 Profile</Link>
            <button className="btn btn-outline-danger me-2">🔒 Logout</button>
          </>

          <>
            <Link to="/LoginSheet" as={Link} className="btn btn-outline-primary me-2">
              🔐 Login
            </Link>

            <Link
              to="/RegisterSheet"
              as={Link}
              className="btn btn-outline-secondary me-2"
            >
              🔐 Register
            </Link>
          </>

          <Link to="/CartSheet" as={Link} className="btn btn-outline-warning">
            🛒 Carrito
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
