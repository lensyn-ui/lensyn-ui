webpackJsonplensyn_ui([11],{

/***/ 465:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_Progress_vue__ = __webpack_require__(488);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_Progress_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_Progress_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_Progress_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_Progress_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_0_vue_loader_lib_template_compiler_index_id_data_v_5b8def9a_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_template_index_0_Progress_vue__ = __webpack_require__(536);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_Progress_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_0_vue_loader_lib_template_compiler_index_id_data_v_5b8def9a_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_template_index_0_Progress_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "devPkg\\components\\common\\progress\\Progress.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5b8def9a", Component.options)
  } else {
    hotAPI.reload("data-v-5b8def9a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 488:
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

exports.default = {
    data: function data() {
        return {
            showContent: false,
            params: [[{ name: "参数", cls: "col" }, { name: "说明", cls: "col mark" }, { name: "值类型(默认值)", cls: "col" }], [{ name: "percent", cls: "col" }, { name: "百分比", cls: "col mark" }, { name: "Number(0)", cls: "col" }], [{ name: "status", cls: "col" }, { name: "状态，可选值为normal、active、wrong、success", cls: "col mark" }, { name: "string(normal)", cls: "col" }], [{ name: "stroke-width", cls: "col" }, { name: "进度条的线宽", cls: "col mark" }, { name: "Number(10) ", cls: "col" }], [{ name: "vertical", cls: "col" }, { name: "是否垂直显示", cls: "col mark" }, { name: "Boolean(false)", cls: "col" }], [{ name: "hide-info", cls: "col" }, { name: "是否隐藏数值或图标", cls: "col mark" }, { name: "Boolean(false)", cls: "col" }]]
        };
    },

    watch: {},
    methods: {
        tempListClick: function tempListClick(val) {
            console.log(val);
        },
        footerEvt: function footerEvt() {
            var that = this;
            that.showContent = !that.showContent;
        },
        footerEvt1: function footerEvt1() {
            var that = this;
            that.showContent1 = !that.showContent1;
        }
    },
    mounted: function mounted() {
        var that = this;
        that.$nextTick(function () {
            var boxFooter = that.$refs.boxFooter;
            /* 查找父类元素注册滚动事件 */
            var scrollNode = that.$refs.containerNode.parentNode;
            scrollNode.addEventListener('scroll', function () {
                /* 页面滚动距离（页面滚动顶部高度+页面滚动区域可视高度） */
                var scrollTop = scrollNode.scrollTop + scrollNode.offsetHeight;
                /* 获取当前需要定位元素的状态 */
                var boxFooterClass = boxFooter.className;
                var state = boxFooterClass.endsWith(' fixedBottom');
                /* 获取页面需要定位的元素 */
                var node = document.getElementById("basicLayout");
                /**
                 * 根据页面滚动距离，判断元素是否在浮动区间
                 * 区间计算方法为：页面滚动距离是否大于浮动元素中的固定内容高度和距顶部距离；是否小于浮动元素整体高度和距顶部距离；
                 */
                var startY = node.offsetTop + node.querySelector("div.box-content").offsetHeight - scrollTop;
                var endY = node.offsetTop + node.offsetHeight - scrollTop;
                /* 当滚动元素位置在固定内容以下，浮动元素位置以上是浮动块（并且一定是要展开内容时才浮动） */
                if (that.showContent && endY >= 0 && startY <= 0) {
                    /* 在元素浮动区间内，没有浮动块，需要浮动元素 */
                    if (!state) {
                        /* 设置页面浮动元素宽度 */
                        boxFooter.style.width = boxFooter.getBoundingClientRect().width + 'px';
                        boxFooter.className += ' fixedBottom';
                    }
                } else {
                    /* 如果存在浮动需要清除浮动元素的值 */
                    if (state) boxFooter.className = boxFooterClass.replace(' fixedBottom', '');
                }
            });
        });
    }
};

/***/ }),

/***/ 536:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { ref: "containerNode", staticClass: "component-content" }, [
    _c("span", { staticClass: "title" }, [_vm._v("进度条组件")]),
    _vm._v(" "),
    _c("span", { staticClass: "sub" }, [
      _vm._v("图表类组件。一般有两种用途：")
    ]),
    _vm._v(" "),
    _c("span", { staticClass: "desc" }, [_vm._v("显示某项任务进度的百分比；")]),
    _vm._v(" "),
    _c("div", { staticClass: "box", attrs: { id: "basicLayout" } }, [
      _c("div", { staticClass: "box-content" }, [
        _c(
          "div",
          { staticStyle: { width: "90%", margin: "0 auto" } },
          [
            _c("ls-line", { attrs: { percent: 100, status: "active" } }),
            _vm._v(" "),
            _c("ls-line", { attrs: { percent: 60, status: "wrong" } }),
            _vm._v(" "),
            _c("ls-line", { attrs: { "stroke-width": 15, percent: 40 } }),
            _vm._v(" "),
            _c(
              "div",
              { staticStyle: { height: "100px", "margin-top": "10px" } },
              [
                _c("ls-line", {
                  attrs: { vertical: "", percent: 45, status: "normal" }
                })
              ],
              1
            )
          ],
          1
        )
      ]),
      _vm._v(" "),
      _c(
        "div",
        {
          ref: "boxTagger",
          staticClass: "box-tagger",
          style: [{ height: _vm.showContent ? "auto" : "0" }]
        },
        [
          _c("pre", [
            _vm._v(
              '                     <ls-line  :percent="100" status="active">\n                     </ls-line>\n\n                     <ls-line  :percent="60" status="wrong">\n                     </ls-line>\n\n                     <ls-line :stroke-width=\'15\' :percent="40"> </ls-line >\n\n                     <div style="height: 100px;">\n                         <ls-line vertical :percent="45" status="normal">\n                         </ls-line>\n                     </div>\n            '
            )
          ])
        ]
      ),
      _vm._v(" "),
      _c("div", { staticClass: "fixed-footer" }, [
        _c(
          "div",
          {
            ref: "boxFooter",
            staticClass: "box-footer",
            on: { click: _vm.footerEvt }
          },
          [
            _c("i", {
              staticClass: "box-footer-icon",
              class: [{ active: _vm.showContent }]
            }),
            _c("span", [
              _vm._v(_vm._s(_vm.showContent ? "隐藏代码" : "显示代码"))
            ]),
            _vm._v(" "),
            _c("button", {
              staticClass: "box-footer-btn",
              style: [{ opacity: _vm.showContent ? 1 : 0 }],
              attrs: { type: "button", tabindex: "0" }
            })
          ]
        )
      ])
    ]),
    _vm._v(" "),
    _c("span", { staticClass: "sub" }, [_vm._v("使用参数类型说明")]),
    _vm._v(" "),
    _c(
      "ul",
      { staticClass: "grid", staticStyle: { "margin-left": "20px" } },
      _vm._l(_vm.params, function(item) {
        return _c(
          "li",
          { staticClass: "row" },
          _vm._l(item, function(it) {
            return _c("div", {
              class: [it.cls],
              domProps: { innerHTML: _vm._s(it.name) }
            })
          })
        )
      })
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-5b8def9a", esExports)
  }
}

/***/ })

});