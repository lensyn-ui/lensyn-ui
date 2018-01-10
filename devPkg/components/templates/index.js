/*********************************************************************
 * Created by deming-su on 2017/11/29                                   *
 *********************************************************************/

import Button from './source/Button.vue'
import Input from './source/Input.vue'
import Selection from './source/Selection.vue'
import Tabs from './source/Tabs.vue'
import TreeEditTable from "./source/TreeEditTable.vue";
import Line from './source/Line.vue'
import Pagination from './source/Pagination.vue'
import MPicker from './source/MPicker.vue'

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
    }
};