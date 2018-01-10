/*********************************************************************
* Created by deming-su on 2017/11/25                                   *
 *********************************************************************/


<template>
    <div class="nav-bar" :class="[{'fixed': isHome}]">
        <div class="box">
            <div class="brand" :class="[{'active': isComponent}]" @click="backHome"><div class="icon">
                <svg viewBox="0 0 1000 1000" width="100%" height="100%">
                    <path class="path1" :d="logPath" style="fill: white; stroke: #1296db; stroke-width: 50;"></path>
                </svg>
            </div>&nbsp;&nbsp;LensynUI</div>
        </div>
        <div class="search">
            <ls-selection class="box" v-show="isComponent" :objProps="menuList" @clickEvt="tempListClick"></ls-selection>
        </div>
        <div class="condition">
            <ls-selection v-show="isHome" :objProps="versionList" class="search"></ls-selection>
            <span v-for="item in blockList" class="item" :class="[{'active': item.checked}]" :now-id="item.id" @click="itemClickEvt">{{item.name}}</span>
            <span class="menu" @click="showList">
                <span class="item"></span>
                <span class="item"></span>
                <span class="item"></span>
            </span>
        </div>
    </div>
</template>
<style>

</style>
<script>
    import { WEB_CHILDREN, MOBILE_CHILDREN } from "../../router"
    import { mapGetters } from 'vuex'
    export default{
        computed: {
            ...mapGetters({
                componentList: "componentList"
            })
        },
        data() {
            return {
                logPath: "M150 400 L150 110 S100 10 50 110 L50 700 S50 850 850 850 L850 150 " +
                "S600 10 300 10 300 260 550 460 750 850 150 560",
                isHome: false,
                isComponent: false,
                isMComponent: false,
                menuList: {
                    name: '',
                    list: []
                },
                versionList: {
                    name: 'V0.0.26',
                    width: 80,
                    list: [
                        {id: "ID001", name: "V0.0.26", checked: true}
                    ]
                },
                blockList: [
                    {id: "ID001", name: "资源", path: "/resource", checked: false},
                    {id: "ID003", name: "M组件", path: "/mcomponent", checked: false, children: ["/mcomponent"]},
                    {id: "ID002", name: "组件", path: "/component", checked: false, children: [ "/component" ]},
                    {id: "ID004", name: "指南", path: "/guide", checked: false}
                ]
            }
        },
        watch: {
            "$route.path": function () {
                let me = this;
                me.$nextTick(() => {
                    me.resetNav();
                });
            },
            "componentList": function (val) {
                let me = this;
                me.$nextTick(() => {
                    me.menuList.list = [];
                    val.map(it => {
                        if(it.link) me.menuList.list.push(it);
                    });
                    me.resetNav();
                });
            }
        },
        methods: {
            backHome() {
                window.location.hash = '#/home';
                this.blockList.map(it => {
                    it.checked = false;
                });
            },
            itemClickEvt(evt) {
                let me = this;
                let id = evt.target.getAttribute("now-id");
                me.blockList.map(it => {
                    if(it.id === id) {
                        window.location.hash = '#' + it.path;
                        it.checked = true;
                    } else {
                        it.checked = false;
                    }
                });
            },
            resetNav() {
                let me = this;
                let path = me.$route.path;
                me.isHome = !(path === '/home');
                me.isComponent = false;
                me.isMComponent = false;
                me.blockList.map(it => {
                    it.checked = (path === it.path);
                    if(it.children) {
                        it.children.map(o => {
                            if(o === path) {
                                me.isComponent = it.path === "/component";
                                me.isMComponent = it.path === "/mcomponent";
                                it.checked = true;
                            }
                        })
                    }
                });
            },
            tempListClick(val) {
                if(val.link) window.location.hash = val.link;
            },
            showList() {
                this.$store.dispatch("collapseTree");
            }
        },
        created() {
            let me = this;
            let mpath = MOBILE_CHILDREN.map(it => it.path);
            let path = WEB_CHILDREN.map(it => it.path);
            me.blockList.map(item => {
                if(item.path === "/mcomponent") item.children = item.children.concat(mpath);
                if(item.path === "/component") item.children = item.children.concat(path);
            });
            me.$store.dispatch("getComponentData");
        }
    }
</script>
