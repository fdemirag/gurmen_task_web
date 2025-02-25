<template>
  <div id="app">
    <nav>
      <router-link to="/customers" active-class="active-link">Müşteriler</router-link>
      <router-link to="/products" active-class="active-link">Ürünler</router-link>
      <router-link to="/orders" active-class="active-link">Siparişler</router-link>
      <router-link to="/giveanorder" active-class="active-link">Sipariş Ver</router-link>
      <router-link to="/campaigns" active-class="active-link">Kampanyalar</router-link>
      <router-link to="/leaderboard" active-class="active-link">En Fazla Sipariş Verenler</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  text-align: center;
}

nav {
  background-color: #007bff;
  padding: 10px;
  display: flex;
  justify-content: center;
  gap: 20px;
}

nav a {
  color: white;
  text-decoration: none;
  font-size: 18px;
  padding: 10px;
  border-radius: 5px;
  transition: background 0.3s;
}

nav a:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.active-link {
  font-weight: bold;
  text-decoration: underline;
}
</style>
