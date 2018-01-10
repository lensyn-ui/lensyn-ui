webpackJsonplensyn_ui([0],{

/***/ 453:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_Index_vue__ = __webpack_require__(470);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_Index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_Index_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_Index_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_Index_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_0_vue_loader_lib_template_compiler_index_id_data_v_c43d6238_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_template_index_0_Index_vue__ = __webpack_require__(508);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_Index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_0_vue_loader_lib_template_compiler_index_id_data_v_c43d6238_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_template_index_0_Index_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "devPkg\\components\\home\\Index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-c43d6238", Component.options)
  } else {
    hotAPI.reload("data-v-c43d6238", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 470:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _first = __webpack_require__(493);

var _first2 = _interopRequireDefault(_first);

var _second = __webpack_require__(500);

var _second2 = _interopRequireDefault(_second);

var _third = __webpack_require__(502);

var _third2 = _interopRequireDefault(_third);

var _fourth = __webpack_require__(504);

var _fourth2 = _interopRequireDefault(_fourth);

var _fifth = __webpack_require__(506);

var _fifth2 = _interopRequireDefault(_fifth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    components: { first: _first2.default, second: _second2.default, third: _third2.default, fourth: _fourth2.default, fifth: _fifth2.default },
    data: function data() {
        return {
            isScroll: false,
            scrollCount: 0,
            objProps: { val: 0, direct: "down" }
        };
    },

    methods: {
        scrollEvt: function scrollEvt(direct) {
            var me = this;
            me.scrollCount = direct > 0 ? ++me.scrollCount : --me.scrollCount;
            me.scrollCount = me.scrollCount < 0 ? 0 : me.scrollCount > 4 ? 4 : me.scrollCount;
            var screenHei = document.body.offsetHeight;
            me.$refs.homePage.setAttribute('style', 'top: -' + screenHei * me.scrollCount + 'px;');
            setTimeout(function () {
                me.isScroll = false;
                me.objProps = { val: me.scrollCount, direct: direct > 0 ? "down" : "up" };
            }, 200);
        }
    },
    mounted: function mounted() {
        var me = this;
        me.$nextTick(function () {
            var node = me.$refs.homePage;
            var screenHei = document.body.offsetHeight;

            node.setAttribute('style', 'height: ' + screenHei * 5 + 'px;');
            var nodes = node.querySelectorAll('.home-box-item');
            for (var i = 0; i < nodes.length; i++) {
                var it = nodes[i];
                it.setAttribute('style', 'height: ' + screenHei + 'px;');
            }
            var wheelName = navigator.userAgent.includes('Firefox') ? "DOMMouseScroll" : "mousewheel";
            node.addEventListener(wheelName, function (evt) {
                if (!me.isScroll) {
                    me.isScroll = true;
                    me.scrollEvt(navigator.userAgent.includes('Firefox') ? evt.detail : evt.deltaY);
                }
            });
        });
    },
    created: function created() {}
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

/***/ }),

/***/ 471:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _parseInt = __webpack_require__(494);

var _parseInt2 = _interopRequireDefault(_parseInt);

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

exports.default = {
    data: function data() {
        return {
            videoWidth: "",
            listHeight: "",
            menuList: [{ name: "指南", path: "/guide" }, { name: "组件", path: "/component" }, { name: "M组件", path: "/mcomponent" }, { name: "资源", path: "/resource" }],
            menuPath: '',
            menuStrokeWidth: "140",
            testPath: "M380,0 L0,0 v300 h380 V270 H60 V240 H380 V210 H60 V180 H380 V150 H60 V120 H380 V90 H60 V60 H380 V30 H60",
            logPath: "M150 400 L150 110 S100 10 50 110 L50 700 S50 850 850 850 L850 150 " + "S600 10 300 10 300 260 550 460 750 850 150 560",
            descList: [{ id: "ID001", icon: "icon", title: "指南", desc: "LensynUI 组件库的运行环境及组件库运用规则", path: "guide" }, { id: "ID002", icon: "icon0", title: "组件", desc: "为前端开发者提供简单易用的Vue组件，减少开发者重复工作量", path: "component" }, { id: "ID003", icon: "icon2", title: "M组件", desc: "为移动前端开发者提供简单易用的Vue组件，减少开发者重复工作量", path: "mcomponent" }, { id: "ID004", icon: "icon1", title: "资源", desc: "提供开发所需要的前端资源以及简单模板源码", path: "resource" }],
            menuShow: false
        };
    },

    methods: {
        toggleMenu: function toggleMenu() {
            var me = this;
            me.menuShow = !me.menuShow;
        }
    },
    created: function created() {
        var me = this;
        var menuStrokeWidth = (0, _parseInt2.default)(this.menuStrokeWidth);
        this.listHeight = document.body.offsetHeight + 'px';
        var firstStr = "M380,0 L0,0 v" + (0, _parseInt2.default)(this.listHeight) + " h380";
        var repeatNumber = (0, _parseInt2.default)((0, _parseInt2.default)(this.listHeight) / menuStrokeWidth);
        var height = (0, _parseInt2.default)(this.listHeight);
        for (var i = 0; i <= repeatNumber; i++) {
            height -= menuStrokeWidth;
            if (i % 2 === 0) {
                var newStr = "V" + height + " H60";
                firstStr += " " + newStr;
            } else {
                var _newStr = "V" + height + " H380";
                firstStr += " " + _newStr;
            }
        }
        this.menuPath = firstStr;
    },
    mounted: function mounted() {
        var me = this;
        me.$nextTick(function () {
            videojs(me.$refs.videoNode, {
                "autoplay": true,
                "loop": true,
                "isFullscreen": true
            });
        });
    }
};

/***/ }),

