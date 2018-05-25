"use strict";

/* ES6解析兼容 */
import 'babel-polyfill';

/* 引入页面样式文件 */
import './styles/main.less';

/* 加载vue核心组件 */
import Vue from 'vue';

/* 加载模块路由 */
import router from './router/index.js';

/* 引入容器页面 */
import Index from "./pages/Index.vue";

/* vue实例化，加载路由、状态管理器、指向模板引擎 */
new Vue({
    el: "#mainContent",
    router,
    render(createElement) {
        if (this.$route.path === "/") {
            return createElement("div");
        }
        let routeMeta = this.$route.meta,
            props = {layout: ''};
        if (routeMeta && routeMeta.layout) {
            props.layout = routeMeta.layout;
        }
        return createElement(Index, {props});
    }
});