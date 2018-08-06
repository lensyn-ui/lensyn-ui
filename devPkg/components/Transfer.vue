/***********************************************
* Created by zhangtao on 2018/08/03
************************************************

<script>
    import { Component, Watch } from "vue-property-decorator";

    import Widget from "./base/Widget";
    import Panel from "./Panel";
    import Checkbox from "./form-widgets/CheckBox";
    import Input from "./form-widgets/Input";
    import Button from "./form-widgets/Button";
    import {isEmpty, isObject} from "./helper/util";

    @Component({
        props: {
            datas: {
                type: Array,
                default: () => []
            },

            labelProperty: {
                type: String,
                default: "name"
            },

            idProperty: {
                type: String,
                default: "id"
            },

            valueProperty: {
                type: String,
                default: "value"
            },

            sourceListTitle: {
                type: String,
                default: "源列表"
            },

            targetListTitle: {
                type: String,
                default: "目标列表"
            },

            value: {
                type: Array,
                default: () => []
            },

            isEnableSourceFilter: {
                type: Boolean,
                default: true
            },

            isEnableTargetFilter: {
                type: Boolean,
                default: true
            },

            filterFn: {
                type: Function
            }
        }
    })
    export default class Transfer extends Widget {
        widgetName = "transfer";
        widgetClassName = "transfer";

        sourceListDatas = [];
        showSourceListDatas = [];
        searchSourceKeyValue = "";
        currentSourceSelectedItems = [];
        checkedAllSourceValue = false;

        targetListDatas = [];
        showTargetListDatas = [];
        searchTargetKeyValue = "";
        currentTargetSelectedItems = [];
        checkedAllTargetValue = false;

        get isEnableToTargetBtn() {
            return this.currentSourceSelectedItems.length > 0;
        }

        get isEnableToSourceBtn() {
            return this.currentTargetSelectedItems.length > 0;
        }

        get isSimpleData() {
            return this.datas[0] && !isObject(this.datas[0]);
        }

        @Watch("searchSourceKeyValue")
        onSearchSourceKeyValueChange() {
            this.refreshShowSourceListDatas();
        }

        @Watch("searchTargetKeyValue")
        onSearchTargetKeyValueChange() {
            this.refreshShowTargetListDatas();
        }

        @Watch("sourceListDatas")
        onSourceListDatasChange() {
            this.refreshShowSourceListDatas();
        }

        @Watch("targetListDatas")
        onTargetListDatasChange() {
            this.refreshShowTargetListDatas();
        }

        mounted() {
            this.setInitData();
        }

        /**
         * 获取目标数据
         * @public
         */
        getTargetDatas() {
            return this.targetListDatas;
        }

        /**
         * 获取源数据
         * @public
         */
        getSourceDatas() {
            return this.sourceListDatas;
        }

        /**
         * 选中源列表项
         * @public
         */
        checkedSourceData(data) {
            if (!this.isSourceItemChecked(data)) {
                this.currentSourceSelectedItems.push(this.getItemId(data));

                if (this.currentSourceSelectedItems.length === this.sourceListDatas.length) {
                    this.checkedAllSourceValue = true;
                }
            }
        }

        /**
         * 取消选中源列表项
         * @public
         */
        uncheckedSourceData(data) {
            if (this.isSourceItemChecked(data)) {
                this.currentSourceSelectedItems.splice(this.currentSourceSelectedItems.indexOf(this.getItemId(data)), 1);
                this.checkedAllSourceValue = false;
            }
        }

        /**
         * 切换源列表项的选中状态
         * @public
         */
        toggleCheckSourceData(data) {
            if (this.isSourceItemChecked(data)) {
                this.uncheckedSourceData(data);
            } else {
                this.checkedSourceData(data);
            }
        }

        /**
         * 选中全部源列表项
         * @public
         */
        checkedAllSourceData() {
            if (!this.checkedAllSourceValue) {
                this.currentSourceSelectedItems = this.sourceListDatas.map((item) => this.getItemId(item));
                this.checkedAllSourceValue = true;
            }
        }

        /**
         * 取消选中所有源列表项
         * @public
         */
        uncheckedAllSourceData() {
            if (this.checkedAllSourceValue) {
                this.currentSourceSelectedItems = [];
                this.checkedAllSourceValue = false;
            }
        }

        /**
         * 切换源列表项的全选状态
         * @public
         */
        toggleCheckAllSourceData() {
            if (this.checkedAllSourceValue) {
                this.uncheckedAllSourceData();
            } else {
                this.checkedAllSourceData();
            }
        }

        /**
         * 选中目标列表项
         * @public
         */
        checkedTargetData(data) {
            if (!this.isTargetItemChecked(data)) {
                this.currentTargetSelectedItems.push(this.getItemId(data));
                if (this.currentTargetSelectedItems.length === this.targetListDatas.length) {
                    this.checkedAllTargetValue = true;
                }
            }
        }

        /**
         * 取消选中目标列表项
         * @public
         */
        uncheckedTargetData(data) {
            if (this.isTargetItemChecked(data)) {
                this.currentTargetSelectedItems.splice(this.currentTargetSelectedItems.indexOf(this.getItemId(data)), 1);
                this.checkedAllTargetValue = false;
            }
        }

        /**
         * 切换目标列表项的选中状态
         * @public
         */
        toggleCheckTargetData(data) {
            if (this.isTargetItemChecked(data)) {
                this.uncheckedTargetData(data);
            } else {
                this.checkedTargetData(data);
            }
        }

        /**
         * 选中全部目标列表项
         * @public
         */
        checkedAllTargetData() {
            if (!this.checkedAllTargetValue) {
                this.currentTargetSelectedItems = this.targetListDatas.map((item) => this.getItemId(item));
                this.checkedAllTargetValue = true;
            }
        }

        /**
         * 取消选中所有源列表项
         * @public
         */
        uncheckedAllTargetData() {
            if (this.checkedAllTargetValue) {
                this.currentTargetSelectedItems = [];
                this.checkedAllTargetValue = false;
            }
        }

        /**
         * 切换目标列表项的全选状态
         * @public
         */
        toggleCheckAllTargetData() {
            if (this.checkedAllTargetValue) {
                this.uncheckedAllTargetData();
            } else {
                this.checkedAllTargetData();
            }
        }

        /**
         * 设置初始数据
         */
        setInitData() {
            this.sourceListDatas = this.datas.filter((item) => this.value.indexOf(this.getItemId(item)) === -1);
            this.targetListDatas = this.datas.filter((item) => this.value.indexOf(this.getItemId(item)) !== -1);
        }

        /**
         * 刷新显示的源列表的数据
         * @private
         */
        refreshShowSourceListDatas() {
            this.showSourceListDatas = this.sourceListDatas.filter((item) => this.isMatchKeyValue(item, this.searchSourceKeyValue, "source"));
        }

        /**
         * 刷新显示的源列表的数据
         * @private
         */
        refreshShowTargetListDatas() {
            this.showTargetListDatas = this.targetListDatas.filter((item) => this.isMatchKeyValue(item, this.searchTargetKeyValue, "target"));
        }

        /**
         * 判断是否匹配过滤值
         * @private
         * @param {object} data
         * @param {string} keyValue
         * @param {string} dataType - 数据类型，如果是源列表则为 source, 目标列表则为 target
         */
        isMatchKeyValue(data, keyValue, dataType) {
            if (this.filterFn) {
                return this.filterFn(data, keyValue, dataType);
            }

            if (isEmpty(keyValue)) {
                return true;
            }

            let value = this.getItemLabel(data);

            return (value + "").toLowerCase().indexOf(keyValue.toLowerCase()) !== -1;
        }

        /**
         * 获取数据的 id
         * @private
         * @param {object} data
         * @return {string | number} - 数据的 id
         */
        getItemId(data) {
            if (this.isSimpleData) {
                return data;
            }
            return data[this.idProperty];
        }

        /**
         * 获取数据的 value
         * @private
         * @param {object} data
         * @return {string | number} - 数据的值
         */
        getItemValue(data) {
            if (this.isSimpleData) {
                return data;
            }
            return data[this.valueProperty];
        }

        /**
         * 获取数据的 label
         * @private
         * @param {object} data
         * @return {string | number} - 数据的名称
         */
        getItemLabel(data) {
            if (this.isSimpleData) {
                return data;
            }
            return data[this.labelProperty];
        }

        /**
         * 判断数据是否为源列表中的选中项
         * @private
         * @param {object} data
         */
        isSourceItemChecked(data) {
            let id = this.getItemId(data);

            return this.currentSourceSelectedItems.indexOf(id) !== -1;
        }

        /**
         * 判断数据是否为目标列表中的选中项
         * @private
         * @param {object} data
         */
        isTargetItemChecked(data) {
            let id = this.getItemId(data);

            return this.currentTargetSelectedItems.indexOf(id) !== -1;
        }

        /**
         * @private
         */
        handleSourceCheckAllEvent($event) {
            if ($event.action === "check") {
                if ($event.checked) {
                    this.checkedAllSourceData();
                } else {
                    this.uncheckedAllSourceData();
                }
            }
        }

        /**
         * @private
         */
        handleTargetCheckAllEvent($event) {
            if ($event.action === "check") {
                if ($event.checked) {
                    this.checkedAllTargetData();
                } else {
                    this.uncheckedAllTargetData();
                }
            }
        }

        /**
         * @private
         */
        handleSourceCheckboxEvent($event, data) {
            if ($event.action === "check") {
                this.toggleCheckSourceData(data);
            }
        }

        /**
         * @private
         */
        handleTargetCheckboxEvent($event, data) {
            if ($event.action === "check") {
                this.toggleCheckTargetData(data);
            }
        }

        handleClickToTargetBtn() {
            let moveDatas = this.sourceListDatas.filter((item) => this.isSourceItemChecked(item));

            this.sourceListDatas = this.sourceListDatas.filter((item) => !this.isSourceItemChecked(item));

            this.currentSourceSelectedItems = [];
            this.checkedAllSourceValue = false;

            this.targetListDatas = this.targetListDatas.concat(moveDatas);
        }

        handleClickToSourceBtn() {
            let moveDatas = this.targetListDatas.filter((item) => this.isTargetItemChecked(item));

            this.targetListDatas = this.targetListDatas.filter((item) => !this.isTargetItemChecked(item));

            this.currentTargetSelectedItems = [];
            this.checkedAllTargetValue = false;

            this.sourceListDatas = this.sourceListDatas.concat(moveDatas);
        }

        /**
         * 创建源列表
         * @private
         * @param {function} createElement
         * @return {object}
         */
        renderSourceListPanel(createElement) {
            let children = [];

            children.push(this.renderSourceListPanelHeader(createElement));
            children.push(this.renderSourceListPanelBody(createElement));

            return createElement(Panel, {

            }, children);
        }

        /**
         * 创建源列表的标题
         * @private
         * @param {function} createElement
         * @return {object}
         */
        renderSourceListPanelHeader(createElement) {
            if (this.$scopedSlots.sourceHeader) {
                let header = this.$scopedSlots.sourceHeader({
                    sourceList: this.sourceListDatas,
                    isCheckedAll: this.checkedAllSourceValue,
                    checkedData: this.currentSourceSelectedItems
                });
                return createElement("div", {
                    "class": "transfer_header",
                    slot: "header"
                }, [header]);
            }
            return this.renderSourceListPanelDefaultHeader(createElement);
        }

        /**
         * 创建默认的源列表的标题
         * @private
         * @param {function} createElement
         * @return {object}
         */
        renderSourceListPanelDefaultHeader(createElement) {
            let children = [];

            children.push(createElement(Checkbox, {
                props: {
                    checked: this.checkedAllSourceValue
                },
                on: {
                    checkboxEvent: ($event) => this.handleSourceCheckAllEvent($event)
                }
            }));

            children.push(createElement("span", {}, [this.sourceListTitle]));

            return createElement("div", {
                "class": "transfer__header",
                slot: "header"
            }, children);
        }

        /**
         * 创建源列表的内容区
         * @private
         * @param {function} createElement
         * @return {object}
         */
        renderSourceListPanelBody(createElement) {
            let children = [],
                list = [];

            if (this.isEnableSourceFilter) {
                children.push(createElement(Input, {
                    props: {
                        size: "mini",
                        value: this.searchSourceKeyValue
                    },
                    on: {
                        input: (value) => {
                            this.searchSourceKeyValue = value;
                        }
                    }
                }));
            }

            if (this.$scopedSlots.sourceList) {

                let list = this.$scopedSlots.sourceList({
                    showSourceList: this.showSourceListDatas,
                    sourceList: this.sourceListDatas,
                    isCheckedAll: this.checkedAllSourceValue,
                    checkedData: this.currentSourceSelectedItems,
                    vm: this
                });
                children.push(
                    createElement("div", {
                        "class": "transfer__list"
                    }, [list])
                );
            } else {
                for (let i = 0, j = this.showSourceListDatas.length; i < j; ++i) {
                    let subs = [],
                        data = this.showSourceListDatas[i];

                    subs.push(createElement(Checkbox, {
                        props: {
                            checked: this.isSourceItemChecked(data)
                        },
                        on: {
                            checkboxEvent: ($event) => this.handleSourceCheckboxEvent($event, data)
                        }
                    }));

                    subs.push(createElement("span", {}, [this.getItemLabel(data)]));

                    list.push(createElement("li", {
                        key: this.getItemId(data)
                    }, subs));
                }
                children.push(createElement("ul", {"class": "transfer__list"}, list));
            }


            return createElement("div", {
                "class": `transfer__body ${this.isEnableSourceFilter ? 'transfer__body--filter' : ''}`,
                slot: "body"
            }, children);
        }

        /**
         * 创建目标列表
         * @private
         * @param {function} createElement
         * @return {object};
         */
        renderTargetListPanel(createElement) {
            let children = [];

            children.push(this.renderTargetListPanelHeader(createElement));
            children.push(this.renderTargetListPanelBody(createElement));

            return createElement(Panel, {
            }, children);
        }

          /**
         * 创建目标列表的标题
         * @private
         * @param {function} createElement
         * @return {object}
         */
        renderTargetListPanelHeader(createElement) {
              if (this.$scopedSlots.targetHeader) {
                  let header = this.$scopedSlots.sourceHeader({
                      targetList: this.targetListDatas,
                      isCheckedAll: this.checkedAllTargetValue,
                      checkedData: this.currentTargetSelectedItems
                  });
                  return createElement("div", {
                      "class": "transfer_header",
                      slot: "header"
                  }, [header]);
              }
            return this.renderDefaultTargetListPanelHeader(createElement);
        }

        /**
         * 创建默认的目标列表的标题
         * @private
         * @param {function} createElement
         * @return {object}
         */
        renderDefaultTargetListPanelHeader(createElement) {
            let children = [];

            children.push(createElement(Checkbox, {
                props: {
                    checked: this.checkedAllTargetValue
                },
                on: {
                    checkboxEvent: ($event) => this.handleTargetCheckAllEvent($event)
                }
            }));

            children.push(createElement("span", {}, [this.targetListTitle]));

            return createElement("div", {
                "class": "transfer__header",
                slot: "header"
            }, children);
        }

        /**
         * 创建目标列表的内容区
         * @private
         * @param {function} createElement
         * @return {object}
         */
        renderTargetListPanelBody(createElement) {
            let children = [],
                list = [];

            if (this.isEnableTargetFilter) {
                children.push(createElement(Input, {
                    props: {
                        size: "mini",
                        value: this.searchTargetKeyValue
                    },
                    on: {
                        input: (value) => this.searchTargetKeyValue = value
                    }
                }));
            }

            if (this.$scopedSlots.targetList) {
                let list = this.$scopedSlots.targetList({
                    showTargetList: this.showTargetListDatas,
                    targetList: this.targetListDatas,
                    isCheckedAll: this.checkedAllTargetValue,
                    checkedData: this.currentTargetSelectedItems,
                    vm: this
                });
                children.push(createElement("div", {
                    "class": "transfer__list"
                }, [list]));
            } else {
                for (let i = 0, j = this.showTargetListDatas.length; i < j; ++i) {
                    let subs = [],
                        data = this.showTargetListDatas[i];

                    subs.push(createElement(Checkbox, {
                        props: {
                            checked: this.isTargetItemChecked(data)
                        },
                        on: {
                            checkboxEvent: ($event) => this.handleTargetCheckboxEvent($event, data)
                        }
                    }));

                    subs.push(createElement("span", {}, [this.getItemLabel(data)]));

                    list.push(createElement("li", {
                        key: this.getItemId(data)
                    }, subs));
                }

                children.push(createElement("ul", { "class": "transfer__list" }, list));
            }


            return createElement("div", {
                "class": `transfer__body ${this.isEnableTargetFilter ? 'transfer__body--filter' : ''}`,
                slot: "body"
            }, children);
        }

        /**
         * 创建操作按钮
         * @private
         * @param {function} createElement
         * @return {object}
         */
        renderOperate(createElement) {
            let children = [];

            children.push(createElement(Button, {
                props: {
                    disabled: !this.isEnableToTargetBtn
                },
                on: {
                    buttonEvent: () => this.handleClickToTargetBtn()
                }
            }, [
                createElement("i", {
                    "class": "icon icon--forward"
                })
            ]));

            children.push(createElement(Button, {
                props: {
                    disabled: !this.isEnableToSourceBtn
                },
                on: {
                    buttonEvent: () => this.handleClickToSourceBtn()
                }
            }, [
                createElement("i", {
                    "class": "icon icon--back"
                })
            ]));

            return createElement("div", {
                "class": "transfer__operation"
            }, children);
        }

        /**
         * 创建弹出框的内容区
         * @private
         * @param {function} createElement
         * @return {object}
         */
        renderContent(createElement) {
            let contents = [];

            contents.push(this.renderSourceListPanel(createElement));
            contents.push(this.renderOperate(createElement));
            contents.push(this.renderTargetListPanel(createElement));

            return contents;
        }

        /**
         * @private
         * @param {function} createElement
         * @return {object}
         */
        render(createElement) {
            return createElement("div", {
                "class": this.widgetClassName,
            }, this.renderContent(createElement));
        }
    };
</script>