<template>
    <div class="second-screen">
        <div class="path-box">
            <svg viewBox="0 0 1000 1200" width="100%" height="100%">
                <clipPath id="landingClipTop">
                    <rect ref="svgPath" :x="clipPos.x" :y="clipPos.y" width="1020" height="1200"></rect>
                    <rect ref="svgPath" :x="clipPos.xx" :y="clipPos.yy" width="1020" height="1200"></rect>
                </clipPath>
                <path ref="backSvgPath" fill="none" stroke="#dcdcdc" stroke-width="20" stroke-miterlimit="10" :d="svgPath"></path>
                <g style="clip-path: url(#landingClipTop);">
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
                <div class="home-guide-icon-box">
                    <div class="container">
                        <div class="face0"></div>
                        <div class="face1"></div>
                        <div class="face2"></div>
                        <div class="face3"></div>
                        <div class="face4"></div>
                        <div class="face5"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="txt-box">
            <div class="box">
                <span class="title">lensyn-ui 指南</span>
                <span class="desc">LensynUI 组件库的运行环境及组件库运用规则</span>
                <router-link to="/guide" class="view-btn">查看详情<i class="icon"></i></router-link>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        props: ["objProps"],
        data() {
            return {
                svgPath: "M490 0 L490 150 0 150 0 900 1000 900 1000 1200",
                clipPos: {x: 480, y: -1200, xx: -1030, yy: -490},
                step: 10
            }
        },
        watch: {
            objProps(val) {
                let me = this;
                if(val.val === 1) {
                    if(val.direct === "down") {
                        me.clipPos = {x: 480, y: -1200, xx: -1030, yy: -290};
                        me.runPath();
                    }
                    if(val.direct === "up") {
                        me.clipPos = {x: -1010, y: 910, xx: 990, yy: 1200};
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
                        me.clipPos.yy -= me.step;
                    } else if(counter >= 310 && counter < 1310) {
                        counter += me.step;
                        me.clipPos.xx -= me.step
                    } else if(counter >= 1310 && counter < 2080) {
                        counter += me.step;
                        me.clipPos.y -= me.step;
                    } else if(counter >= 2080 && counter < 2570) {
                        counter += me.step;
                        me.clipPos.x += me.step;
                    } else if(counter >= 2570 && counter < len + 10) {
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
                    if(counter < 160) {
                        counter += me.step;
                        me.clipPos.y += me.step;
                    } else if(counter >= 160 && counter < 650) {
                        counter += me.step;
                        me.clipPos.x -= me.step;
                    } else if(counter >= 650 && counter < 1380) {
                        counter += me.step;
                        me.clipPos.y += me.step;
                    } else if(counter >= 1380 && counter < 2400) {
                        counter += me.step;
                        me.clipPos.xx += me.step;
                    } else if(counter >= 2400 && counter < len) {
                        counter += me.step;
                        me.clipPos.yy += me.step;
                    } else {
                        clearInterval(timer);
                        timer = null;
                    }
                });
            }
        }
    }
</script>