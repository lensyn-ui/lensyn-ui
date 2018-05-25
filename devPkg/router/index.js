import Vue from "vue";
import Router, { Route } from "vue-router";

import home from "./home.js";

Vue.use(Router);

const router = new Router({routes: [
    { path: "/", redirect: "/home"},
    ...home
]});

export default router;