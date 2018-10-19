/***********************************************
* Created by zhangtao on 2018/06/30
************************************************
<script>
    import CellStatusMixin from "./mixins/CellStatusMixin";
    import TreeLabel from "./widgets/TreeLabel.vue";
    import CellWidgetBuilder from "./CellWidgetBuilder.vue"

    export default {
        mixins: [CellStatusMixin],

        props: {
            column: {
                type: Object,
                required: true
            },

            rowData: {
                type: Object,
                required: true
            },

            treeLabelIndent: {
                type: String
            }
        },

        inject: ["getItemId", "expandRowDataIds", "isParentRowData"],

        render(createElement) {
            return createElement("div", {
                attrs: {
                    "class": `tree-label-container ${this.isDisabled(this.column) ? 'disabled' : ''}`,
                    "style": `padding-left: ${this.treeLabelIndent}`
                }
            }, [this.getTreeLabelContent(createElement)]);
        },

        methods: {
            getTreeLabelContent(createElement) {
                if (!this.column.widget) {
                    return this.renderDefaultTreeLabel(createElement);
                }
                return this.renderCustomerTreeLabel(createElement);
            },

            renderCustomerTreeLabel(createElement) {
                let widget = this.column.widget;

                return createElement(CellWidgetBuilder, {
                    props: {
                        rowData: this.rowData,
                        column,
                        widget: {
                            ...widget,
                            isExpand: this.isRowDataExpand(),
                            isParentRowData: this.isParentRowData(this.rowData)
                        },
                        onWidgetEvent: () => this.handleClickTreeLabelEvent()
                    }
                });
            },

            renderDefaultTreeLabel(createElement) {
                return createElement(CellWidgetBuilder, {
                    props: {
                        rowData: this.rowData,
                        column: this.column,
                        widget: {
                            type: TreeLabel,
                            props: {
                                label: this.rowData[this.column.field],
                                isExpand: this.isRowDataExpand(),
                                isParent: this.isParentRowData(this.rowData)
                            },
                            listenerMap: ["click"]
                        },
                        onWidgetEvent: (data) => this.handleClickTreeLabelEvent(data)
                    }
                });
            },

            isRowDataExpand() {
                return this.expandRowDataIds.indexOf(this.getItemId(this.rowData)) !== -1;
            },

            handleClickTreeLabelEvent(data) {
                if (data && data.event && data.event.$event) {
                    data.event.$event.stopPropagation();
                }
                this.$emit("clickTreeLabel", {action: "click", rowData: this.rowData});
            }
        }
    };
</script>
