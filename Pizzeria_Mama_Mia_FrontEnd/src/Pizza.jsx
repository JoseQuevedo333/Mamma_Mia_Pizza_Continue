import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./components/css/App.css";

const Pizza = () => {
  const [pizza, setPizza] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const getData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/pizzas/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch pizza`);
      }
      const data = await response.json();
      setPizza(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

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
        Error loading pizza: {error}
      </div>
    );
  }

  if (!pizza) {
    return (
      <div className="container alert alert-warning my-5">Pizza not found</div>
    );
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow-lg border-dark">
            <div className="row g-0">
              <div className="col-md-5">
                <img
                  src={pizza.img}
                  alt={pizza.name}
                  className="img-fluid rounded-start h-100 object-fit-cover"
                  style={{ minHeight: "300px" }}
                />
              </div>

              <div className="col-md-7">
                <div className="card-body p-4">
                  <h2 className="card-title text-uppercase fw-bold mb-3">
                    {pizza.name}
                  </h2>

                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="badge bg-danger fs-5">${pizza.price}</h4>
                    <Link
                      to="/CartSheet"
                      as={Link}
                      className="btn btn-success btn-lg"
                    >
                      Order Now
                    </Link>
                  </div>

                  <h5 className="fw-bold mt-4">Ingredients:</h5>
                  <p className="card-text">
                    {Array.isArray(pizza.ingredients)
                      ? pizza.ingredients.join(", ")
                      : pizza.ingredients}
                  </p>

                  <h5 className="fw-bold mt-4">Description:</h5>
                  <p className="card-text">{pizza.desc}</p>

                  <div className="d-grid mt-4">
                    <Link
                      to="/Pizzas"
                      as={Link}
                      className="btn btn-outline-primary"
                    >
                      Ver todas las Pizzas
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pizza;
