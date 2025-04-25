import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : { token: null, email: null };
    } catch (err) {
      console.error("Error reading user from localStorage", err);
      return { token: null, email: null };
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("user", JSON.stringify(user));
    } catch (err) {
      console.error("Error writing user to localStorage", err);
    }
  }, [user]);

  const login = async (email, password) => {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok)
      throw new Error(data.message || "Error al iniciar sesión");
    setUser({ token: data.token, email: data.email });
  };

  const register = async (email, password) => {
    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Error al registrarse");
    setUser({ token: data.token, email: data.email });
  };

  const logout = () => {
    setUser({ token: null, email: null });
  };

  const getProfile = async () => {
    if (!user.token) {
      throw new Error("No token found, please login");
    }
    const response = await fetch("http://localhost:5000/api/auth/me", {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    const data = await response.json();
    if (!response.ok) throw new Error("Error al obtener perfil");
    return data;
  };

  return (
    <UserContext.Provider value={{ user, login, register, logout, getProfile }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
