/***********************************************
* Created by zhangtao on 2018/06/30
************************************************
<template>
    <component
            :is="rowConstructor"
            :rowData="rowData"
            :columns="columns"
            :treeLabelIndent="treeLabelIndent"
            cellType="bodyCell"
            :selectorData="selectorData"
            :rowNumber="rowNumber"/>
</template>

<script>
    import SimpleColumnRow from "./SimpleColumnRow.vue";
    import ColumnSetRow from "./ColumnSetRow.vue";

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

            rowNumber: {
                type: Number,
                required: true
            },

            isColumnSetGrid: {
                type: Boolean,
                default: false
            },

            selectorData: {
                type: Object,
                default: () => {}
            },

            treeLabelIndent: {
                type: String
            }
        },

        components: {
            "simple-column-row": SimpleColumnRow,
            "column-set-row": ColumnSetRow
        },

        computed: {
            rowConstructor() {
                return this.isColumnSetGrid ? "column-set-row" : "simple-column-row";
            }
        }
    };
</script>