/***/ 472:
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),

/***/ 473:
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

exports.default = {
    props: ["objProps"],
    data: function data() {
        return {
            svgPath: "M490 0 L490 150 0 150 0 900 1000 900 1000 1200",
            clipPos: { x: 480, y: -1200, xx: -1030, yy: -490 },
            step: 10
        };
    },

    watch: {
        objProps: function objProps(val) {
            var me = this;
            if (val.val === 1) {
                if (val.direct === "down") {
                    me.clipPos = { x: 480, y: -1200, xx: -1030, yy: -290 };
                    me.runPath();
                }
                if (val.direct === "up") {
                    me.clipPos = { x: -1010, y: 910, xx: 990, yy: 1200 };
                    me.runPathUp();
                }
            }
        }
    },
    methods: {
        runPathUp: function runPathUp() {
            var me = this;
            var len = me.$refs.backSvgPath.getTotalLength() + 10;

            var counter = 0;
            var timer = setInterval(function () {
                if (counter < 310) {
                    counter += me.step;
                    me.clipPos.yy -= me.step;
                } else if (counter >= 310 && counter < 1310) {
                    counter += me.step;
                    me.clipPos.xx -= me.step;
                } else if (counter >= 1310 && counter < 2080) {
                    counter += me.step;
                    me.clipPos.y -= me.step;
                } else if (counter >= 2080 && counter < 2570) {
                    counter += me.step;
                    me.clipPos.x += me.step;
                } else if (counter >= 2570 && counter < len + 10) {
                    counter += me.step;
                    me.clipPos.y -= me.step;
                } else {
                    clearInterval(timer);
                    timer = null;
                }
            });
        },
        runPath: function runPath() {
            var me = this;
            var len = me.$refs.backSvgPath.getTotalLength() + 10;

            var counter = 0;
            var timer = setInterval(function () {
                if (counter < 160) {
                    counter += me.step;
                    me.clipPos.y += me.step;
                } else if (counter >= 160 && counter < 650) {
                    counter += me.step;
                    me.clipPos.x -= me.step;
                } else if (counter >= 650 && counter < 1380) {
                    counter += me.step;
                    me.clipPos.y += me.step;
                } else if (counter >= 1380 && counter < 2400) {
                    counter += me.step;
                    me.clipPos.xx += me.step;
                } else if (counter >= 2400 && counter < len) {
                    counter += me.step;
                    me.clipPos.yy += me.step;
                } else {
                    clearInterval(timer);
                    timer = null;
                }
            });
        }
    }
};

