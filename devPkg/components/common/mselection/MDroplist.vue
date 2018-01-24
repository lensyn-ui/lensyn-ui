/*********************************************************************
* Created by deming-su on 2017/11/28                                   *
 *********************************************************************/


<template>
    <div class="component-content" ref="containerNode">
        <span class="title">ls-mpicker 组件</span>
        <span class="desc">mobile 下拉选择框，适用于页面下拉列表及目录菜单等(级联功能开发中)</span>
        <span class="sub">Selection 使用方法</span>
        <span class="desc">页面选择事件支持回调</span>
        <span class="desc">需要用手机模拟查看效果</span>
        <div id="basicLayout" class="box">
            <div class="box-content">
                <ls-button class="button" :objProps="btnProp" @clickEvt="btnClick" name="日期选择器"></ls-button>
                <span style="display: block; margin: 15px; font-size: 14px; color: rgb(18, 150, 219);">选择的日期是：{{pickerValue}}</span>
                <ls-button class="button" @clickEvt="btnLClick" name="数据选择器"></ls-button>
                <span style="display: block; margin: 15px; font-size: 14px; color: rgb(18, 150, 219);">选择的列表数据是：{{pickerLValue}}</span>
            </div>
            <div class="box-tagger" ref="boxTagger" :style="[{'height': showContent ? 'auto' : '0'}]">
                <pre>
                    <p class="txt">vue 页面</p>
                    &lt;ls-mpicker v-show="pickerShow" :objProps="objProps" @evtFunc="pickerEvt"&gt;&lt;/ls-mpicker&gt;
                    <p class="txt">页面数据</p>
                    data() {
                        return {
                            pickerShow: false,
                            pickerValue: '',
                            btnProp: {
                                type: "primary"
                            },
                            objProps: {
                                format: 'y,m,d,h,mm,s'
                            }
                        }
                    }
                    methods: {
                        pickerEvt(val) {
                            this.pickerShow = false;
                            this.pickerValue = val.val;
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
            <li class="row" v-for="item in params">
                <div v-for="it in item" :class="[it.cls]" v-html="it.name"></div>
            </li>
        </ul>
        <ls-mpicker v-show="pickerShow" :objProps="objProps" @evtFunc="pickerEvt"></ls-mpicker>
        <ls-mpicker v-show="pickerLShow" :objProps="pickerList" @evtFunc="pickerLEvt"></ls-mpicker>
    </div>
</template>
<script>
    export default{
        data() {
            return {
                btnProp: {
                    type: "primary"
                },
                pickerShow: false,
                pickerValue: '',
                objProps: {
                    format: 'y,m,d,h,mm,s'
                },
                showContent: false,
                params: [
                    [{name: "参数", cls: "col"}, {name: "说明", cls: "col mark"}, {name: "单位", cls: "col"}],
                    [{name: "objProps", cls: "col"}, {name: "需要展示的列表数据", cls: "col mark"}, {name: "array", cls: "col"}],
                    [{name: "clickEvt", cls: "col"}, {name: "点击选择事件", cls: "col mark"}, {name: "function", cls: "col"}]
                ],
                pickerLShow: false,
                pickerLValue: '',
                pickerList: {
                    type: 'list',
                    value: ["ID6"],
                    list: [
                        [
                            {id: "ID1", name: "菜单一"},
                            {id: "ID2", name: "菜单二"},
                            {id: "ID3", name: "菜单三"},
                            {id: "ID4", name: "菜单四"},
                            {id: "ID5", name: "菜单五"},
                            {id: "ID6", name: "菜单六"},
                            {id: "ID7", name: "菜单七"},
                            {id: "ID8", name: "菜单八"}
                        ],
                        [
                            {id: "ID1", name: "菜单一"},
                            {id: "ID2", name: "菜单二"},
                            {id: "ID3", name: "菜单三"},
                            {id: "ID4", name: "菜单四"},
                            {id: "ID5", name: "菜单五"},
                            {id: "ID6", name: "菜单六"},
                            {id: "ID7", name: "菜单七"},
                            {id: "ID8", name: "菜单八"}
                        ]
                    ]
                }
            }
        },
        methods: {
            btnClick() {
                this.pickerShow = true;
            },
            btnLClick() {
                this.pickerLShow = true;
            },
            tempListClick(val) {
                console.log(val);
            },
            footerEvt(){
                let that = this;
                that.showContent = !that.showContent;
            },
            pickerLEvt(val) {
                this.pickerLShow = false;
                this.pickerLValue = val.val;
            },
            pickerEvt(val) {
                this.pickerShow = false;
                this.pickerValue = val.val;
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
