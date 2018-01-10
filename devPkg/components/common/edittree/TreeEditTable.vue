/*********************************************************************
* Created by zhangtao on 2017/12/5                                   *
* 可编辑树形表格的展示页面                                             *
 *********************************************************************/


<template>
    <div class="component-content" ref="containerNode">
        <span class="title">可编辑树形表格</span>
        <span class="desc">以表格形式展示层级数据，并进行操作</span>
        <span class="sub">表格的使用方法</span>
        <div id="basicLayout" class="box">
            <div class="box-content">
                <ls-tree-edit-table class="box" :propObj="treePropObj" :listObj="treeListData"></ls-tree-edit-table>
            </div>
            <div class="box-tagger" ref="boxTagger" :style="[{'height': showContent ? 'auto' : '0'}]">
                <pre>
                    <div v-text="code"></div>
                </pre>
            </div>
            <div class="fixed-footer">
                <div class="box-footer" @click="footerEvt" ref="boxFooter">
                    <i class="box-footer-icon" :class="[{'active': showContent}]"></i>
                    <span>{{showContent ? "隐藏代码" : "显示代码"}}</span>
                    <button type="button" class="box-footer-btn" tabindex="0" :style="[{'opacity': showContent ? 1 : 0}]">
                        <!--<span>在线运行</span>-->
                    </button>
                </div>
            </div>
        </div>
        <span class="sub">使用参数类型说明</span>
        <ul class="grid">
            <li class="row" v-for="(item, index) in params" :key="index">
                <div v-for="it in item" :class="[it.cls]" v-html="it.name" :key="it.name"></div>
            </li>
        </ul>

        <span class="sub">事件说明</span>
        <ul class="grid event">
            <li class="row" v-for="(item, index) in eventParams" :key="index">
                <div v-for="it in item" :class="[it.cls]" v-html="it.name" :key="it.name"></div>
            </li>
        </ul>
    </div>
