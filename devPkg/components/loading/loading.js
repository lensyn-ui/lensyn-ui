import loadingVue from './Loading.vue'

let Loading = {
  install(vue) {
    let loadingCons = vue.extend(loadingVue);
    let loaded = null;
    let container = document.createElement("div");
    vue.prototype.$lensyn.loading = {
      show: function (describe, fixed, bgColor) {
        document.body.appendChild(container);
        loaded = new loadingCons({
          el: container,
          propsData: {
            describe,
            fixed,
            bgColor,
            showLoading: true
          }
        })
      },
      hide: function () {
        // loaded.$destroy();
        loaded.showLoading = false;
      }
    }
  }
};

export default Loading;