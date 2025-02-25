import axios from "axios";
import ENV from "@/config/environment";

const API_URL = `${ENV.API_BASE_URL}/products`;

export async function getAllProducts() {
  const response = await axios.get(API_URL);
  return response.data;
}

export async function getProductById(id) {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
}

export async function addProduct(product) {
  const response = await axios.post(API_URL, product);
  return response.data;
}

export async function updateProduct(id, product) {
  await axios.put(`${API_URL}/${id}`, product);
}

export async function deleteProduct(id) {
  await axios.delete(`${API_URL}/${id}`);
}
