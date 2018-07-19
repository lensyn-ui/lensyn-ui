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
            resize() {
                if (this.isColumnSetGrid) {
                    this.resizeColumnSetGrid();
                }
            },

            getAllData() {
                return this.tableDatas;
            },

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

            refreshTableDatas(value) {
                if (this.isNotCopyData) {
                    this.tableDatas = value;
                } else {
                    this.tableDatas = JSON.parse(JSON.stringify(value));
                }
            },

            refreshTableColumns() {
                this.headerColumns = [];
                this.headerData = {};
                this.contentColumns = [];

                ColumnStructure.configureStructure(this.columns, this.headerColumns,
                    this.headerData, this.contentColumns, this.isColumnSetGrid);
            },

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

            getRadioSelected(field) {
                if (!Util.isUndefined(this.radioSelected[field])) {
                    return this.findRowDataById(this.radioSelected[field]);
                }
                return null;
            },

            getGridData() {
                return this.tableDatas;
            },

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

            getColumnSortOrder(field) {
                if (this.sortFieldMap[field]) {
                    return this.sortFieldMap[field].order;
                }
                return null;
            },

            getDefaultUniqueGridName() {
                return GRID_NAME_PREFIX + gridCount++;
            },

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
             * @param {string} fieldName
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
             * @param {string} fieldName
             * 因为列默认都为显示，因此只有隐藏后才会调用显示
             * 此时 rule 已经添加
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
             * @param {string | number | object} rowData - 行数据
             * @param {string} field
             */
            setEditorFocusByRowData(rowData, field) {
                let rowId = Util.isObject(rowData) ? this.getId(rowData) : rowData;
                this.triggerFocusEditor(rowId, field);
            },

            /**
             * 根据行号和列设置某个编辑控件获取焦点
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

            isRowActived(rowData) {
                let id = this.getId(rowData);

                return this.activeRowIds.indexOf(id) !== -1;
            },

            /**
             * 将当前数据的默认顺序保存下来
             */
            cacheDefaultDataOrder(datas) {
                this.defaultDataOrder = datas.map((item) => this.getId(item));
            },

            /**
             * 对数据进行排序
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
             * 根据 field 查找列
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

            findRowDataById(id) {
                let datas = this.getAllData();

                for (let i = 0, j = datas.length; i < j; ++i) {
                    if (this.getId(datas[i]) === id) {
                        return datas[i];
                    }
                }
                return null;
            },

            findShowRowDataByIndex(index) {
                return this.tableDatas[index];
            },

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

            handleEditorEvent(event) {
                if (!this.isAllowEditorChange || this.isAllowEditorChange(event)) {
                    this.emitEvent("editorUpdate", {...event});
                    event.rowData[event.column.field] = event.newValue;
                }
            },

            handleEditorVisibleEvent({action, id}) {
                if (action === "show") {
                   if (Util.isUndefined(this.editorVisibleMap[id])) {
                       this.$set(this.editorVisibleMap, id, true);
                   } else {
                       this.editorVisibleMap[id] = true;
                   }
                } else {
                    this.editorVisibleMap[id] = false;
                }
            },

            handleContentHorizontalScroll(event) {
                this.$refs.header.setHeaderRowScrollLeft(event);
                if (this.isShowFooter) {
                    this.$refs.footer.setFooterRowScrollLeft(event);
                }
            },

            handleContentScrollbarWidth(event) {
                this.$refs.header.setHeaderPaddingByContentScrollbar(event);
            },

            handleContentVerticalScroll(event) {
                this.triggerContentVerticalScroll(event);
            },

            handleClickRow(eventData) {
                if (this.isEnableActiveRow) {
                    this.handleActiveRow(eventData.rowData);
                }
                this.emitEvent("clickRow", eventData);
            },

            handleActiveRow(rowData) {
                this.setRowBeActive(rowData);
            },

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

            handleHideColumnEvent(event) {
                this.hideColumn(event.field);
            },

            emitEvent(action, data) {
                this.$emit("gridEvent", {action, data});
            }
        }
    };
</script>

