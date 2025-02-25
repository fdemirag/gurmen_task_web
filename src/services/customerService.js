import axios from "axios";
import ENV from "@/config/environment";

const API_URL = `${ENV.API_BASE_URL}/customers`;

export async function getAllCustomers() {
  const response = await axios.get(API_URL);
  return response.data;
}

export async function getCustomerById(id) {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
}

export async function addCustomer(customer) {
  const response = await axios.post(API_URL, customer);
  return response.data;
}

export async function updateCustomer(id, customer) {
  await axios.put(`${API_URL}/${id}`, customer);
}

export async function deleteCustomer(id) {
  await axios.delete(`${API_URL}/${id}`);
}
