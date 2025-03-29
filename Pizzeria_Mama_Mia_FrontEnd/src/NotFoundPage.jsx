import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="container text-center mt-5">
      <h1 className="display-4">404 - Página no encontrada</h1>
      <p className="lead">Lo sentimos, la página que buscas no existe.</p>
      <Link to="/" as={Link} className="btn btn-primary">
        Home
      </Link>
    </div>
  );
}

export default NotFound;
