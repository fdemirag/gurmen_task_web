<template>
    <div>
      <h1>Ürün Yönetimi</h1>
      <button @click="toggleForm">+ Yeni Ürün Ekle</button>
  
      <div v-if="isFormOpen">
        <h2>Yeni Ürün Ekle</h2>
        <form @submit.prevent="addNewProduct">
          <input v-model="newProduct.name" placeholder="Ürün Adı" required />
          <input v-model.number="newProduct.price" placeholder="Fiyat" required type="number" />
          <input v-model.number="newProduct.stock" placeholder="Stok" required type="number" />
          <input v-model="newProduct.category" placeholder="Kategori" required />
          <button type="submit">Ekle</button>
          <button type="button" @click="toggleForm">İptal</button>
        </form>
      </div>
  
      <table>
        <thead>
          <tr>
            <th>Ürün Adı</th>
            <th>Fiyat</th>
            <th>Stok</th>
            <th>Kategori</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.name }}</td>
            <td>{{ product.price }}</td>
            <td>{{ product.stock }}</td>
            <td>{{ product.category }}</td>
            <td>
              <button @click="removeProduct(product.id)">Sil</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from "vue";
  import { getAllProducts, deleteProduct, addProduct } from "@/services/productService";
  
  export default {
    setup() {
      const products = ref([]);
      const isFormOpen = ref(false);
      const newProduct = ref({
        name: "",
        price: 0,
        stock: 0,
        category: ""
      });
  
      const fetchProducts = async () => {
        products.value = await getAllProducts();
      };
  
      const toggleForm = () => {
        isFormOpen.value = !isFormOpen.value;
        newProduct.value = { name: "", price: "", stock: "", category: "" };
      };
  
      const addNewProduct = async () => {
        await addProduct(newProduct.value); // ✅ addNewProduct yerine addProduct kullanıldı
        fetchProducts();
        toggleForm();
      };
  
      const removeProduct = async (id) => {
        await deleteProduct(id);
        fetchProducts();
      };
  
      onMounted(fetchProducts);
  
      return { products, isFormOpen, newProduct, fetchProducts, toggleForm, addNewProduct, removeProduct };
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
  