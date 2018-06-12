import {VueConstructor} from 'vue';
import AlarmModal from './Alarm.vue';

let Alarm = {
    install(Vue) {
        let Constructor = Vue.extend(AlarmModal),
            alarm = null;
        alarm = {
            _currentAlarm: null,
            _showTime: 1500,
            show(msg, msgType) {
                this._currentAlarm = null;  //先干掉之前存在的
                if (!msgType) {
                    msgType = "danger";
                }
                let container = document.createElement("div");
                document.body.appendChild(container);
                this._currentAlarm = new Constructor({
                    el: container,
                    propsData: {
                        msg,
                        msgType,
                        visible: true
                    }
                });
                setTimeout(() => this._currentAlarm.visible = false, this._showTime);
            }
        };
        Vue.prototype.$lensyn.alarm = alarm;
    }
};

let GlobalComponent = {
    install(Vue) {
        if (!Vue.prototype.$lensyn) {
            Vue.prototype.$lensyn = {};
        }
        Alarm.install(Vue);
    }
};

export default GlobalComponent;