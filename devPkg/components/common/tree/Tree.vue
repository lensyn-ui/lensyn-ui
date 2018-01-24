/*********************************************************************
* Created by tr on 2017/12/12.                                       *
*********************************************************************/
<template>
    <div class="component-content" ref="containerNode">
        <span class="title">Tree 树形组件</span>
        <span class="desc">用清晰的层级结构展示信息，可展示或折叠。</span>
        <span class="sub">基本用法</span>
        <span class="desc">基础的树形结构展示</span>
        <div id="basicLayout" class="box">
            <div class="box-content">
                <ls-tree :treeObj="treeObj1"></ls-tree>
            </div>
            <div class="box-tagger" ref="boxTagger" :style="[{'height': showContent ? 'auto' : '0'}]">
                <pre>
                    <p class="txt">vue 页面</p>
                    &lt;ls-tree :treeObj="treeObj"&gt;&lt;/ls-tree&gt;
                    <p class="txt">页面数据</p>
                    treeObj1: [
                    {
                        name: '一级 1',
                        checked: true,
                        id:'1',
                        children: [{
                            name: '二级 1-1',
                            id:'1-1',
                            pid:'1',
                            checked: false,
                            children: [{
                                name: '三级 1-1-1',
                                id:'1-1-1',
                                pid:'1-1',
                                checked: false,
                            }]
                        }]
                    },
                    {
                        name: '一级 2',
                        checked: false,
                        id:'2',
                        children: [
                            {
                                name: '二级 2-1',
                                checked: false,
                                check:0,
                                id:'2-1',
                                pid:'2',
                                children: [{
                                    name: '三级 2-1-1',
                                    id:'2-1-1',
                                    pid:'2-1',
                                    checked: false,
                                }]
                            },
                            {
                                name: '二级 2-2',
                                checked: false,
                                children: [{
                                    name: '三级 2-2-1',
                                    checked: false,
                                }]
                            }]
                    },
                    {
                        name: '一级 3',
                        checked: false,
                        id:'3',
                        check:2,
                        children: [
                            {
                                name: '二级 3-1',
                                checked: false,
                                id:'3-1',
                                pid:'3',
                                children: [{
                                    name: '三级 3-1-1',
                                    id:'3-1-1',
                                    pid:'3-1',
                                    checked: false,
                                }]
                            },
                            {
                                name: '二级 3-2',
                                id:'3-2',
                                pid:'3',
                                checked: false,
                                check:1,
                                children: [{
                                    name: '三级 3-2-1',
                                    id:'3-2-1',
                                    pid:'3-2',
                                    checked: false,
                                }]
                            }]
                    }],
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
        <span class="sub">可选择</span>
        <span class="desc">适用于需要选择层级时使用。</span>
        <div id="basicLayout1" class="box">
            <div class="box-content">
                <ls-tree :treeObj="treeObj" :treeParams="treeParams" @treeEvt="treeEvt"></ls-tree>
            </div>
            <div class="box-tagger" ref="boxTagger" :style="[{'height': showContent ? 'auto' : '0'}]">
                <pre>
                    <p class="txt">vue 页面</p>
                    &lt;ls-tree :treeObj="treeObj" :treeParams="treeParams" @treeEvt="treeEvt"&gt;&lt;/ls-tree&gt;
                    <p class="txt">页面数据</p>
                     treeObj: [
                    {
                        name: '一级 1',
                        checked: true,
                        id:'1',
                        check:0,
                        children: [{
                            name: '二级 1-1',
                            id:'1-1',
                            pid:'1',
                            checked: false,
                            check:0,
                            children: [{
                                name: '三级 1-1-1',
                                id:'1-1-1',
                                pid:'1-1',
                                check:0,
                                checked: false,
                            }]
                        }]
                    },
                    {
                        name: '一级 2',
                        checked: false,
                        id:'2',
                        check:0,
                        children: [
                            {
                                name: '二级 2-1',
                                checked: false,
                                check:0,
                                id:'2-1',
                                pid:'2',
                                children: [{
                                    name: '三级 2-1-1',
                                    id:'2-1-1',
                                    pid:'2-1',
                                    checked: false,
                                    check:0,
                                }]
                            },
                            {
                                name: '二级 2-2',
                                checked: false,
                                check:0,
                                children: [{
                                    name: '三级 2-2-1',
                                    checked: false,
                                    check:0,
                                }]
                            }]
                    },
                    {
                        name: '一级 3',
                        checked: false,
                        id:'3',
                        check:2,
                        children: [
                            {
                                name: '二级 3-1',
                                checked: false,
                                id:'3-1',
                                pid:'3',
                                check:0,
                                children: [{
                                    name: '三级 3-1-1',
                                    id:'3-1-1',
                                    pid:'3-1',
                                    checked: false,
                                    check:0,
                                }]
                            },
                            {
                                name: '二级 3-2',
                                id:'3-2',
                                pid:'3',
                                checked: false,
                                check:1,
                                children: [{
                                    name: '三级 3-2-1',
                                    id:'3-2-1',
                                    pid:'3-2',
                                    checked: false,
                                    check:0,
                                }]
                            }]
                    }]
                     treeParams:{
                        isCheck: true
                    }
                </pre>
            </div>
            <div class="fixed-footer">
                <div class="box-footer" @click="footerEvt1" ref="boxFooter">
                    <i class="box-footer-icon" :class="[{'active': showContent}]"></i><span>{{showContent ? "隐藏代码" : "显示代码"}}</span>
                    <button type="button" class="box-footer-btn" tabindex="0"
                            :style="[{'opacity': showContent ? 1 : 0}]">
                        <!--<span>在线运行</span>-->
                    </button>
                </div>
            </div>
        </div>
        <span class="sub">使用参数类型说明</span>
        <ul class="grid">
            <li class="row" v-for="(item, index) in params" :key="indexs">
                <div v-for="(it, subKey) in item" :key="subKey" :class="[it.cls]" v-html="it.name"></div>
            </li>
        </ul>
        <span class="sub">treeObj 参数说明</span>
        <ul class="grid tree-grid">
            <li class="row" v-for="(item, index) in attr" :key="index">
                <div v-for="(it, subKey) in item" :key="subKey" :class="[it.cls]" v-html="it.name"></div>
            </li>
        </ul>
        <span class="sub">treeParams 参数说明</span>
        <ul class="grid tree-grid">
            <li class="row" v-for="(item, index) in attr1" :key="index">
                <div v-for="(it, subKey) in item" :key="subKey" :class="[it.cls]" v-html="it.name"></div>
            </li>
        </ul>
        <span class="sub">treeEvt 参数说明</span>
        <ul class="grid tree-grid">
            <li class="row" v-for="(item, index) in attr2" :key="index">
                <div v-for="(it, subKey) in item" :key="subKey" :class="[it.cls]" v-html="it.name"></div>
            </li>
        </ul>
    </div>
