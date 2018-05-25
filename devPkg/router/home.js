import {AsyncComponent} from 'vue';
import {RouteConfig} from 'vue-router';

const HomeIndex = () => import('../pages/home/Index.vue');

const routes = [
    {
        path: '/home', component: HomeIndex
    }
];

export default routes;