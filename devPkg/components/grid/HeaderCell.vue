<script>
    import SelectorContainer from "./SelectorContainer.vue";
    import SubCellContainer from "./SubCellContainer.vue";

    import CellStatusMixin from "./mixins/CellStatusMixin";
    import EventBusMixin from "./mixins/EventBusMixin";
    import ColumnWidthMixin from "./mixins/ColumnWidthMixin";

    import Util from "./helper/GridUtil";

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

        inject: ["eventBus", "getColumnSortOrder"],

        data() {
            return {
                orderMode: {
                    asc: ["default", "asc", "desc"],
                    desc: ["default", "desc", "asc"]
                }
            }
        },

        computed: {
            isEnableSort() {
                return this.column.sort;
            },

            cellModifier() {
                let result = ["header-cell", `cell-${this.column.field}`];

                if (this.isEnableSort) {
                    result.push("sort-cell");

                    let order = this.getColumnSortOrder(this.column.field);

                    if (order !== null) {
                        result.push(order);
                    }
                }

                return result.join(" ");
            }
        },

        render(createElement) {
            return createElement("th", {
                attrs: {
                    "class": this.cellModifier,
                    colspan: this.column.colSpan,
                    rowspan: this.column.rowSpan
                },
                style: {
                    width: this.getColumnWidth(this.column)
                },
                on: {
                    click: ($event) => this.onClickHeaderCell($event)
                }
            }, [this.getCellContent(createElement)]);
        },

        methods: {
            getCellContent(createElement) {
                let column = this.column;

                if (!Util.isUndefined(column.hide)) {
                    let hide = Util.isFunction(column.hide) ? column.hide() : column.hide;

                    if (hide) {
                        this.triggerHideColumn({field: column.field});
                    }
                }

                if (column.type === "checkbox" && column.showInHeader) {
                    return this.renderSelectorCell(createElement);
                }

                if (column.renderHeaderCell) {
                    return column.renderHeaderCell(createElement, this.rowData, column);
                }

                if (column.headerSub) {
                    return this.renderSubCell(createElement);
                }

                if (column.sort) {
                    return this.renderSortCell(createElement);
                }

                return this.rowData[column.field];
            },

            renderSortCell(createElement) {
                let icon = createElement("i", {
                    "class": "sort-icon"
                });

                return [this.rowData[this.column.field], icon];
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
            },

            onClickHeaderCell($event) {
                if (this.isEnableSort) {
                    this.handleSortEvent($event);
                }
            },

            getNextSortOrder(currentOrder) {
                let mode = this.column.orderMode ? this.orderMode[this.column.orderMode] : this.orderMode.asc,
                    index = mode.indexOf(currentOrder);

                if (currentOrder === null) {
                    return mode[1];
                }

                if (index === mode.length - 1) {
                    return mode[0];
                }
                return mode[index + 1];
            },

            handleSortEvent($event) {
                let column = this.column,
                    sortField = column.sortField ? column.sortField : column.field,
                    sortType = column.sortType,
                    sortPriority = column.sortPriority,
                    currentOrder = this.getColumnSortOrder(column.field),
                    nextOrder = this.getNextSortOrder(currentOrder);

                this.triggerClickSort({
                    action: "clickSort",
                    $event,
                    sortField,
                    sortType,
                    sortPriority,
                    order: nextOrder,
                    oldOrder: currentOrder,
                    rowData: this.rowData,
                    column: this.column
                });
            }
        }
    };
</script>
