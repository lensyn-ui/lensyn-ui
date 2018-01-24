/*********************************************************************
* Created by tr on 2017/12/12.                                       *
*********************************************************************/
<template>
    <div class="component-content" ref="containerNode">
        <span class="title">Tooltip 组件</span>
        <span class="desc">用于向用户展示某些提示信息, 当无足够空间显示时，自动切换到反方向显示</span>
        <span class="sub">基本用法</span>
        <div id="basicLayout" class="box">
            <div class="box-content">
                <ls-button name="上面" v-ls-tooltip="'上面的 tooltip'"></ls-button>
                <ls-button name="下面" v-ls-tooltip.bottom="'下面的 tooltip'"></ls-button>
                <ls-button name="左边" v-ls-tooltip.left="'左的 tooltip'"></ls-button>                
                <ls-button name="右边" v-ls-tooltip.right="'右边的 tooltip'"></ls-button>
            </div>
            <div class="box-tagger" ref="boxTagger" :style="[{'height': showContent ? 'auto' : '0'}]">
                <pre>
                    <p class="txt">vue 页面</p>
                    <pre>
                        &lt;ls-button name="上面" v-ls-tooltip="'上面的 tooltip'" &gt;&lt;/ls-button&gt;
                        &lt;ls-button name="下面" v-ls-tooltip.bottom="'下面的 tooltip'" &gt;&lt;/ls-button&gt;
                        &lt;ls-button name="左边" v-ls-tooltip.left="'左边的 tooltip'" &gt;&lt;/ls-button&gt;
                        &lt;ls-button name="右边" v-ls-tooltip.right="'右边的 tooltip'" &gt;&lt;/ls-button&gt;
                    </pre>
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
    </div>
</template>

<style scoped lang="less">
    .component-content {
        #basicLayout {
            .box-content {
                margin-top: 50px;
                text-align: center;

                .button-temp {
                    margin: 0 50px;
                }
            }
        }
    }
</style>

<script>
    export default{
        data() {
            return {
                showContent: false,
                nodeEvt: null
            }
        },
        methods: {
            footerEvt(){
                let that = this;
                that.showContent = !that.showContent;
                that.nodeEvt = document.getElementById("basicLayout");
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