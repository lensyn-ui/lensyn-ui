<template>
    <div class="home-first-container">
        <video ref='videoNode' class="video-js" loop preload="auto" style="object-fit:fill;width: 100%;">
            <source src="/static/video/login.mp4" type='video/mp4'>
        </video>
        <div class="logo">
            <div class="brand">
                <div class="icon">
                    <svg viewBox="0 0 1000 1000" width="100%" height="100%">
                        <path class="path1" :d="logPath" style="fill: none; stroke: #1296db; stroke-width: 20;"></path>
                    </svg>
                </div>
                <span class="title">LensynUI</span>
                <span class="desc">一款基于Vue2.0的简洁组件库</span>
            </div>
        </div>
        <div class="first-menu">
            <div class="menu-box" @click="toggleMenu" :class="[{'active': menuShow}]">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div class="menu-list" v-if="menuShow" :style="{height: listHeight}">
                <svg width=100% height=100%>
                    <g style="fill: none; stroke: rgba(53, 195, 230, 0.432);" :style="[{strokeWidth: menuStrokeWidth}]">
                        <path class="menu-path" :d="menuPath"
                              style="strokeDasharray: 5000; strokeDashoffset: 0;"
                              ref='mPath' :class="[{active: menuShow}]">
                        </path>
                    </g>                 
                </svg>
                <div class="menu-span">
                    <router-link v-for="(item,i) in menuList" :to="item.path" :key="'key'+i">{{item.name}}</router-link>
                </div>                   
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        data() {
            return {
                videoWidth: "",
                listHeight: "",
                menuList: [
                    {name: "指南", path: "/guide"},
                    {name: "组件", path: "/component"},
                    {name: "M组件", path: "/mcomponent"},
                    {name: "资源", path: "/resource"}
                    ],
                menuPath: '',
                menuStrokeWidth: "140",
                testPath: "M380,0 L0,0 v300 h380 V270 H60 V240 H380 V210 H60 V180 H380 V150 H60 V120 H380 V90 H60 V60 H380 V30 H60",
                logPath: "M150 400 L150 110 S100 10 50 110 L50 700 S50 850 850 850 L850 150 " +
                "S600 10 300 10 300 260 550 460 750 850 150 560",
                descList: [
                    {id: "ID001", icon: "icon", title: "指南", desc: "LensynUI 组件库的运行环境及组件库运用规则", path: "guide"},
                    {id: "ID002", icon: "icon0", title: "组件", desc: "为前端开发者提供简单易用的Vue组件，减少开发者重复工作量", path: "component"},
                    {id: "ID003", icon: "icon2", title: "M组件", desc: "为移动前端开发者提供简单易用的Vue组件，减少开发者重复工作量", path: "mcomponent"},
                    {id: "ID004", icon: "icon1", title: "资源", desc: "提供开发所需要的前端资源以及简单模板源码", path: "resource"}
                ],
                menuShow: false
            }
        },
        methods: {
            toggleMenu() {
                let me = this;
                me.menuShow = !me.menuShow;
            }
        },
        created() {
            let me = this;
            let menuStrokeWidth = Number.parseInt(this.menuStrokeWidth);
            this.listHeight = document.body.offsetHeight + 'px';
            let firstStr = `M380,0 L0,0 v${Number.parseInt(this.listHeight)} h380`;
            let repeatNumber = Number.parseInt(Number.parseInt(this.listHeight) / menuStrokeWidth);
            let height = Number.parseInt(this.listHeight);
            for (let i = 0; i <= repeatNumber; i++) {
                height -= menuStrokeWidth;
                if (i % 2 === 0) {
                    let newStr = `V${height} H60`;
                    firstStr+=` ${newStr}`;
                }else {
                    let newStr = `V${height} H380`;
                    firstStr+=` ${newStr}`;
                }
            }
            this.menuPath = firstStr;
        },
        mounted() {
            let me = this;
            me.$nextTick(() => {
                videojs(me.$refs.videoNode, {
                    "autoplay": true,
                    "loop": true,
                    "isFullscreen": true    
                });
            });
        }
    }
</script>
