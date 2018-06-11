<template>
    <div class="introduce-main">
        <div class="box">
            <ls-pagination :total="80" :current="1" :display="10" @on-change="pageChange($event)"></ls-pagination>
        </div>
        <div class="box">
            <ls-multiple-select :datas="selectDatas" style="margin-top: 20px;"></ls-multiple-select>
        </div>
        <div class="box">
            <ls-dropdown-select :datas="selectDatas" style="margin-top: 20px;"></ls-dropdown-select>
        </div>
        <div class="box">
            <ls-tree :isEnableChecked="true" :datas="treeDatas" style="margin-top: 20px;"></ls-tree>
        </div>
        <div class="box">
            <ls-date-picker v-model="datePickerValue" style="margin-top: 20px;"></ls-date-picker>
        </div>
        <div class="box">
            <!--按钮绑定时间自己绑定就是了，这里就相当于只剥离了一个样式-->
            <!--disabled默认false，size默认normal，type默认default，都可以不传-->
            <ls-button :text="'按钮'"
                       :size="'normal'"
                       :disabled="false" @buttonEvent="handleClick"></ls-button>
            <ls-button :text="'按钮'"
                       :size="'normal'"
                       :disabled="true"></ls-button>
            <ls-button :text="'按钮'"
                       :size="'normal'"
                       :disabled="false"
                       :type="'primary'"></ls-button>
            <ls-button :text="'按钮'"
                       :size="'normal'"
                       :disabled="true"
                       :type="'primary'"></ls-button>
            <ls-button :text="'按钮'"
                       :size="'normal'"
                       :disabled="false"
                       :type="'success'"></ls-button>
            <ls-button :text="'按钮'"
                       :size="'normal'"
                       :disabled="true"
                       :type="'success'"></ls-button>
            <ls-button :text="'按钮'"
                       :size="'normal'"
                       :disabled="false"
                       :type="'warning'"></ls-button>
            <ls-button :text="'按钮'"
                       :size="'normal'"
                       :disabled="true"
                       :type="'normal'"></ls-button>
            <ls-button :text="'按钮'"
                       :size="'big'"
                       :disabled="false"
                       :type="'error'"></ls-button>
            <ls-button :text="'按钮'"
                       :disabled="false"
                       :type="'error'"></ls-button>
            <ls-button :text="'按钮'"
                       :size="'mini'"
                       :disabled="true"
                       :type="'error'"></ls-button>
            <ls-button :text="'按钮'"
                       :size="'mini'"
                       :disabled="true"
                       :type="'error'">自定义
            </ls-button>
        </div>
        <div class="box">
            <ls-input ref="hello" :placeholder="'请输入文字'"
                      :size="'big'"
                      v-model="val"
                      :autofocus="true"
                      @inputEvent="inputChange"></ls-input>
            <ls-input :placeholder="'请输入文字'"
                      :size="'normal'"
                      v-model="val"
                      :widgetReadonly="true"></ls-input>
            <ls-input :placeholder="'请输入文字'"
                      :size="'mini'"
                      v-model="val"
                      :disabled="true"></ls-input>
        </div>

        <div class="box">
            <ls-tab :datas="tabDatas" :isEnableCreateTab="true" :isEnableDeleteTab="true"></ls-tab>
        </div>

        <div class="box" style="height: 200px;">
            <ls-layout-container>
                <div slot="top">
                    <div style="height: 100px">top</div>
                </div>
                <div slot="left">
                    <div style="width: 100px">left</div>
                </div>
                <div slot="center">
                    <div style="width: 100px">center</div>
                </div>
            </ls-layout-container>
        </div>
    </div>
</template>

<script>
    import {Component, Vue} from 'vue-property-decorator';
    
    import {
        Pagination,
        DropdownSelect,
        MultipleSelect,
        Tree,
        DatePicker,
        Button,
        Tab,
        LayoutContainer
    } from "../../components";

    /* 分页 */
    import pagination from '../../components/Pagination.vue';
    /* 按钮 */
    import button from '../../components/form-widgets/Button.vue';
    /* 输入框 */
    import input from '../../components/form-widgets/Input.vue';

    @Component({
        components: {
            'ls-pagination': pagination,
            "ls-dropdown-select": DropdownSelect,
            "ls-multiple-select": MultipleSelect,
            "ls-tree": Tree,
            "ls-date-picker": DatePicker,
            'ls-button': button,
            'ls-input': input,
            "ls-tab": Tab,
            "ls-layout-container": LayoutContainer
        }
    })
    export default class HomeIndex extends Vue {
        selectDatas = [
            {id: 1, value: 1, name: "select-1"},
            {id: 2, value: 2, name: "select-2"},
            {id: 3, value: 3, name: "select-3"},
            {id: 4, value: 4, name: "select-4"},
            {id: 5, value: 5, name: "select-5"},
            {id: 6, value: 6, name: "select-6"},
            {id: 7, value: 7, name: "select-7"},
            {id: 8, value: 8, name: "select-8"},
            {id: 9, value: 9, name: "select-9"}
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
                            {id: "1-1-1", name: "node-1-1-1"},
                            {id: "1-1-2", name: "node-1-1-2"},
                        ]
                    },
                    {id: "1-2", name: "node-1-2"},
                    {id: "1-3", name: "node-1-3"},
                    {id: "1-4", name: "node-1-4"}
                ]
            }
        ];

        datePickerValue = "";

        val = '123555aaa';


        tabDatas = [
            { id: 1, name: "tab-1" },
            { id: 2, name: "tab-2" },
            { id: 4, name: "tab-4" },
            { id: 5, name: "tab-5" },
            { id: 6, name: "tab-6" },
            { id: 7, name: "tab-7" },
            { id: 8, name: "tab-8" },
            { id: 9, name: "tab-9" },
            { id: 10, name: "tab-10" },
            { id: 11, name: "tab-11" },
            { id: 12, name: "tab-12" },
            { id: 13, name: "tab-13" },
            { id: 14, name: "tab-14" },
            { id: 15, name: "tab-15" },
            { id: 16, name: "tab-16" },
            { id: 17, name: "tab-17" },
            { id: 18, name: "tab-18" },
            { id: 19, name: "tab-19" },
            { id: 20, name: "tab-20" },
            { id: 21, name: "tab-21" },
            { id: 22, name: "tab-22" },
        ];

        /* 分页返回对象 */
        pageChange(e) {
            console.log(e);
        }

        /* 输入框值改变 */
        inputChange(val) {
            console.log(val);
        }

        /* 按钮点击 */
        handleClick() {
            alert('点击');
        }
    };
</script>
