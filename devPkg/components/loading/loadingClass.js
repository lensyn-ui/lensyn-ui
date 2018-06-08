import Vue from 'vue'
import loadingVue from './loading'

class LoadingClass {
  constructor(vue) {
    this.initLoading(vue)
  }

  initLoading(vue) {
    let loadingCons = vue.extend(loadingVue);
    let loaded = null;
    let container = document.createElement("div");
    document.body.appendChild(container);
    vue.prototype.loading = {
      show: function (name, fixed, bgColor) {
        loaded = new loadingCons({
          el: container,
          propsData: {
            name,
            fixed,
            bgColor,
            showLoading: true
          }
        })
      },
      hide: function () {
        loaded.showLoading = false
      }
    }
  }
}

export default new LoadingClass(Vue);