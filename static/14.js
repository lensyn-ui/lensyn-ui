webpackJsonplensyn_ui([14],{

/***/ 461:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_Input_vue__ = __webpack_require__(484);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_Input_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_Input_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_Input_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_Input_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_0_vue_loader_lib_template_compiler_index_id_data_v_0630b7d4_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_template_index_0_Input_vue__ = __webpack_require__(526);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_Input_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_0_vue_loader_lib_template_compiler_index_id_data_v_0630b7d4_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_template_index_0_Input_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "devPkg\\components\\common\\input\\Input.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0630b7d4", Component.options)
  } else {
    hotAPI.reload("data-v-0630b7d4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 484:
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
            iptObj: {
                value: "不可输入框",
                type: 'disabled',
                radius: true
            },
            iptSObj: {
                placeholder: "带阴影圆角输入框",
                radius: true,
                shadow: true
            },
            iptTLObj: {
                placeholder: "左边输入框",
                lefttxt: "prefix",
                txt: "txt"
            },
            iptTRObj: {
                placeholder: "右边字符输入框",
                type: "primary",
                radius: true,
                righttxt: "suffix"
            },
            iptTBObj: {
                placeholder: "两边都有字符输入框",
                lefttxt: "prefix",
                righttxt: "suffix",
                radius: true,
                shadow: true
            },
            iptILObj: {
                id: "ID0001",
                clear: true,
                placeholder: "左边图标",
                radius: true,
                prefix: "search",
                txt: "txt",
                value: "默认图标"
            },
            iptIRObj: {
                placeholder: "右边图标",
                suffix: "search"
            },
            iptIBObj: {
                placeholder: "两边图标",
                prefix: "search",
                suffix: "search",
                radius: true,
                shadow: true
            },
            showContent: false,
            params: [[{ name: "参数", cls: "col" }, { name: "说明", cls: "col mark" }, { name: "单位", cls: "col" }], [{ name: "type", cls: "col" }, { name: "disabled、primary，默认为‘default’空心", cls: "col mark" }, { name: "string", cls: "col" }], [{ name: "height", cls: "col" }, { name: "默认为32px", cls: "col mark" }, { name: "number", cls: "col" }], [{ name: "radius", cls: "col" }, { name: "是否需要圆角", cls: "col mark" }, { name: "boolean", cls: "col" }], [{ name: "shadow", cls: "col" }, { name: "是否需要focus阴影", cls: "col mark" }, { name: "boolean", cls: "col" }], [{ name: "placeholder", cls: "col" }, { name: "输入框提示语", cls: "col mark" }, { name: "string", cls: "col" }], [{ name: "txtleft", cls: "col" }, { name: "左侧文字", cls: "col mark" }, { name: "string", cls: "col" }], [{ name: "txtright", cls: "col" }, { name: "右侧文字", cls: "col mark" }, { name: "string", cls: "col" }], [{ name: "prefix", cls: "col" }, { name: "带前缀图标", cls: "col mark" }, { name: "class name", cls: "col" }], [{ name: "suffix", cls: "col" }, { name: "带后缀图标", cls: "col mark" }, { name: "class name", cls: "col" }], [{ name: "clear", cls: "col" }, { name: "是否有清空图标", cls: "col mark" }, { name: "boolean", cls: "col" }], [{ name: "compEvt", cls: "col" }, { name: "组件的输入、点击事件，type分为：‘input’，‘enter’，‘click’", cls: "col mark" }, { name: "function", cls: "col" }]],
            inputRetVal: ""
        };
    },

    methods: {
        footerEvt: function footerEvt() {
            var that = this;
            that.showContent = !that.showContent;
        },
        compEvt: function compEvt(val) {
            if (val.id === "ID0001") {
                this.inputRetVal = val.type === "enter" ? "Enter key Evt" : val.val;
            }
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

/***/ 526:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { ref: "containerNode", staticClass: "component-content" }, [
    _c("span", { staticClass: "title" }, [_vm._v("Input 组件")]),
    _vm._v(" "),
    _c("span", { staticClass: "desc" }, [_vm._v("输入框组件，提供输入值")]),
    _vm._v(" "),
    _c("span", { staticClass: "sub" }, [_vm._v("Input 使用方法")]),
    _vm._v(" "),
    _c("span", { staticClass: "desc" }, [
      _vm._v(
        "当回调事件返回的type为‘click’时，val的值：‘prefix’为前置按钮点击事件，‘suffix’为后置按钮点击事件，‘clear’为清空点击事件"
      )
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "box", attrs: { id: "basicLayout" } }, [
      _c("div", { staticClass: "box-content" }, [
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
          [_vm._v("普通输入框")]
        ),
        _vm._v(" "),
        _c("div", { staticClass: "input-temp-box" }, [_c("ls-input")], 1),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "input-temp-box" },
          [_c("ls-input", { attrs: { objProps: _vm.iptObj } })],
          1
        ),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "input-temp-box" },
          [_c("ls-input", { attrs: { objProps: _vm.iptSObj } })],
          1
        ),
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
          [_vm._v("字符标准输入框")]
        ),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "input-temp-box" },
          [_c("ls-input", { attrs: { objProps: _vm.iptTLObj } })],
          1
        ),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "input-temp-box" },
          [_c("ls-input", { attrs: { objProps: _vm.iptTRObj } })],
          1
        ),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "input-temp-box" },
          [_c("ls-input", { attrs: { objProps: _vm.iptTBObj } })],
          1
        ),
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
          [_vm._v("字符标准输入框")]
        ),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "input-temp-box" },
          [
            _c("ls-input", {
              attrs: { objProps: _vm.iptILObj },
              on: { compEvt: _vm.compEvt }
            })
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "input-temp-box" },
          [_c("ls-input", { attrs: { objProps: _vm.iptIRObj } })],
          1
        ),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "input-temp-box" },
          [_c("ls-input", { attrs: { objProps: _vm.iptIBObj } })],
          1
        ),
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
          [_vm._v("当前点击的按钮是：" + _vm._s(_vm.inputRetVal))]
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
      _c("p", { staticClass: "txt" }, [_vm._v("简单输入框")]),
      _vm._v("\n                <ls-input></ls-input>\n                "),
      _c("p", { staticClass: "txt" }, [_vm._v("带文字描述的输入框")]),
      _vm._v(
        '\n                <ls-input :objProps="iptTBObj"></ls-input>\n                '
      ),
      _c("p", { staticClass: "txt" }, [
        _vm._v(
          "数据对象：（其中的lefttxt和righttxt为需要显示在文本描述中的文字内容）"
        )
      ]),
      _vm._v(
        '\n                data() {\n                    return {\n                        iptIBObj: {\n                            placeholder: "两边图标",\n                            lefttxt: "prefix",\n                            righttxt: "suffix",\n                            radius: true,\n                            shadow: true\n                        }\n                    }\n                }\n                '
      ),
      _c("p", { staticClass: "txt" }, [_vm._v("带图标的输入框")]),
      _vm._v(
        '\n                <ls-input :objProps="iptIBObj" @compEvt="compEvt"></ls-input>\n                '
      ),
      _c("p", { staticClass: "txt" }, [
        _vm._v(
          "数据对象：（其中的prefix和suffix为样式名字，且样式重写的是before伪元素）"
        )
      ]),
      _vm._v(
        '\n                data() {\n                    return {\n                        iptIBObj: {\n                            placeholder: "两边图标",\n                            prefix: "search",\n                            suffix: "search",\n                            radius: true,\n                            shadow: true\n                        }\n                    }\n                }\n                '
      ),
      _c("p", { staticClass: "txt" }, [
        _vm._v("输入值及点击图标和输入框事件监听方法：")
      ]),
      _vm._v(
        '\n                methods: {\n                    compEvt(val) {\n                        if(val.id === "ID0001") {\n                            this.inputRetVal = val.type === "enter" ? "Enter key Evt" : val.val;\n                        }\n                    }\n                }\n            '
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
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-0630b7d4", esExports)
  }
}

/***/ })

});