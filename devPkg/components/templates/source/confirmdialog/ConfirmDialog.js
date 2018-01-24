import ConfirmDialogComponent from "./ConfirmDialog.vue";


let ConfirmDialog = {
    install(Vue) {
        let Constructor = Vue.extend(ConfirmDialogComponent),
            dialog = null;

        dialog = {
            _currentDialog: null,

            show(param) {
                if (this._currentDialog === null) {
                    let element = document.createElement("div");

                    document.body.appendChild(element);
                    this._currentDialog = new Constructor({
                        el: element,
                        propsData: {...param}
                    });
                } else {
                    this._currentDialog.$el.style.display = "block";
                    this._currentDialog.msg = param.msg;
                    this._currentDialog.onClickCancel = param.onClickCancel;
                    this._currentDialog.onClickConfirm = param.onClickConfirm;
                    if (param.isShowCancel === false) {
                        this._currentDialog.isShowCancel = false;
                    }
                    if (param.isShowConfirm === false) {
                        this._currentDialog.isShowConfirm = false;
                    }
                }
            },

            hide() {
                if (this._currentDialog) {
                    this._currentDialog.$el.style.display = "none";                                    
                }
            },

            getContainer() {
                if (this._currentDialog) {
                    return this._currentDialog.$el;
                }
                return null;
            }
        }

        Vue.prototype.$lensyn.confirmDialog =  dialog;
    }
};

export default ConfirmDialog;