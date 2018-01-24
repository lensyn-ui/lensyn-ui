/*********************************************************************
 * Created by deming-su on 2017/11/27                                *
 *********************************************************************/


<template>
    <div class="page-container active">
        <div class="empty-content">
            <h3>组件使用指南</h3>
            <span class="desc">使用依赖</span>
            <span class="desc">需要熟悉vue2.5+的基本使用<a href="https://cn.vuejs.org/">&nbsp;&nbsp;Vue使用手册&nbsp;&nbsp;</a></span>
            <span class="desc">需要了解和熟悉node7.6+的基本使用<a href="http://nodejs.cn/">&nbsp;&nbsp;Node使用手册&nbsp;&nbsp;</a></span>
            <span class="desc">需要了解和熟悉webpack 3的基本使用<a href="https://webpack.js.org/">&nbsp;&nbsp;Webpack使用手册&nbsp;&nbsp;</a></span>
            <h3>组件库下载</h3>
            <span class="desc">npm install lensyn-ui --save-dev</span>
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
            return {}
        },
        watch: {},
        methods: {},
        created() {
            let me = this;
        }
    }
</script>
