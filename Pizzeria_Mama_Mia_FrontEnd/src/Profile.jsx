import React from "react";
import { Link } from "react-router-dom";

function Profile() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-lg border border-3 border-dark mb-5">
            <div className="card-header bg-dark text-white">
              <h2 className="mb-0">Tu Perfil</h2>
            </div>

            <div className="card-body p-4 text-center">
              <div className="mb-4">
                <i className="fas fa-user-circle fa-5x text-secondary mb-3"></i>
                <h1 className="display-4 fw-bold mb-2">José Antonio Quevedo</h1>
                <a
                  href="mailto:joseaquevedo@mimail.com"
                  className="d-inline-flex align-items-center text-decoration-none fs-3"
                  style={{ color: "#0d6efd" }}
                >
                  <i className="fas fa-envelope me-2"></i>
                  joseaquevedo@mimail.com
                </a>
              </div>

              <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mt-4">
                <Link to="/" className="btn btn-danger px-4 py-2">
                  <i className="fas fa-sign-out-alt me-2"></i>
                  Cerrar Sesión
                </Link>
              </div>
            </div>
          </div>

          <div className="card shadow-lg border border-3 border-dark">
            <div className="card-header bg-dark text-white">
              <h2 className="mb-0">Tus Pedidos Recientes</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
