import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = async (data: { email: string; password: string }) => {
  await api.post("/users/login", data);
};

export const register = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    await api.post("/users/register", data);
  } catch (error) {
    throw new Error(error);
  }
};
