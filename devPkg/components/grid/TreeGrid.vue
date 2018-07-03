/***********************************************
* Created by zhangtao on 2018/06/29
************************************************/
<script>
    import Grid from "./Grid";

    import Util from "./helper/GridUtil";
    import { tree } from "../helper/util";

    export default {
        extends: Grid,
        props: {
            isParent: {
                type: [String, Function]
            },

            childProperty: {
                type: String,
                default: "children"
            }
        },

        data() {
            return {
                expandRowDataIds: [],
                gridType: "treeGrid"
            }
        },

        provide() {
            return {
                expandRowDataIds: this.expandRowDataIds,
                isParentRowData: (rowData) => this.isParentRowData(rowData)
            }
        },

        methods: {
            getCheckboxSelected(field) {
                let selected = this.checkboxSelected[field],
                    result = [];

                if (selected) {
                    tree.forEachArrayTree(this.tableDatas, (item) => {
                        let id = this.getId(item);

                        if (selected.indexOf(id) !== -1) {
                            result.push(item);
                        }
                    }, this.childProperty);
                }

                return result;
            },

            getRadioSelected(field) {
                let id = this.radioSelected[field],
                    result = null;

                if (!Util.isUndefined(id)) {

                    tree.forEachArrayTree(this.tableDatas, (item) => {
                        if (result === null) {
                            let itemId = this.getId(item);

                            if (itemId === id) {
                                result = item;
                            }
                        }

                    }, this.childProperty);
                }
                return result;
            },

            getActiveRow() {
                let result = [];
                if (this.activeRowIds.length > 0) {
                    tree.forEachArrayTree(this.tableDatas, (item) => {
                        let id = this.getId(item);

                        if (this.activeRowIds.indexOf(id) !== -1) {
                            result.push(item);
                        }

                    }, this.childProperty);
                }
                return result;
            },

            isExpandRow(rowData) {
                let id = this.getId(rowData);

                if (this.expandRowDataIds.indexOf(id) === -1) {
                    return false;
                }
                return true;
            },

            expandRow(rowData) {
                let id = this.getId(rowData);

                this.expandRowDataIds.push(id);
                this.emitEvent({action: "expandRow", rowData});
            },

            collapseRow(rowData) {
                let id = this.getId(rowData),
                    index = this.expandRowDataIds.indexOf(id);

                if (index !== -1) {
                    this.expandRowDataIds.splice(index, 1);
                    this.emitEvent({action: "collapseRow", rowData});
                }
            },

            handleClickTreeLabelEvent(event) {
                if (event.action === "click") {
                    let rowData = event.rowData;

                    if (this.isExpandRow(rowData)) {
                        this.collapseRow(rowData);
                    } else {
                        this.expandRow(rowData);
                    }
                }
            },

            isParentRowData(rowData) {
                if (this.isAlwaysExpand) {
                    return true;
                }
                return Util.getFunctionOrExpressionValue(rowData, this.isParentRow);
            }
        }
    };
</script>