/***/ }),

/***/ 474:
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

exports.default = {
    props: ["objProps"],
    data: function data() {
        return {
            svgPath: "M1000 0 L1000 900 0 900 0 1200",
            clipPos: { x: 990, y: -1200 },
            step: 10
        };
    },

    watch: {
        objProps: function objProps(val) {
            var me = this;
            if (val.val === 2) {
                if (val.direct === "down") {
                    me.clipPos = { x: 990, y: -1200 };
                    me.runPath();
                }
                if (val.direct === "up") {
                    me.clipPos = { x: -1000, y: 1200 };
                    me.runPathUp();
                }
            }
        }
    },
    methods: {
        runPathUp: function runPathUp() {
            var me = this;
            var len = me.$refs.backSvgPath.getTotalLength() + 10;

            var counter = 0;
            var timer = setInterval(function () {
                if (counter < 310) {
                    counter += me.step;
                    me.clipPos.y -= me.step;
                } else if (counter >= 310 && counter < 1300) {
                    counter += me.step;
                    me.clipPos.x += me.step;
                } else if (counter >= 1300 && counter < len - 20) {
                    counter += me.step;
                    me.clipPos.y -= me.step;
                } else {
                    clearInterval(timer);
                    timer = null;
                }
            });
        },
        runPath: function runPath() {
            var me = this;
            var len = me.$refs.backSvgPath.getTotalLength() + 10;

            var counter = 0;
            var timer = setInterval(function () {
                if (counter < 910) {
                    counter += me.step;
                    me.clipPos.y += me.step;
                } else if (counter >= 910 && counter < 1910) {
                    counter += me.step;
                    me.clipPos.x -= me.step;
                } else if (counter >= 1910 && counter < len - 10) {
                    counter += me.step;
                    me.clipPos.y += me.step;
                } else {
                    clearInterval(timer);
                    timer = null;
                }
            });
        }
    }
};

/***/ }),

/***/ 475:
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

exports.default = {
    props: ["objProps"],
    data: function data() {
        return {
            svgPath: "M0 0 L0 900 1000 900 1000 1200",
            clipPos: { x: 990, y: -1200 },
            step: 10
        };
    },

    watch: {
        objProps: function objProps(val) {
            var me = this;
            if (val.val === 3) {
                if (val.direct === "down") {
                    me.clipPos = { x: -1010, y: -1200 };
                    me.runPath();
                }
                if (val.direct === "up") {
                    me.clipPos = { x: 990, y: 1200 };
                    me.runPathUp();
                }
            }
        }
    },
    methods: {
        runPathUp: function runPathUp() {
            var me = this;
            var len = me.$refs.backSvgPath.getTotalLength() + 10;

            var counter = 0;
            var timer = setInterval(function () {
                if (counter < 310) {
                    counter += me.step;
                    me.clipPos.y -= me.step;
                } else if (counter >= 310 && counter < 1310) {
                    counter += me.step;
                    me.clipPos.x -= me.step;
                } else if (counter >= 1310 && counter < 2200) {
                    counter += me.step;
                    me.clipPos.y -= me.step;
                } else {
                    clearInterval(timer);
                    timer = null;
                }
            });
        },
        runPath: function runPath() {
            var me = this;
            var len = me.$refs.backSvgPath.getTotalLength() + 10;

            var counter = 0;
            var timer = setInterval(function () {
                if (counter < 910) {
                    counter += me.step;
                    me.clipPos.y += me.step;
                } else if (counter >= 910 && counter < 1910) {
                    counter += me.step;
                    me.clipPos.x += me.step;
                } else if (counter >= 1910 && counter < len - 10) {
                    counter += me.step;
                    me.clipPos.y += me.step;
                } else {
                    clearInterval(timer);
                    timer = null;
                }
            });
        }
    }
};

/***/ }),

/***/ 476:
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

