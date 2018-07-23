<template>
    <div class="vue-grid" :class="gridModifier">
        <grid-header ref="header"
                     :headerColumns="headerColumns"
                     :contentColumns="contentColumns"
                     :headerData="headerData"
                     :isColumnSetGrid="isColumnSetGrid"
                     :selectedAllCheckboxData="selectedAllCheckboxData" />

        <grid-body ref="body"
                   :datas="tableDatas"
                   :columns="contentColumns"
                   :isColumnSetGrid="isColumnSetGrid"
                   :idProperty="idProperty"
                   :checkboxSelected="checkboxSelected"
                   :activeRowIds="activeRowIds"
                   :radioSelected="radioSelected"
                   :rowClassNameFn="rowClassNameFn"
                   :isShowNoticeMsg="isShowNoticeMsg"
                   :noticeMsg="noticeMsg"
                   :gridType="gridType"
                   :treeChildProperty="treeChildProperty"
                   :isParentRow="isParentRow"
                   :treeIndent="treeIndent"
                   :isAlwaysExpand="isAlwaysExpand"
                   :treeChildTemplate="treeChildTemplate"
                   @contentHorizontalScroll="handleContentHorizontalScroll"
                   @contentScrollbarWidth="handleContentScrollbarWidth"
                   @contentVerticalScroll="handleContentVerticalScroll"/>

        <grid-footer ref="footer" v-if="isShowFooter"
                     :footerColumns="contentColumns"
                     :footerData="footerData"
                     :isColumnSetGrid="isColumnSetGrid"
                     :selectedAllCheckboxData="selectedAllCheckboxData"
                     :totalRows="totalRows"
                     :perpageCount="perpageCount"
                     :isEnablePagination="isEnablePagination"
                     :pageSelections="pageSelections"
                     :currentPage="currentPage"/>
    </div>
</template>

