import Vue from "vue";
import Router, { Route } from "vue-router";

import home from "./home.js";
import introduce from "./introduce.js";

Vue.use(Router);

const router = new Router({routes: [
    { path: "/", redirect: "/introduce"},
    ...home,
    ...introduce
]});

export default router;