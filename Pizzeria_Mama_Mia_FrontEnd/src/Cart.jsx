import React, { useState } from "react";
import { pizzaCart } from "./components/js/pizzas.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./components/css/App.css";

function Cart() {
  const [cart, setCart] = useState([]);

  const handleAddPizza = (id) => {
    const pizzaToAdd = pizzaCart.find((pizza) => pizza.id === id);
    if (pizzaToAdd) {
      setCart((prevCart) => {
        const existingItem = prevCart.find((item) => item.id === id);
        if (existingItem) {
          return prevCart.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
          return [...prevCart, { ...pizzaToAdd, quantity: 1 }];
        }
      });
    }
  };

  const handleIncrease = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemove = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const total = cart.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    const quantity = Number(item.quantity) || 0;
    return sum + price * quantity;
  }, 0);

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow-lg border border-3 border-dark mb-5">
            <div className="card-header bg-dark text-white">
              <h2 className="mb-0">Carrito de Compras</h2>
            </div>

            <div className="card-body p-0">
              {cart.length === 0 ? (
                <div className="text-center p-5">
                  <h4>Tu carrito está vacío</h4>
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
                          />
                        </div>
                        <div className="col-md-3">
                          <h5 className="text-uppercase fw-bold mb-1">
                            {item.name}
                          </h5>
                          <small className="text-muted">
                            ${item.price.toFixed(2)}
                          </small>
                        </div>
                        <div className="col-md-3">
                          <div className="d-flex align-items-center">
                            <button
                              className="btn btn-outline-dark btn-sm"
                              onClick={() => handleDecrease(item.id)}
                            >
                              -
                            </button>
                            <span className="mx-3 fw-bold">
                              {item.quantity}
                            </span>
                            <button
                              className="btn btn-outline-dark btn-sm"
                              onClick={() => handleIncrease(item.id)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="col-md-2 text-center">
                          <span className="badge bg-danger fs-5">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                        <div className="col-md-2 text-end">
                          <button
                            onClick={() => handleRemove(item.id)}
                            className="btn btn-sm btn-danger"
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
              <div className="card-footer bg-light">
                <div className="d-flex justify-content-between align-items-center">
                  <h4 className="mb-0 fw-bold">Total: ${total.toFixed(2)}</h4>
                  <button className="btn btn-success btn-lg">Pagar</button>
                </div>
              </div>
            )}
          </div>

          <div className="card shadow-lg border border-3 border-dark">
            <div className="card-header bg-dark text-white">
              <h2 className="mb-0">Selecciona tus pizzas</h2>
            </div>

            <div className="card-body p-0">
              <div className="list-group list-group-flush">
                {pizzaCart.map((pizza) => (
                  <div key={pizza.id} className="list-group-item p-3">
                    <div className="row align-items-center">
                      <div className="col-md-2">
                        <img
                          src={pizza.img}
                          alt={pizza.name}
                          className="img-fluid rounded"
                          style={{ maxHeight: "80px" }}
                        />
                      </div>
                      <div className="col-md-5">
                        <h5 className="text-uppercase fw-bold mb-1">
                          {pizza.name}
                        </h5>
                        <small className="text-muted">
                          ${pizza.price.toFixed(2)}
                        </small>
                      </div>
                      <div className="col-md-3">
                        <p className="mb-0">{pizza.desc}</p>
                      </div>
                      <div className="col-md-2 text-end">
                        <button
                          className="btn btn-success"
                          onClick={() => handleAddPizza(pizza.id)}
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
