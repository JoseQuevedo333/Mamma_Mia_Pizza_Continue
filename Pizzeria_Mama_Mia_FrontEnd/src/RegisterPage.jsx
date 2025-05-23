import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./context/UserContext";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const { register } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setError("");

    try {
      await register(email, password);
      navigate("/profile");

      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err.message || "Error al registrar");
    }
  };

  return (
    <>
      <form
        className="register border border-3 border-dark"
        onSubmit={handleSubmit}
      >
        {error && <p className="text-danger">{error}</p>}
        <div className="register-form">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="register-control row align-items-center"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            
          />
        </div>
        <div className="register-form">
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            className="register-control row align-items-center"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="register-form">
          <label>Confirmar contraseña</label>
          <input
            type="password"
            name="confirmPassword"
            className="register-control row align-items-center"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="register-btn btn btn-success">
          Registrar
        </button>
      </form>
    </>
  );
};

export default RegisterPage;
