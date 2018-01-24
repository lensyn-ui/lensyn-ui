/*********************************************************************
* Created by tr on 2017/12/12.                                       *
*********************************************************************/
<template>
    <div class="component-content" ref="containerNode">
        <span class="title">确认弹出框组件</span>
        <span class="desc">用于向用户确认是否执行某操作</span>
        <span class="sub">基本用法</span>
        <div id="basicLayout" class="box">
            <div class="box-content">
                <ls-button @clickEvt="showConfirmDialog" name="显示弹出框"></ls-button>
            </div>
            <div class="box-tagger" ref="boxTagger" :style="[{'height': showContent ? 'auto' : '0'}]">
                <pre>
                    <p class="txt">js代码</p>
                    <pre>
                        this.$lensyn.confirmDialog.show({
                            msg: "好好学习，天天向上",
                            onClickConfirm: () => {
                                this.$lensyn.confirmDialog.hide();
                            },
                            onClickCancel: () => {
                                this.$lensyn.confirmDialog.hide();
                            }
                        });
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
        <span class="sub">使用参数类型说明</span>
        <ul class="grid">
            <li class="row" v-for="(item, index) in params" :key="index">
                <div v-for="(it, subKey) in item" :key="subKey" :class="[it.cls]" v-html="it.name"></div>
            </li>
        </ul>
        <span class="sub">方法说明</span>
        <ul class="grid tree-grid">
            <li class="row" v-for="(item, index) in methods" :key="index">
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
                params: [
                    [{name: "参数", cls: "col"}, {name: "说明", cls: "col mark"}, {name: "单位", cls: "col"}],
                    [{name: "msg", cls: "col"}, {name: "显示的消息", cls: "col mark"}, {name: "string", cls: "col"}],
                    [{name: "onClickCancel", cls: "col"}, {name: "点击取消的回调方法", cls: "col mark"}, {name: "string", cls: "col"}],
                    [{name: "onClickConfirm", cls: "col"}, {name: "点击确认的回调方法", cls: "col mark"}, {name: "string", cls: "col"}],
                    [{name: "isShowCancel", cls: "col"}, {name: "是否显示取消按钮", cls: "col mark"}, {name: "string", cls: "col"}],
                    [{name: "isShowConfirm", cls: "col"}, {name: "是否显示确认按钮", cls: "col mark"}, {name: "string", cls: "col"}]
                ],
                methods: [
                    [{name: "方法名", cls: "col"}, {name: "说明", cls: "col"}, {name: "参数", cls: "col"}],
                    [{name: "show", cls: "col"}, {name: "显示弹出框", cls: "col"}, {name: "无",cls: "col"}],
                    [{name: "hide", cls: "col"}, {name: "隐藏弹出框", cls: "col"}, {name: "无",cls: "col"}],
                ],
                nodeEvt: null
            }
        },
        watch: {},
        methods: {
            showConfirmDialog() {
                this.$lensyn.confirmDialog.show({
                    msg: "好好学习，天天向上",
                    onClickConfirm: () => {
                        this.$lensyn.confirmDialog.hide();
                    },
                    onClickCancel: () => {
                        this.$lensyn.confirmDialog.hide();
                    }
                });
            },

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