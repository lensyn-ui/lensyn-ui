<template>
    <div class="input" :class="inputModifier">
        <input ref="input" class="input__box"
               :autofocus="autofocus"
               :placeholder="placeholder"
               v-model="inputValue"
               @keyup.enter="enterEvt($event)"
               @focus="onInputFocus"
               :readonly="widgetReadonly"
               :disabled="disabled"
               :type="actualInputType"/>
        <span v-if="isShowErrorMsg" class="input__notice">{{validateErrorMsg}}</span>
    </div>
</template>

<script>
    import {Component, Watch} from 'vue-property-decorator';

    import Validator from "../validator/Validator";
    import FormWidget from '../base/FormWidget.vue';

    @Component({
        props: {
            autofocus: {
                type: Boolean,
                default: false
            },

            placeholder: {
                type: String,
                default: ''
            },

            inputType: {
                type: String,
                default: "text"
            },

            rule: {
                type: Object
            }
        }
    })
    export default class Input extends FormWidget {
        defaultValidateMsg = "请输入有效值";
        validateErrorMsg = "";
        isShowErrorMsg = false;

        widgetName = "input";

        inputValue = "";  //双向绑定值

        @Watch('inputValue')
        onInputValueChange(value, oldValue) {
            if (this.rule) {
                let editorValue = this.getValue(),
                    validateResult = Validator.validate(editorValue, this.rule);

                if (validateResult.status) {
                    this.updateInputValue(value, oldValue);
                } else {
                    if (validateResult.msg) {
                        this.validateErrorMsg = validateResult.msg;
                    } else {
                        this.validateErrorMsg = this.defaultValidateMsg;
                    }
                    this.isShowErrorMsg = true;
                    this.emitEvent("validateFailed", {value, oldValue, rule: this.rule});
                }
            } else {
                this.updateInputValue(value, oldValue);
            }
        }

        @Watch('value')
        onValueChange(currentValue) {
            if (currentValue !== this.inputValue) {
                this.inputValue = currentValue;
            }
        }

        get inputModifier() {
            let result = [];

            if (this.isReadonly()) {
                result.push("input--readonly");
            }

            if (this.isDisabled()) {
                result.push("input--disabled");
            }

            if (this.isNormalSize()) {
                result.push("input--normal");
            }

            if (this.isMiniSize()) {
                result.push("input--mini");
            }

            if (this.isBigSize()) {
                result.push("input--big");
            }
            return result;
        }

        get actualInputType() {
            if (this.inputType === "password") {
                return "password";
            }
            return "text";
        }

        mounted() {
            this.inputValue = this.value;
        }

        updateInputValue(value, oldValue) {
            this.isShowErrorMsg = false;
            this.validateErrorMsg = "";
            this.updateModel(value);
            this.emitEvent({action: "change", value, oldValue});
        }

        onInputFocus() {
            this.isShowErrorMsg = false;
            this.validateErrorMsg = "";
        }

        enterEvt($event) {
            this.emitEvent({action: 'enter', value: this.inputValue, $event});
        }

        getValue() {
            if (this.inputType === "number") {
                return Number(this.inputValue);
            }
            return this.inputValue;
        }

        focus() {
            this.$refs.input.focus();
        }
    }
</script>