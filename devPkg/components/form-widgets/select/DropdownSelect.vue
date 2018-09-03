/*************************************************
* Created by zhangtao on 2018/04/20
*************************************************/
<template>
    <ls-dropdown ref="dropdown" class="dropdown-select"
                 :isAutoWidth="isAutoWidth"
                 :class="[dropdownModifier]"
                 :disabled="disabled"
                 @dropdownEvent="handleDropdownEvent">

        <div slot="input" class="dropdown-select__input-wrapper">
            <input ref="input"
                   class="dropdown-select__input"
                   v-model="inputValue"
                   :readonly="!isEnableInput"
                   @blur="handleInputBlur"
                   @keyup.delete="handleInputDeleteEvent"/>

            <i v-if="isEnableDelete" class="dropdown-select__remove" @click="handleClickRemove"></i>
        </div>

        <div slot="list" class="dropdown-select__list">
            <template v-if="isHaveCustomList">
                <slot></slot>
            </template>
            <template v-else>
                <ls-select-item v-for="item in showDatas"
                                :key="getItemId(item)"
                                :id="getItemId(item)"
                                :value="getItemValue(item)">
                    {{getItemLabel(item)}}
                </ls-select-item>
                <ls-select-item v-if="showDatas.length === 0" :id="noMatchValue" :value="noMatchValue">
                    无匹配数据
                </ls-select-item>
            </template>
        </div>
    </ls-dropdown>
</template>

