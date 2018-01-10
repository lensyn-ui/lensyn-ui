/*********************************************************************
* Created by deming-su on 2017/11/28                                   *
 *********************************************************************/


<template>
    <div class="component-content" ref="containerNode">
        <span class="title">Button 组件</span>
        <span class="desc">页面按钮组件，提供单独及按钮组，图片按钮只提供激活状态的图片按钮</span>
        <span class="sub">Button 使用方法</span>
        <span class="desc">页面点击事件支持回调，支持四种类型的图片按钮</span>
        <div id="basicLayout" class="box">
            <div class="box-content">
                <span style="display: block; margin: 15px; font-size: 14px; color: #333;">四类不同主题按钮</span>
                <ls-button :objProps="btnObj" name="主题激活按钮"></ls-button>
                <ls-button></ls-button>
                <ls-button :objProps="btnDObj"></ls-button>
                <ls-button :objProps="btnDDObj"></ls-button>
                <div style="margin: 20px;"></div>
                <span style="display: block; margin: 15px; font-size: 14px; color: #333;">直角按钮组</span>
                <ls-button name="Left|Center|Right"></ls-button>
                <div style="margin: 20px;"></div>
                <span style="display: block; margin: 15px; font-size: 14px; color: #333;">圆角按钮组及点击事件</span>
                <ls-button :objProps="btnRObj" @clickEvt="groupBtnEvt" name="Left|Center|Right"></ls-button>
                <span style="display: block; margin: 15px; font-size: 14px; color: rgb(18, 150, 219);">当前点击的按钮是：{{gourpEvtVal}}</span>
                <div style="margin: 20px;"></div>
                <span style="display: block; margin: 15px; font-size: 14px; color: #333;">四类不同主题图标按钮</span>
                <ls-button :objProps="btnIObj" name="Icon Button"></ls-button>
                <ls-button :objProps="btnISObj" name="Icon Button"></ls-button>
                <ls-button :objProps="btnITObj" name="Icon Button"></ls-button>
                <ls-button :objProps="btnIDObj" name="Icon Button"></ls-button>
            </div>
            <div class="box-tagger" ref="boxTagger" :style="[{'height': showContent ? 'auto' : '0'}]">
                <pre>
                    <p class="txt">简单‘确认’按钮</p>
                    &lt;ls-button&gt;&lt;/ls-button&gt;
                    <p class="txt">页面激活类型按钮，且自定义按钮名字</p>
                    &lt;ls-button :objProps="btnObj" name="主题激活按钮"&gt;&lt;/ls-button&gt;
                    <p class="txt">图标按钮，默认为‘edit’类型</p>
                    &lt;ls-button :objProps="btnIObj" name="Icon Button"&gt;&lt;/ls-button&gt;
                    <p class="txt">按钮组及事件绑定</p>
                    &lt;ls-button :objProps="btnRObj" @clickEvt="groupBtnEvt" name="Left|Center|Right"&gt;&lt;/ls-button&gt;
                    <p class="txt">页面数据</p>
                    data() {
                        return {
                            gourpEvtVal: '',
                            btnObj: {
                                type: "primary"
                            },
                            btnIObj: {
                                type: 'icon',
                                icon: "edit",
                                radius: true
                            },
                            btnRObj: {
                                radius: true
                            }
                        }
                    }
                    <p class="txt">页面方法</p>
                    methods: {
                        groupBtnEvt(val) {
                            this.gourpEvtVal = val;
                        }
                    }
                </pre>
            </div>
            <div class="fixed-footer">
                <div class="box-footer" @click="footerEvt" ref="boxFooter">
                    <i class="box-footer-icon" :class="[{'active': showContent}]"></i><span>{{showContent ? "隐藏代码" : "显示代码"}}</span>
                    <button type="button" class="box-footer-btn" tabindex="0" :style="[{'opacity': showContent ? 1 : 0}]">
                        <!--<span>在线运行</span>-->
                    </button>
                </div>
            </div>
        </div>
        <span class="sub">使用参数类型说明</span>
        <ul class="grid">
            <li class="row" v-for="item in params">
                <div v-for="it in item" :class="[it.cls]" v-html="it.name"></div>
            </li>
        </ul>
    </div>
