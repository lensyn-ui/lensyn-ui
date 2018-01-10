
<template>
    <div class="component-content" ref="containerNode">
        <span class="title">进度条组件</span>
        <span class="sub">图表类组件。一般有两种用途：</span>
        <span class="desc">显示某项任务进度的百分比；</span>

        <div id="basicLayout" class="box">
            <div class="box-content">
                <!--<div class="layout-row line" >-->
                <div style="width: 90%;margin: 0 auto;">
            　           <ls-line  :percent="100" status="active">
                         </ls-line>

                        <ls-line  :percent="60" status="wrong">
                        </ls-line>

                        <ls-line  :stroke-width='15' :percent="40"></ls-line >

                        <div style="height: 100px;margin-top: 10px">
                            <ls-line vertical :percent="45" status="normal">
                            </ls-line>
                        </div>

                </div>

            <!--</div>-->
        </div>
            <div class="box-tagger" ref="boxTagger" :style="[{'height': showContent ? 'auto' : '0'}]">
                <pre>
                         &lt;ls-line  :percent="100" status="active"&gt;
                         &lt;/ls-line&gt;

                         &lt;ls-line  :percent="60" status="wrong"&gt;
                         &lt;/ls-line&gt;

                         &lt;ls-line :stroke-width='15' :percent="40"&gt; &lt;/ls-line &gt;

                         &lt;div style="height: 100px;"&gt;
                             &lt;ls-line vertical :percent="45" status="normal"&gt;
                             &lt;/ls-line&gt;
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
        <ul class="grid" style="margin-left: 20px">
            <li class="row" v-for="item in params">
                <div v-for="it in item" :class="[it.cls]" v-html="it.name"></div>
            </li>
        </ul>
    </div>
</template>
<script>
    export default{
        data() {
            return {
                showContent: false,
                params: [
                    [{name: "参数", cls: "col"}, {name: "说明", cls: "col mark"}, {name: "值类型(默认值)", cls: "col"}],
                    [{name: "percent", cls: "col"}, {name: "百分比", cls: "col mark"}, {name: "Number(0)", cls: "col"}],
                    [{name: "status", cls: "col"}, {name: "状态，可选值为normal、active、wrong、success", cls: "col mark"}, {name: "string(normal)", cls: "col"}],
                    [{name: "stroke-width", cls: "col"}, {name: "进度条的线宽", cls: "col mark"}, {name: "Number(10) ", cls: "col"}],
                    [{name: "vertical", cls: "col"}, {name: "是否垂直显示", cls: "col mark"}, {name: "Boolean(false)", cls: "col"}],
                    [{name: "hide-info", cls: "col"}, {name: "是否隐藏数值或图标", cls: "col mark"}, {name: "Boolean(false)", cls: "col"}],

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
            },
            footerEvt1(){
                let that = this;
                that.showContent1 = !that.showContent1;
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
