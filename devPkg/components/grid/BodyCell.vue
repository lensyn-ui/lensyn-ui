<script>
    import SubCellContainer from "./SubCellContainer.vue";
    import SelectorContainer from "./SelectorContainer.vue";
    import EditorContainer from "./EditorContainer.vue";
    import TreeLabelContainer from "./TreeLabelContainer.vue";
    import CellWidgetBuilder from "./CellWidgetBuilder.vue";

    import CellStatusMixin from "./mixins/CellStatusMixin";
    import EventBusMixin from "./mixins/EventBusMixin";
    import ColumnWidthMixin from "./mixins/ColumnWidthMixin";

    import BaseCell from "./BaseCell";

    export default {
        extends: BaseCell,
        mixins: [CellStatusMixin, EventBusMixin, ColumnWidthMixin],

        props: {
            checked: {
                type: Boolean,
                default: false
            },

            rowNumber: {
                type: Number
            },

            treeLabelIndent: {
                type: String
            }
        },
        inject: ["eventBus", "grid", "isRowColumnSelected"],

        render(createElement) {
            return createElement("td", {
                attrs: {
                    "class": `body-cell cell-${this.column.field} ${this.isDisabled(this.column) ? "disabled" : ""}`,
                    colspan: 1,
                    rowspan: 1
                },
                on: {
                    click: ($event) => this.onCellClick($event)
                },
                directives: this.formatDirectives(this.column.directives),
                style: {
                    width: this.getColumnWidth(this.column)
                }
            }, this.isVisible(this.column) ? [this.getCellContent(createElement)] : null);
        },

        methods: {
            onCellClick($event) {
                if (this.column.onCellClick) {
                    this.column.onCellClick($event, this.rowData);
                }
            },

            isEnableSelect() {
                let column = this.column;

                if (column.type === "checkbox" || column.type === "radio") {
                    let enableSelected = this.column.enableSelected;

                    if (typeof enableSelected !== "undefined") {
                        return this.getCustomRowPropertyValue(enableSelected);
                    }
                    return true;
                }
                return false;
            },

            getCellContent(createElement) {
                let column = this.column,
                    formatValue = null;

                if (column.renderCell) {
                    return this.renderCustomCell(createElement);
                }

                if (column.type === "rowNumber") {
                    return this.rowNumber;
                }

                if (this.column.format) {
                    formatValue = this.column.format(this.rowData[this.column.field], this.rowData);
                }

                if (column.sub) {
                    return this.renderSubCell(createElement);
                }

                if (column.type === "checkbox" || column.type === "radio") {
                    return this.renderSelectorCell(createElement);
                }

                if (column.type === "treeLabel") {
                    return this.renderTreeLabel(createElement);
                }

                if (column.type === "widget") {
                    return this.renderWidgetCell(createElement);
                }

                if (column.editor) {
                    return this.renderEditorCell(createElement);
                }
                return this.renderDefaultCell(formatValue);
            },

            renderCustomCell(createElement) {
                return this.column.renderCell(createElement, this.rowData, this.column);
            },

            renderSubCell(createElement) {
                return createElement(SubCellContainer, {
                    props: {
                        widgets: this.column.sub,
                        rowData: this.rowData,
                        column: this.column,
                        disabled: this.isDisabled(this.column)
                    },

                    on: {
                        subEvent: (event) => this.handleWidgetEvent(event)
                    }
                });
            },

            renderSelectorCell(createElement) {
                return createElement(SelectorContainer, {
                    props: {
                        rowData: this.rowData,
                        column: this.column,
                        checked: this.isRowColumnSelected(this.rowData, this.column),
                        disabled: !this.isEnableSelect()
                    },

                    on: {
                        selectEvt: (event) => this.handleSelectedEvent(event)
                    }
                });
            },

            renderTreeLabel(createElement) {
                return createElement(TreeLabelContainer, {
                    props: {
                        rowData: this.rowData,
                        column: this.column,
                        treeLabelIndent: this.treeLabelIndent
                    },
                    on: {
                        clickTreeLabel: (event) => this.handleTreeLabelEvent(event)
                    }
                });
            },

            renderWidgetCell(createElement) {
                return createElement(CellWidgetBuilder, {
                    props: {
                        widget: this.column.widget,
                        rowData: this.rowData,
                        column: this.column,
                        onWidgetEvent: (event) => this.handleWidgetEvent(event)
                    }
                });
            },

            renderEditorCell(createElement) {
                let column = this.column,
                    readonly = column.readonly ? this.getCustomRowPropertyValue(column.readonly) : false;

                return createElement(EditorContainer, {
                    props: {
                        column,
                        readonly,
                        column: this.column,
                        rowData: this.rowData,
                        value: this.rowData[this.column.field],
                        disabled: this.isDisabled(this.column)
                    },
                    on: {
                        valueChange: (value) => this.handleEditorValueChange(value)
                    }
                });
            },

            renderDefaultCell(formatValue) {
                if (formatValue !== null) {
                    return formatValue;
                }
                return this.rowData[this.column.field];
            },

            handleTreeLabelEvent(event) {
                this.triggerClickTreeLabel({...event, rowData: this.rowData});
            },

            handleSelectedEvent(event) {
                this.triggerSelect({...event, rowData: this.rowData});
            },

            handleWidgetEvent({listenerName, event, widget}) {
                if (widget[listenerName]) {
                    widget[listenerName](this.rowData, this.column, event);
                }
            },

            handleEditorValueChange(value) {
                this.triggerEditor({rowData: this.rowData, column: this.column,
                    newValue: value, oldValue: this.rowData[this.column.field]})
            }
        }
    };
</script>
