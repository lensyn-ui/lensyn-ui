import {AsyncComponent} from 'vue';
import {RouteConfig} from 'vue-router';

const IntroIndex = () => import('../pages/introduce/Index.vue');

const routes = [
    {
        path: '/introduce', component: IntroIndex
    }
];

export default routes;