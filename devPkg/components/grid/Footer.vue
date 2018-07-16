<template>
    <div class="grid-footer">
        <div class="grid-row">
            <component :is="rowConstructor" :rowData="footerData" :columns="footerColumns"
                       cellType="footerCell" :selectorData="selectedAllCheckboxData" />
        </div>

        <pagination v-if="isEnablePagination"
                    ref="pagination"
                    :total="totalRows"
                    :currentPage="currentPage"
                    :perpageCount="perpageCount"
                    :pageSelections="pageSelections"
                    @paginationEvt="onPaginationEvent" />
    </div>
</template>

<script>
    import EventBusMixin from "./mixins/EventBusMixin";

    import ColumnSetRow from "./ColumnSetRow.vue";
    import SimpleColumnRow from "./SimpleColumnRow.vue";
    import Pagination from "./Pagination.vue";

    export default {
        mixins: [EventBusMixin],

        props: {
            footerColumns: {
                type: Array,
                required: true
            },

            footerData: {
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
            },

            isEnablePagination: {
                type: Boolean,
                default: false
            },

            pageSelections: {
                type: Array
            },

            totalRows: {
                type: Number,
                default: 0
            },

            perpageCount: {
                type: Number
            },

            currentPage: {
                type: Number
            }
        },

        components: {
            "simple-column-row": SimpleColumnRow,
            "column-set-row": ColumnSetRow,
            "pagination": Pagination
        },
        inject: ["eventBus"],

        computed: {
            rowConstructor() {
                return this.isColumnSetGrid ? "column-set-row" : "simple-column-row";
            }
        },

        methods: {
            setFooterRowScrollLeft(data) {
                if (data.type === "set") {
                    this.positionSetHeaderScrollLeft(data);
                } else {
                    this.positionSimpleHeaderScrollLeft(data);
                }
            },

            positionSetHeaderScrollLeft(data) {
                let setRows = this.$el.querySelectorAll(`.column-set-${data.setIndex} .column-set-wrapper`);

                for (let i = 0, j = setRows.length; i < j; ++i) {
                    setRows[i].scrollLeft = data.scrollLeft;
                }
            },

            positionSimpleHeaderScrollLeft(data) {
                this.$el.scrollLeft = data.scrollLeft;
            },

            onPaginationEvent(event) {
                this.triggerPagination(event);
            }
        }
    };
</script>

