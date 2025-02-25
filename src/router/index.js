import { createRouter, createWebHistory } from "vue-router";
import ProductList from "@/components/product/ProductList.vue";
import CustomerList from "@/components/customer/CustomerList.vue"; 
import OrderForm from "@/components/order/OrderForm.vue";
import OrderList from "@/components/order/OrderList.vue";
import CampaignList from "@/components/campaign/CampaignList.vue";
import OrderLeaderboard from "@/components/order/OrderLeaderboard.vue";

const routes = [
  { path: "/products", component: ProductList },
  { path: "/customers", component: CustomerList },
  { path: "/orders", component: OrderList },
  { path: "/giveanorder", component: OrderForm },
  { path: "/campaigns", component: CampaignList },
  { path: "/leaderboard", component: OrderLeaderboard },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
