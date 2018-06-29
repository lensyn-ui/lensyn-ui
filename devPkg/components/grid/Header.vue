<template>
    <div class="grid-header" :style="{paddingRight: paddingRight}">
        <column-set-row v-if="isColumnSetGrid"
                        :columns="headerColumns"
                        :rowData="headerData"
                        cellType="headerCell"
                        :selectorData="selectedAllCheckboxData" />

        <simple-column-row v-else
                           :columns="headerColumns"
                           :layoutColumns="contentColumns"
                           cellType="headerCell"
                           :rowData="headerData"
                           :selectorData="selectedAllCheckboxData"/>
    </div>
</template>

<script>
    import ColumnSetRow from "./ColumnSetRow.vue";
    import SimpleColumnRow from "./SimpleColumnRow.vue";

    export default {
        props: {
            headerColumns: {
                type: Array,
                required: true
            },

            contentColumns: {
                type: Array,
                required: true
            },

            headerData: {
                type: Object,
                required: true
            },

            isColumnSetGrid: {
                type: Boolean,
                default: true
            },

            selectedAllCheckboxData: {
                type: Object,
                default: () => {}
            }
        },

        components: {
            "simple-column-row": SimpleColumnRow,
            "column-set-row": ColumnSetRow
        },

        data() {
            return {
                paddingRight: "0px"
            };
        },

        methods: {
            setHeaderRowScrollLeft: function (data) {
                if (data.type === "set") {
                    this.positionSetHeaderScrollLeft(data);
                } else {
                    this.positionSimpleHeaderScrollLeft(data);
                }
            },

            setHeaderPaddingByContentScrollbar(event) {
                this.paddingRight = event.width + "px";
            },

            positionSetHeaderScrollLeft: function (data) {
                let setRows = this.$el.querySelectorAll(`.column-set-${data.setIndex} .column-set-wrapper`);

                for (let i = 0, j = setRows.length; i < j; ++i) {
                    setRows[i].scrollLeft = data.scrollLeft;
                }
            },

            positionSimpleHeaderScrollLeft: function (data) {
                this.$el.scrollLeft = data.scrollLeft;
            }
        }
    };
</script>

