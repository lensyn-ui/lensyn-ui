/*************************************************
* Created by zhangtao on 2018/03/24
*************************************************/
<script>
    import Grid from "./Grid";
    import SortUtil from "./helper/GridSort";

    export default {
        extends: Grid,
        props: {
            isShowFooter: {
                type: Boolean,
                default: true
            },

            isEnablePagination: {
                type: Boolean,
                default: true
            },

            page: {
                type: Number,
                default: 1
            },

            store: {
                type: Object
            },

            formatQueryData: {
                type: Function,
                default: (data) => ({datas: data.datas, total: data.total})
            },

            queryDataErrorMsg: {
                type: String,
                default: "请求数据失败，请稍候重试"
            },

            paginationQueryConditionMap: {
                type: Object
            }
        },

        data() {
            return {
                queryCondition: {},
                gridType: "paginationGrid"
            }
        },

        computed: {
            isRemoteLoadData() {
                return !!this.store;
            }
        },

        mounted() {
            this.refreshPaginationCondition({
                page: this.page,
                rows: this.initPerpage ? this.initPerpage : this.perpageCount
            });
        },

        methods: {
            /**
             * @override
             */
            getAllData() {
                if (this.isRemoteLoadData) {
                    return this.tableDatas;
                }
                return this.datas;
            },

            refreshTableDatas() {
            },

            handlePaginationEvent(event) {
                this.refreshPaginationCondition(event);
                this.updateGridData(this.queryCondition);
            },

            refreshPaginationCondition(data) {
                let map = this.paginationQueryConditionMap;

                if (map) {
                    for (let key in map) {
                        if (map.hasOwnProperty(key)) {
                            this.queryCondition[map[key]] = data[key];
                        }
                    }
                } else {
                    this.queryCondition.page = data.page;
                    this.queryCondition.rows = data.rows;
                }
            },

            sortData() {
                if (!this.store) {
                    if (this.defaultDataOrder === null) {
                        this.cacheDefaultDataOrder(this.datas);
                    }
                }
                if (this.gridSortMode === "single") {
                    let condition = null;

                    for (let key in this.sortFieldMap) {
                        if (this.sortFieldMap.hasOwnProperty(key)) {
                            condition = this.sortFieldMap[key];
                            break;
                        }
                    }

                    if (condition !== null) {
                        this.updateGrid({sort: condition});
                    }
                } else {
                    this.updateGrid({sort: this.sortFieldMap});
                }
            },

            getPaginationCondition(data) {
                let result = {},
                    map = this.paginationQueryConditionMap;

                if (map) {
                    for (let key in map) {
                        if (map.hasOwnProperty(key)) {
                            result[map[key]] = data[map[key]];
                        }
                    }
                } else {
                    result = {
                        page: data.page,
                        rows: data.rows
                    }
                }

                return result;
            },

            updateGrid(condition, isOverride) {
                if (isOverride) {
                    let paginationCondition = this.getPaginationCondition(this.queryCondition);

                    this.queryCondition = Object.assign(condition, paginationCondition);
                } else if (condition) {
                    this.queryCondition = Object.assign(this.queryCondition, condition);
                }
                this.updateGridData(this.queryCondition);
            },

            forceUpdateGrid(params) {
                this.initPage = 0;
                this.$nextTick(() => this.initPage = 1);

                this.refreshPaginationCondition({page: 1, rows: this.perpageCount});
                this.updateGrid(params, true);
            },

            refreshGrid() {
                this.updateGrid(this.queryCondition);
            },

            updateGridData(condition) {
                if (this.isRemoteLoadData) {
                    this.updateGridDataByStore(condition);
                } else {
                    this.updateGridDataByLocal(condition);
                }
                this.checkboxSelected = {};
            },

            updateGridDataByStore(condition) {
                let copyCondition = JSON.parse(JSON.stringify(condition));

                this.isShowNoticeMsg = false;
                this.noticeMsg = "";

                if (copyCondition.sort && copyCondition.sort.order === "default") {
                    delete copyCondition.sort;
                }

                this.store.query(copyCondition, (data) => {
                    let result = this.formatQueryData(data);

                    this.tableDatas = result.datas;
                    this.totalRows = result.total;
                }, (error) => {
                    this.isShowNoticeMsg = true;
                    this.noticeMsg = this.queryDataErrorMsg;
                    this.emitEvent({action: "loadDataError", error});
                });
            },

            updateGridDataByLocal(condition) {
                let start = (condition.page - 1) * condition.rows,
                    end = condition.page * condition.rows,
                    datas = this.datas,
                    sort = condition.sort;

                if (sort) {
                    if (this.sortFn) {
                        datas = this.sortFn(datas, condition.sort);
                    } else {
                        if (sort.order === "default") {
                            datas = SortUtil.sortByFieldValue(datas, (item) => this.getId(item), this.defaultDataOrder);
                        } else {
                            datas = SortUtil.sort(datas, sort);
                        }
                    }
                }
                this.totalRows = datas.length;
                this.tableDatas = datas.slice(start, end);
            },

            getQueryCondition() {
                return this.queryCondition;
            }
        }
    };
</script>