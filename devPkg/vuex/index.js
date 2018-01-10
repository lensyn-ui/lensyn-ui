import Vue from 'vue'
/* vuex 数据状态管理器 */
import Vuex from 'vuex'
/* 通用组件 Vuex对象 */
import common from './modules/common'

/* Vue加载状态管理器实例 */
Vue.use(Vuex);
/* 实例化Vuex状态管理器对象 */
export default new Vuex.Store({
    modules: {
        common
    },
    strict: false
});