import { createContext, useState, useEffect } from "react";
import { API_URL } from "../config/index";
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  //Register user
  const register = async (user) => {
    console.log(user);
  };
  //login user
  const login = async ({ email: identifier, password }) => {
    console.log({ identifier, password });
  };
  //logout user
  const logout = () => {
    console.log("logout");
  };
  //check if user is logged in
  const checkuserlogin = async (user) => {
    console.log(user);
  };
  return (
    <AuthContext.Provider value={{ user, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