<script>
    import Vue from "vue";
    
    import Util from "./helper/GridUtil";
    import SortUtil from "./helper/GridSort";
    import ColumnStructure from "./helper/ColumnStructure";
    import StyleSheet from "./helper/StyleSheet";

    import IdMixin from "./mixins/IdMixin";
    import EventBusMixin from "./mixins/EventBusMixin";

    import Header from "./Header.vue";
    import Body from "./Body.vue";
    import Footer from "./Footer.vue";

    const GRID_NAME_PREFIX = "vue-grid-";
    let gridCount = 0;

    export default {
        mixins: [IdMixin, EventBusMixin],

        props: {
            uniqueName: {
                type: String,
            },

            columns: {
                type: Array,
                required: true
            },

            datas: {
                type: Array,
                default: () => []
            },

            isShowFooter: {
                type: Boolean,
                default: false
            },

            isAllowEditorChange: {
                type: Function
            },

            editorMode: {
                type: String,
                default: "single"
            },

            isAutoFocusEditor: {
                type: Boolean,
                default: true
            },

            rowClassNameFn: {
                type: [String, Function]
            },

            isFixedHeight: {
                type: Boolean,
                default: true
            },

            isNotCopyData: {
                type: Boolean,
                default: false
            },

            isEnableActiveRow: {
                type: Boolean,
                default: false
            },

            activeRowMode: {
                type: String,
                default: "single"
            },

            // 分页
            pageSelections: {
                type: Array
            },
            isEnablePagination: {
                type: Boolean,
                default: false
            },
            initPerpage: {
                type: Number
            },

            // 树
            treeChildProperty: {
                type: String,
                default: "children"
            },

            isParentRow: {
                type: [String, Function],
                default: "typeof #{children} !== 'undefined'"
            },

            treeIndent: {
                type: Number,
                default: 10
            },

            isAlwaysExpand: {
                type: Boolean,
                default: false
            },

            // 排序
            gridSortMode: {
                type: String,
                default: "single"
            },

            sortFn: {
                type: Function
            }
        },

        components: {
            "grid-header": Header,
            "grid-body": Body,
            "grid-footer": Footer
        },

        provide() {
            return {
                eventBus: this.eventBus,
                grid: this,
                isAutoFocusEditor: this.isAutoFocusEditor,
                getItemId: (item) => this.getId(item),
                editorVisibleMap: this.editorVisibleMap,
                isRowActived: (rowData) => this.isRowActived(rowData),
                isRowColumnSelected: (rowData, column) => this.isRowColumnSelected(rowData, column),
                getColumnSortOrder: (field) => this.getColumnSortOrder(field)
            };
        },

        data() {
            return {
                gridUniqueName: "",
                gridStyleSheet: null,
                columnStatusMap: {},

                tableDatas: [],
                isShowNoticeMsg: false,
                noticeMsg: "",
                headerColumns: [],
                contentColumns: [],
                headerData: {},
                footerData: {},
                checkboxSelected: {},
                activeRowIds: [],
                radioSelected: {},
                eventBus: new Vue(),
                editorVisibleMap: {},
                sortFieldMap: {},
                defaultDataOrder: null,
                gridType: "grid",

                // 分页
                totalRows: 0,
                currentPage: 1,
                perpageCount: 10
            }
        },

        computed: {
            gridModifier() {
                let result = [this.gridUniqueName];

                if (this.isFixedHeight) {
                    result.push("fixed-grid");
                }

                if (this.isShowFooter) {
                    result.push("footer-grid");
                }

                return result;

            },

            isColumnSetGrid() {
                return Util.isArray(this.columns[0]);
            },

            selectedAllCheckboxData() {
                let count = this.tableDatas.length,
                    result = {}; 

                if (count > 0) {
                    for (let key in this.checkboxSelected) {
                        if (this.checkboxSelected.hasOwnProperty(key) && 
                                this.checkboxSelected[key].length === count) {
                            result[key] = true;
                        }
                    }
                }

                return result;
            },

            treeChildTemplate() {
                return this.$scopedSlots.childTemplate;
            }
        },

        watch: {
            datas(currentValue) {
                this.refreshTableDatas(currentValue);
            },

            columns() {
                this.refreshTableColumns();
            }
        },

        created() {
            this.bindEventListener();
            ColumnStructure.configureStructure(this.columns, this.headerColumns,
                    this.headerData, this.contentColumns, this.isColumnSetGrid);
            if (this.uniqueName) {
                this.gridUniqueName = this.uniqueName;
            } else {
                this.gridUniqueName = this.getDefaultUniqueGridName();
            }
        },

        mounted() {
            this.refreshTableDatas(this.datas);
            this.resize();
        },

        beforeDestroy() {
            if (this.gridStyleSheet) {
                this.gridStyleSheet.destroy();
            }
        },

        methods: {
            /**
             * 重新计算表格的布局
             * @public
             */
            resize() {
                if (this.isColumnSetGrid) {
                    this.resizeColumnSetGrid();
                }
            },

            /**
             * 获取表格的所有数据
             * @public
             * @return - 表格的所有数据
             */
            getAllData() {
                return this.tableDatas;
            },

            /**
             * 重新计算多子表的布局
             * @private
             */
            resizeColumnSetGrid() {
                let sets = this.$refs.header.$el.querySelectorAll(".column-set"),
                    size = [];

                for (let i = 0, j = sets.length; i < j; ++i) {
                    let set = sets[i],
                        table = set.querySelector("table");

                    size.push({
                        index: i,
                        setWidth: set.offsetWidth,
                        contentWidth: table.offsetWidth
                    });
                }

                this.$refs.body.resizeColumnSetGrid(size);
            },

            /**
             * 刷新表格的数据
             * @private
             * @param {object[]} - 新的表格的数据
             */
            refreshTableDatas(value) {
                if (this.isNotCopyData) {
                    this.tableDatas = value;
                } else {
                    this.tableDatas = JSON.parse(JSON.stringify(value));
                }
            },

            /**
             * 重置表格的列
             * @public
             */
            refreshTableColumns() {
                this.headerColumns = [];
                this.headerData = {};
                this.contentColumns = [];

                ColumnStructure.configureStructure(this.columns, this.headerColumns,
                    this.headerData, this.contentColumns, this.isColumnSetGrid);
            },

            /**
             * 根据列的 field 获取 checkbox 当前选中的数据
             * @public
             * @param {string} - 对应列的 field 字段
             * @return - 选中的行的数据
             */
            getCheckboxSelected(field) {
                let selected = this.checkboxSelected[field],
                    result = [];

                if (selected) {
                    for (let i = 0, j = selected.length; i < j; ++i) {
                        let item = this.findRowDataById(selected[i]);

                        if (item) {
                            result.push(item);
                        }
                    }
                } else {
                    return [];
                }
                return result;
            },

            /**
             * 根据列的 field 获取 radio 当前选中的数据
             * @public
             * @param {string} - 对应列的 field 值
             * @return - 被选中行的数据
             */
            getRadioSelected(field) {
                if (!Util.isUndefined(this.radioSelected[field])) {
                    return this.findRowDataById(this.radioSelected[field]);
                }
                return null;
            },

            /**
             * 获取当前的活动行
             * @public
             * @return - 当前活动行的数据
             */
            getActiveRow() {
                let result = [],
                    activeRowIds = this.activeRowIds;

                if (activeRowIds.length > 0) {
                    for (let i = 0, j = activeRowIds.length; i < j; ++i) {
                        let item = this.findRowDataById(activeRowIds[i]);

                        if (item) {
                            result.push(item);
                        }
                    }
                }
                return result;
            },

            /**
             * 根据行数据或者行 id 设置某行数据为活动行
             * @public
             * @param {string | number | object} rowData - 行数据或行 id
             */
            setRowBeActiveByRowData(rowData) {
                if (Util.isObject(rowData)) {
                    this.handleActiveRow(rowData);
                }

                rowData = this.findRowDataById(rowData);
                if (rowData) {
                    this.handleActiveRow(rowData);
                }
            },

            /**
             * 根据 field 获取对应的 order
             * @private
             */
            getColumnSortOrder(field) {
                if (this.sortFieldMap[field]) {
                    return this.sortFieldMap[field].order;
                }
                return null;
            },

            /**
             * 获取表格的默认的惟一名字
             * @private
             * @return - 表格的惟一名
             */
            getDefaultUniqueGridName() {
                return GRID_NAME_PREFIX + gridCount++;
            },

            /**
             * 根据行数据设置某行为活动行
             * @public
             * @param {object} data - 对应的行数据
             */
            setRowBeActive(data) {
                let id = this.getId(data),
                    index = this.activeRowIds.indexOf(id);

                if (index !== -1) {
                    this.activeRowIds.splice(index, 1);
                } else {
                    if (this.activeRowMode === "single") {
                        this.activeRowIds = [id];
                    } else {
                        this.activeRowIds.push(id);
                    }
                }
            },

            /**
             * 隐藏列
             * @todo 支持子列，因为隐藏了子列后，父列的 colSpan 未变，因此仍会占据以前的宽度
             * @public
             * @param {string} field - 对应列的 field
             */
            hideColumn(field) {
                if (this.columnStatusMap[field] && this.columnStatusMap[field].hide === true) {
                    return this.columnStatusMap[field].visibleRule;
                }
                if (this.gridStyleSheet === null) {
                    this.gridStyleSheet = new StyleSheet(this.gridUniqueName);
                }

                if (!this.columnStatusMap[field]) {
                    this.columnStatusMap[field] = {};
                }

                if (this.columnStatusMap[field].visibleRule) {
                    let rule = this.columnStatusMap[field].visibleRule;

                    rule.set("display", "none");

                } else {
                    let columnClass = this.buildColumnClassNameByField(field),
                        style = "display: none",
                        rule = this.gridStyleSheet.addRule("." + columnClass, style);

                    this.columnStatusMap[field].visibleRule = rule;
                }

                this.columnStatusMap[field].hide = true;
            },

            /**
             * 显示列
             * 因为列默认都为显示，因此只有隐藏后才会调用显示
             * 此时 rule 已经添加
             * @public
             * @param {string} field - 对应列的 field
             */
            showColumn(field) {
                if (!this.columnStatusMap[field] || !this.columnStatusMap[field].hide) {
                    return;
                }
                let rule = this.columnStatusMap[field].visibleRule;

                if (rule) {
                    rule.set("display", "");
                }
                this.columnStatusMap[field].hide = false;
            },

            /**
             * 根据行数据和列设置某个编辑控件获取焦点
             * @public
             * @param {string | number | object} rowData - 行数据
             * @param {string} field
             */
            setEditorFocusByRowData(rowData, field) {
                let rowId = Util.isObject(rowData) ? this.getId(rowData) : rowData;
                this.triggerFocusEditor(rowId, field);
            },

            /**
             * 根据行号和列设置某个编辑控件获取焦点
             * @public
             * @param {number} rowNumber
             * @param {string} field
             */
            setEditorFocusByRowNumber(rowNumber, field) {
                let data = this.findShowRowDataByIndex(rowNumber - 1);

                if (data) {
                    let rowId = this.getId(data);
                    this.triggerFocusEditor(rowId, field);
                }
            },

            buildColumnClassNameByField(field) {
                return `cell-${field}`;
            },

            clearActiveRow() {
                this.activeRowIds.splice(0, this.activeRowIds.length);
            },

            /**
             * 判断一行数据是否为活动行
             * @private
             * @param {object} - rowData
             * @return - true 为活动行, false 为非活动行
             */
            isRowActived(rowData) {
                let id = this.getId(rowData);

                return this.activeRowIds.indexOf(id) !== -1;
            },

            /**
             * 将当前数据的默认顺序保存下来
             * 以供后续排序时恢复默认顺序时使用
             * @private
             * @param {object[]} - 表格的所有数据
             */
            cacheDefaultDataOrder(datas) {
                this.defaultDataOrder = datas.map((item) => this.getId(item));
            },

            /**
             * 对数据进行排序
             * @private
             */
            sortData() {
                if (this.defaultDataOrder === null) {
                    this.cacheDefaultDataOrder(this.tableDatas);
                }

                if (this.sortFn) {
                    this.tableDatas = this.sortFn(this.tableDatas, this.sortFieldMap);
                    return;
                }

                if (this.gridSortMode === "single") {
                    let condition = null;

                    for (let key in this.sortFieldMap) {
                        if (this.sortFieldMap.hasOwnProperty(key)) {
                            condition = this.sortFieldMap[key];
                            break;
                        }
                    }

                    if (condition) {
                        if (condition.order === "default") {
                            this.tableDatas = SortUtil.sortByFieldValue(this.tableDatas, (data) => this.getId(data), this.defaultDataOrder);
                        } else {
                            this.tableDatas = SortUtil.sort(this.tableDatas, condition);
                        }
                    }
                } else {
                    throw new Error("grid is not support multiple sort");
                }
            },

            /**
             * 设置某些列被选中
             * @public
             * @param {string} field - 对应的字段
             * @param {string[] | string | number | number[]} ids - 要被选中的 id
             * @param {boolean} isCheckbox - 对应的字段是否为 checkbox
             */
            setFieldBeChecked(field, ids, isCheckbox = true) {
                if (isCheckbox) {
                    if (Util.isUndefined(this.checkboxSelected[field])) {
                        this.$set(this.checkboxSelected, field, []);
                    }
                    let checked = this.checkboxSelected[field],
                        newIds = Util.isArray(ids) ? ids : [ids];

                    for (let i = 0, j = newIds.length; i < j; ++i) {
                        if (checked.indexOf(newIds[i]) === -1) {
                            checked.push(newIds[i]);
                        }
                    }
                    this.checkboxSelected[field] = newIds;
                } else {
                    if (Util.isUndefined(this.radioSelected[field])) {
                        this.$set(this.radioSelected, field, ids);
                    } else {
                        this.radioSelected[field] = ids;
                    }
                }
            },

            /**
             * 取消某些列被选中
             * @public
             * @param {string} field - 对应的字段
             * @param {string[] | string | number | number[]} ids - 要被选中的 id
             * @param {boolean} isCheckbox - 对应的字段是否为 checkbox
             */
            setFieldBeUnChecked(field, ids, isCheckbox = true) {
                if (isCheckbox) {
                    if (!Util.isUndefined(this.checkboxSelected[field])) {
                        let checked = this.checkboxSelected[field],
                            formatIds = Util.isArray(ids) ? ids : [ids];

                        this.checkboxSelected[field] = checked.filter((item) => formatIds.indexOf(item) === -1);
                    }
                } else {
                    if (!Util.isUndefined(this.radioSelected[field])) {
                        this.radioSelected[field] = null;
                    }
                }
            },

            /**
             * 判断一条数据是否可选中
             * @private
             * @param {object} rowData
             * @param {string} field
             */
            isRowCanBeSelected(rowData, field) {
                let column = this.findColumnByField(field);

                if (column) {
                    if (typeof column.enableSelected !== "undefined") {
                        if (Util.isFunction(column.enableSelected)) {
                            return column.enableSelected(rowData);
                        }
                        return Util.getExpressionValue(rowData, column.enableSelected);
                    }
                    return true;
                }
                return false;
            },

            /**
             * 判断一行数据是否被选中
             * @private
             * @param {object} rowData
             * @param {object} column
             */
            isRowColumnSelected(rowData, column) {
                let type = column.type,
                    id = this.getId(rowData);

                if (type === "checkbox") {
                    if (this.checkboxSelected[column.field]) {
                        return this.checkboxSelected[column.field].indexOf(id) !== -1;
                    }
                    return false;
                }

                if (type === "radio") {
                    return this.radioSelected[column.field] === id;
                }
                return false;
            },

            /**
             * 判断是否允许显示多个编辑控件
             * 当前只针对于 editOn 配置的控件
             * @private
             */
            isAllowShowMultipleEditor() {
                return this.editorMode === "multiple";
            },

            /**
             * 根据 field 查找列
             * @private
             * @param {string} field
             */
            findColumnByField(field) {
                let columns = this.columns;

                if (!this.isColumnSetGrid) {
                    columns = [columns];
                }
                for (let i = 0, j = columns.length; i < j; ++i) {
                    let sets = columns[i];

                    for (let k = 0, p = sets.length; k < p; ++k) {
                        if (sets[k].field === field) {
                            return sets[k];
                        }
                    }
                }
                return null;
            },

            /**
             * 根据 id 查找对应的行数据
             * @private
             * @param {string | number}id - 行 id
             * @returns {object} - 对应的行数据
             */
            findRowDataById(id) {
                let datas = this.getAllData();

                for (let i = 0, j = datas.length; i < j; ++i) {
                    if (this.getId(datas[i]) === id) {
                        return datas[i];
                    }
                }
                return null;
            },

            /**
             * 根据下标查找对应的行数据
             * @private
             * @param {number} index - 数据的下标
             * @returns {object} - 对应的行数据
             */
            findShowRowDataByIndex(index) {
                return this.tableDatas[index];
            },

            /**
             * 绑定事件监听
             * @private
             */
            bindEventListener() {
                this.listenSelect(this.handleSelectorEvent);
                if (this.isEnablePagination) {
                    this.listenPagination(this.handlePaginationEvent);
                }

                if (this.gridType === "treeGrid") {
                    this.listenClickTreeLabel(this.handleClickTreeLabelEvent);
                }
                this.listenEditor(this.handleEditorEvent);
                this.listenEditorVisible(this.handleEditorVisibleEvent);
                this.listenClickRow(this.handleClickRow);
                this.listenClickSort(this.handleClickSort);
                this.listenHideColumn(this.handleHideColumnEvent);
            },

            /**
             * 处理选中事件
             * @private
             * @param {object} event
             */
            handleSelectorEvent(event) {
                if (event.type === "checkbox") {
                    if (event.action === "selectedAll") {
                        this.handleCheckboxSelectAllEvent(event);
                    } else {
                        this.handleCheckboxSelectEvent(event);
                    }
                } else {
                    this.handleRadioSelectEvent(event);
                }
            },

            /**
             * 处理 checkbox 的选中事件
             * @private
             * @param {string} field - 对应的字段
             * @param {boolean} checked - 是否选中
             * @param {object} rowData - 对应的行数据
             */
            handleCheckboxSelectEvent({field, checked, rowData}) {
                let id = this.getId(rowData);

                if (!this.checkboxSelected[field]) {
                    this.$set(this.checkboxSelected, field, []);
                }

                if (checked) {
                    this.checkboxSelected[field].push(id);
                } else {
                    this.checkboxSelected[field] = this.checkboxSelected[field].filter((item) => item !== id);
                }
                this.emitEvent("checkCheckbox", {field, rowData, checked});
            },

            /**
             * 处理选中全部的事件
             * @private
             * @param {string} field - 对应的字段
             * @param {boolean} checked - 是否选中
             */
            handleCheckboxSelectAllEvent({field, checked}) {
                if (Util.isUndefined(this.checkboxSelected[field])) {
                    this.$set(this.checkboxSelected, field, []);
                }

                if (checked) {
                    this.checkboxSelected[field] = this.tableDatas.filter((item) => this.isRowCanBeSelected(item, field)).
                            map((item) => this.getId(item));
                } else {
                    this.checkboxSelected[field] = [];
                }
                this.emitEvent("checkAll", {checked});
            },

            /**
             * 处理 radio 的选中事件
             * @private
             * @param {string} field - 对应列的字段
             * @param {boolean} checked - 是否选中
             * @param {object} rowData - 行数据
             */
            handleRadioSelectEvent({field, checked, rowData}) {
                let id = this.getId(rowData),
                    previousId = this.radioSelected[field],
                    previousData = null;

                if (!Util.isUndefined(previousId)) {
                    previousData = this.findRowDataById(previousId);
                }

                if (Util.isUndefined(this.radioSelected[field])) {
                    this.$set(this.radioSelected, field, id);
                } else {
                    this.radioSelected[field] = id;
                }
                this.emitEvent("checkRadio", {field, rowData, previousData});
            },

            /**
             * 处理编辑控件更新值的事件
             * 如果有判断是否允许更新值的方法则调用，通过验证之后再修改行数据
             * @private
             * @param {object} event - 对应的事件
             */
            handleEditorEvent(event) {
                if (!this.isAllowEditorChange || this.isAllowEditorChange(event)) {
                    this.emitEvent("editorUpdate", {...event});
                    event.rowData[event.column.field] = event.newValue;
                }
            },

            /**
             * 处理编辑器是否可见的事件
             * @private
             * @param {object} - event: action 对应的是显示隐藏，id 编辑控件对应的内部 id
             */
            handleEditorVisibleEvent({action, id}) {
                if (action === "show") {
                    /// 如果不允许显示多个编辑控件，则将之前的所有显示的编辑控件隐藏
                    if (!this.isAllowShowMultipleEditor()) {
                        Object.keys(this.editorVisibleMap).
                                filter((item) => this.editorVisibleMap[item] && item !== id).
                                forEach((key) => {
                                    this.editorVisibleMap[key] = false;
                                }
                        );
                    }
                   if (Util.isUndefined(this.editorVisibleMap[id])) {
                       this.$set(this.editorVisibleMap, id, true);
                   } else {
                       this.editorVisibleMap[id] = true;
                   }
                } else {
                    if (this.editorVisibleMap[id]) {
                        this.editorVisibleMap[id] = false;
                    }
                }
            },

            /**
             * 处理内容区的滚动条滚动事件
             * 当内容区滚动时，同时滚动表头，如果有表尾则也滚动表尾
             * @private
             * @param {object} event
             */
            handleContentHorizontalScroll(event) {
                this.$refs.header.setHeaderRowScrollLeft(event);
                if (this.isShowFooter) {
                    this.$refs.footer.setFooterRowScrollLeft(event);
                }
            },

            /**
             * 处理内容区是否有滚动条的事件
             * 当内容区有滚动条时，需要给表头一个右边的 padding 以对齐
             * @private
             * @param {object} - event
             */
            handleContentScrollbarWidth(event) {
                this.$refs.header.setHeaderPaddingByContentScrollbar(event);
            },

            /**
             * @private
             * @param {object} - event
             */
            handleContentVerticalScroll(event) {
                this.triggerContentVerticalScroll(event);
            },

            /**
             * 处理点击行的事件
             * 当启用了活动行，则将对应的行设置为活动行
             * @private
             * @param {object} eventData
             */
            handleClickRow(eventData) {
                if (this.isEnableActiveRow) {
                    this.handleActiveRow(eventData.rowData);
                }
                this.emitEvent("clickRow", eventData);
            },

            /**
             * 处理活动行的
             * @private
             * @param {object} rowData
             */
            handleActiveRow(rowData) {
                this.setRowBeActive(rowData);
            },

            /**
             * 处理排序
             * @private
             * @param {object} event
             */
            handleClickSort(event) {
                let column = event.column,
                    sortInfo = {
                        field: column.field,
                        sortType: event.sortType,
                        order: event.order,
                        priority: event.sortPriority,
                        oldOrder: event.oldOrder
                    };

                if (this.gridSortMode === "multiple") {
                    this.$set(this.sortFieldMap, column.field, sortInfo);
                } else {
                    this.$set(this, "sortFieldMap", {[column.field]: sortInfo});
                }
                this.sortData();
            },

            /**
             * 处理隐藏列的事件
             * @private
             * @param {object} event
             */
            handleHideColumnEvent(event) {
                this.hideColumn(event.field);
            },

            /**
             * 统一对外的广播事件的方法
             * @private
             * @param {string} action - 对应的动作
             * @param {object} data - 对应的数据
             */
            emitEvent(action, data) {
                this.$emit("gridEvent", {action, data});
            }
        }
    };
</script>

