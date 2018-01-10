/*********************************************************************
* Created by deming-su on 2017/11/28                                   *
 *********************************************************************/


<template>
    <div class="component-content" ref="containerNode">
        <span class="title">Selection 组件</span>
        <span class="desc">web 下拉选择框，适用于页面下拉列表及目录菜单等</span>
        <span class="sub">Selection 使用方法</span>
        <span class="desc">页面选择事件支持回调</span>
        <div id="basicLayout" class="box">
            <div class="box-content">
                <ls-selection class="box" showType="scroll" :objProps="menuList" @clickEvt="tempListClick"></ls-selection>
            </div>
            <div class="box-tagger" ref="boxTagger" :style="[{'height': showContent ? 'auto' : '0'}]">
                <pre>
                    <p class="txt">vue 页面</p>
                    &lt;ls-selection class="box" :objProps="menuList" @clickEvt="tempListClick"&gt;&lt;/ls-selection&gt;
                    <p class="txt">页面数据</p>
                    data() {
                        return {
                            menuList: {
                                list: [
                                    {id: "ID1", name: "菜单一"},
                                    {id: "ID2", name: "菜单二"},
                                    {id: "ID3", name: "菜单三"},
                                    {id: "ID4", name: "菜单四"},
                                    {id: "ID5", name: "菜单五"},
                                    {id: "ID6", name: "菜单六"},
                                    {id: "ID7", name: "菜单七"},
                                    {id: "ID8", name: "菜单八"}
                                ]
                            }
                        }
                    }
                    methods: {
                        tempListClick(val) {
                            console.log(val);
                        }
                    }
                </pre>
            </div>
            <div class="fixed-footer">
                <div class="box-footer" @click="footerEvt" ref="boxFooter">
                    <i class="box-footer-icon" :class="[{'active': showContent}]"></i><span>{{showContent ? "隐藏代码" : "显示代码"}}</span>
                    <button type="button" class="box-footer-btn" tabindex="0" :style="[{'opacity': showContent ? 1 : 0}]">
                        <!--<span>在线运行</span>-->
                    </button>
                </div>
            </div>
        </div>
        <span class="sub">使用参数类型说明</span>
        <ul class="grid">
            <li class="row" v-for="(item, index) in params" :key="index">
                <div v-for="(it, index) in item" :key="index" :class="[it.cls]" v-html="it.name"></div>
            </li>
        </ul>

        <span class="sub">方法说明</span>
        <ul class="grid">
            <li class="row" v-for="(item, index) in methodParams" :key="index">
                <div v-for="(it, index) in item" :key="index" :class="[it.cls]" v-html="it.name"></div>
            </li>
        </ul>
    </div>
</template>
<style lang="less" scoped>
.component-content {
    .grid {
        .col-2 {
            flex-basis: 20%;
        }

        .col-6 {
            flex-basis: 60%;
        }
    }
}
</style>

<script>
    export default{
        data() {
            return {
                showContent: false,
                menuList: {
                    list: [
                        {id: "ID1", name: "菜单一"},
                        {id: "ID2", name: "菜单二"},
                        {id: "ID3", name: "菜单三"},
                        {id: "ID4", name: "菜单四"},
                        {id: "ID5", name: "菜单五"},
                        {id: "ID6", name: "菜单六"},
                        {id: "ID7", name: "菜单七"},
                        {id: "ID8", name: "菜单八"}
                    ]
                },
                params: [
                    [
                        {name: "参数", cls: "col col-2"}, 
                        {name: "说明", cls: "col col-6"}, 
                        {name: "单位", cls: "col col-2"}
                    ],
                    [
                        {name: "objProps", cls: "col col-2"}, 
                        {name: "需要展示的列表数据", cls: "col col-6"}, 
                        {name: "array", cls: "col col-2"}
                    ],
                    [
                        {name: "clickEvt", cls: "col col-2"}, 
                        {name: "点击选择事件", cls: "col col-6"}, 
                        {name: "function", cls: "col col-6"}
                    ],
                    [
                        {name: "showFieldKey", cls: "col col-2"},
                        {name: "配置在下拉列表中显示的字段，默认为 name", cls: "col col-6"},
                        {name: "string", cls: "col col-2"}
                    ],
                    [
                        {name: "idKey", cls: "col col-2"},
                        {name: "标识符的字段，默认为 id", cls: "col col-6"},
                        {name: "string", cls: "col col-2"}
                    ],
                    [
                        {name: "isDisabled", cls: "col col-2"},
                        {name: "是否禁用下拉控件，默认为 false", cls: "col col-6"},
                        {name: "boolean", cls: "col col-2"}
                    ],
                    [
                        {name: "inputClass", cls: "col col-2"},
                        {name: "添加到输入框上额外的 class,默认为空", cls: "col col-6"},
                        {name: "string", cls: "col col-2"}
                    ],
                    [
                        {name: "showType", cls: "col col-2"},
                        {name: "下拉列表显示的类型，过滤或者滚动匹配到的项目", cls: "col col-6"},
                        {name: "string", cls: "col col-2"}
                    ]
                ],

                methodParams: [
                    [
                        {name: "方法名", cls: "col col-2"},
                        {name: "说明", cls: "col col-6"},
                        {name: "参数", cls: "col col-2"}
                    ],
                    [
                        {name: "getSelected", cls: "col col-2"},
                        {name: "获取当前选中的数据，未选中返回 null", cls: "col col-6"},
                        {name: "无", cls: "col col-2"} 
                    ],
                    [
                        {name: "clearSelected", cls: "col col-2"},
                        {name: "清空选中的内容", cls: "col col-6"},
                        {name: "无", cls: "col col-2"} 
                    ],
                    [
                        {name: "setItemBeSelected", cls: "col col-2"},
                        {name: "设置某一项数据被选中", cls: "col col-6"},
                        {name: "被选中数据的标识", cls: "col col-2"} 
                    ]
                ]
            }
        },
        watch: {},
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
