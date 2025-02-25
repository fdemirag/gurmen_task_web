import { createRouter, createWebHistory } from "vue-router";
import ProductList from "@/components/product/ProductList.vue";
import CustomerList from "@/components/customer/CustomerList.vue"; 

const routes = [
  { path: "/products", component: ProductList },
  { path: "/customers", component: CustomerList },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
