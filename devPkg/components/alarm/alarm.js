import AlarmModal from './Alarm.vue';

let Alarm = {
    install(Vue) {
        let Constructor = Vue.extend(AlarmModal),
            timer = null,
            alarm = null;
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
                    timer = setTimeout(() => this._currentAlarm.isShow = false, this._showTime);
                }
            },
            destroyEvt() {
                if (this._currentAlarm) {
                    clearTimeout(timer);
                    this._currentAlarm.isShow = false;
                    document.body.removeChild(this._currentAlarm.$el);  //这一句加不加有什么影响？
                    // this._currentAlarm.$destroy();
                }
            }
        };
        Vue.prototype.$lensyn.alarm = alarm;
    }
};

export default Alarm;