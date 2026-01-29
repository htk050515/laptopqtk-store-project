import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

export const getProductDetail = (slug: string) => {
  return api.get(`/products/${slug}/`);
};

export const getProducts = (params?: any) => {
  return api.get("/products/", { params });
};

export const getRelatedProducts = (slug: string) => {
  return api.get(`/products/${slug}/related/`);
};
