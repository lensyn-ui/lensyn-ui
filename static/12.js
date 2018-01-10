webpackJsonplensyn_ui([12],{

/***/ 466:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_Pagination_vue__ = __webpack_require__(489);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_Pagination_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_Pagination_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_Pagination_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_Pagination_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_0_vue_loader_lib_template_compiler_index_id_data_v_ee81728c_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_template_index_0_Pagination_vue__ = __webpack_require__(537);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_Pagination_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_0_vue_loader_lib_template_compiler_index_id_data_v_ee81728c_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_template_index_0_Pagination_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "devPkg\\components\\common\\pagination\\Pagination.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-ee81728c", Component.options)
  } else {
    hotAPI.reload("data-v-ee81728c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 489:
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

exports.default = {
	data: function data() {
		return {
			paginationData: {
				total: 100,
				rows: 20,
				page: 2,
				pageGroup: 7,
				rowsData: [{ value: 10, text: '10条/页' }, { value: 20, text: '20条/页' }, { value: 30, text: '30条/页' }, { value: 40, text: '40条/页' }, { value: 50, text: '50条/页' }],
				batchButtons: [{ id: 'batchDelete', text: '批量删除' }],
				showBatchButtons: true
			},
			showContent: false,
			params: [[{ name: "参数", cls: "col" }, { name: "说明", cls: "col mark" }, { name: "类型", cls: "col" }], [{ name: "total", cls: "col" }, { name: "总条数", cls: "col mark" }, { name: "number", cls: "col" }], [{ name: "page", cls: "col" }, { name: "当前页码", cls: "col mark" }, { name: "number", cls: "col" }], [{ name: "pageGroup", cls: "col" }, { name: "页码按钮列表显示数量", cls: "col mark" }, { name: "number(odd)", cls: "col" }], [{ name: "rows", cls: "col" }, { name: "每页显示条数", cls: "col mark" }, { name: "number", cls: "col" }], [{ name: "rowsData", cls: "col" }, { name: "每页显示条数下拉数据，格式为[{value: 10,text: '10条/页'},t{value: 20,text: '20条/页'}]", cls: "col mark" }, { name: "array", cls: "col" }], [{ name: "batchButtons", cls: "col" }, { name: "批量操作按钮数据，数组中每一个对象为一个按钮渲染数据格式为[{id: 'batchDelete',text: '批量删除',attr: [{'name': 'test'}]}]", cls: "col mark" }, { name: "array", cls: "col" }], [{ name: "paginationBackground", cls: "col" }, { name: "分页背景色", cls: "col mark" }, { name: "string", cls: "col" }], [{ name: "paginationPosition", cls: "col" }, { name: "分页内容显示位置", cls: "col mark" }, { name: "string", cls: "col" }], [{ name: "pageGroupHoverBackground", cls: "col" }, { name: "页码列表数字点击时的背景色", cls: "col mark" }, { name: "string", cls: "col" }], [{ name: "pageGroupHoverColor", cls: "col" }, { name: "页码列表数字点击时的字体颜色", cls: "col mark" }, { name: "string", cls: "col" }], [{ name: "pageGroupborderColor", cls: "col" }, { name: "页码列表边框颜色", cls: "col mark" }, { name: "string", cls: "col" }], [{ name: "hasPageGroupborder", cls: "col" }, { name: "页码列表是否有边框", cls: "col mark" }, { name: "boolean", cls: "col" }], [{ name: "jumpBeforeContent", cls: "col" }, { name: "跳转输入框前面显示内容", cls: "col mark" }, { name: "string", cls: "col" }], [{ name: "jumpAfterContent", cls: "col" }, { name: "跳转输入框后面显示内容", cls: "col mark" }, { name: "string", cls: "col" }], [{ name: "showJumpPrompt", cls: "col" }, { name: "是否显示页码跳转输入框", cls: "col mark" }, { name: "boolean", cls: "col" }], [{ name: "showBatchButtons", cls: "col" }, { name: "是否显示批量操作按钮", cls: "col mark" }, { name: "boolean", cls: "col" }]]
		};
	},

	computed: {},
	watch: {},
	/**
  * @type {{}}
  */
	methods: {
		paginationChange: function paginationChange(data) {
			console.log(data);
		},
		batchButtonClick: function batchButtonClick(buttonInfo) {
			console.log(buttonInfo);
		},
		footerEvt: function footerEvt() {
			var me = this;
			me.showContent = !me.showContent;
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

/***/ 537:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { ref: "containerNode", staticClass: "component-content" }, [
    _c("span", { staticClass: "title" }, [_vm._v("分页")]),
    _vm._v(" "),
    _c("span", { staticClass: "desc" }, [
      _vm._v(
        "列表进行分页展示，根据传入的当前页、每页显示的条数和总条数进行数据展示"
      )
    ]),
    _vm._v(" "),
    _c("span", { staticClass: "sub" }, [_vm._v("分页使用方法")]),
    _vm._v(" "),
    _c("span", { staticClass: "desc" }, [_vm._v("引入分页组件，传入对应参数")]),
    _vm._v(" "),
    _c("div", { staticClass: "box", attrs: { id: "basicLayout" } }, [
      _c(
        "div",
        { staticClass: "box-content" },
        [
          _c("ls-pagination", {
            attrs: { paginationData: _vm.paginationData },
            on: {
              paginationChange: _vm.paginationChange,
              batchButtonClick: _vm.batchButtonClick
            }
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
    _c("span", { staticClass: "sub" }, [_vm._v("传入参数类型说明")]),
    _vm._v(" "),
    _c(
      "ul",
      { staticClass: "grid" },
      _vm._l(_vm.params, function(item) {
        return _c(
          "li",
          { staticClass: "row" },
          _vm._l(item, function(it, i) {
            return _c("div", {
              class: [it.cls],
              style: [
                { flex: i === 0 ? "0 0 20%" : i === 1 ? "0 0 70%" : "10%" }
              ],
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
      _vm._v("                    "),
      _c("p", { staticClass: "txt" }, [_vm._v("vue 页面")]),
      _vm._v(
        '\n                    <ls-pagination :paginationData="paginationData" @paginationChange="paginationChange" @batchButtonClick="batchButtonClick"></ls-pagination>\n                    '
      ),
      _c("p", { staticClass: "txt" }, [_vm._v("页面数据")]),
      _vm._v(
        "\n                    paginationData: {\n\t\t\t\t\t\ttotal: 100,\n\t\t\t\t\t\trows: 20,\n\t\t\t\t\t\tpage: 2,\n\t\t\t\t\t\tpageGroup: 7,\n\t\t\t\t\t\trowsData: [\n\t\t\t\t\t\t\t{value: 10,text: '10条/页'},\n\t\t\t\t\t\t\t{value: 20,text: '20条/页'},\n\t\t\t\t\t\t\t{value: 30,text: '30条/页'},\n\t\t\t\t\t\t\t{value: 40,text: '40条/页'},\n\t\t\t\t\t\t\t{value: 50,text: '50条/页'}\n\t\t\t\t\t\t],\n\t\t\t\t\t\tbatchButtons: [\n\t\t\t\t\t\t\t{id: 'batchDelete',text: '批量删除'}\n\t\t\t\t\t\t],\n\t\t\t\t\t\tshowBatchButtons: true\n\t\t\t\t\t}\n                "
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
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-ee81728c", esExports)
  }
}

/***/ })

});