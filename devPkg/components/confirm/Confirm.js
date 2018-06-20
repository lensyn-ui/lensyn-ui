import Confirm from './Confirm.vue';

let ConfirmProto = {
    install(Vue) {
        let Constructor = Vue.extend(Confirm),
            confirm = null;

        confirm = {
            show(options) {
                let container = document.createElement("div"),
                    confirmCallback = options.confirmCallback,
                    cancelCallback = options.cancelCallback,
                    confirmDialog = null;

                delete options.confirmCallback;
                delete options.cancelCallback;

                document.body.appendChild(container);

                confirmDialog = new Constructor({
                    el: container,
                    propsData: {
                        ...options,
                        isShow: true
                    }
                });

                confirmDialog.$on("confirmEvent", (event) => {
                    let action = event.action;

                    if (action === "confirm") {
                        if (confirmCallback) {
                            confirmCallback(event);
                        }
                    } else if (action === "cancel") {
                        if (cancelCallback) {
                            cancelCallback(event);
                        }
                    }
                });

                return {
                    hide() {
                        confirmDialog.$destroy();
                        document.body.removeChild(confirmDialog.$el);
                    }
                }
            }
        };
        Vue.prototype.$lensyn.confirm = confirm;
    }
};

export default ConfirmProto;
