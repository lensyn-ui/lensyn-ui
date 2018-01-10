/*********************************************************************
 * Created by deming-su on 2017/11/28
 *********************************************************************/


<template>
    <div class="component-content">
        <span class="title">安装</span>
        <span class="sub">整个开发目录文件npm下载</span>
        <span class="desc">整个vue项目下载，已经集成webpack、gulp、以及正确的开发目录，组件npm安装正在开发中。</span>
        <div class="pre-box">
            <span>npm install lensyn-ui --save-dev</span>
            <span>或则：npm i lensyn-ui -D</span>
        </div>
        <span class="sub">开发模板及vue2.0+webpack开发环境下载</span>
        <span class="desc">跳转到资源页面进行模板下载<router-link to="/resource">资源下载</router-link></span>
    </div>
</template>
<style>

</style>
<script>
    import {mapGetters} from 'vuex'
    export default{
        computed: mapGetters({}),
        data() {
            return {}
        },
        watch: {},
        methods: {},
        created() {
            let me = this;
        }
    }
</script>
