/*********************************************************************
* Created by tr on 2017/12/05.                                       *
*********************************************************************/


<template>
    <div class="component-content" ref="containerNode">
        <span class="title">Tabs 标签页</span>
        <span class="desc">分割内容上有关联单属于不同类别的数据集合。</span>
        <span class="sub">基本用法</span>
        <span class="desc">基础的、简洁的标签页。</span>
        <div id="basicLayout" class="box">
            <div class="box-content">
                <ls-tabs :tabsData="tabsData" @tabsEvt="tabsEvt"></ls-tabs>
                <div class="box-content" style="margin:20px 0 0 30px;font-size: 14px;">{{tabsReturn.name}}</div>
            </div>
            <div class="box-tagger" ref="boxTagger" :style="[{'height': showContent ? 'auto' : '0'}]">
                <pre>
                    <p class="txt">vue 页面</p>
                    &lt;ls-tabs :tabsData="tabsData" @tabsEvt="tabsEvt"&gt;&lt;/ls-tabs&gt;
                    <p class="txt">页面数据</p>
                    tabsData: [
                        {id: "001", name: "用户管理"},
                        {id: "002", name: "配置管理"},
                        {id: "003", name: "角色管理"},
                        {id: "004", name: "定时任务补偿"},
                        {id: "005", name: "密码管理"}
                    ],
                </pre>
            </div>
            <div class="fixed-footer">
                <div class="box-footer" @click="footerEvt" ref="boxFooter">
                    <i class="box-footer-icon" :class="[{'active': showContent}]"></i><span>{{showContent ? "隐藏代码" : "显示代码"}}</span>
                    <button type="button" class="box-footer-btn" tabindex="0"
                            :style="[{'opacity': showContent ? 1 : 0}]">
                        <!--<span>在线运行</span>-->
                    </button>
                </div>
            </div>
        </div>
        <span class="sub">选项卡样式</span>
        <span class="desc">选项卡样式的标签页</span>
        <div id="basicLayout1" class="box">
            <div class="box-content">
                <ls-tabs :tabsData="tabsData1" @tabsEvt="tabsEvt1"></ls-tabs>
                <div class="box-content" style="margin:20px 0 0 30px;font-size: 14px;">{{tabsReturn1.name}}</div>
            </div>
            <div class="box-tagger" ref="boxTagger" :style="[{'height': showContent1 ? 'auto' : '0'}]">
                <pre>
                    <p class="txt">vue 页面</p>
                     &lt;ls-tabs :tabsData="tabsData" @tabsEvt="tabsEvt"&gt;&lt;/ls-tabs&gt;
                    <p class="txt">页面数据</p>
                    tabsData1: {
                        borderShow:true,
                        list: [
                            {id: "001", name: "用户管理"},
                            {id: "002", name: "配置管理"},
                            {id: "003", name: "角色管理"},
                            {id: "004", name: "定时任务补偿"},
                            {id: "005", name: "密码管理"}
                        ]
                    }
                </pre>
            </div>
            <div class="fixed-footer">
                <div class="box-footer" @click="footerEvt1" ref="boxFooter">
                    <i class="box-footer-icon" :class="[{'active': showContent1}]"></i><span>{{showContent1 ? "隐藏代码" : "显示代码"}}</span>
                    <button type="button" class="box-footer-btn" tabindex="0"
                            :style="[{'opacity': showContent1 ? 1 : 0}]">
                        <!--<span>在线运行</span>-->
                    </button>
                </div>
            </div>
        </div>
        <span class="sub">位置</span>
        <span class="desc">可通过position设置标签的位置</span>
        <div id="basicLayout2" class="box">
            <div class="box-content">
                <div class="tabs-position">
                    <span v-for="p in positionEvt" @click="posEvt(p.name)" :class="[{'active':p.checked}]">{{p.name}}</span>
                </div>
                <ls-tabs :tabsData="tabsData2" @tabsEvt="tabsEvt1" ref="lsTabs2"></ls-tabs>
                <div style="position:relative;margin:30px 0 0 30px;font-size: 14px;" ref="boxContent">{{tabsReturn1.name}}</div>
            </div>
            <div class="box-tagger" ref="boxTagger" :style="[{'height': showContent1 ? 'auto' : '0'}]">
                <pre>
                    <p class="txt">vue 页面</p>
                     &lt;ls-tabs :tabsData="tabsData" @tabsEvt="tabsEvt"&gt;&lt;/ls-tabs&gt;
                    <p class="txt">页面数据</p>
                     tabsData2: {
                        position:'top',
                        list: [
                            {id: "001", name: "用户管理"},
                            {id: "002", name: "配置管理"},
                            {id: "003", name: "角色管理"},
                            {id: "004", name: "定时任务补偿"},
                            {id: "005", name: "密码管理"}
                        ]
                    },
                </pre>
            </div>
            <div class="fixed-footer">
                <div class="box-footer" @click="footerEvt1" ref="boxFooter">
                    <i class="box-footer-icon" :class="[{'active': showContent1}]"></i><span>{{showContent1 ? "隐藏代码" : "显示代码"}}</span>
                    <button type="button" class="box-footer-btn" tabindex="0"
                            :style="[{'opacity': showContent1 ? 1 : 0}]">
                        <!--<span>在线运行</span>-->
                    </button>
                </div>
            </div>
        </div>
        <span class="sub">使用参数类型说明</span>
        <ul class="grid">
            <li class="row" v-for="item in params">
                <div v-for="it in item" :class="[it.cls]" v-html="it.name"></div>
            </li>
        </ul>
        <span class="sub">Tabs Attributes</span>
        <ul class="grid tabs-grid">
            <li class="row" v-for="item in attr">
                <div v-for="it in item" :class="[it.cls]" v-html="it.name" class="col"></div>
            </li>
        </ul>
    </div>
