import { jwtDecode } from "jwt-decode";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isTokenExpired } from "../../utils/auth";

export const AuthContext = createContext();

const AuthProvider = ({ childern }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  //   check user nya login gak
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token || isTokenExpired(token)) {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      navigate("/login");
    }
    setIsAuthenticated(!!token);
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
    setUser(jwtDecode);
    navigate("/");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
    navigate("/login");
  };

  return <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>{childern}</AuthContext.Provider>;
};

export default AuthProvider;
