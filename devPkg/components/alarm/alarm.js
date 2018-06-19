import AlarmModal from './Alarm.vue';

let Alarm = {
    install(Vue) {
        let Constructor = Vue.extend(AlarmModal),
            alarm = null;

        alarm = {
            _currentAlarm: null,
            _containerElement: null,
            _defaultShowTime: 1500,
            _delayJob: null,

            show(msg, msgType, subMsg, isAutoClose, showTime) {
                if (this._containerElement === null) {
                    this._containerElement = document.createElement("div");
                    this._containerElement.setAttribute("data-ls-component-type", "alarm-container");
                    document.body.appendChild(this._containerElement);
                }

                if (this._currentAlarm !== null) {
                    this.destroyEvt();
                }

                let container = document.createElement("div");
                this._containerElement.appendChild(container);
                this._currentAlarm = new Constructor({
                    el: container,
                    propsData: {
                        msg,
                        subMsg,
                        msgType,
                        isAutoClose,
                        isShow: true
                    }
                });

                this._currentAlarm.$on("alarmEvent", ({action}) => {
                    if (action === "hide") {
                        this.destroyEvt();
                    }
                });

                if (isAutoClose === true) {
                    if (!showTime) {
                        showTime = this._defaultShowTime;
                    }
                    this._delayJob = setTimeout(() => this.destroyEvt(), showTime);
                }
            },

            destroyEvt() {
                if (this._delayJob !== null) {
                    clearTimeout(this._delayJob);
                    this._delayJob = null;
                }

                if (this._currentAlarm !== null) {
                    this._currentAlarm.$destroy();
                    this._containerElement.removeChild(this._currentAlarm.$el);
                    this._currentAlarm = null;
                }
            }
        };
        Vue.prototype.$lensyn.alarm = alarm;
    }
};

export default Alarm;