exports.default = {
    props: ["objProps"],
    data: function data() {
        return {
            svgPath: "M1000 0 L1000 900 0 900 0 1200",
            clipPos: { x: 990, y: -1200 },
            step: 10
        };
    },

    watch: {
        objProps: function objProps(val) {
            var me = this;
            if (val.val === 4) {
                if (val.direct === "down") {
                    me.clipPos = { x: 990, y: -1200 };
                    me.runPath();
                }
                if (val.direct === "up") {
                    me.clipPos = { x: -1000, y: 1200 };
                    me.runPathUp();
                }
            }
        }
    },
    methods: {
        runPathUp: function runPathUp() {
            var me = this;
            var len = me.$refs.backSvgPath.getTotalLength() + 10;

            var counter = 0;
            var timer = setInterval(function () {
                if (counter < 310) {
                    counter += me.step;
                    me.clipPos.y -= me.step;
                } else if (counter >= 310 && counter < 1300) {
                    counter += me.step;
                    me.clipPos.x += me.step;
                } else if (counter >= 1300 && counter < len - 20) {
                    counter += me.step;
                    me.clipPos.y -= me.step;
                } else {
                    clearInterval(timer);
                    timer = null;
                }
            });
        },
        runPath: function runPath() {
            var me = this;
            var len = me.$refs.backSvgPath.getTotalLength() + 10;

            var counter = 0;
            var timer = setInterval(function () {
                if (counter < 910) {
                    counter += me.step;
                    me.clipPos.y += me.step;
                } else if (counter >= 910 && counter < 1910) {
                    counter += me.step;
                    me.clipPos.x -= me.step;
                } else if (counter >= 1910 && counter < len - 10) {
                    counter += me.step;
                    me.clipPos.y += me.step;
                } else {
                    clearInterval(timer);
                    timer = null;
                }
            });
        }
    }
};

/***/ }),

/***/ 493:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_first_vue__ = __webpack_require__(471);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_first_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_first_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_first_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_first_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_0_vue_loader_lib_template_compiler_index_id_data_v_a7246050_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_template_index_0_first_vue__ = __webpack_require__(499);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_first_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_0_vue_loader_lib_template_compiler_index_id_data_v_a7246050_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_template_index_0_first_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "devPkg\\components\\home\\index\\first.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a7246050", Component.options)
  } else {
    hotAPI.reload("data-v-a7246050", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 494:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(495), __esModule: true };

/***/ }),

/***/ 495:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(496);
module.exports = parseInt;


/***/ }),

/***/ 496:
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(102);
var $parseInt = __webpack_require__(497);
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', { parseInt: $parseInt });


/***/ }),

/***/ 497:
/***/ (function(module, exports, __webpack_require__) {

var $parseInt = __webpack_require__(69).parseInt;
var $trim = __webpack_require__(498).trim;
var ws = __webpack_require__(472);
var hex = /^[-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;


/***/ }),

/***/ 498:
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(102);
var defined = __webpack_require__(104);
var fails = __webpack_require__(70);
var spaces = __webpack_require__(472);
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;


/***/ }),

