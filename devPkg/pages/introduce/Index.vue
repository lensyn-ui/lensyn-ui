<template>
    <div class="introduce-main">
        <div class="box">
            <ls-pagination :total="80" :current="1" :display="10" @on-change="pageChange($event)"></ls-pagination>

            <ls-multiple-select :datas="selectDatas" style="margin-top: 20px;"></ls-multiple-select>

            <ls-dropdown-select :datas="selectDatas" style="margin-top: 20px;"></ls-dropdown-select>

            <ls-tree :isEnableChecked="true" :datas="treeDatas" style="margin-top: 20px;"></ls-tree>

            <ls-date-picker v-model="datePickerValue" style="margin-top: 20px;"></ls-date-picker>
        </div>
    </div>
</template>

<script>
    import {Component, Vue} from 'vue-property-decorator';

    /* 分页 */
    import { Pagination, DropdownSelect, MultipleSelect, Tree, DatePicker } from "../../components";

    @Component({
        components: {
            'ls-pagination': Pagination,
            "ls-dropdown-select": DropdownSelect,
            "ls-multiple-select": MultipleSelect,
            "ls-tree": Tree,
            "ls-date-picker": DatePicker
        }
    })
    export default class HomeIndex extends Vue {
        selectDatas = [
            { id: 1, value: 1, name: "select-1" },
            { id: 2, value: 2, name: "select-2" },
            { id: 3, value: 3, name: "select-3" },
            { id: 4, value: 4, name: "select-4" },
            { id: 5, value: 5, name: "select-5" },
            { id: 6, value: 6, name: "select-6" },
            { id: 7, value: 7, name: "select-7" },
            { id: 8, value: 8, name: "select-8" },
            { id: 9, value: 9, name: "select-9" }
        ];

        treeDatas = [
            {
                id: "1",
                name: "node-1",
                children: [
                    {
                        id: "1-1",
                        name: "node-1-1",
                        children: [
                            { id: "1-1-1", name: "node-1-1-1" },
                            { id: "1-1-2", name: "node-1-1-2" },
                        ]
                    },
                    { id: "1-2", name: "node-1-2" },
                    { id: "1-3", name: "node-1-3" },
                    { id: "1-4", name: "node-1-4" }
                ]
            }
        ];

        datePickerValue = "";

        pageChange(e) {
            console.log(e);
        }
    };
</script>
