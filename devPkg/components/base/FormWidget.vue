<script>
    import {Prop, Component} from "vue-property-decorator";

    import Widget from "./Widget.vue";

    @Component
    export default class FormWidget extends Widget {
        @Prop({type: Boolean, default: false})
        widgetReadonly;
        @Prop()
        value;

        updateModel(value) {
            this.$emit("input", value);
        }

        isReadonly() {
            return this.widgetReadonly;
        }

        getValue() {
            throw new Error("child must implements getValue");
        }
    }

</script>
