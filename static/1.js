webpackJsonplensyn_ui([1],{

/***/ 469:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_Resource_vue__ = __webpack_require__(492);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_Resource_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_Resource_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_Resource_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_Resource_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_0_vue_loader_lib_template_compiler_index_id_data_v_f2acee28_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_template_index_0_Resource_vue__ = __webpack_require__(544);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(542)
}
var normalizeComponent = __webpack_require__(22)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_Resource_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_0_vue_loader_lib_template_compiler_index_id_data_v_f2acee28_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_template_index_0_Resource_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "devPkg\\components\\home\\Resource.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-f2acee28", Component.options)
  } else {
    hotAPI.reload("data-v-f2acee28", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 492:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vuex = __webpack_require__(101);

exports.default = {
    computed: (0, _vuex.mapGetters)({}),
    data: function data() {
        return {
            downloadList: [{ id: "ID000", name: "轻应用主题模板", icon: "icon", desc: "单页面、单js入口应用（lensyn-empty）", link: "./standard/lensyn-empty/index.html" }, { id: "ID001", name: "中大型应用主题模板", icon: "icon0", desc: "单页面、页面异步加载应用（lensyn-asyn）", link: "./standard/lensyn-asyn/index.html#/home" }],
            downloadBigList: [{ id: "ID000", name: "售电数据展示", icon: "icon1", desc: "售电数据展示（lensyn-bs001）", link: "./standard/bs001/home.html" }, { id: "ID002", name: "数据控制中心展示", icon: "icon2", desc: "数据控制中心展示（lensyn-bs002）", link: "./standard/bs002/index.html" }, { id: "ID003", name: "工业设备管理展示", icon: "icon3", desc: "工业设备管理展示（lensyn-bs003）", link: "./standard/bs003/index.html" }, { id: "ID004", name: "营销数据展示", icon: "icon4", desc: "营销数据展示（lensyn-bs004）", link: "./standard/bs004/index.html" }]
        };
    },

    watch: {},
    methods: {
        viewDetail: function viewDetail(evt) {
            var me = this;
            var id = evt.target.getAttribute("now-id");
            me.downloadList.map(function (it) {
                if (it.id === id) {
                    window.open(it.link);
                }
            });
        },
        viewBDetail: function viewBDetail(evt) {
            var me = this;
            var id = evt.target.getAttribute("now-id");
            me.downloadBigList.map(function (it) {
                if (it.id === id) {
                    window.open(it.link);
                }
            });
        }
    },
    created: function created() {
        var me = this;
    }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),

/***/ 542:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(543);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(52)("876e4b54", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/_css-loader@0.28.8@css-loader/index.js!../../../node_modules/_vue-loader@13.7.0@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-f2acee28\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.7.0@vue-loader/lib/selector.js?type=styles&index=0!./Resource.vue", function() {
     var newContent = require("!!../../../node_modules/_css-loader@0.28.8@css-loader/index.js!../../../node_modules/_vue-loader@13.7.0@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-f2acee28\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.7.0@vue-loader/lib/selector.js?type=styles&index=0!./Resource.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 543:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(51)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ 544:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "page-container active" }, [
    _c("div", { staticClass: "empty-content" }, [
      _c("h3", [_vm._v("资源使用说明")]),
      _vm._v(" "),
      _c("span", { staticClass: "desc" }, [_vm._v("安装lensyn-cli脚手架")]),
      _vm._v(" "),
      _c("span", { staticClass: "desc" }, [
        _vm._v("npm install -g lensyn-cli")
      ]),
      _vm._v(" "),
      _c("span", { staticClass: "desc" }, [
        _vm._v("通过脚手架安装指定的资源开发包")
      ]),
      _vm._v(" "),
      _c("span", { staticClass: "desc" }, [
        _vm._v("lensyn -i lensyn-empty（资源对应的开发库名）")
      ]),
      _vm._v(" "),
      _c("h3", [_vm._v("WEB资源下载")]),
      _vm._v(" "),
      _c("span", { staticClass: "desc" }, [_vm._v("提供专题模板下载")]),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "list" },
        _vm._l(_vm.downloadList, function(item) {
          return _c("div", { staticClass: "item" }, [
            _c("div", { class: [item.icon] }),
            _vm._v(" "),
            _c("div", { staticClass: "desc" }, [
              _c("span", { staticClass: "title" }, [
                _c(
                  "span",
                  {
                    attrs: { "now-id": item.id },
                    on: { click: _vm.viewDetail }
                  },
                  [_vm._v(_vm._s(item.name))]
                )
              ]),
              _vm._v(" "),
              _c("span", { staticClass: "sub" }, [_vm._v(_vm._s(item.desc))])
            ])
          ])
        })
      ),
      _vm._v(" "),
      _c("h3", [_vm._v("MOBILE资源下载")]),
      _vm._v(" "),
      _c("span", { staticClass: "desc" }, [_vm._v("提供mobile专题模板下载")]),
      _vm._v(" "),
      _c("h3", [_vm._v("大屏资源下载")]),
      _vm._v(" "),
      _c("span", { staticClass: "desc" }, [_vm._v("提供大屏专题模板下载")]),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "list" },
        _vm._l(_vm.downloadBigList, function(item) {
          return _c("div", { staticClass: "item" }, [
            _c("div", { class: [item.icon] }),
            _vm._v(" "),
            _c("div", { staticClass: "desc" }, [
              _c("span", { staticClass: "title" }, [
                _c(
                  "span",
                  {
                    attrs: { "now-id": item.id },
                    on: { click: _vm.viewBDetail }
                  },
                  [_vm._v(_vm._s(item.name))]
                )
              ]),
              _vm._v(" "),
              _c("span", { staticClass: "sub" }, [_vm._v(_vm._s(item.desc))])
            ])
          ])
        })
      )
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-f2acee28", esExports)
  }
}

/***/ })

});