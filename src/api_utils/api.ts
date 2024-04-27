import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = async (userData: { email: string; password: string }) => {
  const response = await api.post("/users/login", userData);
  return response;
};

export const register = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await api.post("/users/register", data);
    return response;
  } catch (error) {
    return error;
  }
};
