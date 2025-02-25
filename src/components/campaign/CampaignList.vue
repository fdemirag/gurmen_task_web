<template>
    <div class="flex gap-6">
      <!-- Kampanya Listesi -->
      <div class="campaign-list w-2/3">
        <h2 class="text-xl font-bold mb-4">Kampanyalar</h2>
        <ul v-if="campaigns.length > 0">
          <li v-for="campaign in campaigns" :key="campaign.code" class="p-4 border rounded-lg shadow mb-2">
            <strong class="text-lg">{{ campaign.code }}</strong>  
            <p>İndirim Oranı: <span class="text-green-600 font-semibold">{{ campaign.discountRate * 100 }}%</span></p>
            <p>Minimum Tutar: <span class="font-semibold">{{ campaign.minimumAmount }} TL</span></p>
            <p>Son Kullanma Tarihi: <span class="text-red-500">{{ formatDate(campaign.expirationDate) }}</span></p>
          </li>
        </ul>
        <p v-else class="text-gray-500">Henüz kampanya bulunmamaktadır.</p>
      </div>
  
      <!-- Kampanya Ekleme Bölümü -->
      <div class="w-1/3 flex flex-col items-center">
        <button @click="showForm = true" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Kampanya Ekle
        </button>
  
        <!-- Kampanya Formu (Modal) -->
        <CampaignForm v-if="showForm" @close="showForm = false" @campaignAdded="refreshCampaigns" />
      </div>
    </div>
  </template>
  
  <script>
  import { getAllCampaigns } from "@/services/campaignService";
  import CampaignForm from "./CampaignForm.vue";
  
  export default {
    components: { CampaignForm },
    data() {
      return {
        campaigns: [],
        showForm: false
      };
    },
    async created() {
      this.refreshCampaigns();
    },
    methods: {
      async refreshCampaigns() {
        this.campaigns = await getAllCampaigns();
      },
      formatDate(dateString) {
        return new Date(dateString).toLocaleDateString("tr-TR", {
          year: "numeric",
          month: "long",
          day: "numeric"
        });
      }
    }
  };
  </script>
  
  <style scoped>
  .campaign-list {
    max-width: 600px;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    background: #f9f9f9;
    padding: 15px;
    border-radius: 8px;
    transition: 0.3s ease-in-out;
  }
  li:hover {
    background: #eef2ff;
  }
  </style>
  