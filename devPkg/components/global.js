import Vue from 'vue';
import Loading from './loading/loading.js';
import Tooltip from './tooltip/tooltipClass.js';
import Alarm from './alarm/alarm.js';
import Confirm from "./confirm/Confirm.js";

let GlobalComponent = {
    install() {
        if (!Vue.prototype.$lensyn) {
            Vue.prototype.$lensyn = {};
        }
        Alarm.install(Vue);
        Loading.install(Vue);
        Confirm.install(Vue);

        this.registerDirective();
    },

    registerDirective() {
        Vue.directive('tooltip', Tooltip);
    }
};

export default GlobalComponent;