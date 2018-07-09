<template>
    <div class="introduce-main">
        <div class="box">
            <ls-tree-grid
                    ref="treeGrid"
                    :columns="gridColumns"
                    :datas="gridDatas"
                    :isEnableActiveRow="true"
                    :isAlwaysExpand="true"
                    :isShowFooter="true" >
                <div class="hello" slot="childTemplate" slot-scope="data">
                    <ls-button :text="testTreeBtnLabel" @buttonEvent="handleTreeGridChildEvent"></ls-button>
                    <ls-button :text="data.parentRowData ? data.parentRowData.firstName : 'null'" @buttonEvent="handleTreeGridChildEvent"></ls-button>
                </div>
            </ls-tree-grid>

            <ls-pagination-grid
                    ref="paginationGrid"
                    :isEnableActiveRow="true"
                    :columns="paginationGridColumns"
                    :initPerpage="50"
                    :store="gridStore"
                    style="margin-top: 30px;" >
            </ls-pagination-grid>
        </div>
        <div class="box">
            <ls-pagination :isShowTotal="true"
                           :isGoShow="true"
                           :isHFShow="true"
                           :total="80"
                           :current="1"
                           :display="20"
                           :displayLists="displayLists"
                           @paginationEvent="pageChange"></ls-pagination>
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
            <ls-date-picker v-model="rangeDatePickerValue" style="margin-top: 20px;"></ls-date-picker>
        </div>

        <div class="box" style="padding-left: 20px;">
            <ls-checkbox v-for="(item,index) in checkArr"
                         :key="index"
                         :checked="item.checked"
                         :disabled="item.disabled"
                         :label="item.label"
                         @checkboxEvent="checkEvt($event,item)"
            ></ls-checkbox>
        </div>

        <div class="box" style="padding-left: 20px;">
            <!--value需要是唯一标识-->
            <ls-radio v-for="(item,index) in radioArr"
                      :key="index"
                      :checked="item.checked"
                      :name="item.name"
                      :value="item.value"
                      :label="item.label"
                      @radioEvent="radioEvt($event,item)"
            ></ls-radio>
        </div>

        <div class="box">
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
                       :type="'danger'"></ls-button>
            <ls-button :text="'按钮'"
                       :disabled="false"
                       :type="'danger'"></ls-button>
            <ls-button :text="'按钮'"
                       :size="'mini'"
                       :disabled="true"
                       :type="'danger'"></ls-button>
            <ls-button :text="'按钮'"
                       :size="'mini'"
                       :disabled="true"
                       :type="'danger'">自定义
            </ls-button>
        </div>

        <div class="box">
            <ls-input :placeholder="'请输入文字'"
                      :size="'big'"
                      :rule="{required: true, name: 'hello', min: 1, max: 2 }"
                      v-model="val"
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

        <div class="box">
            <ls-button :text="'默认'"
                       :size="'normal'"
                       :type="'primary'" @buttonEvent="showConfirm1"></ls-button>
            <ls-button :text="'自定义'"
                       :size="'normal'"
                       :type="'primary'" @buttonEvent="showConfirm2"></ls-button>
            <ls-button text="原型链"
                       size="normal"
                       type="primary" @buttonEvent="showConfirm3"></ls-button>
            <!--弹窗 icon:primary,success warning alarm refuse四种类型,不传icon或者传''就是icon没有;
            button: default,primary,success,warning,danger四种类型,默认default+primary;
            btnText按钮文字: 数组从左到右,如果只传一个只有一个按钮,同时把btnType作为按钮的class-->
            <ls-confirm :isShow="confirm1"
                        :title="title"
                        :text="text"
                        :icon="'primary'"
                        :leftBtnType="'default'"
                        :leftBtnText="'取消'"
                        :leftShow="true"
                        :rightBtnType="'primary'"
                        :rightBtnText="'确定'"
                        :rightShow="true"
                        @confirmEvent="confirmEvent1"></ls-confirm>
            <ls-confirm :isShow="confirm2" @confirmEvent="confirmEvent2">
                <div style="padding: 15px;">
                    <div style="text-align: center;">
                        <h3>自定义</h3>
                        <p>这个弹窗里面的内容是自定义的</p>
                    </div>
                </div>
            </ls-confirm>
        </div>

        <div class="box">
            <ls-button :text="'弹窗'"
                       :size="'normal'"
                       :type="'primary'" @buttonEvent="showModal"></ls-button>
            <ls-modal :isShow="modalShow"
                      :title="'标题'"
                      :isShowHeader="true"
                      @modalEvent="modalEvent">
                <div>this is body, you can defined it by yourself</div>
                <div slot="footer" style="text-align: center;">
                    <ls-button :text="'取消'" type="default" @buttonEvent="modalEvent"></ls-button>
                    <ls-button :text="'确定'" type="primary" @buttonEvent="modalEvent"></ls-button>
                </div>
            </ls-modal>
        </div>

        <div class="box">
            <ls-button :text="'alarm1'"
                       :size="'normal'"
                       :type="'primary'" @buttonEvent="alarmEvent1"></ls-button>
            <ls-button :text="'alarm2'"
                       :size="'normal'"
                       :type="'primary'" @buttonEvent="alarmEvent2"></ls-button>
        </div>

        <div class="box">
            <ls-button :text="'tooltip'" :size="'normal'"
                       :type="'primary'" v-tooltip="'tooltip'"></ls-button>
            <ls-button :text="'tooltip'" :size="'normal'"
                       :type="'primary'" v-tooltip.bottom="'tooltip'"></ls-button>
            <ls-button :text="'tooltip'" :size="'normal'"
                       :type="'primary'" v-tooltip.left="'tooltip'"></ls-button>
            <ls-button :text="'tooltip'" :size="'normal'"
                       :type="'primary'" v-tooltip.right="'tooltip'"></ls-button>
        </div>

        <div class="box">
            <ls-panel title="header">
                <div slot="body">
                    <h1>body</h1>
                </div>
            </ls-panel>
            <ls-panel style="margin-top: 30px;">
                <span slot="header">customer header</span>
                <div slot="body">
                    <h1>body</h1>
                </div>
            </ls-panel>
        </div>

        <div class="box">
            <ls-button text="显示 panel" @buttonEvent="onClickDrawerLayoutBtn"></ls-button>
            <ls-panel-drawer-layout
                    :isShow="isShowPanelDrawerLayout"
                    :isEnableResize="true"
                    @panelDrawerLayoutEvent="onPanelDrawerLayoutEvent">
                <div slot="content">
                    <h1>dd</h1>
                </div>
            </ls-panel-drawer-layout>
        </div>

        <div class="box">
            <ls-tag>标签一</ls-tag>
            <ls-tag :close="true" :type="'success'">标签二</ls-tag>
            <ls-tag :close="true" :type="'warning'">标签三</ls-tag>
            <ls-tag :close="true" :type="'error'">标签四</ls-tag>
            <ls-tag :close="true">标签五</ls-tag>
            <ls-tag :close="true" :size="'mini'">标签六</ls-tag>
            <ls-tag :close="true" :size="'normal'">标签七</ls-tag>
            <ls-tag :close="true" :size="'big'">标签八</ls-tag>
        </div>

        <div class="box">
            <ls-row :gutter="16">
                <ls-column :col="4">
                    <ls-input style="width: 100%;" placeholder="请输入文字"></ls-input>
                </ls-column>
                <ls-column :col="4">
                    <ls-input style="width: 100%;" placeholder="请输入文字"></ls-input>
                </ls-column>
                <ls-column :col="4">
                    <ls-input style="width: 100%;" placeholder="请输入文字"></ls-input>
                </ls-column>
                <ls-column :col="4">
                    <ls-input style="width: 100%;" placeholder="请输入文字"></ls-input>
                </ls-column>
                <ls-column :col="4">
                    <ls-input style="width: 100%;" placeholder="请输入文字"></ls-input>
                </ls-column>
                <ls-column :col="4">
                    <ls-input style="width: 100%;" placeholder="请输入文字"></ls-input>
                </ls-column>
                <ls-column :col="4">
                    <ls-input style="width: 100%;" placeholder="请输入文字"></ls-input>
                </ls-column>
                <ls-column :col="4">
                    <ls-button :text="'按钮'" :size="'normal'" :type="'primary'"></ls-button>
                </ls-column>
            </ls-row>
        </div>
    </div>
