webpackJsonplensyn_ui([6],{

/***/ 463:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_Tabs_vue__ = __webpack_require__(486);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_Tabs_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_Tabs_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_Tabs_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_Tabs_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_0_vue_loader_lib_template_compiler_index_id_data_v_0bd04612_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_template_index_0_Tabs_vue__ = __webpack_require__(532);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(530)
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_Tabs_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_0_vue_loader_lib_template_compiler_index_id_data_v_0bd04612_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_template_index_0_Tabs_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "devPkg\\components\\common\\tab\\Tabs.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0bd04612", Component.options)
  } else {
    hotAPI.reload("data-v-0bd04612", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 486:
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
            showContent1: false,
            tabsReturn: { id: "001", name: "用户管理" }, //tabs返回的值
            tabsReturn1: { id: "001", name: "用户管理" }, //tabs返回的值
            tabsData: {
                list: [{ id: "001", name: "用户管理" }, { id: "002", name: "配置管理" }, { id: "003", name: "角色管理" }, { id: "004", name: "定时任务补偿" }, { id: "005", name: "密码管理" }]
            },
            tabsData1: {
                borderShow: true,
                list: [{ id: "001", name: "用户管理" }, { id: "002", name: "配置管理" }, { id: "003", name: "角色管理" }, { id: "004", name: "定时任务补偿" }, { id: "005", name: "密码管理" }]
            },
            tabsData2: {
                position: 'top',
                list: [{ id: "001", name: "用户管理" }, { id: "002", name: "配置管理" }, { id: "003", name: "角色管理" }, { id: "004", name: "定时任务补偿" }, { id: "005", name: "密码管理" }]
            },
            params: [[{ name: "参数", cls: "col" }, { name: "说明", cls: "col mark" }, { name: "单位", cls: "col" }], [{ name: "tabsData", cls: "col" }, { name: "需要展示的列表数据", cls: "col mark" }, { name: "array", cls: "col" }], [{ name: "tabsEvt", cls: "col" }, { name: "点击选择事件", cls: "col mark" }, { name: "function", cls: "col" }]],
            attr: [[{ name: "参数", cls: "col" }, { name: "说明", cls: "col" }, { name: "可选值", cls: "col" }, { name: "默认值", cls: 'col' }], [{ name: "borderShow", cls: "col" }, { name: "标签是否有边框", cls: "col" }, { name: "——", cls: "col" }, { name: "false", cls: 'col' }], [{ name: "list", cls: "col" }, { name: "展示的数据", cls: "col" }, { name: "——", cls: "col" }, { name: "array", cls: 'col' }]],
            positionEvt: [{ name: 'top', checked: true }, { name: 'right', checked: false }, { name: 'bottom', checked: false }, { name: 'left', checked: false }],
            nodeEvt: null
        };
    },

    watch: {},
    methods: {
        tabsEvt: function tabsEvt(val) {
            var that = this;
            that.tabsReturn = val.obj;
            that.showContent1 = false;
        },
        tabsEvt1: function tabsEvt1(val) {
            var that = this;
            that.tabsReturn1 = val.obj;
            that.showContent = false;
        },
        posEvt: function posEvt(val) {
            var that = this;
            that.tabsData2.position = val;
            var obj = that.positionEvt;
            var temp = [];
            if (obj && obj.length) {
                obj.map(function (it) {
                    it.checked = it.name === val;
                    temp.push(it);
                });
            }
            that.positionEvt = temp;
            var boxContent = that.$refs.boxContent; //当前tabs里面的元素
            var lsTabs2 = that.$refs.lsTabs2; //获取当前tabs标签元素
            //判断位置元素
            switch (val) {
                case 'top':
                    break;
                case 'right':
                    console.log(lsTabs2.$el.offsetHeight);
                    boxContent.style.height = "160px";
                    boxContent.style.right = '128px';
                    boxContent.style.left = 0;
                    boxContent.style.top = 0;
                    break;
                case 'bottom':
                    boxContent.style.height = "auto";
                    boxContent.style.left = 0;
                    boxContent.style.right = 0;
                    boxContent.style.top = 0;
                    break;
                case 'left':
                    console.log(lsTabs2.$el.offsetHeight);
                    boxContent.style.height = "160px";
                    boxContent.style.left = '128px';
                    boxContent.style.right = 0;
                    boxContent.style.top = 0;
                    break;
                default:
                    break;
            }
        },
        footerEvt: function footerEvt() {
            var that = this;
            that.showContent = !that.showContent;
            that.nodeEvt = document.getElementById("basicLayout");
        },
        footerEvt1: function footerEvt1() {
            var that = this;
            that.showContent1 = !that.showContent1;
            that.nodeEvt = document.getElementById("basicLayout1");
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
                var node = that.nodeEvt || document.getElementById("basicLayout");
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

/***/ 530:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(531);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(52)("0c7e58c0", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/_css-loader@0.28.8@css-loader/index.js!../../../../node_modules/_vue-loader@13.7.0@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-0bd04612\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/_vue-loader@13.7.0@vue-loader/lib/selector.js?type=styles&index=0!./Tabs.vue", function() {
     var newContent = require("!!../../../../node_modules/_css-loader@0.28.8@css-loader/index.js!../../../../node_modules/_vue-loader@13.7.0@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-0bd04612\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/_vue-loader@13.7.0@vue-loader/lib/selector.js?type=styles&index=0!./Tabs.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 531:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(51)(false);
// imports


// module
exports.push([module.i, "\n.tabs-grid  > .row > .col:nth-child(1){\n    flex:2 !important;\n}\n.tabs-grid  > .row > .col:nth-child(2){\n    flex:4 !important;\n}\n.tabs-grid  > .row > .col:nth-child(3){\n    flex:2 !important;\n}\n.tabs-grid  > .row > .col:nth-child(4){\n    flex:1 !important;\n}\n", ""]);

// exports


/***/ }),

/***/ 532:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { ref: "containerNode", staticClass: "component-content" }, [
    _c("span", { staticClass: "title" }, [_vm._v("Tabs 标签页")]),
    _vm._v(" "),
    _c("span", { staticClass: "desc" }, [
      _vm._v("分割内容上有关联单属于不同类别的数据集合。")
    ]),
    _vm._v(" "),
    _c("span", { staticClass: "sub" }, [_vm._v("基本用法")]),
    _vm._v(" "),
    _c("span", { staticClass: "desc" }, [_vm._v("基础的、简洁的标签页。")]),
    _vm._v(" "),
    _c("div", { staticClass: "box", attrs: { id: "basicLayout" } }, [
      _c(
        "div",
        { staticClass: "box-content" },
        [
          _c("ls-tabs", {
            attrs: { tabsData: _vm.tabsData },
            on: { tabsEvt: _vm.tabsEvt }
          }),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "box-content",
              staticStyle: { margin: "20px 0 0 30px", "font-size": "14px" }
            },
            [_vm._v(_vm._s(_vm.tabsReturn.name))]
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
    _c("span", { staticClass: "sub" }, [_vm._v("选项卡样式")]),
    _vm._v(" "),
    _c("span", { staticClass: "desc" }, [_vm._v("选项卡样式的标签页")]),
    _vm._v(" "),
    _c("div", { staticClass: "box", attrs: { id: "basicLayout1" } }, [
      _c(
        "div",
        { staticClass: "box-content" },
        [
          _c("ls-tabs", {
            attrs: { tabsData: _vm.tabsData1 },
            on: { tabsEvt: _vm.tabsEvt1 }
          }),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "box-content",
              staticStyle: { margin: "20px 0 0 30px", "font-size": "14px" }
            },
            [_vm._v(_vm._s(_vm.tabsReturn1.name))]
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
          style: [{ height: _vm.showContent1 ? "auto" : "0" }]
        },
        [_vm._m(1)]
      ),
      _vm._v(" "),
      _c("div", { staticClass: "fixed-footer" }, [
        _c(
          "div",
          {
            ref: "boxFooter",
            staticClass: "box-footer",
            on: { click: _vm.footerEvt1 }
          },
          [
            _c("i", {
              staticClass: "box-footer-icon",
              class: [{ active: _vm.showContent1 }]
            }),
            _c("span", [
              _vm._v(_vm._s(_vm.showContent1 ? "隐藏代码" : "显示代码"))
            ]),
            _vm._v(" "),
            _c("button", {
              staticClass: "box-footer-btn",
              style: [{ opacity: _vm.showContent1 ? 1 : 0 }],
              attrs: { type: "button", tabindex: "0" }
            })
          ]
        )
      ])
    ]),
    _vm._v(" "),
    _c("span", { staticClass: "sub" }, [_vm._v("位置")]),
    _vm._v(" "),
    _c("span", { staticClass: "desc" }, [
      _vm._v("可通过position设置标签的位置")
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "box", attrs: { id: "basicLayout2" } }, [
      _c(
        "div",
        { staticClass: "box-content" },
        [
          _c(
            "div",
            { staticClass: "tabs-position" },
            _vm._l(_vm.positionEvt, function(p) {
              return _c(
                "span",
                {
                  class: [{ active: p.checked }],
                  on: {
                    click: function($event) {
                      _vm.posEvt(p.name)
                    }
                  }
                },
                [_vm._v(_vm._s(p.name))]
              )
            })
          ),
          _vm._v(" "),
          _c("ls-tabs", {
            ref: "lsTabs2",
            attrs: { tabsData: _vm.tabsData2 },
            on: { tabsEvt: _vm.tabsEvt1 }
          }),
          _vm._v(" "),
          _c(
            "div",
            {
              ref: "boxContent",
              staticStyle: {
                position: "relative",
                margin: "30px 0 0 30px",
                "font-size": "14px"
              }
            },
            [_vm._v(_vm._s(_vm.tabsReturn1.name))]
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
          style: [{ height: _vm.showContent1 ? "auto" : "0" }]
        },
        [_vm._m(2)]
      ),
      _vm._v(" "),
      _c("div", { staticClass: "fixed-footer" }, [
        _c(
          "div",
          {
            ref: "boxFooter",
            staticClass: "box-footer",
            on: { click: _vm.footerEvt1 }
          },
          [
            _c("i", {
              staticClass: "box-footer-icon",
              class: [{ active: _vm.showContent1 }]
            }),
            _c("span", [
              _vm._v(_vm._s(_vm.showContent1 ? "隐藏代码" : "显示代码"))
            ]),
            _vm._v(" "),
            _c("button", {
              staticClass: "box-footer-btn",
              style: [{ opacity: _vm.showContent1 ? 1 : 0 }],
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
    _c("span", { staticClass: "sub" }, [_vm._v("Tabs Attributes")]),
    _vm._v(" "),
    _c(
      "ul",
      { staticClass: "grid tabs-grid" },
      _vm._l(_vm.attr, function(item) {
        return _c(
          "li",
          { staticClass: "row" },
          _vm._l(item, function(it) {
            return _c("div", {
              staticClass: "col",
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
        '\n                <ls-tabs :tabsData="tabsData" @tabsEvt="tabsEvt"></ls-tabs>\n                '
      ),
      _c("p", { staticClass: "txt" }, [_vm._v("页面数据")]),
      _vm._v(
        '\n                tabsData: [\n                    {id: "001", name: "用户管理"},\n                    {id: "002", name: "配置管理"},\n                    {id: "003", name: "角色管理"},\n                    {id: "004", name: "定时任务补偿"},\n                    {id: "005", name: "密码管理"}\n                ],\n            '
      )
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("pre", [
      _vm._v("                "),
      _c("p", { staticClass: "txt" }, [_vm._v("vue 页面")]),
      _vm._v(
        '\n                 <ls-tabs :tabsData="tabsData" @tabsEvt="tabsEvt"></ls-tabs>\n                '
      ),
      _c("p", { staticClass: "txt" }, [_vm._v("页面数据")]),
      _vm._v(
        '\n                tabsData1: {\n                    borderShow:true,\n                    list: [\n                        {id: "001", name: "用户管理"},\n                        {id: "002", name: "配置管理"},\n                        {id: "003", name: "角色管理"},\n                        {id: "004", name: "定时任务补偿"},\n                        {id: "005", name: "密码管理"}\n                    ]\n                }\n            '
      )
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("pre", [
      _vm._v("                "),
      _c("p", { staticClass: "txt" }, [_vm._v("vue 页面")]),
      _vm._v(
        '\n                 <ls-tabs :tabsData="tabsData" @tabsEvt="tabsEvt"></ls-tabs>\n                '
      ),
      _c("p", { staticClass: "txt" }, [_vm._v("页面数据")]),
      _vm._v(
        '\n                 tabsData2: {\n                    position:\'top\',\n                    list: [\n                        {id: "001", name: "用户管理"},\n                        {id: "002", name: "配置管理"},\n                        {id: "003", name: "角色管理"},\n                        {id: "004", name: "定时任务补偿"},\n                        {id: "005", name: "密码管理"}\n                    ]\n                },\n            '
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
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-0bd04612", esExports)
  }
}

/***/ })

});