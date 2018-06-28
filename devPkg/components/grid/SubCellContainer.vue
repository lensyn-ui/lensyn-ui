<script>
    import CellStatusMixin from "./mixins/CellStatusMixin";
    import CellWidgetBuilder from "./CellWidgetBuilder";

    export default {
        mixins: [CellStatusMixin],

        props: {
            widgets: {
                type: Array,
                required: true
            },

            rowData: {
                type: Object,
                required: true
            },

            column: {
                type: Object,
                required: true
            },

            disabled: {
                type: Boolean,
                default: false
            }
        },

        inject: ["grid"],

        render(createElement) {
            return createElement("div", {
                attrs: {
                    "class": `sub-cell-container ${this.disabled ? 'disabled' : ''}`
                }
            }, this.getSubCellContent(createElement));
        },

        methods: {
            getSubCellContent(createElement) {
                let result = [];

                for (let i = 0, j = this.widgets.length; i < j; ++i) {
                    let item = this.widgets[i];

                    if (this.isWidgetVisible(item)) {
                        result.push(this.createSubWidget(createElement, item));
                    }
                }
                return result;
            },

            createSubWidget(createElement, widget) {
                return createElement(CellWidgetBuilder, {
                    props: {
                        widget,
                        rowData: this.rowData,
                        column: this.column,
                        extraClass: "sub-item",
                        onWidgetEvent: (event) => this.handleWidgetEvent(event)
                    }
                });
            },

            handleWidgetEvent(event) {
                this.$emit("subEvent", event);
            },

            isWidgetVisible(widget) {
                return this.isVisible(widget);
            }
        }
    };
</script>
