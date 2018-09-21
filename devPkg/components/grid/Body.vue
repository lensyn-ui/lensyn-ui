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
                              :rowClassNameFn="rowClassNameFn"
                              @clickTreeRow="handleClickTreeRow">
                    </tree-row>

                </template>
                <template v-else>
                    <div v-for="(data, index) in datas"
                         :class="getRowClassName(data, index)"
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
    import EventBusMixin from "./mixins/EventBusMixin";
    import Util from "./helper/GridUtil";

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
                defaultRowClassName: "grid-row",
                mouseScrollListener: null,
                onGridContentScrollHandler: null
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
            this.bindEventListener();
            this.refreshHeaderByScrollbarWidth();
            this.refreshNoticeMsg();
        },

        beforeDestroy() {
            this.$refs.contentWrapper.removeEventListener(Util.getMouseScrollEventName(), this.onGridContentScrollHandler);
        },

        methods: {
            bindEventListener() {
                this.onGridContentScrollHandler = this.onGridContentVerticalScroll.bind(this);
                this.mouseDownListener =
                    this.$refs.contentWrapper.addEventListener(Util.getMouseScrollEventName(), this.onGridContentScrollHandler);
            },

            setContentVerticalScrollToTop() {
                this.setContentVerticalScrollPosition(0);
            },

            setContentVerticalScrollToBottom() {
                let element = this.$refs.contentWrapper,
                    offsetHeight = element.offsetHeight,
                    scrollHeight = element.scrollHeight;
                this.setContentVerticalScrollPosition(scrollHeight - offsetHeight);
            },

            setContentVerticalScrollPosition(top) {
                this.$refs.contentWrapper.scrollTop = top;
            },

            resizeColumnSetGrid(data) {
                this.resizeSetScrollbar(data);
            },

            getRowClassName(rowData, index) {
                let str = this.defaultRowClassName;

                if (this.rowClassNameFn) {
                    let extra = "";
                    if (Util.isFunction(this.rowClassNameFn)) {
                        extra = this.rowClassNameFn(rowData, index);
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
                    let item = size[i],
                        scrollbar = scrollbarContainer.querySelector(".set-scrollbar-" + item.index);

                    scrollbar.style.display = "";
                    scrollbar.style.width = item.setWidth + "px";

                    if (item.setWidth < item.contentWidth) {
                        isHaveScrollbar = true;
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
            },

            onGridContentVerticalScroll($event) {
                this.$emit("contentVerticalScroll", {$event, contentWrapper: this.$refs.contentWrapper});
            },

            /**
             * 获取行元素
             * @private
             * @param {number} rowNumber - 第几行
             */
            getRowElementByRowNumber(rowNumber) {
                return this.$refs.content.querySelector(`.grid-row:nth-of-type(${rowNumber})`);
            },

            /**
             * 设置滚动条到某行数据
             * @public
             * @todo 增加对树形表格的支持
             * @param {object} rowData - 对应的行数据
             */
            scrollToRow(rowData) {
                let index = this.datas.indexOf(rowData);

                if (index !== -1) {
                    let element = this.getRowElementByRowNumber(index + 1);

                    if (element) {
                        let contentElement = this.$refs.content,
                            rowHeight = element.offsetHeight,
                            elementOffsetTop = element.offsetTop,
                            contentHeight = contentElement.offsetHeight,
                            contentScrollHeight = contentElement.scrollHeight;

                        // 如果行在内容区内，则直接将滚动位置设置为 0;
                        if (elementOffsetTop + rowHeight < contentHeight) {
                            this.scrollToTop();
                            return;
                        }
                        // 如果滚动区域的高度大于或等该行在最顶部 + 内容区的高度，则滚动到该行显示到最顶部
                        if (contentScrollHeight >= elementOffsetTop + contentHeight) {
                            contentElement.scrollTop = elementOffsetTop;
                            return;
                        }
                        this.scrollToBottom();
                    }
                }
            },

            /**
             * 设置滚动条到最底部
             * @public
             */
            scrollToBottom() {
                let content = this.$refs.content;

                content.scrollTop = content.scrollHeight - content.offsetHeight;
            },

            /**
             * 设置滚动条到最顶部
             * @public
             */
            scrollToTop() {
                this.$refs.content.scrollTop = 0;
            }
        }
    };
</script>
