"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_router_1 = require("vue-router");
const Home_vue_1 = require("../views/Home.vue");
const routes = [
    {
        path: "/",
        name: "Home",
        component: Home_vue_1.default,
    },
    {
        path: "/about",
        name: "About",
        component: () => Promise.resolve().then(() => require("../views/About.vue")),
    },
];
const router = (0, vue_router_1.createRouter)({
    history: (0, vue_router_1.createWebHistory)(process.env.BASE_URL),
    routes,
});
exports.default = router;
//# sourceMappingURL=index.js.map