</template>
<style>
    .tabs-grid  > .row > .col:nth-child(1){
        flex:2 !important;
    }
    .tabs-grid  > .row > .col:nth-child(2){
        flex:4 !important;
    }
    .tabs-grid  > .row > .col:nth-child(3){
        flex:2 !important;
    }
    .tabs-grid  > .row > .col:nth-child(4){
        flex:1 !important;
    }
</style>

<script>
    export default{
        data() {
            return {
                showContent: false,
                showContent1: false,
                tabsReturn: {id: "001", name: "用户管理"}, //tabs返回的值
                tabsReturn1: {id: "001", name: "用户管理"}, //tabs返回的值
                tabsData: {
                    list: [
                        {id: "001", name: "用户管理"},
                        {id: "002", name: "配置管理"},
                        {id: "003", name: "角色管理"},
                        {id: "004", name: "定时任务补偿"},
                        {id: "005", name: "密码管理"}
                    ]
                },
                tabsData1: {
                    borderShow:true,
                    list: [
                        {id: "001", name: "用户管理"},
                        {id: "002", name: "配置管理"},
                        {id: "003", name: "角色管理"},
                        {id: "004", name: "定时任务补偿"},
                        {id: "005", name: "密码管理"}
                    ]
                },
                tabsData2: {
                    position:'top',
                    list: [
                        {id: "001", name: "用户管理"},
                        {id: "002", name: "配置管理"},
                        {id: "003", name: "角色管理"},
                        {id: "004", name: "定时任务补偿"},
                        {id: "005", name: "密码管理"}
                    ]
                },
                params: [
                    [{name: "参数", cls: "col"}, {name: "说明", cls: "col mark"}, {name: "单位", cls: "col"}],
                    [{name: "tabsData", cls: "col"}, {name: "需要展示的列表数据", cls: "col mark"}, {name: "array", cls: "col"}],
                    [{name: "tabsEvt", cls: "col"}, {name: "点击选择事件", cls: "col mark"}, {name: "function", cls: "col"}]
                ],
                attr:[
                    [{name: "参数", cls: "col"}, {name: "说明", cls: "col"}, {name: "可选值", cls: "col"},{name:"默认值",cls:'col'}],
                    [{name: "borderShow", cls: "col"}, {name: "标签是否有边框", cls: "col"}, {name: "——", cls: "col"},{name:"false",cls:'col'}],
                    [{name: "list", cls: "col"}, {name: "展示的数据", cls: "col"}, {name: "——", cls: "col"},{name:"array",cls:'col'}],
                ],
                positionEvt:[
                    {name:'top',checked: true},
                    {name:'right',checked: false},
                    {name:'bottom',checked: false},
                    {name:'left',checked: false}
                ],
                nodeEvt:null
            }
        },
        watch: {},
        methods: {
            tabsEvt(val) {
                let that = this;
                that.tabsReturn = val.obj;
                that.showContent1= false;
            },
            tabsEvt1(val) {
                let that = this;
                that.tabsReturn1 = val.obj;
                that.showContent = false;
            },
            posEvt(val){
                let that = this;
                that.tabsData2.position = val;
                let obj = that.positionEvt;
                let temp = [];
                if(obj && obj.length) {
                    obj.map(it => {
                        it.checked = it.name === val;
                        temp.push(it);
                    });
                }
                that.positionEvt = temp;
                let boxContent = that.$refs.boxContent; //当前tabs里面的元素
                let lsTabs2 = that.$refs.lsTabs2; //获取当前tabs标签元素
                //判断位置元素
                switch (val){
                    case 'top':
                        break;
                    case 'right':
                        console.log(lsTabs2.$el.offsetHeight);
                        boxContent.style.height = "160px";
                        boxContent.style.right = '128px';
                        boxContent.style.left = 0;
                        boxContent.style.top = 0;
                        break;
                    case 'bottom':
                        boxContent.style.height = "auto";
                        boxContent.style.left = 0;
                        boxContent.style.right = 0;
                        boxContent.style.top = 0;
                        break;
                    case 'left':
                        console.log(lsTabs2.$el.offsetHeight);
                        boxContent.style.height = "160px";
                        boxContent.style.left = '128px';
                        boxContent.style.right = 0;
                        boxContent.style.top = 0;
                        break;
                    default:
                        break;
                }
            },
            footerEvt(){
                let that = this;
                that.showContent = !that.showContent;
                that.nodeEvt = document.getElementById("basicLayout");
            },
            footerEvt1(){
                let that = this;
                that.showContent1 = !that.showContent1;
                that.nodeEvt = document.getElementById("basicLayout1");
            }
        },
        mounted() {
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
                    let node = that.nodeEvt || document.getElementById("basicLayout");
                    /**
                     * 根据页面滚动距离，判断元素是否在浮动区间
                     * 区间计算方法为：页面滚动距离是否大于浮动元素中的固定内容高度和距顶部距离；是否小于浮动元素整体高度和距顶部距离；
                     */
                    let startY = node.offsetTop + node.querySelector("div.box-content").offsetHeight - scrollTop;
                    let endY = node.offsetTop + node.offsetHeight - scrollTop;
                    /* 当滚动元素位置在固定内容以下，浮动元素位置以上是浮动块（并且一定是要展开内容时才浮动） */
                    if (that.showContent && endY >= 0 && startY <= 0) {
                        /* 在元素浮动区间内，没有浮动块，需要浮动元素 */
                        if (!state) {
                            /* 设置页面浮动元素宽度 */
                            boxFooter.style.width = boxFooter.getBoundingClientRect().width + 'px';
                            boxFooter.className += ' fixedBottom';
                        }
                    } else {
                        /* 如果存在浮动需要清除浮动元素的值 */
                        if (state) boxFooter.className = boxFooterClass.replace(' fixedBottom', '');
                    }
                });
            })
        }
    }
</script>
