<script>
    import {Component, Vue} from "vue-property-decorator";

    @Component({
        props: {
            disabled: {
                type: Boolean,
                default: false
            }
        }
    })
    export default class Widget extends Vue {
        widgetName = "";

        isDisabled() {
            return this.disabled;
        }

        emitEvent(event) {
            this.$emit(this.widgetName + "Event", event);
        }
    };
</script>
