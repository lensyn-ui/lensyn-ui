<template>
    <div class="grid-body">
        <div class="grid-content-wrapper" ref="contentWrapper">
            <div ref="content" class="grid-content" @scroll="handleContentScroll">
                <template v-if="isTreeGrid">
                    <tree-row v-for="(data, index) in datas" :key="getItemId(data)"
                              :rowData="data"
                              :columns="columns"
                              :selectorData="getRowDataSelected(data)"
                              :rowNumber="index + 1"
                              :isColumnSetGrid="isColumnSetGrid"
                              :treeChildProperty="treeChildProperty"
                              :isParentRow="isParentRow"
                              :treeIndent="treeIndent"
                              :treeChildTemplate="treeChildTemplate"
                              :isAlwaysExpand="isAlwaysExpand"
                              @clickTreeRow="handleClickTreeRow">
                    </tree-row>

                </template>
                <template v-else>
                    <div v-for="(data, index) in datas"
                         :class="getRowClassName(data)"
                         :key="getItemId(data)"
                         @click="handleClickRow(data)">

                        <body-row :rowData="data"
                                  :columns="columns"
                                  :selectorData="getRowDataSelected(data)"
                                  :rowNumber="index + 1"
                                  :isColumnSetGrid="isColumnSetGrid">
                        </body-row>
                    </div>

                </template>
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
    import BodyRow from "./BodyRow";
    import TreeRow from "./TreeRow";
    import IdMixin from "./mixins/IdMixin";
    import EventBusMixin from "./mixins/EventBusMixin";

    export default {
        mixins: [EventBusMixin],

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
            },

            gridType: {
                type: String
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

            treeChildTemplate: {
                type: Function
            },

            isAlwaysExpand: {
                type: Boolean
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
            "tree-row": TreeRow,
            "body-row": BodyRow
        },

        inject: ["eventBus", "isRowActived", "getItemId"],

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

        computed: {
            isTreeGrid() {
                return this.gridType === "treeGrid";
            }
        },

        mounted() {
            this.refreshHeaderByScrollbarWidth();
            this.refreshNoticeMsg();
        },

        methods: {
            resizeColumnSetGrid(data) {
                this.resizeSetScrollbar(data);
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

            resizeSetScrollbar(size) {
                let isHaveScrollbar = false,
                    scrollbarContainer = this.$refs.setScrollbar;

                for (let i = 0, j = size.length; i < j; ++i) {
                    let item = size[i];

                    if (item.setWidth < item.contentWidth) {
                        let scrollbar = scrollbarContainer.querySelector(".set-scrollbar-" + item.index);

                        isHaveScrollbar = true;
                        scrollbar.style.display = "";
                        scrollbar.style.width = item.setWidth + "px";
                        scrollbar.children[0].style.width = item.contentWidth + "px";
                    }
                }
                if (isHaveScrollbar) {
                    scrollbarContainer.style.display = "";
                } else {
                    scrollbarContainer.style.display = "none";
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

            handleClickTreeRow(event) {
                this.handleClickRow(event.rowData);
            },

            handleClickRow(rowData) {
                this.triggerClickRow({rowData});
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
                let id = this.getItemId(rowData),
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
                let id = this.getItemId(rowData),
                    result = {};

                for (let key in this.radioSelected) {
                    if (this.radioSelected.hasOwnProperty(key)) {
                        if (this.radioSelected[key] === id) {
                            result[key] = true;
                        }
                    }
                }

                return result;
            }
        }
    };
</script>