/***/ 499:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "home-first-container" }, [
    _c(
      "video",
      {
        ref: "videoNode",
        staticClass: "video-js",
        staticStyle: { "object-fit": "fill", width: "100%" },
        attrs: { loop: "", preload: "auto" }
      },
      [
        _c("source", {
          attrs: { src: "/static/video/login.mp4", type: "video/mp4" }
        })
      ]
    ),
    _vm._v(" "),
    _c("div", { staticClass: "logo" }, [
      _c("div", { staticClass: "brand" }, [
        _c("div", { staticClass: "icon" }, [
          _c(
            "svg",
            {
              attrs: { viewBox: "0 0 1000 1000", width: "100%", height: "100%" }
            },
            [
              _c("path", {
                staticClass: "path1",
                staticStyle: {
                  fill: "none",
                  stroke: "#1296db",
                  "stroke-width": "20"
                },
                attrs: { d: _vm.logPath }
              })
            ]
          )
        ]),
        _vm._v(" "),
        _c("span", { staticClass: "title" }, [_vm._v("LensynUI")]),
        _vm._v(" "),
        _c("span", { staticClass: "desc" }, [
          _vm._v("一款基于Vue2.0的简洁组件库")
        ])
      ])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "first-menu" }, [
      _c(
        "div",
        {
          staticClass: "menu-box",
          class: [{ active: _vm.menuShow }],
          on: { click: _vm.toggleMenu }
        },
        [_c("span"), _vm._v(" "), _c("span"), _vm._v(" "), _c("span")]
      ),
      _vm._v(" "),
      _vm.menuShow
        ? _c(
            "div",
            { staticClass: "menu-list", style: { height: _vm.listHeight } },
            [
              _c("svg", { attrs: { width: "100%", height: "100%" } }, [
                _c(
                  "g",
                  {
                    staticStyle: {
                      fill: "none",
                      stroke: "rgba(53, 195, 230, 0.432)"
                    },
                    style: [{ strokeWidth: _vm.menuStrokeWidth }]
                  },
                  [
                    _c("path", {
                      ref: "mPath",
                      staticClass: "menu-path",
                      class: [{ active: _vm.menuShow }],
                      staticStyle: {
                        strokeDasharray: "5000",
                        strokeDashoffset: "0"
                      },
                      attrs: { d: _vm.menuPath }
                    })
                  ]
                )
              ]),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "menu-span" },
                _vm._l(_vm.menuList, function(item, i) {
                  return _c(
                    "router-link",
                    { key: "key" + i, attrs: { to: item.path } },
                    [_vm._v(_vm._s(item.name))]
                  )
                })
              )
            ]
          )
        : _vm._e()
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
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-a7246050", esExports)
  }
}

/***/ }),

/***/ 500:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_second_vue__ = __webpack_require__(473);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_second_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_second_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_second_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_second_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_0_vue_loader_lib_template_compiler_index_id_data_v_06c5cc7c_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_template_index_0_second_vue__ = __webpack_require__(501);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_second_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_0_vue_loader_lib_template_compiler_index_id_data_v_06c5cc7c_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_template_index_0_second_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "devPkg\\components\\home\\index\\second.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-06c5cc7c", Component.options)
  } else {
    hotAPI.reload("data-v-06c5cc7c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 501:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "second-screen" }, [
    _c("div", { staticClass: "path-box" }, [
      _c(
        "svg",
        { attrs: { viewBox: "0 0 1000 1200", width: "100%", height: "100%" } },
        [
          _c("clipPath", { attrs: { id: "landingClipTop" } }, [
            _c("rect", {
              ref: "svgPath",
              attrs: {
                x: _vm.clipPos.x,
                y: _vm.clipPos.y,
                width: "1020",
                height: "1200"
              }
            }),
            _vm._v(" "),
            _c("rect", {
              ref: "svgPath",
              attrs: {
                x: _vm.clipPos.xx,
                y: _vm.clipPos.yy,
                width: "1020",
                height: "1200"
              }
            })
          ]),
          _vm._v(" "),
          _c("path", {
            ref: "backSvgPath",
            attrs: {
              fill: "none",
              stroke: "#dcdcdc",
              "stroke-width": "20",
              "stroke-miterlimit": "10",
              d: _vm.svgPath
            }
          }),
          _vm._v(" "),
          _c("g", { staticStyle: { "clip-path": "url(#landingClipTop)" } }, [
            _c("path", {
              attrs: {
                fill: "none",
                stroke: "#1296db",
                "stroke-width": "20",
                "stroke-miterlimit": "10",
                d: _vm.svgPath
              }
            })
          ])
        ]
      )
    ]),
    _vm._v(" "),
    _vm._m(0),
    _vm._v(" "),
    _c("div", { staticClass: "txt-box" }, [
      _c(
        "div",
        { staticClass: "box" },
        [
          _c("span", { staticClass: "title" }, [_vm._v("lensyn-ui 指南")]),
          _vm._v(" "),
          _c("span", { staticClass: "desc" }, [
            _vm._v("LensynUI 组件库的运行环境及组件库运用规则")
          ]),
          _vm._v(" "),
          _c(
            "router-link",
            { staticClass: "view-btn", attrs: { to: "/guide" } },
            [_vm._v("查看详情"), _c("i", { staticClass: "icon" })]
          )
        ],
        1
      )
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "img-box" }, [
      _c("div", { staticClass: "img-box" }, [
        _c("div", { staticClass: "box2" }, [
          _c("div", { staticClass: "layer" })
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "box1" }, [
          _c("div", { staticClass: "layer" })
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "box0" }, [
          _c("div", { staticClass: "layer" })
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "home-guide-icon-box" }, [
          _c("div", { staticClass: "container" }, [
            _c("div", { staticClass: "face0" }),
            _vm._v(" "),
            _c("div", { staticClass: "face1" }),
            _vm._v(" "),
            _c("div", { staticClass: "face2" }),
            _vm._v(" "),
            _c("div", { staticClass: "face3" }),
            _vm._v(" "),
            _c("div", { staticClass: "face4" }),
            _vm._v(" "),
            _c("div", { staticClass: "face5" })
          ])
        ])
      ])
    ])
  }
]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-06c5cc7c", esExports)
  }
}

