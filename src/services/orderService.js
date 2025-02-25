import axios from "axios";
import ENV from "@/config/environment";

const API_URL = `${ENV.API_BASE_URL}/orders`;

export default {
  // Tüm siparişleri al
  async getOrders() {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  },

  // Belirli bir siparişi ID ile al
  async getOrderById(orderId) {
    try {
      const response = await axios.get(`${API_URL}/${orderId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching order:", error);
      throw error;
    }
  },

  // Yeni sipariş oluştur
  async createOrder(orderData) {
    try {
      const response = await axios.post(API_URL, orderData);
      return response.data;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  },

  // Siparişi güncelle
  async updateOrder(orderId, orderData) {
    try {
      const response = await axios.put(`${API_URL}/${orderId}`, orderData);
      return response.data;
    } catch (error) {
      console.error("Error updating order:", error);
      throw error;
    }
  },

  // Siparişi sil
  async deleteOrder(orderId) {
    try {
      await axios.delete(`${API_URL}/${orderId}`);
    } catch (error) {
      console.error("Error deleting order:", error);
      throw error;
    }
  },

  // Son bir hafta içinde en çok sipariş veren 5 müşteriyi al
  async getTopCustomersLastWeek() {
    try {
      const response = await axios.get(`${API_URL}/top-customers-last-week`);
      return response.data;
    } catch (error) {
      console.error("Error fetching top customers:", error);
      throw error;
    }
  }
};
