import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import Barchart from "./components/BarChart";
import ResetButton from "./components/ResetButton";
import SwitchButton from "./components/SwitchButton";

// createApp(App).use(store).use(router).mount('#app')

const app = createApp(App);

app.use(store).use(router);

app.component("Barchart", Barchart); // global registration - can be used anywhere
app.component("ResetButton", ResetButton);
app.component("SwitchButton", SwitchButton);

app.mount("#app");




