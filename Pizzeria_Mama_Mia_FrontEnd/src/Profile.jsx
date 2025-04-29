import { Profiler, useEffect, useState } from "react";
import { useUser } from "./context/UserContext";

const Profile = () => {
  const { getProfile, logout } = useUser();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (err) {
        setError(err.message || "Error al cargar perfil");
      }
    };
    loadProfile();
  }, [getProfile]);

  if (error) {
    return (
      <div className="profile border border-3 border-danger p-4">
        <p className="text-danger">{error}</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="profile border border-3 border-dark p-4">
        <p>Cargando perfil...</p>
      </div>
    );
  }

  return (
    <div className="profile border border-3 border-dark p-4">
      <h1 className="mb-4">Bienvenido, {profile.email}</h1>

      <div className="row mb-3">
        <div className="col">
          <strong>ID:</strong> {profile.id}
        </div>
      </div>

      <button onClick={logout} className="btn btn-danger mt-3">
        Cerrar sesión
      </button>
    </div>
  );
};

export default Profile;