<script>
    import {Component, Watch} from "vue-property-decorator";
    import FormWidget from "../../base/FormWidget.vue";
    import SelectItem from "./SelectItem.vue";
    import Dropdown from "../../Dropdown.vue";

    @Component({
        components: {
            "ls-dropdown": Dropdown,
            "ls-select-item": SelectItem
        },

        props: {
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

            isMatchSearchValue: {
                type: Function
            },

            value: {
                type: [String, Number],
                default: ""
            },

            isEnableFilter: {
                type: Boolean,
                default: false
            },

            isEnableNotContainValue: {
                type: Boolean,
                default: false
            },

            isAutoWidth: {
                type: Boolean,
                default: false
            },

            isUserCustomList: {
                type: Boolean,
                default: false
            },

            isEnableDelete: {
                type: Boolean,
                default: false
            }
        },

        provide() {
            return {
                isCheckedById: this.isCheckedById
            };
        }
    })
    export default class DropdownSelect extends FormWidget {
        currentSelected = "";
        showDatas = [];
        inputValue = "";

        noMatchValue = "dropdown_select_no_match_value";
        widgetName = "dropdownSelect";

        get dropdownModifier() {
            let result = [];

            if (this.isMiniSize()) {
                result.push("dropdown-select--mini");
            }

            if (this.isBigSize()) {
                result.push("dropdown-select--big");
            }

            if (this.isDisabled()) {
                result.push("dropdown-select--disabled");
            }

            return result;
        }

        get isHaveCustomList() {
            return this.isUserCustomList || this.$slots.default;
        }

        get isEnableInput() {
            return this.isEnableFilter || this.isEnableNotContainValue;
        }

        @Watch("inputValue")
        onFilterValueChange() {
            this.refreshShowDatas();
        }

        @Watch("datas")
        onDatasChange() {
            this.refreshShowDatas();
            this.refreshInputValue();
        }

        @Watch("value")
        onValueChange(currentValue) {
            if (currentValue !== this.currentSelected) {
                if (this.isEnableNotContainValue) {
                    if (this.isContainItemValue(currentValue)) {
                        this.currentSelected = currentValue;
                    } else {
                        this.inputValue = currentValue + "";
                    }
                } else {
                    this.currentSelected = currentValue;
                }
            }
        }

        @Watch("currentSelected")
        onCurrentValueChange() {
            this.refreshInputValue();
        }

        mounted() {
            if (this.isContainItemValue(this.value)) {
                this.currentSelected = this.value;
                this.refreshInputValue();
            } else {
                if (this.isEnableNotContainValue) {
                    this.inputValue = this.value + "";
                }
            }
            this.refreshShowDatas();
            this.bindEventHandler();
        }

        bindEventHandler() {
            this.$on("clickSelectItem", this.onClickItem);
        }

        refreshInputValue() {
            if (this.isEnableNotContainValue) {
                if (typeof this.currentSelected !== "undefined") {
                    let item = this.findItemByValue(this.currentSelected);

                    if (item !== null) {
                        this.inputValue = this.getItemLabel(item);
                    }
                }
            } else {
                let item = this.findItemByValue(this.currentSelected),
                    value = "";

                if (item !== null) {
                    value = this.getItemLabel(item);
                }
                this.inputValue = value;
            }
        }

        refreshShowDatas() {

            let datas = this.datas.filter((item) => this.checkedItemIsMatchFilterValue(item));

            this.updateShowDatas(datas);
        }

        updateShowDatas(datas) {
            this.showDatas = datas;
            this.emitEvent({action: "updateShowData", data: datas});
        }

        checkedItemIsMatchFilterValue(item) {
            if (!this.isEnableFilter) {
                return true;
            }

            if (this.inputValue === "") {
                return true;
            }

            if (typeof this.isMatchSearchValue !== "undefined") {
                return this.isMatchSearchValue(this.inputValue, item);
            }

            return this.defaultIsMatchSearchValue(item);
        }

        defaultIsMatchSearchValue(item) {
            let label = this.getItemLabel(item);

            return label.toLowerCase().indexOf(this.inputValue.toLowerCase()) !== -1;
        }

        isContainItemValue(value) {
            return this.findItemByValue(value) !== null;
        }

        onClickItem(event) {
            if (event.id === this.noMatchValue) {
                this.emitEvent({action: "clickNoMatchItem"});
                return;
            }
            let item = this.findItemById(event.id),
                value = this.getItemValue(item),
                dropdown = this.$refs.dropdown;

            if (value !== this.currentSelected) {
                this.currentSelected = value;
                this.updateModel(this.currentSelected);
            } else {
                this.refreshInputValue();
            }
            dropdown.collapse();
            this.emitEvent({action: "clickItem", data: item});
        }

        findItemById(id) {
            for (let i = 0, j = this.datas.length; i < j; ++i) {
                if (this.getItemId(this.datas[i]) === id) {
                    return this.datas[i];
                }
            }
            return null;
        }

        findItemByValue(value) {
            for (let i = 0, j = this.datas.length; i < j; ++i) {
                if (this.getItemValue(this.datas[i]) === value) {
                    return this.datas[i];
                }
            }
            return null;
        }

        getItemLabel(item) {
            return item[this.labelProperty];
        }

        getItemId(item) {
            return item[this.idProperty];
        }

        getItemValue(item) {
            if (this.valueProperty) {
                return item[this.valueProperty];
            }
            return this.getItemId(item);
        }

        isCheckedById(id) {
            if (id === this.noMatchValue) {
                return false;
            }
            let item = this.findItemById(id);

            return this.isItemChecked(item);
        }

        isItemChecked(item) {
            return this.getItemValue(item) === this.currentSelected;
        }

        handleInputBlur() {
            this.$nextTick(() => {
                if (this.isEnableNotContainValue) {
                    if (!this.isContainItemValue(this.inputValue)) {
                        this.updateModel(this.inputValue);
                        this.currentSelected = "";
                    }
                } else {
                    if (this.currentSelected) {
                        let labels = this.datas.map((item) => this.getItemLabel(item));

                        if (labels.indexOf(this.inputValue) === -1) {
                            this.refreshInputValue();
                        }
                    }
                }
            });
        }

        handleClickRemove() {
            if (this.currentSelected !== "") {
                this.clearValue();
            }
        }

        handleInputDeleteEvent() {
            if (this.isEnableDelete && this.currentSelected !== "") {
                this.clearValue();
            }
        }

        handleDropdownEvent({action}) {
            if (action === "expand" && this.isEnableFilter) {
                this.updateShowDatas(this.datas);
                let input = this.$refs.input;

                if (input.select) {
                    input.select();
                }
            }
        }

        clearValue() {
            this.updateModel("");
        }

        validate() {
            return true;
        }

        getValue() {
            return this.currentSelected;
        }
    };
</script>