</template>

<script>
    import {Component, Vue} from 'vue-property-decorator';

    import {
        Grid,
        PaginationGrid,
        TreeGrid,
        Pagination,
        DropdownSelect,
        MultipleSelect,
        Tree,
        DatePicker,
        Button,
        Tab,
        LayoutContainer,
        Input,
        Confirm,
        Modal,
        Panel,
        PanelDrawerLayout,
        Tag,
        Checkbox,
        Radio,
        Row,
        Column
    } from "../../components";

    /* 分页 */
    import pagination from '../../components/Pagination.vue';

    import GridStore from "../../api/pagination-grid-store";
    import Validator from "../../components/validator/Validator";

    Validator.registerValidator("hello", {
        validate() {
            return {status: false, msg: "dd"}
        }
    })

    @Component({
        components: {
            "ls-tree-grid": TreeGrid,
            "ls-pagination-grid": PaginationGrid,
            'ls-pagination': pagination,
            "ls-dropdown-select": DropdownSelect,
            "ls-multiple-select": MultipleSelect,
            "ls-tree": Tree,
            "ls-date-picker": DatePicker,
            'ls-button': Button,
            'ls-input': Input,
            "ls-tab": Tab,
            "ls-layout-container": LayoutContainer,
            'ls-confirm': Confirm,
            'ls-modal': Modal,
            "ls-panel": Panel,
            "ls-panel-drawer-layout": PanelDrawerLayout,
            'ls-tag': Tag,
            'ls-checkbox': Checkbox,
            'ls-radio': Radio,
            "ls-row": Row,
            "ls-column": Column
        }
    })
    export default class HomeIndex extends Vue {
        testTreeBtnLabel = "test";
        gridColumns = [
            {
                label: "ID",
                field: "id",
                width: "300px",
                type: "treeLabel",
                sortType: "number",
                sort: true,
                footerSub: [
                    {
                        type: Button,
                        props: { text: "hello" },
                        listenerMap: ["buttonEvent"],
                        buttonEvent: (...arg) => {
                            console.log(arg);
                        }
                    }
                ]
            },
            {
                label: "checkbox",
                field: "checkboxId",
                width: "300px",
                type: "checkbox"
            },
            {
                label: "radio",
                field: "radioId",
                width: "300px",
                type: "radio",
                sort: true
            },
            {
                label: "Name",
                field: "name",
                children: [
                    {
                        label: "FirstName",
                        field: "firstName",
                        width: "300px",
                        sort: true
                    },
                    { label: "LastName", field: "lastName", width: "300px" }
                ]
            },
            { label: "Email", field: "email", width: "300px" },
            { label: "Address", field: "address", width: "300px" },
            {
                label: "Admin",
                field: "isAdmin",
                type: "widget",
                width: "300px",
                widget: {
                    type: Checkbox,
                    listenerMap: ["checkboxEvent"],
                    checkboxEvent: (...arg) => {
                        console.log(arg);
                    },
                    propsRowDataMap: {
                        checked: "isAdmin"
                    }
                }
            },
            {
                label: "Status",
                field: "status",
                type: "widget",
                width: "300px",
                widget: {
                    type: "label",
                    props: {
                        status: "primary"
                    },
                    onClick: (...arg) => {
                        console.log(arg);
                    }
                }
            },
            {
                label: "Operate",
                field: "operate",
                width: "300px",
                sub: [
                    {
                        type: "icon",
                        props: {
                            iconClass: "demo-font"
                        }
                    },
                    {
                        type: "label",
                        props: {
                            status: "primary"
                        },
                        onClick: (...arg) => {
                            console.log(arg);
                        },
                        visible: "#{id} !== 1",
                        propsRowDataMap: {
                            data: "status"
                        }
                    },
                    {
                        type: Checkbox,
                        listenerMap: {checkboxEvent: "normalEvent", hello: "helloEvent"},
                        normalEvent: (...arg) => {
                            console.log(arg);
                        },
                        helloEvent: (...arg) => {
                            console.log(arg);
                        }
                    }
                ]
            }
        ];
        paginationGridColumns = [
            {
                label: "",
                field: "rowNumberId",
                type: "rowNumber",
                width: "50px"
            },
            {
                label: "ID",
                field: "id",
                type: "checkbox",
                width: "100px",
                sort: true
            },
            {
                label: "Name",
                field: "name",
                children: [
                    { label: "FirstName", field: "firstName", width: "300px" },
                    { label: "LastName", field: "lastName", width: "300px" }
                ]
            },
            { label: "Email", field: "email", width: "200px", hide: false },
            {
                label: "Address",
                field: "address",
                width: "200px", hide: () => {
                    return false;
                }
            },
            { label: "Phone", field: "phone", width: "100px" },
            { label: "Company", field: "company", width: "100px" },
            {
                label: "Status",
                field: "status",
                width: "100px",
                type: "widget",
                widget: {
                    type: "label",
                    props: {
                        status: "primary"
                    },
                    onClick: (...arg) => {
                        console.log(arg);
                    }
                }
            },
            {
                label: "Operate",
                field: "operate",
                width: "100px",
                sub: [
                    {
                        type: "icon",
                        props: {
                            iconClass: "demo-font"
                        }
                    },
                    {
                        type: "label",
                        props: {
                            status: "primary"
                        },
                        onClick: (...arg) => {
                            console.log(arg);
                        },
                        visible: "#{id} !== 1",
                        propsRowDataMap: {
                            data: "status"
                        }
                    },
                    {
                        type: Checkbox,
                        listenerMap: {checkboxEvent: "normalEvent", hello: "helloEvent"},
                        normalEvent: (...arg) => {
                            console.log(arg);
                        },
                        helloEvent: (...arg) => {
                            console.log(arg);
                        }
                    }
                ]
            }
        ];
        gridStore = GridStore;
        gridDatas = [
            {
                id: 1,
                checkboxId: 1,
                radioId: 1,
                firstName: "first-name-1",
                lastName: "last-name-1",
                email: "test-email-1",
                address: "test-address-1",
                isAdmin: true,
                status: "test-status-1",
                children: [
                    {
                        id: 11,
                        checkboxId: 11,
                        radioId: 11,
                        firstName: "first-name-1-1",
                        lastName: "last-name-1-1",
                        email: "test-email-1-1",
                        address: "test-address-1-1",
                        isAdmin: true,
                        status: "test-status-1-1",
                        children: [
                            {

                                id: 111,
                                checkboxId: 111,
                                radioId: 111,
                                firstName: "first-name-1-1-1",
                                lastName: "last-name-1-1-1",
                                email: "test-email-1-1-1",
                                address: "test-address--1-1",
                                isAdmin: true,
                                status: "test-status-1-1-1",
                            }
                        ]
                    },
                    {
                        id: 12,
                        checkboxId: 12,
                        radioId: 12,
                        firstName: "first-name-1-2",
                        lastName: "last-name-1-2",
                        email: "test-email-1-2",
                        address: "test-address-1-2",
                        isAdmin: true,
                        status: "test-status-1-2"
                    }
                ]
            },
            {
                id: 2,
                checkboxId: 2,
                radioId: 2,
                firstName: "first-name-2",
                lastName: "last-name-2",
                email: "test-email-2",
                address: "test-address-2",
                isAdmin: false,
                status: "test-status-2"
            },
            {
                id: 4,
                checkboxId: 4,
                firstName: "first-name-4",
                lastName: "last-name-4",
                email: "test-email-4",
                address: "test-address-4",
                isAdmin: false,
                status: "test-status-4"
            },
            {
                id: 3,
                checkboxId: 3,
                radioId: 3,
                firstName: "first-name-3",
                lastName: "last-name-3",
                email: "test-email-3",
                address: "test-address-3",
                isAdmin: false,
                status: "test-status-3"
            }
        ];
        gridPageSelections = [
            { text: 300, value: 300 },
            { text: 400, value: 400 }
        ];

        displayLists = [
            {
                label: 10, value: 10
            },
            {
                label: 20, value: 20
            },
            {
                label: 30, value: 30
            }
        ];

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
        rangeDatePickerValue = [];

        val = '123555aaa';

        tabDatas = [
            {id: 1, name: "tab-1"},
            {id: 2, name: "tab-2"},
            {id: 4, name: "tab-4"},
            {id: 5, name: "tab-5"},
            {id: 6, name: "tab-6"},
            {id: 7, name: "tab-7"},
            {id: 8, name: "tab-8"},
            {id: 9, name: "tab-9"},
            {id: 10, name: "tab-10"},
            {id: 11, name: "tab-11"},
            {id: 12, name: "tab-12"},
            {id: 13, name: "tab-13"},
            {id: 14, name: "tab-14"},
            {id: 15, name: "tab-15"},
            {id: 16, name: "tab-16"},
            {id: 17, name: "tab-17"},
            {id: 18, name: "tab-18"},
            {id: 19, name: "tab-19"},
            {id: 20, name: "tab-20"},
            {id: 21, name: "tab-21"},
            {id: 22, name: "tab-22"},
        ];

        confirm1 = false;
        confirm2 = false;
        title = '是否想要删除当前账号？';
        text = '账号删除以后会退出当前系统。';

        modalShow = false;

        isShowPanelDrawerLayout = false;

        checkArr = [
            {label: '测试1', checked: false, disabled: false},
            {label: '测试2', checked: true},
            {label: '测试3', checked: true, disabled: true},
            {label: '测试4', checked: false, disabled: true}
        ];

        radioArr = [
            {label: '男', checked: true, name: 'sex', value: 0},
            {label: '女', checked: false, name: 'sex', value: 1},
        ];

        handleTreeGridChildEvent() {
        }

        mounted() {
            this.$refs.paginationGrid.updateGrid();
        }

        /* 分页返回对象 */
        pageChange(val) {
            console.log(val);
        }

        /* 输入框值改变 */
        inputChange(val) {
            console.log(val);
        }

        /* 按钮点击 */
        handleClick() {
            alert('点击');
        }

        /* confirm1 */
        showConfirm1() {
            this.confirm1 = true;
        }

        confirmEvent1(val) {
            console.log(val);
            this.confirm1 = false;
        }

        /* confirm2 */
        showConfirm2() {
            this.confirm2 = true;
        }

        showConfirm3() {
            let dialog = this.$lensyn.confirm.show({
                title: "Confirm Title",
                text: "Confirm Text",
                confirmCallback() {
                    dialog.hide();
                },

                cancelCallback() {
                    dialog.hide();
                }
            });
        }

        confirmEvent2(val) {
            console.log(val);
            this.confirm2 = false;
        }

        /* 弹窗modal */
        showModal() {
            this.modalShow = true;
        }

        modalEvent(val) {
            console.log(val);
            this.modalShow = false;
        }

        /* alarm */
        alarmEvent1() {
            //1.title  2.弹出框类型 3. 消息详情  4.是否自动关闭
            this.$lensyn.alarm.show('title', 'success', '', false);
        }

        alarmEvent2() {
            //1.title  2.弹出框类型 3. 消息详情  4.是否自动关闭 5. 显示时间
            this.$lensyn.alarm.show('title', 'danger', 'subMsg', true, 3000);
        }

        onClickDrawerLayoutBtn() {
            this.isShowPanelDrawerLayout = true;
        }

        onPanelDrawerLayoutEvent({action}) {
            if (action === "close") {
                this.isShowPanelDrawerLayout = false;
            }
        }

        /* checkbox */
        checkEvt($event, item) {
            item.checked = $event.checked;
            console.log(this.checkArr);
        }

        /* radio */
        radioEvt($event, item) {
            this.radioArr.map((it) => {
                it.checked = false;
                if (it.value === item.value) {
                    it.checked = $event.checked;
                }
            });
            console.log(this.radioArr)
        }
    };
</script>
