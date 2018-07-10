/***********************************************
* Created by zhangtao on 2018/06/30
************************************************
<script>
    import BodyRow from "./BodyRow";
    import Util from "./helper/GridUtil";

    export default {
        name: "tree-row",
        props: {
            rowData: {
                type: Object,
                required: true
            },

            columns: {
                type: Array,
                required: true
            },

            rowNumber: {
                type: Number,
                required: true
            },

            isColumnSetGrid: {
                type: Boolean,
                default: false
            },

            selectorData: {
                type: Object,
                default: () => {}
            },

            treeChildProperty: {
                type: String
            },

            isParentRow: {
                type: [String, Function]
            },

            treeIndent: {
                type: Number
            },

            treeLevel: {
                type: Number,
                default: 1
            },

            treeChildTemplate: {
                type: Function
            },

            isAlwaysExpand: {
                type: Boolean,
                default: false
            },

            parentRowData: {
                type: Object,
                default: null
            },

            rowClassNameFn: {
                type: [Function, String]
            }
        },

        inject: ["expandRowDataIds", "getItemId", "isRowActived"],

        components: {
            "body-row": BodyRow
        },

        computed: {
            isParent() {
                return Util.getFunctionOrExpressionValue(this.rowData, this.isParentRow);
            },

            childDatas() {
                return this.rowData[this.treeChildProperty] ? this.rowData[this.treeChildProperty] : [];
            },

            isExpand() {
                return this.expandRowDataIds.indexOf(this.getItemId(this.rowData)) !== -1;
            },

            treeRowModifier() {
                let result = [];
                if (this.isExpand) {
                    result.push("tree-row--expand");
                }
                return result;
            },

            treeLabelIndent() {
                return `${(this.treeLevel -1 ) * this.treeIndent}px`;
            }
        },

        render(createElement) {
            return createElement("div", {
                "class": this.treeRowModifier.concat("tree-row")
            }, this.renderTreeRow(createElement));
        },

        methods: {
            renderTreeRow(createElement) {
                if (this.isAlwaysExpand || this.isParent) {
                    return this.renderParentRow(createElement);
                } else {
                    if (this.treeChildTemplate) {
                        let child = this.renderChildTemplateRow();

                        return [this.renderGridRow(createElement, [child])];
                    }
                    return [this.renderDefaultRow(createElement)];
                }
            },

            renderParentRow(createElement) {
                let child = [this.renderDefaultRow(createElement)];

                if (this.isParent) {
                    child = child.concat(this.renderTreeChildRow(createElement));
                } else {
                    child = child.concat(this.renderAlwaysChildTemplateRow(createElement));
                }

                return child;
            },

            renderTreeChildRow(createElement) {
                let childs = [],
                    container = null;

                for (let i = 0, j = this.childDatas.length; i < j; ++i) {
                    let item = this.childDatas[i],
                        row = null;

                    row = createElement("tree-row", {
                        props: {
                            rowData: item,
                            parentRowData: this.rowData,
                            columns: this.columns,
                            selectorData: this.selectorData,
                            rowNumber: i,
                            isColumnSetGrid: this.isColumnSetGrid,
                            treeChildProperty: this.treeChildProperty,
                            treeLevel: this.treeLevel + 1,
                            treeIndent: this.treeIndent,
                            isParentRow: this.isParentRow,
                            isAlwaysExpand: this.isAlwaysExpand,
                            treeChildTemplate: this.treeChildTemplate,
                            rowClassNameFn: this.rowClassNameFn
                        },
                        on: {
                            clickTreeRow: (event) => this.handleClickTreeRow(event)
                        }
                    });

                    childs.push(row);
                }

                container = createElement("div", {
                    "class": "tree-child-container"
                }, childs);

                return container;
            },

            renderChildTemplateRow() {
                return this.treeChildTemplate({
                    rowData: this.rowData,
                    parentRowData: this.parentRowData,
                    treeLabelIndent: this.treeLabelIndent,
                    treeIndent: this.treeIndent
                });
            },

            renderAlwaysChildTemplateRow(createElement) {
                let child = this.renderChildTemplateRow();

                return createElement("div", {
                    "class": "tree-child-container"
                }, [child]);
            },

            renderDefaultRow(createElement) {
                let child = createElement(BodyRow, {
                    props: {
                        rowData: this.rowData,
                        columns: this.columns,
                        selectorData: this.selectorData,
                        rowNumber: this.rowNumber,
                        treeLabelIndent: this.treeLabelIndent,
                        isColumnSetGrid: this.isColumnSetGrid
                    }
                });

                return this.renderGridRow(createElement, [child]);
            },

            renderGridRow(createElement, child) {
                return createElement("div", {
                    "class": this.getGridRowClassModifier(),
                    on: {
                        click: () => this.onClickGridRow()
                    }
                }, child);
            },

            getGridRowClassModifier() {
                let result = "grid-row";

                if (this.isRowActived(this.rowData)) {
                    result += " active";
                }

                if (!Util.isUndefined(this.rowClassNameFn)) {
                    result += " " + Util.getFunctionOrExpressionValue(this.rowData, this.rowClassNameFn);
                }
                return result;
            },

            handleClickTreeRow(event) {
                this.$emit("clickTreeRow", event);
            },

            onClickGridRow() {
                this.$emit("clickTreeRow", {rowData: this.rowData});
            }
        }
    };
</script>
