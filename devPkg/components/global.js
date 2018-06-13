import Vue from 'vue';
import AlarmModal from './Alarm.vue';
import Loading from './loading/loading.js'
import Tooltip from './tooltip/tooltipClass.js'

let Alarm = {
  install(Vue) {
    let Constructor = Vue.extend(AlarmModal),
      alarm = null;
    alarm = {
      _currentAlarm: null,
      _showTime: 1500,
      show(msg, subMsg, msgType, icon, iconClose) {
        window.hello = this;
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
            subMsg,
            msgType,
            icon,
            iconClose,
            visible: true
          }
        });
        if (iconClose !== true) {
          setTimeout(() => this._currentAlarm.visible = false, this._showTime);
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