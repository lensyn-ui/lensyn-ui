<template>
    <div class="introduce-main">
        <div class="box">
            <ls-pagination :total="80" :current="1" :display="10" @on-change="pageChange($event)"></ls-pagination>
        </div>
        <div class="box">
            <!--按钮绑定时间自己绑定就是了，这里就相当于只剥离了一个样式-->
            <!--disable默认false，size默认middle，type默认default，都可以不传-->
            <ls-button :text="'按钮'"
                       :size="'middle'"
                       :disable="false"></ls-button>
            <ls-button :text="'按钮'"
                       :size="'middle'"
                       :disable="true"></ls-button>
            <ls-button :text="'按钮'"
                       :size="'middle'"
                       :disable="false"
                       :type="'primary'"></ls-button>
            <ls-button :text="'按钮'"
                       :size="'middle'"
                       :disable="true"
                       :type="'primary'"></ls-button>
            <ls-button :text="'按钮'"
                       :size="'middle'"
                       :disable="false"
                       :type="'success'"></ls-button>
            <ls-button :text="'按钮'"
                       :size="'middle'"
                       :disable="true"
                       :type="'success'"></ls-button>
            <ls-button :text="'按钮'"
                       :size="'middle'"
                       :disable="false"
                       :type="'warning'"></ls-button>
            <ls-button :text="'按钮'"
                       :size="'middle'"
                       :disable="true"
                       :type="'warning'"></ls-button>
            <ls-button :text="'按钮'"
                       :size="'large'"
                       :disable="false"
                       :type="'error'" ></ls-button>
            <ls-button :text="'按钮'"
                       :disable="false"
                       :type="'error'" ></ls-button>
            <ls-button :text="'按钮'"
                       :size="'small'"
                       :disable="true"
                       :type="'error'"></ls-button>
        </div>
    </div>
</template>

<script>
    import {Component, Vue} from 'vue-property-decorator';

    /* 分页 */
    import pagination from '../../components/Pagination.vue';
    /* 按钮 */
    import button from '../../components/Button.vue';

    @Component({
        components: {
            'ls-pagination': pagination,
            'ls-button': button
        }
    })
    export default class HomeIndex extends Vue {
        /* 分页返回对象 */
        pageChange(e) {
            console.log(e);
        }
    };
</script>
