<template>
    <div>
      <h2 class="text-2xl font-bold mb-4">Sipariş Listesi</h2>
  
      <table class="w-full border-collapse border border-gray-300">
        <thead>
          <tr class="bg-gray-200">
            <th class="border p-2">Sipariş ID</th>
            <th class="border p-2">Müşteri</th>
            <th class="border p-2">Toplam Tutar</th>
            <th class="border p-2">Durum</th>
            <th class="border p-2">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id" class="border-b">
            <td class="border p-2">{{ order.id }}</td>
            <td class="border p-2">{{ getCustomerName(order.customerId) }}</td>
            <td class="border p-2">{{ order.totalAmount }} TL</td>
            <td class="border p-2">{{ order.status }}</td>
            <td class="border p-2">
              <button @click="deleteOrder(order.id)" class="bg-red-500 text-white px-2 py-1 rounded">
                Sil
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import orderService from "@/services/orderService";
  import { getAllCustomers } from "@/services/customerService";
  
  export default {
    data() {
      return {
        orders: [],
        customers: [],
      };
    },
    async created() {
      await this.fetchOrders();
      this.customers = await getAllCustomers();
    },
    methods: {
      async fetchOrders() {
        try {
          this.orders = await orderService.getOrders();
        } catch (error) {
          console.error("Siparişler yüklenirken hata oluştu:", error);
        }
      },
      async deleteOrder(orderId) {
        if (confirm("Bu siparişi silmek istediğinize emin misiniz?")) {
          try {
            await orderService.deleteOrder(orderId);
            this.orders = this.orders.filter(order => order.id !== orderId);
          } catch (error) {
            console.error("Sipariş silinirken hata oluştu:", error);
          }
        }
      },
      getCustomerName(customerId) {
        const customer = this.customers.find(c => c.id === customerId);
        return customer ? customer.name : "Bilinmeyen Müşteri";
      }
    }
  };
  </script>
  
  <style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    padding: 10px;
    text-align: left;
    border: 1px solid #ddd;
  }
  
  th {
    background-color: #f2f2f2;
  }
  
  button {
    cursor: pointer;
  }
  </style>
  