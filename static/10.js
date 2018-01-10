webpackJsonplensyn_ui([10],{

/***/ 464:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_TreeEditTable_vue__ = __webpack_require__(487);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_TreeEditTable_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_TreeEditTable_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_TreeEditTable_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_TreeEditTable_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_0_vue_loader_lib_template_compiler_index_id_data_v_5c2a11f8_hasScoped_true_buble_transforms_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_template_index_0_TreeEditTable_vue__ = __webpack_require__(535);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(533)
}
var normalizeComponent = __webpack_require__(22)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-5c2a11f8"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_TreeEditTable_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_0_vue_loader_lib_template_compiler_index_id_data_v_5c2a11f8_hasScoped_true_buble_transforms_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_template_index_0_TreeEditTable_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "devPkg\\components\\common\\edittree\\TreeEditTable.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5c2a11f8", Component.options)
  } else {
    hotAPI.reload("data-v-5c2a11f8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 487:
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

exports.default = {
    data: function data() {
        return {
            code: '<ls-tree-edit-table :propObj="treePropObj" :listObj="treeListData"></ls-tree-edit-table>',
            showContent: false,
            treePropObj: [{ n: 'ID', v: 'id', w: 25, d: true }, { n: '组织名称', v: 'orgName', w: 20, t: 'btn' }, { n: '组织编码', v: 'orgCode', w: 15, t: 'icon' }, { n: '组织类型', v: 'orgType', w: 10 }, { n: '状态', v: 'curStatus', w: 10 }, { n: '操作', v: 'opt', w: 20 }],
            treeListData: [],
            treeData: [{ "id": 0, "name": "Name0", "orgName": "ORGName0", "orgCode": 1509269482376, "orgType": "外部协作单位", "curStatus": 4, "pId": "firstLayer" }, { "id": 1, "name": "Name1", "orgName": "ORGName1", "orgCode": 1509269482385, "orgType": "内部组织", "curStatus": 5, "pId": "firstLayer" }, { "id": 2, "name": "Name2", "orgName": "ORGName2", "orgCode": 1509269482395, "orgType": "内部组织", "curStatus": 2, "pId": "firstLayer" }, { "id": 3, "name": "Name3", "orgName": "ORGName3", "orgCode": 1509269482404, "orgType": "内部组织", "curStatus": 3, "pId": "firstLayer" }, { "id": 4, "name": "Name4", "orgName": "ORGName4", "orgCode": 1509269482414, "orgType": "内部组织", "curStatus": 1, "pId": "firstLayer" }, { "id": "00", "name": "Name00", "orgName": "ORGName0", "orgCode": 1509269482376, "orgType": "外部协作单位", "curStatus": 3, "pId": "0" }, { "id": "01", "name": "Name10", "orgName": "ORGName1", "orgCode": 1509269482378, "orgType": "外部协作单位", "curStatus": 1, "pId": "0" }, { "id": "02", "name": "Name20", "orgName": "ORGName2", "orgCode": 1509269482381, "orgType": "外部协作单位", "curStatus": 5, "pId": "0" }, { "id": "03", "name": "Name30", "orgName": "ORGName3", "orgCode": 1509269482384, "orgType": "内部组织", "curStatus": 1, "pId": "0" }, { "id": "04", "name": "Name40", "orgName": "ORGName4", "orgCode": 1509269482386, "orgType": "外部协作单位", "curStatus": 5, "pId": "0" }, { "id": "10", "name": "Name01", "orgName": "ORGName0", "orgCode": 1509269482385, "orgType": "外部协作单位", "curStatus": 4, "pId": 1 }, { "id": "11", "name": "Name11", "orgName": "ORGName1", "orgCode": 1509269482387, "orgType": "内部组织", "curStatus": 5, "pId": 1 }, { "id": "12", "name": "Name21", "orgName": "ORGName2", "orgCode": 1509269482391, "orgType": "内部组织", "curStatus": 2, "pId": 1 }, { "id": "13", "name": "Name31", "orgName": "ORGName3", "orgCode": 1509269482393, "orgType": "内部组织", "curStatus": 1, "pId": 1 }, { "id": "14", "name": "Name41", "orgName": "ORGName4", "orgCode": 1509269482396, "orgType": "内部组织", "curStatus": 3, "pId": 1 }, { "id": "20", "name": "Name02", "orgName": "ORGName0", "orgCode": 1509269482395, "orgType": "内部组织", "curStatus": 4, "pId": 2 }, { "id": "21", "name": "Name12", "orgName": "ORGName1", "orgCode": 1509269482397, "orgType": "内部组织", "curStatus": 1, "pId": 2 }, { "id": "22", "name": "Name22", "orgName": "ORGName2", "orgCode": 1509269482400, "orgType": "外部协作单位", "curStatus": 5, "pId": 2 }],
            params: [[{ name: "参数", cls: "col col-2" }, { name: "说明", cls: "col col-6" }, { name: "类型", cls: "col col-2" }], [{ name: "propObj", cls: "col col-2" }, { name: "为表格的配置列", cls: "col col-6" }, { name: "Array", cls: "col col-2" }], [{ name: "listObj", cls: "col col-2" }, { name: "表格显示的数据", cls: "col col-6" }, { name: "Array", cls: "col col-2" }], [{ name: "modalObj", cls: "col col-2" }, { name: "点击编辑控件按钮时，从外部反馈到表格的数据", cls: "col col-6" }, { name: "Object", cls: "col col-2" }], [{ name: "operateConfig", cls: "col col-2" }, { name: "操作列的权限配置", cls: "col col-6" }, { name: "Object", cls: "col col-2" }]],
            eventParams: [[{ name: "事件", cls: "col" }, { name: "事件名", cls: "col col-2" }, { name: "说明", cls: "col col-3" }, { name: "参数", cls: "col col-4" }], [{ name: "保存", cls: "col" }, { name: "onSelectEvt", cls: "col col-2" }, { name: "当保存编辑行后触发", cls: "col col-3" }, { name: "{type: 'save', obj: editRow}", cls: "col col-3" }], [{ name: "删除", cls: "col" }, { name: "onSelectEvt", cls: "col col-2" }, { name: "当删除行后触发", cls: "col col-3" }, { name: "{type: 'delete', obj: removeRow}", cls: "col col-4" }], [{ name: "modal", cls: "col" }, { name: "onSelectEvt", cls: "col col-2" }, { name: "点击编辑框中的按钮时触发", cls: "col col-3" }, { name: "{type: 'modal', obj: editRow}", cls: "col col-4" }]]
        };
    },

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
        this.treeListData = this.treeData;
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

/***/ 533:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(534);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(52)("0de725fc", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/_css-loader@0.28.8@css-loader/index.js!../../../../node_modules/_vue-loader@13.7.0@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5c2a11f8\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/_less-loader@4.0.5@less-loader/dist/cjs.js!../../../../node_modules/_vue-loader@13.7.0@vue-loader/lib/selector.js?type=styles&index=0!./TreeEditTable.vue", function() {
     var newContent = require("!!../../../../node_modules/_css-loader@0.28.8@css-loader/index.js!../../../../node_modules/_vue-loader@13.7.0@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5c2a11f8\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/_less-loader@4.0.5@less-loader/dist/cjs.js!../../../../node_modules/_vue-loader@13.7.0@vue-loader/lib/selector.js?type=styles&index=0!./TreeEditTable.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 534:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(51)(false);
// imports


// module
exports.push([module.i, "\n.component-content .grid .col-2[data-v-5c2a11f8] {\n  flex-basis: 20%;\n}\n.component-content .grid .col-3[data-v-5c2a11f8] {\n  flex-basis: 30%;\n}\n.component-content .grid .col-4[data-v-5c2a11f8] {\n  flex-basis: 40%;\n}\n.component-content .grid .col-6[data-v-5c2a11f8] {\n  flex-basis: 60%;\n}\n.component-content > .box > .box-content[data-v-5c2a11f8] {\n  width: 95% !important;\n  margin: 10px auto;\n}\n.component-content > .box > .box-content .box[data-v-5c2a11f8] {\n  margin: 0;\n  height: 246px !important;\n}\n", ""]);

// exports


/***/ }),

/***/ 535:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { ref: "containerNode", staticClass: "component-content" }, [
    _c("span", { staticClass: "title" }, [_vm._v("可编辑树形表格")]),
    _vm._v(" "),
    _c("span", { staticClass: "desc" }, [
      _vm._v("以表格形式展示层级数据，并进行操作")
    ]),
    _vm._v(" "),
    _c("span", { staticClass: "sub" }, [_vm._v("表格的使用方法")]),
    _vm._v(" "),
    _c("div", { staticClass: "box", attrs: { id: "basicLayout" } }, [
      _c(
        "div",
        { staticClass: "box-content" },
        [
          _c("ls-tree-edit-table", {
            staticClass: "box",
            attrs: { propObj: _vm.treePropObj, listObj: _vm.treeListData }
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
        [
          _c("pre", [
            _vm._v("                "),
            _c("div", { domProps: { textContent: _vm._s(_vm.code) } }),
            _vm._v("\n            ")
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
            _vm._v(" "),
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
          _vm._l(item, function(it) {
            return _c("div", {
              key: it.name,
              class: [it.cls],
              domProps: { innerHTML: _vm._s(it.name) }
            })
          })
        )
      })
    ),
    _vm._v(" "),
    _c("span", { staticClass: "sub" }, [_vm._v("事件说明")]),
    _vm._v(" "),
    _c(
      "ul",
      { staticClass: "grid event" },
      _vm._l(_vm.eventParams, function(item, index) {
        return _c(
          "li",
          { key: index, staticClass: "row" },
          _vm._l(item, function(it) {
            return _c("div", {
              key: it.name,
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
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-5c2a11f8", esExports)
  }
}

/***/ })

});