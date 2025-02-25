<template>
    <div>
      <h2>Son Bir Haftada En Çok Sipariş Veren 5 Müşteri</h2>
      <table>
        <thead>
          <tr>
            <th>Müşteri ID</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="customer in topCustomers" :key="customer.customerId">
            <td>{{ customer.customerId }}</td> <!-- Sadece customerId gösteriyoruz -->
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import OrderService from "@/services/orderService.js";
  
  export default {
    data() {
      return {
        topCustomers: [],
      };
    },
    async created() {
      try {
        const response = await OrderService.getTopCustomersLastWeek();
        this.topCustomers = response;
      } catch (error) {
        console.error("Error fetching top customers:", error);
      }
    },
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
  </style>
  