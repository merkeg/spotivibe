"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const App_vue_1 = require("./App.vue");
const router_1 = require("./router");
const vuetify_1 = require("./plugins/vuetify");
const webfontloader_1 = require("./plugins/webfontloader");
(0, webfontloader_1.loadFonts)();
(0, vue_1.createApp)(App_vue_1.default).use(router_1.default).use(vuetify_1.default).mount("#app");
//# sourceMappingURL=main.js.map