/*********************************************************************
* Created by deming-su on 2017/11/28                                   *
 *********************************************************************/


<template>
    <div class="component-content" ref="containerNode">
        <span class="title">布局</span>
        <span class="desc">页面进行栅格布局，可以采用24栅格简单便捷地开发页面布局</span>
        <span class="sub">布局使用方法</span>
        <span class="desc">进行单行多列布局，以及偏移布局</span>
        <span class="desc">预设四种尺寸样式适配，xs、sm、md、lg。</span>
        <div id="basicLayout" class="box">
            <div class="box-content">
                <div class="layout-row" v-for="item in list">
                    <div v-for="it in item" :class="[it]">{{it === "col-offset" ? "" : it}}</div>
                </div>
            </div>
            <div class="box-tagger" ref="boxTagger" :style="[{'height': showContent ? 'auto' : '0'}]">
                <pre>
                    <p class="txt">vue 页面</p>
                    &lt;div class="row"&gt;
                        &lt;div class="col-12"&gt;&lt;/div&gt;
                        &lt;div class="col-12"&gt;&lt;/div&gt;
                    &lt;/div&gt;
                    &lt;div class="row"&gt;
                        &lt;div class="col-8"&gt;&lt;/div&gt;
                        &lt;div class="col-8"&gt;&lt;/div&gt;
                        &lt;div class="col-8"&gt;&lt;/div&gt;
                    &lt;/div&gt;
                    &lt;div class="row"&gt;
                        &lt;div class="col-6"&gt;&lt;/div&gt;
                        &lt;div class="col-6"&gt;&lt;/div&gt;
                        &lt;div class="col-6"&gt;&lt;/div&gt;
                        &lt;div class="col-6"&gt;&lt;/div&gt;
                    &lt;/div&gt;
                    &lt;div class="row"&gt;
                        &lt;div class="col-4"&gt;&lt;/div&gt;
                        &lt;div class="col-4"&gt;&lt;/div&gt;
                        &lt;div class="col-4"&gt;&lt;/div&gt;
                        &lt;div class="col-4"&gt;&lt;/div&gt;
                        &lt;div class="col-4"&gt;&lt;/div&gt;
                        &lt;div class="col-4"&gt;&lt;/div&gt;
                    &lt;/div&gt;
                    &lt;div class="row"&gt;
                        &lt;div class="col-6 col-offset-6"&gt;&lt;/div&gt;
                        &lt;div class="col-6 col-offset-6"&gt;&lt;/div&gt;
                    &lt;/div&gt;
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
    </div>
</template>
<style>

</style>
<script>
    export default{
        data() {
            return {
                showContent: false,
                list: [
                    ["col-12", "col-12"],
                    ["col-8", "col-8", "col-8"],
                    ["col-6", "col-6", "col-6", "col-6"],
                    ["col-4", "col-4", "col-4", "col-4", "col-4", "col-4"],
                    ["col-offset", "col-6 col-offset-6", "col-offset", "col-6 col-offset-6"]
                ],
                params: [
                    [{name: "参数", cls: "col"}, {name: "说明", cls: "col mark"}, {name: "单位", cls: "col"}],
                    [{name: "xs", cls: "col"}, {name: "<em>&lt;1336</em>分辨率按照1024分辨率进行还原", cls: "col mark"}, {name: "px", cls: "col"}],
                    [{name: "xs", cls: "col"}, {name: "<em>&ge;1336</em>且<em>&lt;1680</em>分辨率按照1336分辨率进行还原", cls: "col mark"}, {name: "px", cls: "col"}],
                    [{name: "xs", cls: "col"}, {name: "<em>&ge;1680</em>且<em>&lt;1920</em>分辨率按照1680分辨率进行还原", cls: "col mark"}, {name: "px", cls: "col"}],
                    [{name: "xs", cls: "col"}, {name: "<em>&ge;1920</em>分辨率按照1920分辨率进行还原", cls: "col mark"}, {name: "px", cls: "col"}]
                ]
            }
        },
        methods: {
            footerEvt(){
                let that = this;
                that.showContent = !that.showContent;
            }
        },
        mounted(){
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