/***/ }),

/***/ 502:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_third_vue__ = __webpack_require__(474);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_third_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_third_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_third_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_third_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_0_vue_loader_lib_template_compiler_index_id_data_v_fcc761e2_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_template_index_0_third_vue__ = __webpack_require__(503);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_third_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_0_vue_loader_lib_template_compiler_index_id_data_v_fcc761e2_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_template_index_0_third_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "devPkg\\components\\home\\index\\third.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-fcc761e2", Component.options)
  } else {
    hotAPI.reload("data-v-fcc761e2", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 503:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "second-screen" }, [
    _c("div", { staticClass: "path-box" }, [
      _c(
        "svg",
        { attrs: { viewBox: "0 0 1000 1200", width: "100%", height: "100%" } },
        [
          _c("clipPath", { attrs: { id: "landingClipTop0" } }, [
            _c("rect", {
              ref: "svgPath",
              attrs: {
                x: _vm.clipPos.x,
                y: _vm.clipPos.y,
                width: "1020",
                height: "1200"
              }
            })
          ]),
          _vm._v(" "),
          _c("path", {
            ref: "backSvgPath",
            attrs: {
              fill: "none",
              stroke: "#dcdcdc",
              "stroke-width": "20",
              "stroke-miterlimit": "10",
              d: _vm.svgPath
            }
          }),
          _vm._v(" "),
          _c("g", { staticStyle: { "clip-path": "url(#landingClipTop0)" } }, [
            _c("path", {
              attrs: {
                fill: "none",
                stroke: "#1296db",
                "stroke-width": "20",
                "stroke-miterlimit": "10",
                d: _vm.svgPath
              }
            })
          ])
        ]
      )
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "txt-box" }, [
      _c(
        "div",
        { staticClass: "box left" },
        [
          _c("span", { staticClass: "title" }, [_vm._v("组件 DEMO")]),
          _vm._v(" "),
          _c("span", { staticClass: "desc" }, [
            _vm._v("为前端开发者提供简单易用的Vue组件，减少开发者重复工作量")
          ]),
          _vm._v(" "),
          _c(
            "router-link",
            { staticClass: "view-btn", attrs: { to: "/component" } },
            [_vm._v("查看详情"), _c("i", { staticClass: "icon" })]
          )
        ],
        1
      )
    ]),
    _vm._v(" "),
    _vm._m(0)
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "img-box" }, [
      _c("div", { staticClass: "img-box right" }, [
        _c("div", { staticClass: "box2" }, [
          _c("div", { staticClass: "layer" })
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "box1" }, [
          _c("div", { staticClass: "layer" })
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "home-demo-info" }, [
          _c("div", { staticClass: "box" }, [
            _c("div", { staticClass: "layer0" }, [_c("div")]),
            _vm._v(" "),
            _c("div", { staticClass: "layer1" }, [
              _c("div", [
                _c("span"),
                _vm._v(" "),
                _c("span"),
                _vm._v(" "),
                _c("span"),
                _vm._v(" "),
                _c("span"),
                _vm._v(" "),
                _c("span")
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "layer2" }, [
              _c("div", [_c("span")]),
              _vm._v(" "),
              _c("div", [_c("span")]),
              _vm._v(" "),
              _c("div", [_c("span")]),
              _vm._v(" "),
              _c("div", [_c("span")])
            ])
          ])
        ])
      ])
    ])
  }
]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-fcc761e2", esExports)
  }
}

