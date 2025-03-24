import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Pizza = () => {
  const [pizzas, setPizzas] = useState([]);
  const [search, setSearch] = useState("");

  const url = "http://localhost:5000/api/pizzas";

  const getData = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setPizzas(data);
    } catch (error) {
      console.error("Error fetching pizzas:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const results = search
    ? pizzas.filter((pizza) =>
        pizza.name.toLowerCase().includes(search.toLowerCase())
      )
    : pizzas;

  return (
    <div>
      <input
        type="text"
        placeholder="Search pizzas..."
        className="form-control"
        value={search}
        onChange={handleSearch}
      />

      <table className="table table-striped table-hover my-4 shadow-lg border border-3 border-dark">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Ingredients</th>
            <th>Image</th>
            <th>Description</th>
            <th>Order</th>
          </tr>
        </thead>

        <tbody>
          {results.length > 0 ? (
            results.map((pizza) => (
              <tr key={pizza.id}>
                <td>{pizza.name}</td>
                <td>${pizza.price}</td>
                <td>
                  {Array.isArray(pizza.ingredients)
                    ? pizza.ingredients.join(", ")
                    : pizza.ingredients}
                </td>
                <td>
                  <img
                    src={pizza.img}
                    alt={pizza.name}
                    width="200"
                    height="200"
                  />
                </td>
                <td>{pizza.desc}</td>
                <td>
                  <Link to="/CartSheet" className="btn btn-primary">
                    Order
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No pizzas found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Pizza;
