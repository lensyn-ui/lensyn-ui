webpackJsonplensyn_ui([16],{

/***/ 460:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_Button_vue__ = __webpack_require__(483);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_Button_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_Button_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_Button_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_Button_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_0_vue_loader_lib_template_compiler_index_id_data_v_88e31a8c_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_template_index_0_Button_vue__ = __webpack_require__(525);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_Button_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_0_vue_loader_lib_template_compiler_index_id_data_v_88e31a8c_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_template_index_0_Button_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "devPkg\\components\\common\\button\\Button.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-88e31a8c", Component.options)
  } else {
    hotAPI.reload("data-v-88e31a8c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 483:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = __webpack_require__(103);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
        var _ref;

        return _ref = {
            gourpEvtVal: '',
            btnObj: {
                type: "primary"
            },
            btnDObj: {
                type: "dashed"
            },
            btnDDObj: {
                type: "danger"
            },
            btnRObj: {
                radius: true
            },
            btnIObj: {
                type: 'icon',
                radius: true
            }
        }, (0, _defineProperty3.default)(_ref, "btnIObj", {
            type: 'icon',
            icon: "edit",
            radius: true
        }), (0, _defineProperty3.default)(_ref, "btnISObj", {
            type: 'icon',
            icon: "save",
            radius: true
        }), (0, _defineProperty3.default)(_ref, "btnITObj", {
            type: 'icon',
            icon: "delete",
            radius: true
        }), (0, _defineProperty3.default)(_ref, "btnIDObj", {
            type: 'icon',
            icon: "download",
            radius: true
        }), (0, _defineProperty3.default)(_ref, "showContent", false), (0, _defineProperty3.default)(_ref, "params", [[{ name: "参数", cls: "col" }, { name: "说明", cls: "col mark" }, { name: "单位", cls: "col" }], [{ name: "name", cls: "col" }, { name: "列属性‘name’值，按钮显示文字，按钮组用‘|’隔开，默认‘确定’", cls: "col mark" }, { name: "string", cls: "col" }], [{ name: "objProps", cls: "col" }, { name: "按钮属性对象", cls: "col mark" }, { name: "string", cls: "col" }], [{ name: "radius", cls: "col" }, { name: "是否为圆角，默认‘false’直角按钮", cls: "col mark" }, { name: "boolean", cls: "col" }], [{ name: "type", cls: "col" }, { name: "type为：‘primary’、‘default’、‘dashed’、‘danger’、‘icon’，默认为‘default’", cls: "col mark" }, { name: "string", cls: "col" }], [{ name: "icon", cls: "col" }, { name: "当type为icon时，按钮类型默认为primary，icon有edit、save、delete、download（默认：edit）", cls: "col mark" }, { name: "string", cls: "col" }]]), _ref;
    },

    watch: {},
    methods: {
        footerEvt: function footerEvt() {
            var that = this;
            that.showContent = !that.showContent;
        },
        groupBtnEvt: function groupBtnEvt(val) {
            this.gourpEvtVal = val;
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
    },
    created: function created() {}
};

/***/ }),

