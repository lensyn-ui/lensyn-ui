<template>
    <div class="introduce-main">
        <div class="box">
            <ls-pagination :total="80" :current="1" :display="10" @on-change="pageChange($event)"></ls-pagination>

            <ls-multiple-select :datas="selectDatas" style="margin-top: 20px;"></ls-multiple-select>
            <ls-dropdown-select :datas="selectDatas" style="margin-top: 20px;"></ls-dropdown-select>
        </div>
    </div>
</template>

<script>
    import {Component, Vue} from 'vue-property-decorator';

    /* 分页 */
    import { Pagination, DropdownSelect, MultipleSelect } from "../../components";

    @Component({
        components: {
            'ls-pagination': Pagination,
            "ls-dropdown-select": DropdownSelect,
            "ls-multiple-select": MultipleSelect
        }
    })
    export default class HomeIndex extends Vue {
        selectDatas = [
            { id: 1, value: 1, name: "hello" },
            { id: 2, value: 2, name: "world" },
            { id: 3, value: 3, name: "zhang" },
            { id: 4, value: 4, name: "kk" },
            { id: 5, value: 5, name: "kk" },
            { id: 6, value: 6, name: "kk" },
            { id: 7, value: 7, name: "kk" },
            { id: 8, value: 8, name: "kk" },
            { id: 9, value: 9, name: "kk" }
        ];
        pageChange(e) {
            console.log(e);
        }
    };
</script>
