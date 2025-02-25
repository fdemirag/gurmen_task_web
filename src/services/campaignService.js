import axios from "axios";
import ENV from "@/config/environment";

const API_URL = `${ENV.API_BASE_URL}/campaigns`;

export const getAllCampaigns = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Kampanyalar alınırken hata oluştu:", error);
    return [];
  }
};

export const applyDiscountToOrder = async (orderId, totalAmount) => {
  try {
    const response = await axios.post(`${API_URL}/apply/${orderId}`, null, {
      params: { totalAmount }
    });
    return response.data;
  } catch (error) {
    console.error("İndirim uygulanırken hata oluştu:", error);
    return null;
  }
};

export default {
  getAllCampaigns,
  applyDiscountToOrder
};
