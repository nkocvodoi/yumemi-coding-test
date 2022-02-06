import { createApp } from "vue";
import VueformMultiselect from "@vueform/multiselect";
import App from "./App.vue";

const app = createApp(App);

app.component("v-select", VueformMultiselect);

app.mount("#app");