/***/ 525:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { ref: "containerNode", staticClass: "component-content" }, [
    _c("span", { staticClass: "title" }, [_vm._v("Button 组件")]),
    _vm._v(" "),
    _c("span", { staticClass: "desc" }, [
      _vm._v("页面按钮组件，提供单独及按钮组，图片按钮只提供激活状态的图片按钮")
    ]),
    _vm._v(" "),
    _c("span", { staticClass: "sub" }, [_vm._v("Button 使用方法")]),
    _vm._v(" "),
    _c("span", { staticClass: "desc" }, [
      _vm._v("页面点击事件支持回调，支持四种类型的图片按钮")
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "box", attrs: { id: "basicLayout" } }, [
      _c(
        "div",
        { staticClass: "box-content" },
        [
          _c(
            "span",
            {
              staticStyle: {
                display: "block",
                margin: "15px",
                "font-size": "14px",
                color: "#333"
              }
            },
            [_vm._v("四类不同主题按钮")]
          ),
          _vm._v(" "),
          _c("ls-button", {
            attrs: { objProps: _vm.btnObj, name: "主题激活按钮" }
          }),
          _vm._v(" "),
          _c("ls-button"),
          _vm._v(" "),
          _c("ls-button", { attrs: { objProps: _vm.btnDObj } }),
          _vm._v(" "),
          _c("ls-button", { attrs: { objProps: _vm.btnDDObj } }),
          _vm._v(" "),
          _c("div", { staticStyle: { margin: "20px" } }),
          _vm._v(" "),
          _c(
            "span",
            {
              staticStyle: {
                display: "block",
                margin: "15px",
                "font-size": "14px",
                color: "#333"
              }
            },
            [_vm._v("直角按钮组")]
          ),
          _vm._v(" "),
          _c("ls-button", { attrs: { name: "Left|Center|Right" } }),
          _vm._v(" "),
          _c("div", { staticStyle: { margin: "20px" } }),
          _vm._v(" "),
          _c(
            "span",
            {
              staticStyle: {
                display: "block",
                margin: "15px",
                "font-size": "14px",
                color: "#333"
              }
            },
            [_vm._v("圆角按钮组及点击事件")]
          ),
          _vm._v(" "),
          _c("ls-button", {
            attrs: { objProps: _vm.btnRObj, name: "Left|Center|Right" },
            on: { clickEvt: _vm.groupBtnEvt }
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
            [_vm._v("当前点击的按钮是：" + _vm._s(_vm.gourpEvtVal))]
          ),
          _vm._v(" "),
          _c("div", { staticStyle: { margin: "20px" } }),
          _vm._v(" "),
          _c(
            "span",
            {
              staticStyle: {
                display: "block",
                margin: "15px",
                "font-size": "14px",
                color: "#333"
              }
            },
            [_vm._v("四类不同主题图标按钮")]
          ),
          _vm._v(" "),
          _c("ls-button", {
            attrs: { objProps: _vm.btnIObj, name: "Icon Button" }
          }),
          _vm._v(" "),
          _c("ls-button", {
            attrs: { objProps: _vm.btnISObj, name: "Icon Button" }
          }),
          _vm._v(" "),
          _c("ls-button", {
            attrs: { objProps: _vm.btnITObj, name: "Icon Button" }
          }),
          _vm._v(" "),
          _c("ls-button", {
            attrs: { objProps: _vm.btnIDObj, name: "Icon Button" }
          })
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
    )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("pre", [
      _vm._v("                "),
      _c("p", { staticClass: "txt" }, [_vm._v("简单‘确认’按钮")]),
      _vm._v("\n                <ls-button></ls-button>\n                "),
      _c("p", { staticClass: "txt" }, [
        _vm._v("页面激活类型按钮，且自定义按钮名字")
      ]),
      _vm._v(
        '\n                <ls-button :objProps="btnObj" name="主题激活按钮"></ls-button>\n                '
      ),
      _c("p", { staticClass: "txt" }, [_vm._v("图标按钮，默认为‘edit’类型")]),
      _vm._v(
        '\n                <ls-button :objProps="btnIObj" name="Icon Button"></ls-button>\n                '
      ),
      _c("p", { staticClass: "txt" }, [_vm._v("按钮组及事件绑定")]),
      _vm._v(
        '\n                <ls-button :objProps="btnRObj" @clickEvt="groupBtnEvt" name="Left|Center|Right"></ls-button>\n                '
      ),
      _c("p", { staticClass: "txt" }, [_vm._v("页面数据")]),
      _vm._v(
        "\n                data() {\n                    return {\n                        gourpEvtVal: '',\n                        btnObj: {\n                            type: \"primary\"\n                        },\n                        btnIObj: {\n                            type: 'icon',\n                            icon: \"edit\",\n                            radius: true\n                        },\n                        btnRObj: {\n                            radius: true\n                        }\n                    }\n                }\n                "
      ),
      _c("p", { staticClass: "txt" }, [_vm._v("页面方法")]),
      _vm._v(
        "\n                methods: {\n                    groupBtnEvt(val) {\n                        this.gourpEvtVal = val;\n                    }\n                }\n            "
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
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-88e31a8c", esExports)
  }
}

/***/ })

});