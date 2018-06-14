import Vue from 'vue';
import AlarmModal from './Alarm.vue';
import Loading from './loading/loading.js'
import Tooltip from './tooltip/tooltipClass.js'

let Alarm = {
    install(Vue) {
        let Constructor = Vue.extend(AlarmModal),
<<<<<<< HEAD
          alarm = null;
=======
            alarm = null;
>>>>>>> 7af4fec0c7ec85fbcfa68929413a241ea1d6ea5f
        alarm = {
            _currentAlarm: null,
            _showTime: 1500,
            show(msg, subMsg, msgType, icon, isAutoClose) {
                this.destroyEvt();  //先干掉之前存在的
                if (!msgType) {
                    msgType = "danger";
                }
                let container = document.createElement("div");
                document.body.appendChild(container);
                this._currentAlarm = new Constructor({
                    el: container,
                    propsData: {
                        msg,
                        subMsg,
                        msgType,
                        icon,
                        isAutoClose,
                        isShow: true
                    }
                });
                if (isAutoClose !== true) {
                    window.alarmTimer = setTimeout(() => this._currentAlarm.isShow = false, this._showTime);
                }
            },
            destroyEvt() {
                if (this._currentAlarm) {
                    clearTimeout(window.alarmTimer);
                    this._currentAlarm.isShow = false;
                    // this._currentAlarm.$destroy();
                }
            }
        };
        Vue.prototype.$lensyn.alarm = alarm;
    }
};

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