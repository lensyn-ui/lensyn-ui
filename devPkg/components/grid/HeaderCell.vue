<script>
    import SelectorContainer from "./SelectorContainer.vue";
    import SubCellContainer from "./SubCellContainer.vue";

    import CellStatusMixin from "./mixins/CellStatusMixin";
    import EventBusMixin from "./mixins/EventBusMixin";
    import ColumnWidthMixin from "./mixins/ColumnWidthMixin";

    export default {
        mixins: [EventBusMixin, CellStatusMixin, ColumnWidthMixin],

        props: {
            column: {
                type: Object,
                required: true
            },

            rowData: {
                type: Object,
                required: true
            },

            checked: {
                type: Boolean,
                default: false
            }
        },

        inject: ["eventBus"],

        render(createElement) {
            return createElement("th", {
                attrs: {
                    "class": `header-cell cell-${this.column.field}`,
                    colspan: this.column.colSpan,
                    rowspan: this.column.rowSpan
                },
                style: {
                    width: this.getColumnWidth(this.column)
                }
            }, [this.getCellContent(createElement)]);
        },

        methods: {
            getCellContent(createElement) {
                let column = this.column;

                if (column.type === "checkbox" && column.showInHeader) {
                    return this.renderSelectorCell(createElement);
                } else if (column.renderHeaderCell) {
                    return column.renderHeaderCell(createElement, this.rowData, column);
                } else if (column.headerSub) {
                    return this.renderSubCell(createElement);
                }

                return this.rowData[column.field];
            },

            renderSelectorCell(createElement) {
                return createElement(SelectorContainer, {
                    props: {
                        rowData: this.rowData,
                        column: this.column,
                        checked: this.checked
                    },
                    on: {
                        selectEvt: (event) => this.handleSelectorEvent(event)
                    }
                });
            },

            renderSubCell(createElement) {
                let column = this.column;

                return createElement(SubCellContainer, {
                    props: {
                        widgets: column.headerSub,
                        rowData: this.rowData,
                        column: column,
                        disabled: this.isDisabled(column)
                    },

                    on: {
                        clickSub: (event) => this.handleClickSubCell(event)
                    }
                });
            },

            handleSelectorEvent(event) {
                this.triggerSelect({...event, action: "selectedAll"});
            },

            handleClickSubCell({event, widget}) {
                if (widget.onClick) {
                    widget.onClick(this.rowData, this.column, event);
                }
            }
        }
    };
</script>
