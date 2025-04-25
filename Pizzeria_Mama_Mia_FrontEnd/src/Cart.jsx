import React, { useEffect, useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./components/css/App.css";
import { CartContext } from "./context/CartContext";
import { useUser } from "./context/UserContext";

function Cart() {
  const { token } = useUser();
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const { cart, addToCart, increase, decrease, remove, total } =
    useContext(CartContext);

 
  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/pizzas");
        const data = await response.json();
        setPizzas(data);
      } catch (error) {
        console.error("Error fetching pizzas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPizzas();
  }, []);

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      
      <div className="row mb-5">
        <div className="col-lg-10 mx-auto">
          <div className="card shadow border border-3 border-dark">
            <div className="card-header bg-dark text-white">
              <h2 className="mb-0">Carrito de Compras</h2>
            </div>
            <div className="card-body p-0">
              {cart.length === 0 ? (
                <div className="text-center p-4">
                  <h5>Tu carrito está vacío</h5>
                </div>
              ) : (
                <div className="list-group list-group-flush">
                  {cart.map((item) => (
                    <div key={item.id} className="list-group-item p-3">
                      <div className="row align-items-center">
                        <div className="col-md-2">
                          <img
                            src={item.img}
                            alt={item.name}
                            className="img-fluid rounded"
                            style={{ maxHeight: "80px" }}
                            onError={(e) => {
                              e.target.src = "https://via.placeholder.com/80";
                            }}
                          />
                        </div>
                        <div className="col-md-3">
                          <h5 className="text-uppercase fw-bold mb-1">
                            {item.name}
                          </h5>
                          <small className="text-muted">
                            ${parseFloat(item.price).toFixed(2)}
                          </small>
                        </div>
                        <div className="col-md-3 d-flex align-items-center">
                          <button
                            className="btn btn-sm btn-outline-dark"
                            onClick={() => decrease(item.id)}
                          >
                            -
                          </button>
                          <span className="mx-3">{item.quantity}</span>
                          <button
                            className="btn btn-sm btn-outline-dark"
                            onClick={() => increase(item.id)}
                          >
                            +
                          </button>
                        </div>
                        <div className="col-md-2 text-center">
                          <strong>
                            ${(item.price * item.quantity).toFixed(2)}
                          </strong>
                        </div>
                        <div className="col-md-2 text-end">
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => remove(item.id)}
                          >
                            X
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {cart.length > 0 && (
              <div className="card-footer d-flex justify-content-between">
                <h4>Total: ${total.toFixed(2)}</h4>
                <button disabled={!token} className="btn btn-success">
                  Pagar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-10 mx-auto">
          <div className="card shadow-lg border border-3 border-dark">
            <div className="card-header bg-dark text-white">
              <h2 className="mb-0">Selecciona tus pizzas</h2>
            </div>
            <div className="card-body p-0">
              <div className="list-group list-group-flush">
                {pizzas.map((pizza) => (
                  <div key={pizza.id} className="list-group-item p-3">
                    <div className="row align-items-center">
                      <div className="col-md-2">
                        <img
                          src={pizza.img}
                          alt={pizza.name}
                          className="img-fluid rounded"
                          style={{ maxHeight: "80px" }}
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/80";
                          }}
                        />
                      </div>
                      <div className="col-md-4">
                        <h5 className="text-uppercase fw-bold mb-1">
                          {pizza.name}
                        </h5>
                        <small className="text-muted">
                          {Array.isArray(pizza.ingredients)
                            ? pizza.ingredients.join(", ")
                            : pizza.ingredients}
                        </small>
                      </div>
                      <div className="col-md-4">
                        <p className="mb-0">{pizza.desc}</p>
                      </div>
                      <div className="col-md-2 text-center">
                        <span className="badge bg-danger fs-5">
                          ${pizza.price.toFixed(2)}
                        </span>
                      </div>
                      <div className="col-md-2 text-end">
                        <button
                          className="btn btn-sm btn-success"
                          onClick={() => addToCart(pizza)}
                        >
                          Añadir
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
