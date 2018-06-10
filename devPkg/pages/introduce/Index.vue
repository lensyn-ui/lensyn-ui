<template>
    <div class="introduce-main">
        <div class="box">
            <ls-pagination :total="80" :current="1" :display="10" @on-change="pageChange($event)"></ls-pagination>
        </div>
    </div>
</template>

<script>
    import {Component, Vue} from 'vue-property-decorator';

    /* 分页 */
    import pagination from '../../components/Pagination.vue';

    @Component({
        components: {
            'ls-pagination': pagination
        }
    })
    export default class HomeIndex extends Vue {
        pageChange(e) {
            console.log(e);
        }
    };
</script>