</template>
<script>
    export default{
        data() {
            return {
                code: '<ls-tree-edit-table :propObj="treePropObj" :listObj="treeListData"></ls-tree-edit-table>',
                showContent: false,
                treePropObj: [
                    {n: 'ID', v: 'id', w: 25, d: true},
                    {n: '组织名称', v: 'orgName', w: 20, t: 'btn'},
                    {n: '组织编码', v: 'orgCode', w: 15, t: 'icon'},
                    {n: '组织类型', v: 'orgType', w: 10},
                    {n: '状态', v: 'curStatus', w: 10},
                    {n: '操作', v: 'opt', w: 20}
                ],
                treeListData: [],
                treeData: [
                    {"id":0,"name":"Name0","orgName":"ORGName0","orgCode":1509269482376,"orgType":"外部协作单位","curStatus":4,"pId":"firstLayer"},
                    {"id":1,"name":"Name1","orgName":"ORGName1","orgCode":1509269482385,"orgType":"内部组织","curStatus":5,"pId":"firstLayer"},
                    {"id":2,"name":"Name2","orgName":"ORGName2","orgCode":1509269482395,"orgType":"内部组织","curStatus":2,"pId":"firstLayer"},
                    {"id":3,"name":"Name3","orgName":"ORGName3","orgCode":1509269482404,"orgType":"内部组织","curStatus":3,"pId":"firstLayer"},
                    {"id":4,"name":"Name4","orgName":"ORGName4","orgCode":1509269482414,"orgType":"内部组织","curStatus":1,"pId":"firstLayer"},
                    {"id":"00","name":"Name00","orgName":"ORGName0","orgCode":1509269482376,"orgType":"外部协作单位","curStatus":3,"pId":"0"},
                    {"id":"01","name":"Name10","orgName":"ORGName1","orgCode":1509269482378,"orgType":"外部协作单位","curStatus":1,"pId":"0"},
                    {"id":"02","name":"Name20","orgName":"ORGName2","orgCode":1509269482381,"orgType":"外部协作单位","curStatus":5,"pId":"0"},
                    {"id":"03","name":"Name30","orgName":"ORGName3","orgCode":1509269482384,"orgType":"内部组织","curStatus":1,"pId":"0"},
                    {"id":"04","name":"Name40","orgName":"ORGName4","orgCode":1509269482386,"orgType":"外部协作单位","curStatus":5,"pId":"0"},
                    {"id":"10","name":"Name01","orgName":"ORGName0","orgCode":1509269482385,"orgType":"外部协作单位","curStatus":4,"pId":1},
                    {"id":"11","name":"Name11","orgName":"ORGName1","orgCode":1509269482387,"orgType":"内部组织","curStatus":5,"pId":1},
                    {"id":"12","name":"Name21","orgName":"ORGName2","orgCode":1509269482391,"orgType":"内部组织","curStatus":2,"pId":1},
                    {"id":"13","name":"Name31","orgName":"ORGName3","orgCode":1509269482393,"orgType":"内部组织","curStatus":1,"pId":1},
                    {"id":"14","name":"Name41","orgName":"ORGName4","orgCode":1509269482396,"orgType":"内部组织","curStatus":3,"pId":1},
                    {"id":"20","name":"Name02","orgName":"ORGName0","orgCode":1509269482395,"orgType":"内部组织","curStatus":4,"pId":2},
                    {"id":"21","name":"Name12","orgName":"ORGName1","orgCode":1509269482397,"orgType":"内部组织","curStatus":1,"pId":2},
                    {"id":"22","name":"Name22","orgName":"ORGName2","orgCode":1509269482400,"orgType":"外部协作单位","curStatus":5,"pId":2}
                ],
                params: [
                    [
                        {name: "参数", cls: "col col-2"}, 
                        {name: "说明", cls: "col col-6"}, 
                        {name: "类型", cls: "col col-2"}
                    ],
                    [
                        {name: "propObj", cls: "col col-2"}, 
                        {name: "为表格的配置列", cls: "col col-6"}, 
                        {name: "Array", cls: "col col-2"}
                    ],
                    [
                        {name: "listObj", cls: "col col-2"}, 
                        {name: "表格显示的数据", cls: "col col-6"}, 
                        {name: "Array", cls: "col col-2"}
                    ],
                    [
                        {name: "modalObj", cls: "col col-2"}, 
                        {name: "点击编辑控件按钮时，从外部反馈到表格的数据", cls: "col col-6"}, 
                        {name: "Object", cls: "col col-2"}
                    ],
                    [
                        {name: "operateConfig", cls: "col col-2"}, 
                        {name: "操作列的权限配置", cls: "col col-6"}, 
                        {name: "Object", cls: "col col-2"}
                    ]
                ],
                eventParams: [
                    [
                        {name: "事件", cls: "col"},
                        {name: "事件名", cls: "col col-2"},
                        {name: "说明", cls: "col col-3"},
                        {name: "参数", cls: "col col-4"}
                    ],
                    [
                        {name: "保存", cls: "col"},
                        {name: "onSelectEvt", cls: "col col-2"},
                        {name: "当保存编辑行后触发", cls: "col col-3"},
                        {name: "{type: 'save', obj: editRow}", cls: "col col-3"}
                    ],
                    [
                        {name: "删除", cls: "col"},
                        {name: "onSelectEvt", cls: "col col-2"},
                        {name: "当删除行后触发", cls: "col col-3"},
                        {name: "{type: 'delete', obj: removeRow}", cls: "col col-4"}
                    ],
                    [
                        {name: "modal", cls: "col"},
                        {name: "onSelectEvt", cls: "col col-2"},
                        {name: "点击编辑框中的按钮时触发", cls: "col col-3"},
                        {name: "{type: 'modal', obj: editRow}", cls: "col col-4"}
                    ]

                ]
            }
        },
        methods: {
            tempListClick(val) {
                console.log(val);
            },
            footerEvt(){
                let that = this;
                that.showContent = !that.showContent;
            }
        },
        mounted() {
            this.treeListData = this.treeData;
            let that = this;
            that.$nextTick(() => {
                let boxFooter = that.$refs.boxFooter;
                /* 查找父类元素注册滚动事件 */
                let scrollNode = that.$refs.containerNode.parentNode;
                scrollNode.addEventListener('scroll', function () {
                    /* 页面滚动距离（页面滚动顶部高度+页面滚动区域可视高度） */
                    let scrollTop = scrollNode.scrollTop + scrollNode.offsetHeight;
                    /* 获取当前需要定位元素的状态 */
                    let boxFooterClass = boxFooter.className;
                    let state = boxFooterClass.endsWith(' fixedBottom');
                    /* 获取页面需要定位的元素 */
                    let node = document.getElementById("basicLayout");
                    /**
                     * 根据页面滚动距离，判断元素是否在浮动区间
                     * 区间计算方法为：页面滚动距离是否大于浮动元素中的固定内容高度和距顶部距离；是否小于浮动元素整体高度和距顶部距离；
                     */
                    let startY = node.offsetTop + node.querySelector("div.box-content").offsetHeight - scrollTop;
                    let endY = node.offsetTop + node.offsetHeight - scrollTop;
                    /* 当滚动元素位置在固定内容以下，浮动元素位置以上是浮动块（并且一定是要展开内容时才浮动） */
                    if(that.showContent && endY >= 0 && startY <= 0){
                        /* 在元素浮动区间内，没有浮动块，需要浮动元素 */
                        if (!state) {
                            /* 设置页面浮动元素宽度 */
                            boxFooter.style.width = boxFooter.getBoundingClientRect().width + 'px';
                            boxFooter.className += ' fixedBottom';
                        }
                    }else {
                        /* 如果存在浮动需要清除浮动元素的值 */
                        if(state) boxFooter.className = boxFooterClass.replace(' fixedBottom', '');
                    }
                });
            })
        }
    }
</script>

<style lang="less" scoped>

.component-content {
    .grid {
        .col-2 {
            flex-basis: 20%;
        }

        .col-3 {
            flex-basis: 30%;
        }

        .col-4 {
            flex-basis: 40%;
        }

        .col-6 {
            flex-basis: 60%;
        }
    }
    >.box > .box-content {
        width: 95% !important;
        margin: 10px auto;

        .box {
            margin: 0;
            height: 246px !important;
        }
    }
}
</style>
