<template>
    <label class="radio" @click="clickRadioCheck" :class="radioModifier">
        <span class="radio__input"></span>
        <span v-if="isShowLabel" class="radio__label">{{label}}</span>
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

            name: {
                type: String,
                required: true
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
    export default class Radio extends FormWidget {
        widgetName = "radio";

        isChecked = false;

        get radioModifier() {
            let result = [];

            if (this.isDisabled()) {
                result.push("radio--disabled");
            }

            if (this.isChecked) {
                result.push("radio--checked");
            }

            return result;
        }

        get isShowLabel() {
            return this.label !== "";
        }

        @Watch('checked')
        onCheckedChange(value) {
            this.isChecked = value;
        }

        mounted() {
            this.isChecked = this.checked;
        }

        clickRadioCheck() {
            if (this.isDisabled()) {
                return;
            }
            let newValue = !this.isChecked;

            this.$emit("input", newValue);
            this.emitEvent({action: "check", checked: newValue, oldValue: this.isChecked, name: this.name});
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