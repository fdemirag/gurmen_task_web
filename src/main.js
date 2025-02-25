import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // Router içe aktarılıyor

const app = createApp(App);
app.use(router);  // Router kullanıma alınıyor
app.mount("#app");
