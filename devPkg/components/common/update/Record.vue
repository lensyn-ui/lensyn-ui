/*********************************************************************
 * Created by deming-su on 2017/11/27                                *
 *********************************************************************/


<template>
    <div class="record-content">
        <span class="title">版本更新信息</span>
        <div class="box" v-for="item in versionList">
            <span class="title"><span>{{item.version}}</span><span class="date">{{item.date}}</span></span>
            <ul class="list">
                <li class="item" v-for="it in item.list">
                    <i class="icon"></i><span class="txt" v-html="it.desc"></span>
                </li>
            </ul>
        </div>
    </div>
</template>
<style>

</style>
<script>
    import {mapGetters} from 'vuex'
    export default{
        computed: mapGetters({
            versionList: "versionList"
        }),
        data() {
            return {}
        },
        watch: {
            versionList(val) {
                let me = this;
                me.$nextTick(() => {

                });
            }
        },
        created() {
            let me = this;
            me.$store.dispatch("getVersionData");
        }
    }
</script>
