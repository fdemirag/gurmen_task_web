<template>
    <div>
      <h2 class="text-2xl font-bold mb-4">Yeni Sipariş Oluştur</h2>
      <form @submit.prevent="createOrder" class="space-y-4">
        <div>
          <label for="customer" class="block text-sm font-medium">Müşteri Seç</label>
          <select v-model="selectedCustomerId" id="customer" class="mt-1 block w-full border p-2 rounded">
            <option v-for="customer in customers" :key="customer.id" :value="customer.id">
              {{ customer.name }}
            </option>
          </select>
        </div>
  
        <div>
          <label for="product" class="block text-sm font-medium">Ürün Seç</label>
          <select v-model="selectedProductId" id="product" class="mt-1 block w-full border p-2 rounded">
            <option v-for="product in products" :key="product.id" :value="product.id">
              {{ product.name }} - {{ product.price }} TL
            </option>
          </select>
        </div>
  
        <div>
          <label for="quantity" class="block text-sm font-medium">Miktar</label>
          <input v-model.number="quantity" type="number" id="quantity" class="mt-1 block w-full border p-2 rounded" min="1" />
        </div>
  
        <button type="button" @click="addToCart" class="bg-green-500 text-white px-4 py-2 rounded">Sepete Ekle</button>
      </form>
  
      <div v-if="orderDetails.length" class="mt-4">
        <h3 class="text-lg font-bold">Sepet</h3>
        <ul class="border p-2 rounded">
          <li v-for="(item, index) in orderDetails" :key="index" class="flex justify-between border-b py-2">
            <span>{{ getProductName(item.productId) }} - {{ item.quantity }} adet</span>
            <span>{{ getProductPrice(item.productId, item.quantity) }} TL</span>
            <button @click="removeFromCart(index)" class="text-red-500">Sil</button>
          </li>
        </ul>
        <div class="mt-2 p-2 bg-gray-100 rounded">
          <p class="font-bold">Toplam Tutar: {{ totalAmount }} TL</p>
          <p v-if="appliedCampaign" class="text-green-500">
            Kampanya Uygulandı: {{ appliedCampaign.code }} - {{ appliedCampaign.discountRate * 100 }}% indirim
          </p>
          <p v-if="appliedCampaign" class="text-red-500 font-bold">
            İndirimli Tutar: {{ discountedTotal }} TL
          </p>
        </div>
      </div>
  
      <button v-if="orderDetails.length" @click="createOrder" class="bg-blue-500 text-white px-4 py-2 rounded mt-4">
        Siparişi Tamamla
      </button>
    </div>
  </template>
  
  <script>
  import { getAllCustomers } from '@/services/customerService';
  import { getAllProducts } from '@/services/productService';
  import { getAllCampaigns } from '@/services/campaignService';
  import orderService from '@/services/orderService';
  
  export default {
    data() {
      return {
        customers: [],
        products: [],
        campaigns: [],
        selectedCustomerId: null,
        selectedProductId: null,
        quantity: 1,
        orderDetails: [],
        appliedCampaign: null
      };
    },
    computed: {
      totalAmount() {
        return this.orderDetails.reduce((sum, item) => {
          const product = this.products.find(p => p.id === item.productId);
          return sum + (product ? product.price * item.quantity : 0);
        }, 0);
      },
      discountedTotal() {
        if (this.appliedCampaign) {
          return this.totalAmount * (1 - this.appliedCampaign.discountRate);
        }
        return this.totalAmount;
      }
    },
    async created() {
      try {
        this.customers = await getAllCustomers();
        this.products = await getAllProducts();
        this.campaigns = await getAllCampaigns();
      } catch (error) {
        console.error("Veri yüklenirken hata oluştu:", error);
      }
    },
    methods: {
      addToCart() {
        if (!this.selectedProductId || this.quantity < 1) {
          alert('Ürün seçmeli ve miktar 1 veya daha fazla olmalıdır.');
          return;
        }
  
        const existingProduct = this.orderDetails.find(item => item.productId === this.selectedProductId);
        if (existingProduct) {
          existingProduct.quantity += this.quantity;
        } else {
          this.orderDetails.push({
            productId: this.selectedProductId,
            quantity: this.quantity
          });
        }
  
        this.selectedProductId = null;
        this.quantity = 1;
  
        this.checkForCampaign();
      },
      removeFromCart(index) {
        this.orderDetails.splice(index, 1);
        this.checkForCampaign();
      },
      getProductName(productId) {
        const product = this.products.find(p => p.id === productId);
        return product ? product.name : "Bilinmeyen Ürün";
      },
      getProductPrice(productId, quantity) {
        const product = this.products.find(p => p.id === productId);
        return product ? product.price * quantity : 0;
      },
      checkForCampaign() {
        const validCampaign = this.campaigns
          .filter(campaign => campaign.minimumAmount <= this.totalAmount)
          .sort((a, b) => b.discountRate - a.discountRate)[0];
  
        this.appliedCampaign = validCampaign || null;
      },
      async createOrder() {
        if (!this.selectedCustomerId || this.orderDetails.length === 0) {
          alert('Lütfen müşteri seçin ve en az bir ürün ekleyin.');
          return;
        }
  
        const orderData = {
          customerId: this.selectedCustomerId,
          status: "Pending",
          orderDetails: this.orderDetails
        };
  
        try {
          const result = await orderService.createOrder(orderData);
          if (result) {
            alert('Sipariş başarıyla oluşturuldu!');
            this.selectedCustomerId = null;
            this.orderDetails = [];
            this.appliedCampaign = null;
          } else {
            alert('Sipariş oluşturulurken bir hata oluştu.');
          }
        } catch (error) {
          console.error("Sipariş oluşturulurken hata:", error);
          alert('Sipariş oluşturulurken bir hata oluştu.');
        }
      }
    }
  };
  </script>
  