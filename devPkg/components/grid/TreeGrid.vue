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
             * @private
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

            /**
             * 判断一行是否是展开
             * @private
             * @param {object} rowData
             */
            isExpandRow(rowData) {
                let id = this.getId(rowData);

                if (this.expandRowDataIds.indexOf(id) === -1) {
                    return false;
                }
                return true;
            },

            /**
             * 展开行
             * @private
             * @param {object} rowData
             */
            expandRow(rowData) {
                let id = this.getId(rowData);

                this.expandRowDataIds.push(id);
                this.emitEvent("expandRow", { rowData });
            },

            /**
             * 收起行
             * @private
             * @param {object} rowData
             */
            collapseRow(rowData) {
                let id = this.getId(rowData),
                    index = this.expandRowDataIds.indexOf(id);

                if (index !== -1) {
                    this.expandRowDataIds.splice(index, 1);
                    this.emitEvent("collapseRow", { rowData });
                }
            },

            /**
             * 处理点击 treeLabel 的事件
             * @private
             * @param {object} event
             */
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

            /**
             * 判断是否为父级数据
             * 如果配置有 isAlwaysExpand 则所有行都可以展开
             * @private
             * @param {object} rowData - 行数据
             * @returns {boolean}
             */
            isParentRowData(rowData) {
                if (this.isAlwaysExpand) {
                    return true;
                }
                return Util.getFunctionOrExpressionValue(rowData, this.isParentRow);
            }
        }
    };
</script>
