webpackJsonplensyn_ui([13],{

/***/ 468:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_MDroplist_vue__ = __webpack_require__(491);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_MDroplist_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_MDroplist_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_MDroplist_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_MDroplist_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_0_vue_loader_lib_template_compiler_index_id_data_v_220f820f_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_template_index_0_MDroplist_vue__ = __webpack_require__(541);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_MDroplist_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_0_vue_loader_lib_template_compiler_index_id_data_v_220f820f_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_template_index_0_MDroplist_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "devPkg\\components\\common\\mselection\\MDroplist.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-220f820f", Component.options)
  } else {
    hotAPI.reload("data-v-220f820f", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 491:
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
            btnProp: {
                type: "primary"
            },
            pickerShow: false,
            pickerValue: '',
            objProps: {
                format: 'y,m,d,h,mm,s'
            },
            showContent: false,
            params: [[{ name: "参数", cls: "col" }, { name: "说明", cls: "col mark" }, { name: "单位", cls: "col" }], [{ name: "objProps", cls: "col" }, { name: "需要展示的列表数据", cls: "col mark" }, { name: "array", cls: "col" }], [{ name: "clickEvt", cls: "col" }, { name: "点击选择事件", cls: "col mark" }, { name: "function", cls: "col" }]],
            pickerLShow: false,
            pickerLValue: '',
            pickerList: {
                type: 'list',
                value: ["ID6"],
                list: [[{ id: "ID1", name: "菜单一" }, { id: "ID2", name: "菜单二" }, { id: "ID3", name: "菜单三" }, { id: "ID4", name: "菜单四" }, { id: "ID5", name: "菜单五" }, { id: "ID6", name: "菜单六" }, { id: "ID7", name: "菜单七" }, { id: "ID8", name: "菜单八" }], [{ id: "ID1", name: "菜单一" }, { id: "ID2", name: "菜单二" }, { id: "ID3", name: "菜单三" }, { id: "ID4", name: "菜单四" }, { id: "ID5", name: "菜单五" }, { id: "ID6", name: "菜单六" }, { id: "ID7", name: "菜单七" }, { id: "ID8", name: "菜单八" }]]
            }
        };
    },

    methods: {
        btnClick: function btnClick() {
            this.pickerShow = true;
        },
        btnLClick: function btnLClick() {
            this.pickerLShow = true;
        },
        tempListClick: function tempListClick(val) {
            console.log(val);
        },
        footerEvt: function footerEvt() {
            var that = this;
            that.showContent = !that.showContent;
        },
        pickerLEvt: function pickerLEvt(val) {
            this.pickerLShow = false;
            this.pickerLValue = val.val;
        },
        pickerEvt: function pickerEvt(val) {
            this.pickerShow = false;
            this.pickerValue = val.val;
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

/***/ 541:
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
      _c("span", { staticClass: "title" }, [_vm._v("ls-mpicker 组件")]),
      _vm._v(" "),
      _c("span", { staticClass: "desc" }, [
        _vm._v(
          "mobile 下拉选择框，适用于页面下拉列表及目录菜单等(级联功能开发中)"
        )
      ]),
      _vm._v(" "),
      _c("span", { staticClass: "sub" }, [_vm._v("Selection 使用方法")]),
      _vm._v(" "),
      _c("span", { staticClass: "desc" }, [_vm._v("页面选择事件支持回调")]),
      _vm._v(" "),
      _c("span", { staticClass: "desc" }, [_vm._v("需要用手机模拟查看效果")]),
      _vm._v(" "),
      _c("div", { staticClass: "box", attrs: { id: "basicLayout" } }, [
        _c(
          "div",
          { staticClass: "box-content" },
          [
            _c("ls-button", {
              staticClass: "button",
              attrs: { objProps: _vm.btnProp, name: "日期下拉" },
              on: { clickEvt: _vm.btnClick }
            }),
            _vm._v(" "),
            _c(
              "span",
              {
                staticStyle: {
                  display: "block",
                  margin: "15px",
                  "font-size": "14px",
                  color: "rgb(18, 150, 219)"
                }
              },
              [_vm._v("选择的日期是：" + _vm._s(_vm.pickerValue))]
            ),
            _vm._v(" "),
            _c("ls-button", {
              staticClass: "button",
              attrs: { name: "日期下拉" },
              on: { clickEvt: _vm.btnLClick }
            }),
            _vm._v(" "),
            _c(
              "span",
              {
                staticStyle: {
                  display: "block",
                  margin: "15px",
                  "font-size": "14px",
                  color: "rgb(18, 150, 219)"
                }
              },
              [_vm._v("选择的列表数据是：" + _vm._s(_vm.pickerLValue))]
            )
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "div",
          {
            ref: "boxTagger",
            staticClass: "box-tagger",
            style: [{ height: _vm.showContent ? "auto" : "0" }]
          },
          [_vm._m(0)]
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
        { staticClass: "grid" },
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
      ),
      _vm._v(" "),
      _c("ls-mpicker", {
        directives: [
          {
            name: "show",
            rawName: "v-show",
            value: _vm.pickerShow,
            expression: "pickerShow"
          }
        ],
        attrs: { objProps: _vm.objProps },
        on: { evtFunc: _vm.pickerEvt }
      }),
      _vm._v(" "),
      _c("ls-mpicker", {
        directives: [
          {
            name: "show",
            rawName: "v-show",
            value: _vm.pickerLShow,
            expression: "pickerLShow"
          }
        ],
        attrs: { objProps: _vm.pickerList },
        on: { evtFunc: _vm.pickerLEvt }
      })
    ],
    1
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("pre", [
      _vm._v("                "),
      _c("p", { staticClass: "txt" }, [_vm._v("vue 页面")]),
      _vm._v(
        '\n                <ls-mpicker v-show="pickerShow" :objProps="objProps" @evtFunc="pickerEvt"></ls-mpicker>\n                '
      ),
      _c("p", { staticClass: "txt" }, [_vm._v("页面数据")]),
      _vm._v(
        "\n                data() {\n                    return {\n                        pickerShow: false,\n                        pickerValue: '',\n                        btnProp: {\n                            type: \"primary\"\n                        },\n                        objProps: {\n                            format: 'y,m,d,h,mm,s'\n                        }\n                    }\n                }\n                methods: {\n                    pickerEvt(val) {\n                        this.pickerShow = false;\n                        this.pickerValue = val.val;\n                    }\n                }\n            "
      )
    ])
  }
]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-220f820f", esExports)
  }
}

/***/ })

});