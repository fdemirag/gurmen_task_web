<template>
    <div class="modal-overlay">
      <div class="modal-content">
        <h2 class="text-xl font-bold mb-4">Yeni Kampanya Ekle</h2>
        
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label>Kampanya Kodu:</label>
            <input v-model="campaign.code" type="text" required />
          </div>
  
          <div class="form-group">
            <label>İndirim Oranı (%):</label>
            <input v-model.number="campaign.discountRate" type="number" min="1" max="100" required />
          </div>
  
          <div class="form-group">
            <label>Minimum Tutar (TL):</label>
            <input v-model.number="campaign.minimumAmount" type="number" min="1" required />
          </div>
  
          <div class="form-group">
            <label>Son Kullanma Tarihi:</label>
            <input v-model="campaign.expirationDate" type="date" required />
          </div>
  
          <div class="buttons">
            <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">Ekle</button>
            <button type="button" @click="$emit('close')" class="bg-gray-400 text-white px-4 py-2 rounded-lg ml-2 hover:bg-gray-500">İptal</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { addCampaign } from "@/services/campaignService";
  
  export default {
    data() {
      return {
        campaign: {
          code: "",
          discountRate: 0,
          minimumAmount: 0,
          expirationDate: ""
        }
      };
    },
    methods: {
      async submitForm() {
        // Kampanyadaki indirim oranını %100 yerine %1 olarak göndermek için dönüştürme işlemi
        if (this.campaign.discountRate) {
          this.campaign.discountRate = this.campaign.discountRate / 100; // Veritabanına %1 olarak gönder
        }
  
        await addCampaign(this.campaign);
        this.$emit("campaignAdded"); // Listeyi güncellemek için event yay
        this.$emit("close"); // Formu kapat
      }
    }
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 350px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  .form-group {
    margin-bottom: 12px;
  }
  
  label {
    display: block;
    font-weight: bold;
    margin-bottom: 4px;
  }
  
  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .buttons {
    display: flex;
    justify-content: space-between;
  }
  </style>
  