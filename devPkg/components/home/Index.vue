<template>
    <div class="page-container home-container-box">
        <div ref="homePage" class="home-page full">
            <div class="home-box-item">
                <first :objProps="objProps"></first>
            </div>
            <div class="home-box home-box-item">
                <second :objProps="objProps"></second>
            </div>
            <div class="home-box home-box-item">
                <third :objProps="objProps"></third>
            </div>
            <div class="home-box home-box-item">
                <fourth :objProps="objProps"></fourth>
            </div>
            <div class="home-box home-box-item">
                <fifth :objProps="objProps"></fifth>
            </div>
        </div>
    </div>
</template>
<script>
    import first from './index/first.vue';
    import second from './index/second.vue';
    import third from './index/third.vue';
    import fourth from './index/fourth.vue';
    import fifth from './index/fifth.vue';
    export default{
        components: { first, second, third, fourth, fifth },
        data() {
            return {
                isScroll: false,
                scrollCount: 0,
                objProps: {val: 0, direct: "down"}
            }
        },
        methods: {
            scrollEvt(direct) {
                let me = this;
                me.scrollCount = direct > 0 ? ++me.scrollCount : --me.scrollCount;
                me.scrollCount = me.scrollCount < 0 ? 0 : me.scrollCount > 4 ? 4 : me.scrollCount;
                let screenHei = document.body.offsetHeight;
                me.$refs.homePage.setAttribute('style', `top: -${screenHei*me.scrollCount}px;`);
                setTimeout(() => {
                    me.isScroll = false;
                    me.objProps = {val: me.scrollCount, direct: direct > 0 ? "down" : "up"};
                }, 200);
            }
        },
        mounted() {
            let me = this;
            me.$nextTick(() => {
                let node = me.$refs.homePage;
                let screenHei = document.body.offsetHeight;

                node.setAttribute('style', `height: ${screenHei*5}px;`);
                let nodes = node.querySelectorAll('.home-box-item');
                for(let i = 0;i < nodes.length;i ++) {
                    let it = nodes[i];
                    it.setAttribute('style', `height: ${screenHei}px;`);
                }
                let wheelName = navigator.userAgent.includes('Firefox') ? "DOMMouseScroll" : "mousewheel";
                node.addEventListener(wheelName, function(evt) {
                    if(!me.isScroll) {
                        me.isScroll = true;
                        me.scrollEvt(navigator.userAgent.includes('Firefox') ? evt.detail : evt.deltaY);
                    }
                });
            });
        },
        created() {

        }
    }
</script>
