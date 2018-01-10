/*********************************************************************
* Created by deming-su on 2017/11/28
 *********************************************************************/


<template>
    <div class="component-content" ref="containerNode">
        <span class="title">主题色彩</span>
        <span class="desc">基础样式支持样式重写（后续推出自定义主题颜色，敬请期待）</span>
        <div class="color-box" v-for="item in list">
            <span class="sub">{{item.title}}</span>
            <span class="desc" v-if="item.txt">{{item.txt}}</span>
            <div class="layout-row line">
                <div class="col-color" v-for="it in item.list">
                    <span class="box" :style="[{'background-color': it.sub}]">
                        <span class="title">{{it.title}}</span>
                        <span class="sub">{{it.sub.toUpperCase()}}</span>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

    export default{

        data() {
            return {
                list: [
                    {title: "主题色", txt: "常用于激活状态颜色，以及主题色调", list: [
                        {title: "Primary", sub: "#407dd1"}
                    ]},
                    {title: "辅助色", txt: "常用于用户交互信息反馈或对用户操作进行色彩解释", list: [
                        {title: "辅助色01", sub: "#27518d"},
                        {title: "辅助色02", sub: "#333743"},
                        {title: "辅助色03", sub: "#f5f6fa"},
                        {title: "辅助色04", sub: "#2d8d46"},
                        {title: "辅助色05", sub: "#d93b25"}
                    ]},
                    {title: "主要字体色", list: [
                        {title: "连接、提示", sub: "#407dd1"},
                        {title: "文本、列表信息", sub: "#333"},
                        {title: "顶部栏、一级侧栏", sub: "#fffff"},
                        {title: "标题、辅助信息", sub: "#999"},
                        {title: "成功、安全", sub: "#2d8d46"},
                        {title: "禁止、危险", sub: "#d93b25"}
                    ]},
                    {title: "背景色", list: [
                        {title: "顶部栏，基层色", sub: "#27518d"},
                        {title: "一级侧栏", sub: "#333743"},
                        {title: "应用栏背景色", sub: "#41485b"},
                        {title: "功能背景色", sub: "#e2e7ed"},
                        {title: "表头背景色", sub: "#2d8d46"},
                        {title: "内容区背景色", sub: "#f5f6fa"}
                    ]},
                    {title: "按钮色", list: [
                        {title: "默认状态", sub: "#407dd1"},
                        {title: "选择状态", sub: "#62a5ff"},
                        {title: "点击状态", sub: "#62a5ff"},
                        {title: "不可点击状态", sub: "#999999"}
                    ]},
                    {title: "其它色", list: [
                        {title: "边框", sub: "#dcdcdc"}
                    ]}
                ]
            }
        },
        watch: {},
        methods: {},
        created() {}
    }
</script>
