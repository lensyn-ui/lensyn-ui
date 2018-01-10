/*********************************************************************
 * Created by deming-su on 2017/12/30
 *********************************************************************/

"use strict";

/* ES6解析兼容 */
import 'babel-polyfill';

/* 引入页面样式文件 */
import './styles/main.less';

/* 加载vue核心组件 */
import Vue from 'vue';

/* 加载vue路由 */
import Router from 'vue-router';

/* 加载vue状态管理器 */
import store from './vuex';

/* 加载模块路由 */
import { router } from './router';

/* 向Vue容器注入路由 */
Vue.use(Router);

/* 引入容器页面 */
import Index from "./components/Index.vue";

/* 引入公共方法 */
import * as tt from './components/common/ToolTip';
tt.ToolTip();

/* 引入通用组件 */
import * as LensynUI from './components/templates';
Vue.use(LensynUI);

/* vue实例化，加载路由、状态管理器、指向模板引擎 */
new Vue({
    el: "#mainContent",
    router,
    store,
    render: tplFormat => tplFormat(Index)
});