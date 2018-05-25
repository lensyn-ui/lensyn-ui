<script>
    import {Prop, Component, Vue} from "vue-property-decorator";

    @Component
    export default class Widget extends Vue {
        @Prop({type: Boolean, default: false})
        disabled;

        widgetName = "";

        isDisabled() {
            return this.disabled;
        }

        emitEvent(event) {
            this.$emit(this.widgetName + "Event", event);
        }
    };
</script>
