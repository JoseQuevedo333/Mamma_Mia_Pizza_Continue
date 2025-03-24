import React, { useState } from "react";
import { pizzaCart } from "./components/js/pizzas.js";
import "./components/css/Cart.css";

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
    <div className="cart border border-5 border-dark">
      <h1>Carrito de Compras</h1>
      {cart.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.img} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h2>{item.name}</h2>
                <p>Precio: ${item.price.toFixed(2)}</p>
                <p>Cantidad: {item.quantity}</p>
                <div className="cart-item-buttons">
                  <button
                    className="btn btn-success"
                    onClick={() => handleIncrease(item.id)}
                  >
                    +
                  </button>
                  <button
                    className="btn btn-success"
                    onClick={() => handleDecrease(item.id)}
                  >
                    -
                  </button>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="remove-button"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
          <h2>Total: ${total.toFixed(2)}</h2>
          <button className="pay-button">Pagar</button>
        </>
      )}

      <div className="pizza-list border border-3 border-dark">
        <h2>Selecciona tus pizzas</h2>
        {pizzaCart.map((pizza) => (
          <div key={pizza.id} className="pizza-item">
            <img src={pizza.img} alt={pizza.name} className="pizza-image" />
            <div className="pizza-details">
              <h3>{pizza.name}</h3>
              <p>Precio: ${pizza.price.toFixed(2)}</p>
              <button
                className="btn btn-success"
                onClick={() => handleAddPizza(pizza.id)}
              >
                Añadir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cart;
