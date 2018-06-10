<template>
    <div class="introduce-main">
        <div class="box">
            <ls-pagination :total="80" :current="1" :display="10" @on-change="pageChange($event)"></ls-pagination>

            <ls-multiple-select :datas="selectDatas" style="margin-top: 20px;"></ls-multiple-select>

            <ls-dropdown-select :datas="selectDatas" style="margin-top: 20px;"></ls-dropdown-select>

            <ls-tree :isEnableChecked="true" :datas="treeDatas" style="margin-top: 20px;"></ls-tree>
        </div>
        <div class="box">
            <!--按钮绑定时间自己绑定就是了，这里就相当于只剥离了一个样式-->
            <!--disable默认false，size默认middle，type默认default，都可以不传-->
            <ls-button :text="'按钮'"
                       :size="'middle'"
                       :disable="false"></ls-button>
            <ls-button :text="'按钮'"
                       :size="'middle'"
                       :disable="true"></ls-button>
            <ls-button :text="'按钮'"
                       :size="'middle'"
                       :disable="false"
                       :type="'primary'"></ls-button>
            <ls-button :text="'按钮'"
                       :size="'middle'"
                       :disable="true"
                       :type="'primary'"></ls-button>
            <ls-button :text="'按钮'"
                       :size="'middle'"
                       :disable="false"
                       :type="'success'"></ls-button>
            <ls-button :text="'按钮'"
                       :size="'middle'"
                       :disable="true"
                       :type="'success'"></ls-button>
            <ls-button :text="'按钮'"
                       :size="'middle'"
                       :disable="false"
                       :type="'warning'"></ls-button>
            <ls-button :text="'按钮'"
                       :size="'middle'"
                       :disable="true"
                       :type="'warning'"></ls-button>
            <ls-button :text="'按钮'"
                       :size="'large'"
                       :disable="false"
                       :type="'error'" ></ls-button>
            <ls-button :text="'按钮'"
                       :disable="false"
                       :type="'error'" ></ls-button>
            <ls-button :text="'按钮'"
                       :size="'small'"
                       :disable="true"
                       :type="'error'"></ls-button>
        </div>
    </div>
</template>

<script>
    import {Component, Vue} from 'vue-property-decorator';

    /* 分页 */
<<<<<<< HEAD
    import pagination from '../../components/Pagination.vue';
    /* 按钮 */
    import button from '../../components/Button.vue';

    @Component({
        components: {
            'ls-pagination': pagination,
            'ls-button': button
        }
    })
    export default class HomeIndex extends Vue {
        /* 分页返回对象 */
=======
    import { Pagination, DropdownSelect, MultipleSelect, Tree } from "../../components";

    @Component({
        components: {
            'ls-pagination': Pagination,
            "ls-dropdown-select": DropdownSelect,
            "ls-multiple-select": MultipleSelect,
            "ls-tree": Tree
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

>>>>>>> 16cf06de3c7ccb5d413e4089d87e0db0a99bfe9c
        pageChange(e) {
            console.log(e);
        }
    };
</script>
