<template>
    <div>
      <h1>Müşteri Yönetimi</h1>
      <button @click="toggleForm">+ Yeni Müşteri Ekle</button>
  
      <CustomerForm v-if="isFormOpen" @customer-added="fetchCustomers" @cancel="toggleForm" />
  
      <table>
        <thead>
          <tr>
            <th>Müşteri adı</th>
            <th>Email</th>
            <th>Telefon</th>
            <th>Adres</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="customer in customers" :key="customer.id">
            <td>{{ customer.name }}</td>
            <td>{{ customer.email }}</td>
            <td>{{ customer.phone }}</td>
            <td>{{ customer.address }}</td>
            <td>
              <button @click="removeCustomer(customer.id)">Sil</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from "vue";
  import { getAllCustomers, deleteCustomer } from "@/services/customerService";
  import CustomerForm from "./CustomerForm.vue";
  
  export default {
    components: { CustomerForm },
    setup() {
      const customers = ref([]);
      const isFormOpen = ref(false);
  
      const fetchCustomers = async () => {
        customers.value = await getAllCustomers();
      };
  
      const toggleForm = () => {
        isFormOpen.value = !isFormOpen.value;
      };
  
      const removeCustomer = async (id) => {
        await deleteCustomer(id);
        fetchCustomers();
      };
  
      onMounted(fetchCustomers);
  
      return { customers, isFormOpen, fetchCustomers, toggleForm, removeCustomer };
    }
  };
  </script>
  
  <style scoped>
  table {
    width: 80%;
    margin: 20px auto;
    border-collapse: collapse;
  }
  th, td {
    padding: 10px;
    border: 1px solid #ddd;
  }
  button {
    padding: 5px 10px;
    margin: 5px;
    cursor: pointer;
  }
  button:hover {
    background-color: #f0f0f0;
  }
  </style>
  