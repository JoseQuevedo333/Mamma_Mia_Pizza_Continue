import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./context/CartContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./components/css/App.css";
import Pizza from "./Pizza";

const Pizzas = () => {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const { cart, addToCart, remove, increase, decrease } =
    useContext(CartContext);

  const url = "http://localhost:5000/api/pizzas";

  const getData = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      setPizzas(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const isInCart = (id) => cart.some((item) => item.id === id);

  const results = search
    ? pizzas.filter((pizza) =>
        pizza.name.toLowerCase().includes(search.toLowerCase())
      )
    : pizzas;

  const getPizzaQuantity = (id) => {
    const pizza = cart.find((item) => item.id === id);
    return pizza ? pizza.quantity : 0;
  };

  if (loading) {
    return (
      <div className="container text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container alert alert-danger my-5">
        Error loading pizzas: {error}
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="text-center mb-5">
        <p className="lead text-muted fs-1 text">
          Descubre nuestra deliciosa selección de pizzas artesanales
        </p>
      </div>
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow-lg border border-3 border-dark">
            <div className="card-header bg-dark text-white">
              <div className="d-flex justify-content-between align-items-center">
                <h2 className="mb-0">Nuestras Pizzas</h2>
                <input
                  type="text"
                  placeholder="Search pizzas..."
                  className="form-control w-auto"
                  value={search}
                  onChange={handleSearch}
                />
              </div>
            </div>

            <div className="card-body p-0">
              {results.length > 0 ? (
                <div className="list-group list-group-flush">
                  {results.map((pizza) => (
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
                        <div className="col-md-3">
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
                            ${pizza.price}
                          </span>
                          <Link
                            to={`/pizza/${pizza.id}`}
                            className="btn btn-sm btn-primary"
                          >
                            Ver más
                          </Link>
                        </div>
                        <div className="col-md-1 text-end">
                          <div className="d-flex flex-wrap justify-content-around">
                            <button
                              className="btn btn-sm btn-success"
                              onClick={() => addToCart(pizza)}
                            >
                              Añadir
                            </button>

                            {getPizzaQuantity(pizza.id) > 0 && (
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => remove(pizza.id)}
                              >
                                Quitar
                              </button>
                            )}
                            <div className="d-flex justify-content-around">
                              {getPizzaQuantity(pizza.id) > 0 && (
                                <button
                                  className="btn btn-sm btn-outline-warning"
                                  onClick={() => increase(pizza.id)}
                                >
                                  +
                                </button>
                              )}

                              {getPizzaQuantity(pizza.id) > 1 && (
                                <button
                                  className="btn btn-sm btn-outline-secondary"
                                  onClick={() => decrease(pizza.id)}
                                >
                                  -
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-5">
                  <h4>No pizzas found</h4>
                  <Link to="/" className="btn btn-outline-dark mt-3">
                    Home
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pizzas;
