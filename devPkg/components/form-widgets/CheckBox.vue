<template>
    <label class="checkbox" @click="onClickCheckbox" :class="checkboxModifier">
        <span class="checkbox__input"></span>
        <span v-if="isShowLabel" class="checkbox__text">{{label}}</span>
    </label>
</template>

<script>
    import {Component, Watch} from "vue-property-decorator";
    import FormWidget from '../base/FormWidget.vue';

    @Component({
        props: {
            checked: {
                type: Boolean,
                default: false
            },

            label: {
                type: String,
                default: ""
            }
        },

        model: {
            prop: "checked",
            event: "input"
        }
    })
    export default class Checkbox extends FormWidget {
        widgetName = "checkbox";

        isChecked = false;

        get checkboxModifier() {
            let result = [];

            if (this.isDisabled()) {
                result.push("checkbox--disabled");
            }

            if (this.isChecked) {
                result.push("checkbox--checked");
            }

            return result;
        }

        get isShowLabel() {
            return this.label !== "";
        }

        @Watch("checked")
        onCheckedChange() {
            this.isChecked = this.checked;
        }

        mounted() {
            this.isChecked = this.checked;
        }

        onClickCheckbox() {
            if (this.isDisabled()) {
                return;
            }
            let newValue = !this.isChecked;
            this.$emit("input", newValue);
            this.emitEvent({action: 'check', checked: newValue, oldValue: this.isChecked});
        }

        /**
         * 获取值
         * @public
         * @returns {boolean}
         */
        getValue() {
            return this.isChecked;
        }
    }
</script>