/*********************************************************************
 * Created by deming-su on 2017/11/27                                *
 *********************************************************************/


<template>
    <div class="page-container active">
        <div class="empty-content">
            <h3>资源使用说明</h3>
            <span class="desc">安装lensyn-cli脚手架</span>
            <span class="desc">npm install -g lensyn-cli</span>
            <span class="desc">通过脚手架安装指定的资源开发包</span>
            <span class="desc">lensyn -i lensyn-empty（资源对应的开发库名）</span>
            <h3>WEB资源下载</h3>
            <span class="desc">提供专题模板下载</span>
            <div class="list">
                <div class="item" v-for="item in downloadList">
                    <div :class="[item.icon]"></div>
                    <div class="desc">
                        <span class="title"><span :now-id="item.id" @click="viewDetail">{{item.name}}</span><!--<a class="icon" :href="item.src" download="LensynUI.rar"></a>--></span>
                        <span class="sub">{{item.desc}}</span>
                    </div>
                </div>
            </div>
            <h3>MOBILE资源下载</h3>
            <span class="desc">提供mobile专题模板下载</span>
            <h3>大屏资源下载</h3>
            <span class="desc">提供大屏专题模板下载</span>
            <div class="list">
                <div class="item" v-for="item in downloadBigList">
                    <div :class="[item.icon]"></div>
                    <div class="desc">
                        <span class="title"><span :now-id="item.id" @click="viewBDetail">{{item.name}}</span><!--<a class="icon" :href="item.src" download="LensynUI.rar"></a>--></span>
                        <span class="sub">{{item.desc}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>

</style>
<script>
    import {mapGetters} from 'vuex'
    export default{
        computed: mapGetters({}),
        data() {
            return {
                downloadList: [
                    {id: "ID000", name: "轻应用主题模板", icon: "icon", desc: "单页面、单js入口应用（lensyn-empty）", link: "./standard/lensyn-empty/index.html"},
                    {id: "ID001", name: "中大型应用主题模板", icon: "icon0", desc: "单页面、页面异步加载应用（lensyn-asyn）", link: "./standard/lensyn-asyn/index.html#/home"},
                ],
                downloadBigList: [
                    {id: "ID000", name: "售电数据展示", icon: "icon1", desc: "售电数据展示（lensyn-bs001）", link: "./standard/bs001/home.html"},
                    {id: "ID002", name: "数据控制中心展示", icon: "icon2", desc: "数据控制中心展示（lensyn-bs002）", link: "./standard/bs002/index.html"},
                    {id: "ID003", name: "工业设备管理展示", icon: "icon3", desc: "工业设备管理展示（lensyn-bs003）", link: "./standard/bs003/index.html"},
                    {id: "ID004", name: "营销数据展示", icon: "icon4", desc: "营销数据展示（lensyn-bs004）", link: "./standard/bs004/index.html"}
                ]
            }
        },
        watch: {},
        methods: {
            viewDetail(evt) {
                let me = this;
                let id = evt.target.getAttribute("now-id");
                me.downloadList.map(it => {
                    if(it.id === id) {
                        window.open(it.link);
                    }
                })
            },
            viewBDetail(evt) {
                let me = this;
                let id = evt.target.getAttribute("now-id");
                me.downloadBigList.map(it => {
                    if(it.id === id) {
                        window.open(it.link);
                    }
                })
            }
        },
        created() {
            let me = this;
        }
    }
</script>
