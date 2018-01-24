/*********************************************************************
 * Created by deming-su on 2017/11/29                                   *
 *********************************************************************/

import Button from './source/button/Button.vue'
import Input from './source/input/Input.vue'
import Selection from './source/selection/Selection.vue'
import Tabs from './source/tabs/Tabs.vue'
import TreeEditTable from "./source/treeedittable/TreeEditTable.vue";
import Line from './source/line/Line.vue'
import Pagination from './source/pagination/Pagination.vue'
import MPicker from './source/mpicker/MPicker.vue'
import Tree from "./source/tree/Tree.vue"
import Uploader from "./source/uploader/Uploader.vue"
import ConfirmDialog from "./source/confirmdialog/ConfirmDialog";
import Tooltip from "./source/tooltip/tooltip";

import '../../styles/templates.less'

module.exports = {
    install: function(Vue) {
        Vue.component('ls-selection', Selection);
        Vue.component('ls-button', Button);
        Vue.component('ls-input', Input);
        Vue.component('ls-tabs', Tabs);
        Vue.component("ls-tree-edit-table", TreeEditTable);
        Vue.component('ls-line', Line);
        Vue.component('ls-pagination', Pagination);
        Vue.component('ls-mpicker', MPicker);
        Vue.component("ls-tree", Tree);
        Vue.component("ls-uploader", Uploader);

        this._installGlobal(Vue);
        this._installDirective(Vue);
    },

    _installGlobal(Vue) {
        Vue.prototype.$lensyn = {};
        ConfirmDialog.install(Vue);        
    },

    /**
     * ÃÌº”÷∏¡Ó
     * @param {object} Vue 
     */
    _installDirective(Vue) {
        Vue.directive("ls-tooltip", Tooltip);
    }
};