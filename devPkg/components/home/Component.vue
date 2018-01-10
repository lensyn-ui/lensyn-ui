/*********************************************************************
* Created by deming-su on 2017/11/27                                   *
 *********************************************************************/


<template>
    <div class="page-container active">
        <div class="component-box">
            <div class="left" ref="leftBoxNode">
                <ul class="list">
                    <li class="item" v-for="item in menuList">
                        <span :now-id="item.id" :has-evt="item.hasEvt" :class="[item.cls, {'active': item.checked}]" @click="clickEvt">{{item.name}}</span>
                    </li>
                </ul>
            </div>
            <div class="right">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<style>

</style>
<script>
    import { mapGetters } from 'vuex'
    export default{
        computed: {
            ...mapGetters({
                componentList: "componentList",
                leftTreeShow: "leftTreeShow"
            })
        },
        data() {
            return {
                menuList: []
            }
        },
        watch: {
            "componentList": function (val) {
                let me = this;
                me.$nextTick(() => {
                    me.menuList = val;
                });
            },
            "leftTreeShow": function(val) {
                let me = this;
                me.$nextTick(() => {
                    let winWidth = document.body.clientWidth;
                    if(winWidth < 961) {
                        me.$refs.leftBoxNode.style.display = val ? "block" : "none";
                    }
                });
            }
        },
        methods: {
            clickEvt(evt) {
                let me = this;
                let id = evt.target.getAttribute("now-id");
                let hasEvt = evt.target.getAttribute("has-evt");
                if(hasEvt === "Y") {
                    me.$store.dispatch("collapseTree");
                    me.menuList.map(it => {
                        it.checked = it.id === id;
                        if(it.checked) window.location.hash = it.link;
                    });
                }
            }
        },
        created() {
            let me = this;
            me.$store.dispatch("getComponentData");
        }
    }
</script>
