<template>
  <div v-if="isOpen" class="modal">
    <div class="modal-content">
      <h2>{{ currentProduct ? 'Edit Product' : 'Add New Product' }}</h2>
      <form @submit.prevent="submitForm">
        <label>Product Name</label>
        <input type="text" v-model="product.name" required />

        <label>Price</label>
        <input type="number" v-model="product.price" required />

        <label>Stock</label>
        <input type="number" v-model="product.stock" required />

        <label>Category</label>
        <input type="text" v-model="product.category" required />

        <button type="submit">{{ currentProduct ? 'Update' : 'Add' }}</button>
        <button type="button" @click="closeModal">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script>
import { addProduct, updateProduct } from "@/services/productService";

export default {
  props: ["isOpen", "currentProduct"],
  emits: ["close", "refresh"],
  data() {
    return {
      product: this.currentProduct ? { ...this.currentProduct } : { name: "", price: "", stock: "", category: "" }
    };
  },
  methods: {
    async submitForm() {
      if (this.currentProduct) {
        await updateProduct(this.product.id, this.product);
      } else {
        await addProduct(this.product);
      }
      this.$emit("refresh");
      this.closeModal();
    },
    closeModal() {
      this.$emit("close");
    }
  },
  watch: {
    currentProduct(newProduct) {
      this.product = newProduct ? { ...newProduct } : { name: "", price: "", stock: "", category: "" };
    }
  }
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 300px;
}
</style>