/***/ }),

/***/ 504:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_fourth_vue__ = __webpack_require__(475);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_fourth_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_fourth_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_fourth_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_fourth_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_0_vue_loader_lib_template_compiler_index_id_data_v_60b4af22_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_template_index_0_fourth_vue__ = __webpack_require__(505);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_fourth_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_0_vue_loader_lib_template_compiler_index_id_data_v_60b4af22_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_template_index_0_fourth_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "devPkg\\components\\home\\index\\fourth.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-60b4af22", Component.options)
  } else {
    hotAPI.reload("data-v-60b4af22", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 505:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "second-screen" }, [
    _c("div", { staticClass: "path-box" }, [
      _c(
        "svg",
        { attrs: { viewBox: "0 0 1000 1200", width: "100%", height: "100%" } },
        [
          _c("clipPath", { attrs: { id: "landingClipTop1" } }, [
            _c("rect", {
              ref: "svgPath",
              attrs: {
                x: _vm.clipPos.x,
                y: _vm.clipPos.y,
                width: "1020",
                height: "1200"
              }
            })
          ]),
          _vm._v(" "),
          _c("path", {
            ref: "backSvgPath",
            attrs: {
              fill: "none",
              stroke: "#dcdcdc",
              "stroke-width": "20",
              "stroke-miterlimit": "10",
              d: _vm.svgPath
            }
          }),
          _vm._v(" "),
          _c("g", { staticStyle: { "clip-path": "url(#landingClipTop1)" } }, [
            _c("path", {
              attrs: {
                fill: "none",
                stroke: "#1296db",
                "stroke-width": "20",
                "stroke-miterlimit": "10",
                d: _vm.svgPath
              }
            })
          ])
        ]
      )
    ]),
    _vm._v(" "),
    _vm._m(0),
    _vm._v(" "),
    _c("div", { staticClass: "txt-box" }, [
      _c(
        "div",
        { staticClass: "box" },
        [
          _c("span", { staticClass: "title" }, [_vm._v("Mobile 组件")]),
          _vm._v(" "),
          _c("span", { staticClass: "desc" }, [
            _vm._v(
              "为移动前端开发者提供简单易用的Vue组件，减少开发者重复工作量"
            )
          ]),
          _vm._v(" "),
          _c(
            "router-link",
            { staticClass: "view-btn", attrs: { to: "/mcomponent" } },
            [_vm._v("查看详情"), _c("i", { staticClass: "icon" })]
          )
        ],
        1
      )
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "img-box" }, [
      _c("div", { staticClass: "img-box" }, [
        _c("div", { staticClass: "box2" }, [
          _c("div", { staticClass: "layer" })
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "box1" }, [
          _c("div", { staticClass: "layer" })
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "box0" }, [
          _c("div", { staticClass: "layer" })
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "home-mobile-demo" }, [
          _c("span", [_vm._v("<ls-selection")]),
          _vm._v(" "),
          _c("span", { staticClass: "f22" }, [_vm._v("<ls-datagrid")]),
          _vm._v(" "),
          _c("span", { staticClass: "f16" }, [_vm._v("<ls-input")]),
          _vm._v(" "),
          _c("span", [_vm._v("<ls-message")]),
          _vm._v(" "),
          _c("span", [_vm._v("<ls-button")]),
          _vm._v(" "),
          _c("span", { staticClass: "f18" }, [_vm._v("<ls-XXXXX")]),
          _vm._v(" "),
          _c("span", { staticClass: "f22" }, [_vm._v("<...")])
        ])
      ])
    ])
  }
]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-60b4af22", esExports)
  }
}

