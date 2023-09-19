import { useState, useEffect } from "react";

// Define el tipo de usuario
import { IUser } from "../models/User";

// Define el tipo de estado de autenticación
interface AuthState {
  user: IUser | null;
  isAuthenticated: boolean;
}

// Inicializa el estado de autenticación
const initialAuthState: AuthState = {
  user: null,
  isAuthenticated: false,
};

// Define el hook personalizado
export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>(initialAuthState);

  // Función para iniciar sesión
  const login = (user: IUser) => {
    setAuthState({ user, isAuthenticated: true });
    // Almacena el usuario en localStorage
    localStorage.setItem("user", JSON.stringify(user));
  };

  // Función para cerrar sesión
  const logout = () => {
    setAuthState(initialAuthState);
    // Elimina el usuario de localStorage
    localStorage.removeItem("user");
  };

  // Efecto para comprobar la sesión almacenada en localStorage o sessionStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      login(parsedUser);
    }
  }, []);

  return {
    user: authState.user,
    isAuthenticated: authState.isAuthenticated,
    login,
    logout,
  };
};
