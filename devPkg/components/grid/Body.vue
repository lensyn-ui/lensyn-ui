<template>
    <div class="grid-body">
        <div class="grid-content-wrapper" ref="contentWrapper">
            <div ref="content" class="grid-content" @scroll="handleContentScroll">
                <div v-for="(data, index) in datas" :key="getId(data)" :class="getRowClassName(data)">
                    <component :is="rowConstructor" :rowData="data" :columns="columns"
                               cellType="bodyCell" :selectorData="getRowDataSelected(data)"
                               :rowNumber="index + 1" @clickRow="handleClickRow"/>
                </div>
            </div>
            <div class="notice-msg" v-show="haveNoticeMsg" > {{noticeMsgContent}} </div>
        </div>

        <div ref="setScrollbar" class="set-scrollbar-container" v-if="isColumnSetGrid">
            <div v-for="(sets, index) in columns" :key="index"
                :class="getScrollbarClass(index)" @scroll="handleSetScrollbarScroll(index, $event)">
                <div class="set-scrollbar-content"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import SimpleColumnRow from "./SimpleColumnRow";
    import ColumnSetRow from "./ColumnSetRow.vue";
    import IdMixin from "./mixins/IdMixin";
    import EventBusMixin from "./mixins/EventBusMixin";

    export default {
        mixins: [IdMixin, EventBusMixin],
        inject: ["eventBus"],

        props: {
            datas: {
                type: Array,
                required: true
            },

            columns: {
                type: Array,
                required: true
            },

            isColumnSetGrid: {
                type: Boolean,
                default: false
            },

            checkboxSelected: {
                type: Object,
                default: () => {}
            },

            radioSelected: {
                type: Object,
                default: () => {}
            },

            rowClassNameFn: {
                type: [Function, String]
            },

            isShowNoticeMsg: {
                type: Boolean,
                default: false
            },

            noticeMsg: {
                type: String,
                default: ""
            },

            activeRowIds: {
                type: Array,
                default: () => []
            }
        },

        data() {
            return {
                previousSetScrollBarPosition: {},
                previousContentScrollPosition: 0,
                haveNoticeMsg: false,
                noticeMsgContent: "",
                defaultRowClassName: "grid-row"
            };
        },

        components: {
            "simple-column-row": SimpleColumnRow,
            "column-set-row": ColumnSetRow
        },

        computed: {
            rowConstructor() {
                return this.isColumnSetGrid ? "column-set-row" : "simple-column-row";
            }
        },

        watch: {
            datas() {
                this.$nextTick(() => {
                    this.refreshHeaderByScrollbarWidth()
                    this.refreshNoticeMsg();
                });
            },

            isShowNoticeMsg() {
                this.refreshNoticeMsg();
            }
        },

        mounted() {
            this.resize();
            this.refreshHeaderByScrollbarWidth();
            this.refreshNoticeMsg();
        },

        methods: {
            resize() {
                if (this.isColumnSetGrid) {
                    this.$nextTick(() => {
                        this.resizeSetScrollbar();
                    });
                }
            },

            getRowClassName(rowData) {
                let str = this.defaultRowClassName;

                if (this.rowClassNameFn) {
                    let extra = "";
                    if (Util.isFunction(this.rowClassNameFn)) {
                        extra = this.rowClassNameFn(rowData);
                    } else {
                        extra = Util.getExpressionValue(rowData, this.rowClassNameFn);
                    }
                    str = `${str} ${extra}`;
                }

                if (this.isRowActived(rowData)) {
                    str = `${str} active`;
                }
                return str;
            },

            refreshNoticeMsg() {
                if (this.datas.length === 0) {
                    this.haveNoticeMsg = true;
                    this.noticeMsgContent = "数据为空";
                } else {
                    this.haveNoticeMsg = false;
                    this.noticeMsgContent = "";
                }
            },
            
            setContentRowScrollLeft(setIndex, scrollLeft) {
                let setRows = this.$refs.content.querySelectorAll(`.column-set-${setIndex} .column-set-wrapper`);

                for (let i = 0, j = setRows.length; i < j; ++i) {
                    setRows[i].scrollLeft = scrollLeft;
                }
            },

            resizeSetScrollbar() {
                let firstTable = this.$refs.content.children[0].children[0],
                    firstRow = firstTable.children[0].children[0];

                if (firstRow) {
                    let setCount = this.columns.length,
                        scrollbarContainer = this.$refs.setScrollbar,
                        isHaveScrollbar = false;


                    for (let i = 0; i < setCount; ++i) {
                        let scrollbar = scrollbarContainer.querySelector(".set-scrollbar-" + i),
                            set = firstRow.children[i].children[0],
                            wrapperWidth = set.offsetWidth,
                            contentWidth = set.children[0].offsetWidth;

                        scrollbar.style.width = wrapperWidth + "px";

                        if (contentWidth > wrapperWidth) {
                            isHaveScrollbar = true;
                            scrollbar.style.display = "";
                            scrollbar.children[0].style.width = contentWidth + "px";
                        }
                    }
                    if (isHaveScrollbar) {
                        scrollbarContainer.style.display = "";
                    } else {
                        scrollbarContainer.style.display = "none";
                    }
                }
            },

            refreshHeaderByScrollbarWidth() {
                this.$emit("contentScrollbarWidth", {width: this.getScrollbarWidth()});
            },

            getScrollbarWidth() {
                let wrapper = this.$refs.contentWrapper;

                return wrapper.offsetWidth - wrapper.clientWidth;
            },

            handleContentScroll(event) {
                let currentPosition = event.target.scrollLeft;

                if (currentPosition !== this.previousContentScrollPosition) {
                    this.$emit("contentHorizontalScroll", {scrollLeft: currentPosition, type: "content"});
                    this.previousContentScrollPosition = currentPosition;
                }
            },

            handleSetScrollbarScroll(setIndex, event) {
                let currentPosition = event.target.scrollLeft,
                    oldPosition = this.previousSetScrollBarPosition[setIndex];

                if (currentPosition !== oldPosition) {
                    this.$emit("contentHorizontalScroll", {setIndex, scrollLeft: currentPosition, type: "set"});
                    this.setContentRowScrollLeft(setIndex, currentPosition);
                    this.previousSetScrollBarPosition[setIndex] = currentPosition;
                }
            },

            handleClickRow(eventData) {
                this.triggerClickRow(eventData);
            },

            getScrollbarClass(index) {
                return `set-scrollbar set-scrollbar-${index}`;
            },

            getRowDataSelected(rowData) {
                let checkbox = this.getRowDataCheckboxSelected(rowData),
                    radio = this.getRowDataRadioSelected(rowData);

                return {...checkbox, ...radio};
            },

            getRowDataCheckboxSelected(rowData) {
                let id = this.getId(rowData),
                    result = {};

                for (let key in this.checkboxSelected) {
                    if (this.checkboxSelected.hasOwnProperty(key)) {
                        let selected = this.checkboxSelected[key];

                        if (selected.indexOf(id) !== -1) {
                            result[key] = true;
                        }
                    }
                }

                return result;
            },

            getRowDataRadioSelected(rowData) {
                let id = this.getId(rowData),
                    result = {};

                for (let key in this.radioSelected) {
                    if (this.radioSelected.hasOwnProperty(key)) {
                        if (this.radioSelected[key] === id) {
                            result[key] = true;
                        }
                    }
                }

                return result;
            },

            isRowActived(rowData) {
                let id = this.getId(rowData);

                return this.activeRowIds.indexOf(id) !== -1;
            }
        }
    };
</script>
