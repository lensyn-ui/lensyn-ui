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
            /**
             * @override
             * @param {string | number} id - 行 id
             * @returns {object} - 行数据
             */
            findRowDataById(id) {
                let datas = this.getAllData(),
                    result = null;

                tree.forEachArrayTree(datas, (item) => {
                    if (result === null && this.getId(item) === id) {
                        result = item;
                    }
                });
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
