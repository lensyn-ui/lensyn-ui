/***********************************************
* Created by zhangtao on 2018/05/09
************************************************
<template>
    <ls-dropdown ref="dropdown"
                 class="multiple-select"
                 :disabled="disabled"
                 :class="multipleSelectModifier"
                 @dropdownEvent="onDropdownEvent">
        <div slot="input" class="multiple-select__input-wrapper" @click="onClickInputWrapper">
            <div ref="checkedList" class="multiple-select__checked-list">
                <span class="multiple-select__checked-item" v-for="item in checkedIds"
                      :key="item"
                      :class="{'multiple-select__checked-item--delete': item === currentBackSpaceCheckedId}">
                    {{getItemLabelById(item)}}
                    <i class="multiple-select__delete-icon" v-if="isItemEnableDeleteById(item)" @click.stop="onClickDeleteItem(item)"></i>
                </span>
                <input ref="filterInput" v-if="isEnableFilter"
                       v-model="filterValue"
                       @input="onFilterInput"
                       class="multiple-select__filter"
                       @keydown.delete="onDeleteFilterValue">
            </div>
        </div>

        <div slot="list" class="multiple-select__list">
            <template v-if="isHaveCustomList">
                <slot></slot>
            </template>
            <template v-else>
                <ls-select-item v-for="item in showDatas"
                                :isChecked="isCheckedItem(item)"
                                :value="getItemValue(item)"
                                :id="getItemId(item)"
                                :key="getItemId(item)"
                                @clickItem="onClickItem">
                    {{getItemLabel(item)}}
                </ls-select-item>
                <ls-select-item v-if="isShowNoMatchDataSelectItem" :id="noMatchValue" :value="noMatchValue">
                    无匹配数据
                </ls-select-item>
            </template>
        </div>
    </ls-dropdown>
</template>

<script>
    import {Component, Prop, Watch} from "vue-property-decorator";
    import Dropdown from "../../Dropdown.vue";
    import FormWidget from "../../base/FormWidget.vue";
    import SelectItem from "./SelectItem.vue";

    @Component({
        components: {
            "ls-dropdown": Dropdown,
            "ls-select-item": SelectItem
        },

        props: {
            isEnableFilter: {
                type: Boolean,
                default: false
            },

            datas: {
                type: Array,
                default: () => []
            },

            idProperty: {
                type: String,
                default: "id"
            },

            labelProperty: {
                type: String,
                default: "name"
            },

            valueProperty: {
                type: String,
                default: "value"
            },

            value: {
                type: Array,
                default: () => []
            },

            isRemoveSelected: {
                type: Boolean,
                default: false
            },

            heightSize: {
                type: String,
                default: "normal"
            },

            filterDelayTime: {
                type: Number,
                default: 100
            }
        }
    })
    export default class MultipleSelect extends FormWidget {
        get isSimpleData() {
            return this.datas.length > 0 && typeof this.datas[0] !== "object";
        }

        get multipleSelectModifier() {
            let result = [];

            if (this.isMiniSize()) {
                result.push("multiple-select--mini");
            }

            if (this.isBigSize()) {
                result.push("multiple-select--big");
            }

            if (this.isDisabled()) {
                result.push("multiple-select--disabled");
            }

            if (this.heightSize === "max") {
                result.push("multiple-select--max-height-size");
            }

            return result;
        }

        widgetName = "multipleSelect";

        filterValue = "";
        showDatas = [];
        checkedIds = [];
        filterDelayJob = null;
        noMatchValue = "dropdown_select_no_match_value";
        currentBackSpaceCheckedId = null;

        get isHaveCustomList() {
            return this.$slots.default;
        }

        get isShowNoMatchDataSelectItem() {
            return this.isEnableFilter && this.showDatas.length === 0 && this.filterValue !== "";
        }

        @Watch("datas")
        onDatasChange() {
            this.refreshShowDatas();
        }

        @Watch("value")
        onValueChange() {
            this.refreshCheckedIdsByValue();
        }

        mounted() {
            if (this.value) {
                this.refreshCheckedIdsByValue();
            }
            this.refreshShowDatas();
            this.bindEventHandler();
        }

        bindEventHandler() {
            this.$on("clickSelectItem", this.onClickItem);
        }

        onDropdownEvent(event) {
            if (event.action === "close") {
                this.filterValue = "";
                this.refreshShowDatas();
            }
        }

        onFilterInput() {
            if (this.filterDelayJob) {
                clearTimeout(this.filterDelayJob);
            }
            this.filterDelayJob = setTimeout(() => {
                this.refreshShowDatas();
                this.currentBackSpaceCheckedId = null;
            }, this.filterDelayTime);
        }

        onClickInputWrapper() {
            if (this.isEnableFilter) {
                let input = this.$refs.filterInput;
                input.focus();
            }
        }

        onDeleteFilterValue() {
            if (this.filterValue.length === 0) {
                if (this.currentBackSpaceCheckedId === null) {
                    if (this.checkedIds.length > 0){
                        let id = this.checkedIds[this.checkedIds.length - 1];

                        if (this.isItemEnableDeleteById(id)) {
                            this.currentBackSpaceCheckedId = this.checkedIds[this.checkedIds.length - 1];
                        }
                    }
                } else {
                    this.onClickDeleteItem(this.currentBackSpaceCheckedId);
                    this.currentBackSpaceCheckedId = null;
                }
            }
        }

        refreshCheckedIdsByValue() {
            if (this.datas.length > 0) {
                let ids = this.datas.filter((item) => this.value.indexOf(this.getItemValue(item)) !== -1).
                        map((item) => this.getItemId(item));

                this.checkedIds = ids;
            } else {
                this.checkedIds = [];
            }

            if (this.isRemoveSelected) {
                this.refreshShowDatas();
            }
        }

        isItemEnableDeleteById(id) {
            let item = this.findItemById(id);

            return this.isItemEnableDelete(item);
        }

        isItemEnableDelete(item) {
            if (item) {
                return !item.isFixed;
            }
            return true;
        }

        getItemLabelById(id) {
            let item = this.findItemById(id);

            if (item) {
                return this.getItemLabel(item);
            }
        }

        findItemByValue(value) {
            for (let i = 0, j = this.datas.length; i < j; ++i) {
                let item = this.datas[i];
                if (this.getItemValue(item) === value) {
                    return item;
                }
            }
            return null;
        }

        findItemById(id) {
            for (let i = 0, j = this.datas.length; i < j; ++i) {
                let item = this.datas[i];

                if (this.getItemId(item) === id) {
                    return item;
                }
            }
            return null;
        }

        refreshShowDatas() {
            let datas = this.datas.filter((item) => this.isMatchFilter(item));
            if (this.isRemoveSelected) {
                datas = datas.filter((item) => !this.isCheckedItem(item));
            }
            this.showDatas = datas;
        }

        isMatchFilter(item) {
            if (!this.filterValue) {
                return true;
            }
            let label = this.getItemLabel(item);

            return label.indexOf(this.filterValue) !== -1;
        }

        updateValue() {
            let values = this.datas.filter((item) => this.checkedIds.indexOf(this.getItemId(item)) !== -1).
                    map((item) => this.getItemValue(item));

            this.updateModel(values);
        }

        onClickDeleteItem(id) {
            let index = this.checkedIds.indexOf(id);

            this.checkedIds.splice(index, 1);
            this.updateValue();
            if (this.isRemoveSelected) {
                this.refreshShowDatas();
            }
            this.$nextTick(() => {
                this.refreshDropdownPosition();
            });
        }

        onClickItem(event) {
            if (event.id === this.noMatchValue) {
                return;
            }
            let item = this.findItemById(event.id);

            if (this.isCheckedItem(item)) {
                if (this.isItemEnableDelete(item)) {
                    this.unCheckedItem(item);
                    this.updateValue();
                    this.$nextTick(() => {
                        this.refreshDropdownPosition();
                        if (this.isEnableFilter) {
                            let input = this.$refs.filterInput;
                            input.focus();
                        }
                    });
                }
            } else {
                this.checkedItem(item);
                this.updateValue();
                if (this.isRemoveSelected) {
                    this.refreshShowDatas();
                }
                this.$nextTick(() => {
                    this.refreshDropdownPosition();
                    if (this.isEnableFilter) {
                        let input = this.$refs.filterInput;
                        input.focus();
                    }
                });
            }
        }

        refreshDropdownPosition() {
            let dropdown = this.$refs.dropdown;

            dropdown.repositionList();
        }

        checkedItem(item) {
            let id = this.getItemId(item);

            this.checkedIds.push(id);
        }

        unCheckedItem(item) {
            let id = this.getItemId(item),
                index = this.checkedIds.indexOf(id);

            if (index !== -1) {
                this.checkedIds.splice(index, 1);
            }
        }

        isCheckedItem(item) {
            let id = this.getItemId(item);


            return this.checkedIds.indexOf(id) !== -1;
        }

        getItemId(item) {
            if (this.isSimpleData) {
                return item;
            }
            return item[this.idProperty];
        }

        getItemLabel(item) {
            if (this.isSimpleData) {
                return item;
            }
            return item[this.labelProperty];
        }

        getItemValue(item) {
            if (this.isSimpleData) {
                return item;
            }
            return item[this.valueProperty];
        }

        getValue() {
            return this.datas.filter((item) => this.checkedIds.indexOf(this.getItemId(item)) !== -1);
        }
    };
</script>