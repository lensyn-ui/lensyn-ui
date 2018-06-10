<template>
    <div class="home-main">
        <div class="main-item">
            <First></First>
        </div>
        <div class="main-item">
            <Second></Second>
        </div>
        <div class="main-item">
            <Third></Third>
        </div>
        <div class="main-item">
            <Fourth></Fourth>
        </div>
    </div>
</template>

<script>
    import {Component, Vue} from 'vue-property-decorator';
    import First from './child/first.vue';
    import Second from './child/second.vue';
    import Third from './child/third.vue';
    import Fourth from './child/fourth.vue';

    @Component({
        components: {
            First,
            Second,
            Third,
            Fourth
        }
    })
    export default class HomeIndex extends Vue {
        mounted() {
            let that = this;
            that.$nextTick(() => {
                that.setHeight();
                window.onresize = () => {
                    that.setHeight();
                };
            });
        }

        /* 设定高度 */
        setHeight() {
            let itemHeight = document.body.offsetHeight;  //取得窗口高度
            let itemArr = this.getClass('main-item');
            itemArr.forEach((item) => {  //设定高度，每屏最小500px
                if (itemHeight < 500) {
                    itemHeight = 500;
                }
                item.setAttribute('style', `height: ${itemHeight}px;`);
            });
        }

        /* 获取class */
        getClass(className) {
            let all = document.getElementsByTagName('*');
            let dom = [];
            for (let i = 0; i < all.length; i++) {
                if (all[i].className === className) {
                    dom.push(all[i]);
                }
            }
            return dom;
        }
    };
</script>
