import { createRouter, createWebHistory } from "vue-router";
import ProductList from "@/components/product/ProductList.vue";
import CustomerList from "@/components/customer/CustomerList.vue"; 
import OrderForm from "@/components/order/OrderForm.vue";

const routes = [
  { path: "/products", component: ProductList },
  { path: "/customers", component: CustomerList },
  { path: "/orders", component: OrderForm },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
