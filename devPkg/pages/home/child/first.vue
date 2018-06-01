<template>
    <div class="first-main">
        <div id="particles"></div>
        <div class="logo">
            <div class="icon">
                <svg id="logo" viewBox="0 0 1000 1000" width="100%" height="100%">
                    <path :d="logPath" style="fill: none; stroke: #ffffff; stroke-width: 20;"></path>
                </svg>
            </div>
            <div class="title">
                <span id="titleCanvas" class="title-canvas">LensynUI</span>
                <span class="text">LensynUI</span>
                <span class="desc">一款基于Vue2.0的简洁组件库</span>
            </div>
        </div>
    </div>
</template>

<script>
    import {Component, Vue} from 'vue-property-decorator';
    import Anime from '../../lib/anime.min.js';
    import Particles from '../../lib/particles.js';
    import Bubble from '../../lib/bubble.js';
    import Vivus from '../../lib/vivus.min.js';
    import Json from './particles.json';

    @Component
    export default class HomeIndex extends Vue {
        data() {
            return {
                logPath: 'M150 400 L150 110 S100 10 50 110 L50 700 S50 850 850 850 L850 150 S600 10 300 10 300 260 550 460 750 850 150 560'
            }
        }

        mounted() {
            setTimeout(() => {
                this.$nextTick(() => {
                    particlesJS.load('particles', Json);
                    new Vivus('logo', {duration: 100});
                    this.BubbleFun();
                });
            }, 100);
        }

        BubbleFun() {
            (function () {
                const arrOpts = {
                    type: 'rectangle',
                    style: 'stroke',
                    size: 12,
                    color: '#ffffff',
                    duration: 800,
                    easing: [0.2, 1, 0.7, 1],
                    oscillationCoefficient: 5,
                    particlesAmountCoefficient: 0.7,
                    direction: 'left'
                };
                const bttn = document.getElementById('titleCanvas');
                let particlesOpts = arrOpts;
                const particles = new Bubble(bttn, particlesOpts);
                let buttonVisible = true;
                if (!particles.isAnimating() && buttonVisible) {
                    particles.disintegrate();
                    buttonVisible = !buttonVisible;
                }
            })();
        }
    };
</script>
