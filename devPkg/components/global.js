import Vue from 'vue';
import Loading from './loading/loading.js'
import Alarm from './alarm/alarm.js'
import Tooltip from './tooltip/TooltipClass.js'

let GlobalComponent = {
    install() {
        if (!Vue.prototype.$lensyn) {
            Vue.prototype.$lensyn = {};
        }
        Alarm.install(Vue);
        Loading.install(Vue);
        Vue.directive('tooltip', Tooltip)
    }
};

export default GlobalComponent;