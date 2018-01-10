webpackJsonplensyn_ui([15],{

/***/ 459:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_Colors_vue__ = __webpack_require__(482);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_Colors_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_Colors_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_Colors_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_Colors_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_0_vue_loader_lib_template_compiler_index_id_data_v_95ad1e0c_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_template_index_0_Colors_vue__ = __webpack_require__(524);
var disposed = false
var normalizeComponent = __webpack_require__(22)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_Colors_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_0_vue_loader_lib_template_compiler_index_id_data_v_95ad1e0c_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_template_index_0_Colors_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "devPkg\\components\\common\\colors\\Colors.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-95ad1e0c", Component.options)
  } else {
    hotAPI.reload("data-v-95ad1e0c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 482:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
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


exports.default = {
    data: function data() {
        return {
            list: [{ title: "主题色", txt: "常用于激活状态颜色，以及主题色调", list: [{ title: "Primary", sub: "#407dd1" }] }, { title: "辅助色", txt: "常用于用户交互信息反馈或对用户操作进行色彩解释", list: [{ title: "辅助色01", sub: "#27518d" }, { title: "辅助色02", sub: "#333743" }, { title: "辅助色03", sub: "#f5f6fa" }, { title: "辅助色04", sub: "#2d8d46" }, { title: "辅助色05", sub: "#d93b25" }] }, { title: "主要字体色", list: [{ title: "连接、提示", sub: "#407dd1" }, { title: "文本、列表信息", sub: "#333" }, { title: "顶部栏、一级侧栏", sub: "#fffff" }, { title: "标题、辅助信息", sub: "#999" }, { title: "成功、安全", sub: "#2d8d46" }, { title: "禁止、危险", sub: "#d93b25" }] }, { title: "背景色", list: [{ title: "顶部栏，基层色", sub: "#27518d" }, { title: "一级侧栏", sub: "#333743" }, { title: "应用栏背景色", sub: "#41485b" }, { title: "功能背景色", sub: "#e2e7ed" }, { title: "表头背景色", sub: "#2d8d46" }, { title: "内容区背景色", sub: "#f5f6fa" }] }, { title: "按钮色", list: [{ title: "默认状态", sub: "#407dd1" }, { title: "选择状态", sub: "#62a5ff" }, { title: "点击状态", sub: "#62a5ff" }, { title: "不可点击状态", sub: "#999999" }] }, { title: "其它色", list: [{ title: "边框", sub: "#dcdcdc" }] }]
        };
    },

    watch: {},
    methods: {},
    created: function created() {}
};

/***/ }),

/***/ 524:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { ref: "containerNode", staticClass: "component-content" },
    [
      _c("span", { staticClass: "title" }, [_vm._v("主题色彩")]),
      _vm._v(" "),
      _c("span", { staticClass: "desc" }, [
        _vm._v("基础样式支持样式重写（后续推出自定义主题颜色，敬请期待）")
      ]),
      _vm._v(" "),
      _vm._l(_vm.list, function(item) {
        return _c("div", { staticClass: "color-box" }, [
          _c("span", { staticClass: "sub" }, [_vm._v(_vm._s(item.title))]),
          _vm._v(" "),
          item.txt
            ? _c("span", { staticClass: "desc" }, [_vm._v(_vm._s(item.txt))])
            : _vm._e(),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "layout-row line" },
            _vm._l(item.list, function(it) {
              return _c("div", { staticClass: "col-color" }, [
                _c(
                  "span",
                  {
                    staticClass: "box",
                    style: [{ "background-color": it.sub }]
                  },
                  [
                    _c("span", { staticClass: "title" }, [
                      _vm._v(_vm._s(it.title))
                    ]),
                    _vm._v(" "),
                    _c("span", { staticClass: "sub" }, [
                      _vm._v(_vm._s(it.sub.toUpperCase()))
                    ])
                  ]
                )
              ])
            })
          )
        ])
      })
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-95ad1e0c", esExports)
  }
}

/***/ })

});