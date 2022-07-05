import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./styles/app.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import VueLazyLoad from "vue3-lazyload";

library.add(fab);
library.add(fas);
library.add(far);

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
const app = createApp(App);
app.use(router);
app.use(VueLazyLoad);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
