<template>
    <table>
        <tbody>
            <tr>
                <td v-for="(set, setIndex) in columns" :key="setIndex" :class="getSetColumnsClassName(setIndex)" >
                    <div class="column-set-wrapper">
                        <table>
                            <tbody>
                                <row v-if="cellType === 'headerCell'" class="layout-row"
                                     :columns="getLayoutColumns(set)" :rowData="{}" :cellType="cellType" />

                                <row v-for="(columns, index) in set"
                                     :key="index"
                                     :columns="columns"
                                     :rowData="rowData"
                                     :cellType="cellType"
                                     :selectorData="selectorData"
                                     :treeLabelIndent="treeLabelIndent"
                                     :rowNumber="rowNumber" />
                            </tbody>
                        </table>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    import Row from "./Row.vue";

    export default {
        props: {
            columns: {
                type: Array,
                required: true
            },

            rowData: {
                type: Object,
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
            "row": Row
        },

        methods: {
            getSetColumnsClassName(index) {
                return `column-set column-set-${index}`;
            },

            getLayoutColumns(sets) {
                let results = [];

                for (let i = 0, j = sets.length; i < j; ++i) {
                    let columns = sets[i];

                    for (let k = 0, p = columns.length; k < p; ++k) {
                        let column = columns[k];

                        if (!column.children) {
                            results.push({...column, rowSpan: 1, colSpan: 1});
                        }
                    }
                }

                return results;
            }
        }
    };
</script>

