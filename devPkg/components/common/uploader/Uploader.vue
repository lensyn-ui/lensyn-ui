/*********************************************************************
* Created by tr on 2017/12/12.                                       *
*********************************************************************/
<template>
    <div class="component-content" ref="containerNode">
        <span class="title">上传组件</span>
        <span class="desc">用于向服务器上传文件</span>
        <span class="sub">基本用法</span>
        <span class="desc">基础上传展示</span>
        <div id="basicLayout" class="box">
            <div class="box-content">
                <ls-uploader></ls-uploader>
            </div>
            <div class="box-tagger" ref="boxTagger" :style="[{'height': showContent ? 'auto' : '0'}]">
                <pre>
                    <p class="txt">vue 页面</p>
                    &lt;ls-uploader &gt;&lt;/ls-uploader&gt;
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
        <span class="sub">事件说明</span>
        <ul class="grid tree-grid">
            <li class="row" v-for="(item, index) in event" :key="index">
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
                    [{name: "uploadLabel", cls: "col"}, {name: "按钮显示的名字", cls: "col mark"}, {name: "string", cls: "col"}],
                    [{name: "uploadUrl", cls: "col"}, {name: "上传的地址", cls: "col mark"}, {name: "string", cls: "col"}],
                    [{name: "fileKey", cls: "col"}, {name: "上传时，文件所在数据字段名", cls: "col mark"}, {name: "string", cls: "col"}],
                    [{name: "accept", cls: "col"}, {name: "文件接收的类型，即 input 的 accept", cls: "col mark"}, {name: "string", cls: "col"}],
                    [{name: "multiple", cls: "col"}, {name: "是否允许上传多个", cls: "col mark"}, {name: "string", cls: "col"}],
                    [{name: "isSlice", cls: "col"}, {name: "是否分片上传", cls: "col mark"}, {name: "boolean", cls: "col"}],
                    [{name: "sliceSize", cls: "col"}, {name: "分片的大小", cls: "col mark"}, {name: "number", cls: "col"}],
                    [{name: "isAutoUpload", cls: "col"}, {name: "是否自动上传", cls: "col mark"}, {name: "boolean", cls: "col"}],
                    [{name: "isUploadSuccess", cls: "col"}, {name: "判断是否上传成功", cls: "col mark"}, {name: "function", cls: "col"}]
                ],
                methods: [
                    [{name: "方法名", cls: "col"}, {name: "说明", cls: "col"}, {name: "参数", cls: "col"}],
                    [{name: "startUploader", cls: "col"}, {name: "启动上传", cls: "col"}, {name: "无",cls: "col"}],
                    [{name: "haveActiveUpload", cls: "col"}, {name: "判断是否有文件在上传或等待上传", cls: "col"}, {name: "无",cls: "col"}],
                    [{name: "clearUpload", cls: "col"}, {name: "清空上传", cls: "col"}, {name: "无",cls: "col"}],
                    [{name: "showFileSelector", cls: "col"}, {name: "显示上传文件选择框", cls: "col"}, {name: "无",cls: "col"}],
                    [{name: "cancelUpload", cls: "col"}, {name: "取消某个文件的上传", cls: "col"}, {name: "上传的 id",cls: "col"}],
                    [{name: "toggleUpload", cls: "col"}, {name: "切换某个文件上传的状态，为暂停或继续", cls: "col"}, {name: "上传的 id",cls: "col"}]                    
                ],
                event:[
                    [{name: "事件", cls: "col"}, {name: "说明", cls: "col"}],
                    [{name: "upload", cls: "col"}, {name: "上传的事件", cls: "col"}]
                ],
                nodeEvt: null
            }
        },
        watch: {},
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