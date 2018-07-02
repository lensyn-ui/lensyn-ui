<template>
    <tr>
        <component :is="cellType" v-for="(column, index) in columns"
                   :column="column"
                   :key="index"
                   :rowData="rowData"
                   :checked="isColumnChecked(column)"
                   :treeLabelIndent="treeLabelIndent"
                   :rowNumber="rowNumber" />
    </tr>
</template>

<script>
    import BodyCell from "./BodyCell.vue";
    import HeaderCell from "./HeaderCell.vue";
    import FooterCell from "./FooterCell.vue";

    export default {
        props: {
            rowData: {
                type: Object,
                required: true
            },

            columns: {
                type: Array,
                required: true
            },

            cellType: {
                type: String,
                required: true
            },

            selectorData: {
                type: Object,
                default: () => {}
            },

            rowNumber: {
                type: Number
            },

            treeLabelIndent: {
                type: String
            }
        },

        components: {
            "headerCell": HeaderCell,
            "bodyCell": BodyCell,
            "footerCell": FooterCell
        },

        methods: {
            isColumnChecked(column) {
                if (this.selectorData) {
                    return this.selectorData[column.field];
                }
                return false;
            }
        }
    };
</script>

