<template>
    <div class="input-editor" :class="inputModifier">
        <input v-model="editorValue" @change="onValueChange" :readonly="readonly" :disabled="disabled" />
        <span class="input-error-msg" v-if="isShowValidateFailedMsg">{{validateFailedMsg}}</span>
    </div>
</template>

<script>
    import Autofucs from "../directives/AutoFocus";
    export default {
        props: {
            value: {

            },

            disabled: {
                type: Boolean,
                default: false
            },

            size: {
                type: String,
                default: "normal"
            },

            validateFn: {
                type: Function
            },

            readonly: {
                type: Boolean,
                default: false
            }
        },

        directives: {
          "grid-autofocus": Autofucs
        },

        data() {
            return {
                editorValue: "",
                validateFailedMsg: "",
                isShowValidateFailedMsg: false
            };
        },

        computed: {
            inputModifier() {
                let result = [];

                if (this.size === "mini") {
                    result.push("mini");
                }
                return result;
            }
        },

        watch: {
            value(currentValue) {
                this.editorValue = currentValue;
            }
        },

        created() {
            this.editorValue = this.value;
        },

        methods: {
            onValueChange() {
                this.$emit("input", this.editorValue);
            },

            validate(value, rowData) {
                if (this.validateFn) {
                    let result = this.validateFn(value, rowData);

                    this.isShowValidateFailedMsg = !result.status;

                    if (this.isShowValidateFailedMsg) {
                        this.validateFailedMsg = result.msg;
                    } else {
                        this.validateFailedMsg = "";
                    }
                    return result.status;
                }
                return true;
            },

            focus() {
                this.$el.children[0].focus();
            }
        }
    };
</script>