</template>
<style>
    .tree-grid  > .row > .col:nth-child(1){
        flex:2 !important;
    }
    .tree-grid  > .row > .col:nth-child(2){
        flex:4 !important;
    }
    .tree-grid  > .row > .col:nth-child(3){
        flex:2 !important;
    }
    .tree-grid  > .row > .col:nth-child(4){
        flex:1 !important;
    }
</style>
<script>
    export default{
        data() {
            return {
                showContent: false,
                treeObj: [
                    {
                        name: '一级 1',
                        checked: true,
                        id:'1',
                        check:0,
                        children: [{
                            name: '二级 1-1',
                            id:'1-1',
                            pid:'1',
                            checked: false,
                            check:0,
                            children: [{
                                name: '三级 1-1-1',
                                id:'1-1-1',
                                pid:'1-1',
                                check:0,
                                checked: false,
                            }]
                        }]
                    },
                    {
                        name: '一级 2',
                        checked: false,
                        id:'2',
                        check:0,
                        children: [
                            {
                                name: '二级 2-1',
                                checked: false,
                                check:0,
                                id:'2-1',
                                pid:'2',
                                children: [{
                                    name: '三级 2-1-1',
                                    id:'2-1-1',
                                    pid:'2-1',
                                    checked: false,
                                    check:0,
                                }]
                            },
                            {
                                name: '二级 2-2',
                                checked: false,
                                check:0,
                                children: [{
                                    name: '三级 2-2-1',
                                    checked: false,
                                    check:0,
                                }]
                            }]
                    },
                    {
                        name: '一级 3',
                        checked: false,
                        id:'3',
                        check:2,
                        children: [
                            {
                                name: '二级 3-1',
                                checked: false,
                                id:'3-1',
                                pid:'3',
                                check:0,
                                children: [{
                                    name: '三级 3-1-1',
                                    id:'3-1-1',
                                    pid:'3-1',
                                    checked: false,
                                    check:0,
                                }]
                            },
                            {
                                name: '二级 3-2',
                                id:'3-2',
                                pid:'3',
                                checked: false,
                                check:1,
                                children: [{
                                    name: '三级 3-2-1',
                                    id:'3-2-1',
                                    pid:'3-2',
                                    checked: false,
                                    check:0,
                                }]
                            }]
                    }],
                treeObj1: [
                    {
                        name: '一级 1',
                        checked: true,
                        id:'1',
                        children: [{
                            name: '二级 1-1',
                            id:'1-1',
                            pid:'1',
                            checked: false,
                            children: [{
                                name: '三级 1-1-1',
                                id:'1-1-1',
                                pid:'1-1',
                                checked: false,
                            }]
                        }]
                    },
                    {
                        name: '一级 2',
                        checked: false,
                        id:'2',
                        children: [
                            {
                                name: '二级 2-1',
                                checked: false,
                                id:'2-1',
                                pid:'2',
                                children: [{
                                    name: '三级 2-1-1',
                                    id:'2-1-1',
                                    pid:'2-1',
                                    checked: false,
                                }]
                            },
                            {
                                name: '二级 2-2',
                                checked: false,
                                children: [{
                                    name: '三级 2-2-1',
                                    checked: false,
                                }]
                            }]
                    },
                    {
                        name: '一级 3',
                        checked: false,
                        id:'3',
                        children: [
                            {
                                name: '二级 3-1',
                                checked: false,
                                id:'3-1',
                                pid:'3',
                                children: [{
                                    name: '三级 3-1-1',
                                    id:'3-1-1',
                                    pid:'3-1',
                                    checked: false,
                                }]
                            },
                            {
                                name: '二级 3-2',
                                id:'3-2',
                                pid:'3',
                                checked: false,
                                children: [{
                                    name: '三级 3-2-1',
                                    id:'3-2-1',
                                    pid:'3-2',
                                    checked: false,
                                }]
                            }]
                    }],
                treeParams:{
                    isCheck: true
                },
                params: [
                    [{name: "参数", cls: "col"}, {name: "说明", cls: "col mark"}, {name: "单位", cls: "col"}],
                    [{name: "treeObj", cls: "col"}, {name: "需要展示的列表数据", cls: "col mark"}, {name: "array", cls: "col"}],
                    [{name: "treeParams", cls: "col"}, {name: "需要展示的控件", cls: "col mark"}, {name: "array", cls: "col"}],
                    [{name: "treeEvt", cls: "col"}, {name: "点击选择事件", cls: "col mark"}, {name: "function", cls: "col"}],
                    [{name: "labelKey", cls: "col"}, {name: "显示的字段", cls: "col mark"}, {name: "string", cls: "col"}],
                    [{name: "idKey", cls: "col"}, {name: "数据的主键", cls: "col mark"}, {name: "string", cls: "col"}]                    
                ],
                attr: [
                    [{name: "参数", cls: "col"}, {name: "说明", cls: "col"}, {name: "可选值", cls: "col"}, {
                        name: "默认值",
                        cls: 'col'
                    }],
                    [{name: "name", cls: "col"}, {name: "该节点展示的内容", cls: "col"}, {
                        name: "——",
                        cls: "col"
                    }, {name: "string", cls: 'col'}],
                    [{name: "id", cls: "col"}, {name: "该节点的ID值，必须是唯一", cls: "col"}, {name: "——", cls: "col"}, {
                        name: "string",
                        cls: 'col'
                    }],
                    [{name: "pid", cls: "col"}, {name: "该节点的父级Id", cls: "col"}, {name: "——", cls: "col"}, {name: "string", cls: 'col'}],
                    [{name: "children", cls: "col"}, {name: "该节点的子级数据", cls: "col"}, {name: "——", cls: "col"}, {name: "array", cls: 'col'}],
                    [{name: "checked", cls: "col"}, {name: "是否展开该节点", cls: "col"}, {name: "——", cls: "col"}, {name: "false", cls: 'col'}],
                    [{name: "checked", cls: "col"}, {name: "是否展开该节点", cls: "col"}, {name: "——", cls: "col"}, {name: "false", cls: 'col'}],
                    [{name: "check", cls: "col"}, {name: "是否选择该节点", cls: "col"}, {name: "[0,1,2]", cls: "col"}, {name: "0", cls: 'col'}],
                ],
                attr1:[
                    [{name: "参数", cls: "col"}, {name: "说明", cls: "col"}, {name: "可选值", cls: "col"}, {name: "默认值", cls: 'col'}],
                    [{name: "isCheck", cls: "col"}, {name: "是否主要选择框", cls: "col"}, {name: "可选值", cls: "col"}, {name: "false", cls: 'col'}],
                ],
                attr2:[
                    [{name: "参数", cls: "col"}, {name: "说明", cls: "col"}, {name: "可选值", cls: "col"}, {name: "默认值", cls: 'col'}],
                    [{name: "action", cls: "col"}, {name: "动作，收起展开为 expand,选中为 checkbox", cls: "col"}, {name: "可选值", cls: "col"}, {name: "string", cls: 'col'}],                    
                    [{name: "obj", cls: "col"}, {name: "返回整个树的数据", cls: "col"}, {name: "可选值", cls: "col"}, {name: "array", cls: 'col'}],
                    [{name: "curObj", cls: "col"}, {name: "当前选择的树的数据", cls: "col"}, {name: "可选值", cls: "col"}, {name: "object", cls: 'col'}],
                ],
                positionEvt: [
                    {name: 'top', checked: true},
                    {name: 'right', checked: false},
                    {name: 'bottom', checked: false},
                    {name: 'left', checked: false}
                ],
                nodeEvt: null
            }
        },
        watch: {},
        methods: {
            tabsEvt(val) {
                let that = this;
                that.tabsReturn = val.obj;
                that.showContent1 = false;
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
                if (obj && obj.length) {
                    obj.map(it => {
                        it.checked = it.name === val;
                        temp.push(it);
                    });
                }
                that.positionEvt = temp;
                let boxContent = that.$refs.boxContent; //当前tabs里面的元素
                let lsTabs2 = that.$refs.lsTabs2; //获取当前tabs标签元素
                //判断位置元素
                switch (val) {
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