</template>
<script>
    export default{
        data() {
            return {
                gourpEvtVal: '',
                btnObj: {
                    type: "primary"
                },
                btnDObj: {
                    type: "dashed"
                },
                btnDDObj: {
                    type: "danger"
                },
                btnRObj: {
                    radius: true
                },
                btnIObj: {
                    type: 'icon',
                    radius: true
                },
                btnIObj: {
                    type: 'icon',
                    icon: "edit",
                    radius: true
                },
                btnISObj: {
                    type: 'icon',
                    icon: "save",
                    radius: true
                },
                btnITObj: {
                    type: 'icon',
                    icon: "delete",
                    radius: true
                },
                btnIDObj: {
                    type: 'icon',
                    icon: "download",
                    radius: true
                },
                showContent: false,
                params: [
                    [{name: "参数", cls: "col"}, {name: "说明", cls: "col mark"}, {name: "单位", cls: "col"}],
                    [{name: "name", cls: "col"}, {name: "列属性‘name’值，按钮显示文字，按钮组用‘|’隔开，默认‘确定’", cls: "col mark"}, {name: "string", cls: "col"}],
                    [{name: "objProps", cls: "col"}, {name: "按钮属性对象", cls: "col mark"}, {name: "string", cls: "col"}],
                    [{name: "radius", cls: "col"}, {name: "是否为圆角，默认‘false’直角按钮", cls: "col mark"}, {name: "boolean", cls: "col"}],
                    [{name: "type", cls: "col"}, {name: "type为：‘primary’、‘default’、‘dashed’、‘danger’、‘icon’，默认为‘default’", cls: "col mark"}, {name: "string", cls: "col"}],
                    [{name: "icon", cls: "col"}, {name: "当type为icon时，按钮类型默认为primary，icon有edit、save、delete、download（默认：edit）", cls: "col mark"}, {name: "string", cls: "col"}]
                ]
            }
        },
        watch: {},
        methods: {
            footerEvt(){
                let that = this;
                that.showContent = !that.showContent;
            },
            groupBtnEvt(val) {
                this.gourpEvtVal = val;
            }
        },
        mounted() {
            let that = this;
            that.$nextTick(() => {
                let boxFooter = that.$refs.boxFooter;
                /* 查找父类元素注册滚动事件 */
                let scrollNode = that.$refs.containerNode.parentNode;
                scrollNode.addEventListener('scroll', function () {
                    /* 页面滚动距离（页面滚动顶部高度+页面滚动区域可视高度） */
                    let scrollTop = scrollNode.scrollTop + scrollNode.offsetHeight;
                    /* 获取当前需要定位元素的状态 */
                    let boxFooterClass = boxFooter.className;
                    let state = boxFooterClass.endsWith(' fixedBottom');
                    /* 获取页面需要定位的元素 */
                    let node = document.getElementById("basicLayout");
                    /**
                     * 根据页面滚动距离，判断元素是否在浮动区间
                     * 区间计算方法为：页面滚动距离是否大于浮动元素中的固定内容高度和距顶部距离；是否小于浮动元素整体高度和距顶部距离；
                     */
                    let startY = node.offsetTop + node.querySelector("div.box-content").offsetHeight - scrollTop;
                    let endY = node.offsetTop + node.offsetHeight - scrollTop;
                    /* 当滚动元素位置在固定内容以下，浮动元素位置以上是浮动块（并且一定是要展开内容时才浮动） */
                    if(that.showContent && endY >= 0 && startY <= 0){
                        /* 在元素浮动区间内，没有浮动块，需要浮动元素 */
                        if (!state) {
                            /* 设置页面浮动元素宽度 */
                            boxFooter.style.width = boxFooter.getBoundingClientRect().width + 'px';
                            boxFooter.className += ' fixedBottom';
                        }
                    }else {
                        /* 如果存在浮动需要清除浮动元素的值 */
                        if(state) boxFooter.className = boxFooterClass.replace(' fixedBottom', '');
                    }
                });
            })
        },
        created() {}
    }
</script>
