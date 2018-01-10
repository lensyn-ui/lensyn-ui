<template>
    <div class="second-screen">
        <div class="path-box">
            <svg viewBox="0 0 1000 1200" width="100%" height="100%">
                <clipPath id="landingClipTop1">
                    <rect ref="svgPath" :x="clipPos.x" :y="clipPos.y" width="1020" height="1200"></rect>
                </clipPath>
                <path ref="backSvgPath" fill="none" stroke="#dcdcdc" stroke-width="20" stroke-miterlimit="10" :d="svgPath"></path>
                <g style="clip-path: url(#landingClipTop1);">
					<path fill="none" stroke="#1296db" stroke-width="20" stroke-miterlimit="10" :d="svgPath"></path>
				</g>
            </svg>
        </div>
        <div class="img-box">
            <div class="img-box">
                <div class="box2">
                    <div class="layer"></div>
                </div>
                <div class="box1">
                    <div class="layer"></div>
                </div>
                <div class="box0">
                    <div class="layer"></div>
                </div>
                <div class="home-mobile-demo">
                    <span>&lt;ls-selection</span>
                    <span class="f22">&lt;ls-datagrid</span>
                    <span class="f16">&lt;ls-input</span>
                    <span>&lt;ls-message</span>
                    <span>&lt;ls-button</span>
                    <span class="f18">&lt;ls-XXXXX</span>
                    <span class="f22">&lt;...</span>
                </div>
            </div>
        </div>
        <div class="txt-box">
            <div class="box">
                <span class="title">Mobile 组件</span>
                <span class="desc">为移动前端开发者提供简单易用的Vue组件，减少开发者重复工作量</span>
                <router-link to="/mcomponent" class="view-btn">查看详情<i class="icon"></i></router-link>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        props: ["objProps"],
        data() {
            return {
                svgPath: "M0 0 L0 900 1000 900 1000 1200",
                clipPos: {x: 990, y: -1200},
                step: 10
            }
        },
        watch: {
            objProps(val) {
                let me = this;
                if(val.val === 3) {
                    if(val.direct === "down") {
                        me.clipPos = {x: -1010, y: -1200};
                        me.runPath();
                    }
                    if(val.direct === "up") {
                        me.clipPos = {x: 990, y: 1200};
                        me.runPathUp();
                    }
                }
            }
        },
        methods: {
            runPathUp() {
                let me = this;
                let len = me.$refs.backSvgPath.getTotalLength()+10;
                
                let counter = 0;
                let timer = setInterval(() => {
                    if(counter < 310) {
                        counter += me.step;
                        me.clipPos.y -= me.step;
                    } else if(counter >= 310 && counter < 1310) {
                        counter += me.step;
                        me.clipPos.x -= me.step;
                    } else if(counter >= 1310 && counter < 2200) {
                        counter += me.step;
                        me.clipPos.y -= me.step;
                    } else {
                        clearInterval(timer);
                        timer = null;
                    }
                });
            },
            runPath() {
                let me = this;
                let len = me.$refs.backSvgPath.getTotalLength()+10;
                
                let counter = 0;
                let timer = setInterval(() => {
                    if(counter < 910) {
                        counter += me.step;
                        me.clipPos.y += me.step;
                    } else if(counter >= 910 && counter < 1910) {
                        counter += me.step;
                        me.clipPos.x += me.step;
                    } else if(counter >= 1910 && counter < len - 10) {
                        counter += me.step;
                        me.clipPos.y += me.step;
                    } else {
                        clearInterval(timer);
                        timer = null;
                    }
                });
            }
        }
    }
</script>