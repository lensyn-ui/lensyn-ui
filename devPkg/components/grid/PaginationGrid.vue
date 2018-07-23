/*************************************************
* Created by zhangtao on 2018/03/24
*************************************************/
<script>
    import Grid from "./Grid";
    import SortUtil from "./helper/GridSort";
    import ScrollPaginationMixin from "./mixins/ScrollPaginationMixin";

    export default {
        extends: Grid,
        mixins: [ScrollPaginationMixin],
        props: {
            isShowFooter: {
                type: Boolean,
                default: true
            },

            isEnablePagination: {
                type: Boolean,
                default: true
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
            },

            isAppendStoreData: {
                type: Boolean,
                default: false
            }
        },

        data() {
            return {
                queryCondition: {},
                defaultPerpageCount: 10,
                gridType: "paginationGrid"
            }
        },

        computed: {
            isRemoteLoadData() {
                return !!this.store;
            }
        },

        created() {
            this.perpageCount = typeof this.initPerpage === "undefined" ? this.defaultPerpageCount : this.initPerpage;
            this.refreshPaginationCondition({page: this.currentPage, rows: this.perpageCount});
        },

        methods: {
            /**
             * 获取所有表格的数据
             * 是覆写父级的方法
             * @override
             * @public
             */
            getAllData() {
                if (this.isRemoteLoadData) {
                    return this.tableDatas;
                }
                return this.datas;
            },

            /**
             * 刷新表格的数据
             * @override
             * @private
             * @todo
             */
            refreshTableDatas() {
            },

            /**
             * 处理分布控件的事件
             * @private
             * @param {object} event
             */
            handlePaginationEvent(event) {
                if (event.action === "jump") {
                    this.currentPage = event.toPage;
                }

                if (event.action === "perpage") {
                    this.currentPage = 1;
                    this.perpageCount = event.rows;
                }

                this.refreshPaginationCondition({page: this.currentPage, rows: this.perpageCount});
                this.updateGridData(this.queryCondition);
            },

            /**
             * 跳转到下一页
             * 当加载完数据之后，将滚动条设置到顶部
             * @private
             */
            goNextPage() {
                let total = this.getTotalPage();

                if (this.currentPage === total) {
                    return this.emitEvent({action: "scrollToLastPage"});
                }
                this.jumpToPage(this.currentPage + 1).then(() => {
                    this.$nextTick(() => {
                        if (!this.isAppendStoreData) {
                            this.$refs.body.setContentVerticalScrollToTop();
                        }
                    });
                });
            },

            /**
             * 跳转到上一页
             * 当加载数据完成后，将滚动条设置到底部
             * @private
             */
            goPreviousPage() {
                if (this.currentPage === 1) {
                    return this.emitEvent({action: "scrollToFirstPage"});
                }
                this.jumpToPage(this.currentPage - 1).then(() => {
                    this.$nextTick(() => {
                        if (!this.isAppendStoreData) {
                            this.$refs.body.setContentVerticalScrollToBottom();
                        }
                    });
                });
            },

            /**
             * 跳转到指定的页数
             * @private
             * @param {number} page - 页数
             */
            jumpToPage(page) {
                this.currentPage = page;
                this.refreshPaginationCondition({page: this.currentPage, rows: this.perpageCount});
                return this.refreshGrid();
            },

            /**
             * 获取所有的页数
             * @private
             * @return - 所有的页数
             */
            getTotalPage() {
                return Math.ceil(this.totalRows / this.perpageCount);
            },

            /**
             * 刷新分页的条件
             * @private
             * @param {object} data
             */
            refreshPaginationCondition(data) {
                this.queryCondition.page = data.page;
                this.queryCondition.rows = data.rows;
            },

            /**
             * 对数据进行排序
             * @private
             * @override
             */
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

            /**
             * 获取分页的条件
             * @private
             * @param {object} data
             */
            getPaginationCondition(data) {
                return  {
                    page: data.page,
                    rows: data.rows
                };
            },

            /**
             * 刷新表格的数据
             * @public
             * @param {object} condition - 刷新的条件
             * @param {boolean} isOverride - 是否覆盖之前的条件
             */
            updateGrid(condition, isOverride) {
                if (isOverride) {
                    let paginationCondition = this.getPaginationCondition(this.queryCondition);

                    if (condition) {
                        this.queryCondition = Object.assign(condition, paginationCondition);
                    } else {
                        this.queryCondition = paginationCondition;
                    }
                } else if (condition) {
                    this.queryCondition = Object.assign(this.queryCondition, condition);
                }
                return this.updateGridData(this.queryCondition);
            },

            /**
             * 强制刷新时，将当前页数设置为第一页且每页行数设置为默认值
             * @public
             * @param {object} params
             */
            forceUpdateGrid(params) {
                this.currentPage = 1;
                this.perpageCount = typeof this.initPerpage === "undefined" ? this.defaultPerpageCount : this.initPerpage;

                this.refreshPaginationCondition({page: this.currentPage, rows: this.perpageCount});
                return this.updateGrid(params, true);
            },

            /**
             * 以已有的查询条件刷新表格
             * @public
             */
            refreshGrid() {
                return this.updateGrid(this.queryCondition);
            },

            /**
             * 实际执行刷新的方法
             * 如果是远端分页，则直接调用 store 的 query，否则执行本地分页
             * @todo 本地分页并未处理按条件查询的过滤，只是分页，后续看是否需要支持
             * @private
             * @param {object} condition - 查询条件
             */
            updateGridData(condition) {
                this.checkboxSelected = {};
                if (this.isRemoteLoadData) {
                    return this.updateGridDataByStore(condition);
                } else {
                    return this.updateGridDataByLocal(condition);
                }
            },

            /**
             * 根据条件调用 store 的 query 进行查询
             * query 接收三个参数，第一个是查询条件，第二个是成功的回调，第三个是失败的回调
             * @private
             * @param condition
             * @returns {Promise<any>}
             */
            updateGridDataByStore(condition) {
                let copyCondition = JSON.parse(JSON.stringify(condition));

                this.isShowNoticeMsg = false;
                this.noticeMsg = "";

                if (copyCondition.sort && copyCondition.sort.order === "default") {
                    delete copyCondition.sort;
                }

                let def = new Promise((resovlve, reject) => {
                    this.store.query(copyCondition, (data) => {
                        let result = this.formatQueryData(data);

                        if (this.isAppendStoreData && !this.isEnablePagination) {
                            this.tableDatas = this.tableDatas.concat(result.datas);
                        } else {
                            this.tableDatas = result.datas;
                        }
                        this.totalRows = result.total;

                        resovlve({data: data});
                    }, (error) => {
                        this.isShowNoticeMsg = true;
                        this.noticeMsg = this.queryDataErrorMsg;
                        this.emitEvent({action: "loadDataError", error});
                        reject({error: error});
                    });
                });
                return def;
            },

            /**
             * 本地分页
             * @todo 后续可能支持条件过滤
             * @private
             * @param {object} condition - 查询条件
             * @returns {Promise<any>}
             */
            updateGridDataByLocal(condition) {
                let start = (condition.page - 1) * condition.rows,
                    end = condition.page * condition.rows,
                    datas = this.datas,
                    sort = condition.sort;

                let def = new Promise((resolve) => {
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

                    let currentDatas = datas.slice(start, end);

                    if (this.isAppendStoreData && !this.isEnablePagination) {
                        this.tableDatas = this.tableDatas.concat(currentDatas);
                    } else {
                        this.tableDatas = currentDatas;
                    }

                    resolve({datas: this.datas});
                });

                return def;
            },

            /**
             * 获取查询条件
             * @public
             * @returns {object} - 查询条件
             */
            getQueryCondition() {
                return this.queryCondition;
            }
        }
    };
</script>