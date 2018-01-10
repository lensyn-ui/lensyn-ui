webpackJsonplensyn_ui([7],{

/***/ 462:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_Selection_vue__ = __webpack_require__(485);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_Selection_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_Selection_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_Selection_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_Selection_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_0_vue_loader_lib_template_compiler_index_id_data_v_65a84e1a_hasScoped_true_buble_transforms_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_template_index_0_Selection_vue__ = __webpack_require__(529);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(527)
}
var normalizeComponent = __webpack_require__(22)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-65a84e1a"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_Selection_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_0_vue_loader_lib_template_compiler_index_id_data_v_65a84e1a_hasScoped_true_buble_transforms_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_template_index_0_Selection_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "devPkg\\components\\common\\selection\\Selection.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-65a84e1a", Component.options)
  } else {
    hotAPI.reload("data-v-65a84e1a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 485:
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

exports.default = {
    data: function data() {
        return {
            showContent: false,
            menuList: {
                list: [{ id: "ID1", name: "菜单一" }, { id: "ID2", name: "菜单二" }, { id: "ID3", name: "菜单三" }, { id: "ID4", name: "菜单四" }, { id: "ID5", name: "菜单五" }, { id: "ID6", name: "菜单六" }, { id: "ID7", name: "菜单七" }, { id: "ID8", name: "菜单八" }]
            },
            params: [[{ name: "参数", cls: "col col-2" }, { name: "说明", cls: "col col-6" }, { name: "单位", cls: "col col-2" }], [{ name: "objProps", cls: "col col-2" }, { name: "需要展示的列表数据", cls: "col col-6" }, { name: "array", cls: "col col-2" }], [{ name: "clickEvt", cls: "col col-2" }, { name: "点击选择事件", cls: "col col-6" }, { name: "function", cls: "col col-6" }], [{ name: "showFieldKey", cls: "col col-2" }, { name: "配置在下拉列表中显示的字段，默认为 name", cls: "col col-6" }, { name: "string", cls: "col col-2" }], [{ name: "idKey", cls: "col col-2" }, { name: "标识符的字段，默认为 id", cls: "col col-6" }, { name: "string", cls: "col col-2" }], [{ name: "isDisabled", cls: "col col-2" }, { name: "是否禁用下拉控件，默认为 false", cls: "col col-6" }, { name: "boolean", cls: "col col-2" }], [{ name: "inputClass", cls: "col col-2" }, { name: "添加到输入框上额外的 class,默认为空", cls: "col col-6" }, { name: "string", cls: "col col-2" }], [{ name: "showType", cls: "col col-2" }, { name: "下拉列表显示的类型，过滤或者滚动匹配到的项目", cls: "col col-6" }, { name: "string", cls: "col col-2" }]],

            methodParams: [[{ name: "方法名", cls: "col col-2" }, { name: "说明", cls: "col col-6" }, { name: "参数", cls: "col col-2" }], [{ name: "getSelected", cls: "col col-2" }, { name: "获取当前选中的数据，未选中返回 null", cls: "col col-6" }, { name: "无", cls: "col col-2" }], [{ name: "clearSelected", cls: "col col-2" }, { name: "清空选中的内容", cls: "col col-6" }, { name: "无", cls: "col col-2" }], [{ name: "setItemBeSelected", cls: "col col-2" }, { name: "设置某一项数据被选中", cls: "col col-6" }, { name: "被选中数据的标识", cls: "col col-2" }]]
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

/***/ 527:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(528);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(52)("c0a90764", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/_css-loader@0.28.8@css-loader/index.js!../../../../node_modules/_vue-loader@13.7.0@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-65a84e1a\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/_less-loader@4.0.5@less-loader/dist/cjs.js!../../../../node_modules/_vue-loader@13.7.0@vue-loader/lib/selector.js?type=styles&index=0!./Selection.vue", function() {
     var newContent = require("!!../../../../node_modules/_css-loader@0.28.8@css-loader/index.js!../../../../node_modules/_vue-loader@13.7.0@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-65a84e1a\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/_less-loader@4.0.5@less-loader/dist/cjs.js!../../../../node_modules/_vue-loader@13.7.0@vue-loader/lib/selector.js?type=styles&index=0!./Selection.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 528:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(51)(false);
// imports


// module
exports.push([module.i, "\n.component-content .grid .col-2[data-v-65a84e1a] {\n  flex-basis: 20%;\n}\n.component-content .grid .col-6[data-v-65a84e1a] {\n  flex-basis: 60%;\n}\n", ""]);

// exports


/***/ }),

/***/ 529:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { ref: "containerNode", staticClass: "component-content" }, [
    _c("span", { staticClass: "title" }, [_vm._v("Selection 组件")]),
    _vm._v(" "),
    _c("span", { staticClass: "desc" }, [
      _vm._v("web 下拉选择框，适用于页面下拉列表及目录菜单等")
    ]),
    _vm._v(" "),
    _c("span", { staticClass: "sub" }, [_vm._v("Selection 使用方法")]),
    _vm._v(" "),
    _c("span", { staticClass: "desc" }, [_vm._v("页面选择事件支持回调")]),
    _vm._v(" "),
    _c("div", { staticClass: "box", attrs: { id: "basicLayout" } }, [
      _c(
        "div",
        { staticClass: "box-content" },
        [
          _c("ls-selection", {
            staticClass: "box",
            attrs: { showType: "scroll", objProps: _vm.menuList },
            on: { clickEvt: _vm.tempListClick }
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
      _vm._l(_vm.params, function(item, index) {
        return _c(
          "li",
          { key: index, staticClass: "row" },
          _vm._l(item, function(it, index) {
            return _c("div", {
              key: index,
              class: [it.cls],
              domProps: { innerHTML: _vm._s(it.name) }
            })
          })
        )
      })
    ),
    _vm._v(" "),
    _c("span", { staticClass: "sub" }, [_vm._v("方法说明")]),
    _vm._v(" "),
    _c(
      "ul",
      { staticClass: "grid" },
      _vm._l(_vm.methodParams, function(item, index) {
        return _c(
          "li",
          { key: index, staticClass: "row" },
          _vm._l(item, function(it, index) {
            return _c("div", {
              key: index,
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
      _c("p", { staticClass: "txt" }, [_vm._v("vue 页面")]),
      _vm._v(
        '\n                <ls-selection class="box" :objProps="menuList" @clickEvt="tempListClick"></ls-selection>\n                '
      ),
      _c("p", { staticClass: "txt" }, [_vm._v("页面数据")]),
      _vm._v(
        '\n                data() {\n                    return {\n                        menuList: {\n                            list: [\n                                {id: "ID1", name: "菜单一"},\n                                {id: "ID2", name: "菜单二"},\n                                {id: "ID3", name: "菜单三"},\n                                {id: "ID4", name: "菜单四"},\n                                {id: "ID5", name: "菜单五"},\n                                {id: "ID6", name: "菜单六"},\n                                {id: "ID7", name: "菜单七"},\n                                {id: "ID8", name: "菜单八"}\n                            ]\n                        }\n                    }\n                }\n                methods: {\n                    tempListClick(val) {\n                        console.log(val);\n                    }\n                }\n            '
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
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-65a84e1a", esExports)
  }
}

/***/ })

});