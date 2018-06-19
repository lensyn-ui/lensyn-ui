import loadingVue from './Loading.vue'

let Loading = {
    install(Vue) {
        let loadingCons = Vue.extend(loadingVue),
            loaded = null,
            container = null;

        Vue.prototype.$lensyn.loading = {
            show: function (describe, fixed, bgColor) {
                if (container === null) {
                    container = document.createElement("div");
                    document.body.appendChild(container);
                }
                let loadingContainer = document.createElement("div");

                container.appendChild(loadingContainer);

                loaded = new loadingCons({
                    el: loadingContainer,
                    propsData: {
                        describe,
                        fixed,
                        bgColor,
                        isShow: true
                    }
                })
            },

            hide: function () {
                if (loaded !== null) {
                    loaded.$destroy();
                    container.removeChild(loaded.$el);
                    loaded = null;
                }
            }
        }
    }
};

export default Loading;