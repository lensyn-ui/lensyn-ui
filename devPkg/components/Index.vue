<template>
    <div class="main-container" :class="[{'active': isHome}]">
        <navBar v-if="navBarShow"></navBar>
        <!-- 内容 --start-- -->
        <router-view></router-view>
        <!-- 内容 --end-- -->
    </div>
</template>
<script>
    import navBar from './common/Navigator.vue'
    export default{
        components: {navBar},
        data() {
            return {
                isHome: false,
                navBarShow: false
            }
        },
        watch: {
            "$route.path": function (val) {
                let me = this;
                me.$nextTick(() => {
                    me.navBarShow = me.isHome = !(val === '/home');
                });
            }
        },
        created() {
            let me = this;
            me.navBarShow = me.isHome = !(me.$route.path === '/home');
        }
    }
</script>