import useUserStore from "@/store";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// interceptor to add authorization token
api.interceptors.request.use((config) => {
  const token = useUserStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
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
  const response = await api.post("/users/register", data);
  return response;
};

export const getBooks = async () => {
  try {
    const response = await api.get("/books");
    return response;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

export const createBook = async (data: FormData) =>
  api.post("/books", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
