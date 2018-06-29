/***********************************************
* Created by zhangtao on 2018/06/29
************************************************/
<template>
    <table>
        <tbody v-if="isMultipleRows">
            <row class="layout-row" :columns="formatedLayoutColumns" :rowData="{}" :cellType="cellType"></row>
            <row v-for="(columnItems, index) in columns"
                 :key="index"
                 :rowData="rowData"
                 :columns="columnItems"
                 :cellType="cellType"
                 :selectorData="selectorData"
                 :rowNumber="rowNumber"></row>
        </tbody>

        <tbody v-else>
            <row :rowData="rowData"
                 :columns="columns"
                 :cellType="cellType"
                 :selectorData="selectorData"
                 :rowNumber="rowNumber"></row>
        </tbody>
    </table>
</template>

<script>
    import Util from "./helper/GridUtil";

    import Row from "./Row.vue";

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

            layoutColumns: {
                type: Array
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
            }
        },

        components: {
            "row": Row
        },

        computed: {
            isMultipleRows() {
                return Util.isArray(this.columns[0]);
            },

            formatedLayoutColumns() {
                return this.layoutColumns.map((item) => {
                    return {...item, colSpan: 1, rowSpan: 1};
                });
            }
        }
    };
</script>
