<template>
    <div>
      <h2>Yeni Müşteri Ekle</h2>
      <form @submit.prevent="addCustomer">
        <input v-model="newCustomer.name" placeholder="Müşteri Adı" required />
        <input v-model="newCustomer.email" placeholder="Email" required type="email" />
        <input v-model="newCustomer.phone" placeholder="Telefon" required />
        <input v-model="newCustomer.address" placeholder="Adres" required />
        <button type="submit">Ekle</button>
        <button type="button" @click="$emit('cancel')">İptal</button>
      </form>
    </div>
  </template>
  
  <script>
  import { ref } from "vue";
  import { addCustomer } from "@/services/customerService";
  
  export default {
    emits: ["customer-added", "cancel"],
    setup(_, { emit }) {
      const newCustomer = ref({
        name: "",
        email: "",
        phone: "",
        address: ""
      });
  
      const addCustomerHandler = async () => {
        await addCustomer(newCustomer.value);
        emit("customer-added");
        emit("cancel");
        newCustomer.value = { name: "", email: "", phone: "", address: "" };
      };
  
      return { newCustomer, addCustomer: addCustomerHandler };
    }
  };
  </script>
  
  <style scoped>
  form {
    margin: 20px;
  }
  input {
    display: block;
    margin-bottom: 10px;
    padding: 5px;
    width: 100%;
  }
  </style>
  