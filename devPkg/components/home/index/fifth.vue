<template>
    <div class="second-screen">
        <div class="path-box">
            <svg viewBox="0 0 1000 1200" width="100%" height="100%">
                <clipPath id="landingClipTop2">
                    <rect ref="svgPath" :x="clipPos.x" :y="clipPos.y" width="1020" height="1200"></rect>
                </clipPath>
                <path ref="backSvgPath" fill="none" stroke="#dcdcdc" stroke-width="20" stroke-miterlimit="10" :d="svgPath"></path>
                <g style="clip-path: url(#landingClipTop2);">
					<path fill="none" stroke="#1296db" stroke-width="20" stroke-miterlimit="10" :d="svgPath"></path>
				</g>
            </svg>
        </div>
        <div class="txt-box">
            <div class="box">
                <span class="title">开发库资源</span>
                <span class="desc">提供开发所需要的前端资源以及简单模板源码</span>
                <router-link to="/resource" class="view-btn">查看详情<i class="icon"></i></router-link>
            </div>
        </div>
        <div class="img-box">
            <div class="img-box" style="left: 0; margin: 0;">
                <div class="home-source-icon">
                    <div class="box">
                        <div class="web"></div>
                        <div class="mobile"></div>
                        <div class="bs"></div>
                        <div class="desk"></div>
                        <div class="other"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        props: ["objProps"],
        data() {
            return {
                svgPath: "M1000 0 L1000 900 0 900 0 1200",
                clipPos: {x: 990, y: -1200},
                step: 10
            }
        },
        watch: {
            objProps(val) {
                let me = this;
                if(val.val === 4) {
                    if(val.direct === "down") {
                        me.clipPos = {x: 990, y: -1200};
                        me.runPath();
                    }
                    if(val.direct === "up") {
                        me.clipPos = {x: -1000, y: 1200};
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
                    } else if(counter >= 310 && counter < 1300) {
                        counter += me.step;
                        me.clipPos.x += me.step;
                    } else if(counter >= 1300 && counter < len - 20) {
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
                        me.clipPos.x -= me.step;
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