/***/ }),

/***/ 506:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_fifth_vue__ = __webpack_require__(476);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_fifth_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_fifth_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_fifth_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_fifth_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_0_vue_loader_lib_template_compiler_index_id_data_v_32aec75f_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_template_index_0_fifth_vue__ = __webpack_require__(507);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_script_index_0_fifth_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_0_vue_loader_lib_template_compiler_index_id_data_v_32aec75f_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_0_vue_loader_lib_selector_type_template_index_0_fifth_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "devPkg\\components\\home\\index\\fifth.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-32aec75f", Component.options)
  } else {
    hotAPI.reload("data-v-32aec75f", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 507:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "second-screen" }, [
    _c("div", { staticClass: "path-box" }, [
      _c(
        "svg",
        { attrs: { viewBox: "0 0 1000 1200", width: "100%", height: "100%" } },
        [
          _c("clipPath", { attrs: { id: "landingClipTop2" } }, [
            _c("rect", {
              ref: "svgPath",
              attrs: {
                x: _vm.clipPos.x,
                y: _vm.clipPos.y,
                width: "1020",
                height: "1200"
              }
            })
          ]),
          _vm._v(" "),
          _c("path", {
            ref: "backSvgPath",
            attrs: {
              fill: "none",
              stroke: "#dcdcdc",
              "stroke-width": "20",
              "stroke-miterlimit": "10",
              d: _vm.svgPath
            }
          }),
          _vm._v(" "),
          _c("g", { staticStyle: { "clip-path": "url(#landingClipTop2)" } }, [
            _c("path", {
              attrs: {
                fill: "none",
                stroke: "#1296db",
                "stroke-width": "20",
                "stroke-miterlimit": "10",
                d: _vm.svgPath
              }
            })
          ])
        ]
      )
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "txt-box" }, [
      _c(
        "div",
        { staticClass: "box" },
        [
          _c("span", { staticClass: "title" }, [_vm._v("开发库资源")]),
          _vm._v(" "),
          _c("span", { staticClass: "desc" }, [
            _vm._v("提供开发所需要的前端资源以及简单模板源码")
          ]),
          _vm._v(" "),
          _c(
            "router-link",
            { staticClass: "view-btn", attrs: { to: "/resource" } },
            [_vm._v("查看详情"), _c("i", { staticClass: "icon" })]
          )
        ],
        1
      )
    ]),
    _vm._v(" "),
    _vm._m(0)
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "img-box" }, [
      _c(
        "div",
        { staticClass: "img-box", staticStyle: { left: "0", margin: "0" } },
        [
          _c("div", { staticClass: "home-source-icon" }, [
            _c("div", { staticClass: "box" }, [
              _c("div", { staticClass: "web" }),
              _vm._v(" "),
              _c("div", { staticClass: "mobile" }),
              _vm._v(" "),
              _c("div", { staticClass: "bs" }),
              _vm._v(" "),
              _c("div", { staticClass: "desk" }),
              _vm._v(" "),
              _c("div", { staticClass: "other" })
            ])
          ])
        ]
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
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-32aec75f", esExports)
  }
}

/***/ }),

/***/ 508:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "page-container home-container-box" }, [
    _c("div", { ref: "homePage", staticClass: "home-page full" }, [
      _c(
        "div",
        { staticClass: "home-box-item" },
        [_c("first", { attrs: { objProps: _vm.objProps } })],
        1
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "home-box home-box-item" },
        [_c("second", { attrs: { objProps: _vm.objProps } })],
        1
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "home-box home-box-item" },
        [_c("third", { attrs: { objProps: _vm.objProps } })],
        1
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "home-box home-box-item" },
        [_c("fourth", { attrs: { objProps: _vm.objProps } })],
        1
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "home-box home-box-item" },
        [_c("fifth", { attrs: { objProps: _vm.objProps } })],
        1
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
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-c43d6238", esExports)
  }
}

/***/ })

});