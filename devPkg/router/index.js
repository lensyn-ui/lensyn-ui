"use strict";

/* 加载vue路由 */
import Router from "vue-router";

/* 各个功能模块 --start-- */

/* 首页 */
const Home = () => import("../components/home/Index.vue");

/* 指南 */
const Guide = () => import("../components/home/Guide.vue");

/* web组件 */
const Component = () => import("../components/home/Component.vue");

/* 更新日志 */
const Record = () => import("../components/common/update/Record.vue");

/* 安装使用 */
const Buildin = () => import("../components/common/installInfo/BuildIn.vue");

/* 页面栅格布局 */
const Layout = () => import("../components/common/layout/Layout.vue");

/* 颜色值 */
const Colors = () => import("../components/common/colors/Colors.vue");

/* 按钮组件 */
const Button = () => import("../components/common/button/Button.vue");

/* 输入组件 */
const Input = () => import("../components/common/input/Input.vue");

/* 下拉组件 */
const Selection = () => import("../components/common/selection/Selection.vue");

/* tbas组件 */
const Tabs = () => import("../components/common/tab/Tabs.vue");

/* 可编辑树组件 */
const Edittree = () => import("../components/common/edittree/TreeEditTable.vue");

/* 线性进度条组件 */
const Progress = () => import("../components/common/progress/Progress.vue");

/* 分页组件 */
const Pagination = () => import("../components/common/pagination/Pagination.vue");

/* mobile 组件 */
const MComponent = () => import("../components/home/MComponent.vue");

/* mobile 下拉组件说明 */
const MDroplist = () => import("../components/common/mselection/MDroplist.vue");

/* 资源 */
const Resource = () => import("../components/home/Resource.vue");

/* 各个功能模块 --end-- */

const [WEB_CHILDREN, MOBILE_CHILDREN] = [
    [
        { path: "", component: Record },
        { path: "/record", component: Record },
        { path: "/buildin", component: Buildin },
        { path: "/layout", component: Layout },
        { path: "/colors", component: Colors },
        { path: "/button", component: Button },
        { path: "/input", component: Input },
        { path: "/droplist", component: Selection },
        { path: "/tabs", component: Tabs },
        { path: "/treeEditTable", component: Edittree },
        { path: "/progess", component: Progress },
        { path: "/pagination", component: Pagination }
    ],
    [
        { path: "", component: MDroplist },
        { path: "/mdroplist", component: MDroplist }
    ]
];

/* 路由配置 */
const router = new Router({
    routes: [
        { path: "/", redirect: '/home' },
        { path: "/home", component: Home },
        { path: "/guide", component: Guide },
        {
            path: "/component",
            component: Component,
            children: WEB_CHILDREN
        },
        {
            path: "/mcomponent",
            component: MComponent,
            children: MOBILE_CHILDREN
        },
        { path: "/resource", component: Resource }
    ]
});
export { router, WEB_CHILDREN, MOBILE_CHILDREN };