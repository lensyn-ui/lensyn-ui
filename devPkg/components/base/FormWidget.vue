<script>
    import { Component } from "vue-property-decorator";

    import Widget from "./Widget.vue";

    const FORM_WIDGET_SIZE = {
        NORMAL: "normal",
        MINI: "mini",
        BIG: "big"
    };

    @Component({
        props: {
            widgetReadonly: {
                type: Boolean,
                default: false
            },

            value: {
                type: [String, Number, Array]
            },

            size: {
                type: String,
                default: FORM_WIDGET_SIZE.NORMAL
            }
        }
    })
    export default class FormWidget extends Widget {
        updateModel(value) {
            this.$emit("input", value);
        }

        isReadonly() {
            return this.widgetReadonly;
        }

        isNormalSize() {
            return this.size === FORM_WIDGET_SIZE.NORMAL;
        }

        isMiniSize() {
            return this.size === FORM_WIDGET_SIZE.MINI;
        }

        isBigSize() {
            return this.size === FORM_WIDGET_SIZE.BIG;
        }

        getValue() {
            throw new Error("child must implements getValue");
        }

        focus() {
            throw new Error("child must implements focus");
        }
    }

</script>
