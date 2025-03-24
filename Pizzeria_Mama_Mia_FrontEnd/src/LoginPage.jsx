import { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validarDatos = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    setError("");
    setEmail("");
    setPassword("");
  };
  return (
    <>
      <form className="login border border-3 border-dark" onSubmit={validarDatos}>
        {error && <p>{error}</p>}
        <div className="login-form">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="login-control row align-items-center"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="login-form">
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            className="login-control row align-items-center"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="login-btn btn btn-success">
          Ingresar
        </button>
      </form>
    </>
  );
};

export default LoginPage;
