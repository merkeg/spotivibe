import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./styles/app.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

library.add(fab);
library.add(fas);
library.add(far);

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

createApp(App).use(router).component("font-awesome-icon", FontAwesomeIcon).mount("#app");
