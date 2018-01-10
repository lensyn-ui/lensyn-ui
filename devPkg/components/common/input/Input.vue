/*********************************************************************
 * Created by deming-su on 2017/11/28                                *
 *********************************************************************/

<template>
    <div class="component-content" ref="containerNode">
        <span class="title">Input 组件</span>
        <span class="desc">输入框组件，提供输入值</span>
        <span class="sub">Input 使用方法</span>
        <span class="desc">当回调事件返回的type为‘click’时，val的值：‘prefix’为前置按钮点击事件，‘suffix’为后置按钮点击事件，‘clear’为清空点击事件</span>
        <div id="basicLayout" class="box">
            <div class="box-content">
                <span style="display: block; margin: 15px; font-size: 14px; color: #333;">普通输入框</span>
                <div class="input-temp-box">
                    <ls-input></ls-input>
                </div>
                <div class="input-temp-box">
                    <ls-input :objProps="iptObj"></ls-input>
                </div>
                <div class="input-temp-box">
                    <ls-input :objProps="iptSObj"></ls-input>
                </div>
                <span style="display: block; margin: 15px; font-size: 14px; color: #333;">字符标准输入框</span>
                <div class="input-temp-box">
                    <ls-input :objProps="iptTLObj"></ls-input>
                </div>
                <div class="input-temp-box">
                    <ls-input :objProps="iptTRObj"></ls-input>
                </div>
                <div class="input-temp-box">
                    <ls-input :objProps="iptTBObj"></ls-input>
                </div>
                <span style="display: block; margin: 15px; font-size: 14px; color: #333;">字符标准输入框</span>
                <div class="input-temp-box">
                    <ls-input :objProps="iptILObj" @compEvt="compEvt"></ls-input>
                </div>
                <div class="input-temp-box">
                    <ls-input :objProps="iptIRObj"></ls-input>
                </div>
                <div class="input-temp-box">
                    <ls-input :objProps="iptIBObj"></ls-input>
                </div>
                <span style="display: block; margin: 15px; font-size: 14px; color: rgb(18, 150, 219);">当前点击的按钮是：{{inputRetVal}}</span>
            </div>
            <div class="box-tagger" ref="boxTagger" :style="[{'height': showContent ? 'auto' : '0'}]">
                <pre>
                    <p class="txt">简单输入框</p>
                    &lt;ls-input&gt;&lt;/ls-input&gt;
                    <p class="txt">带文字描述的输入框</p>
                    &lt;ls-input :objProps="iptTBObj"&gt;&lt;/ls-input&gt;
                    <p class="txt">数据对象：（其中的lefttxt和righttxt为需要显示在文本描述中的文字内容）</p>
                    data() {
                        return {
                            iptIBObj: {
                                placeholder: "两边图标",
                                lefttxt: "prefix",
                                righttxt: "suffix",
                                radius: true,
                                shadow: true
                            }
                        }
                    }
                    <p class="txt">带图标的输入框</p>
                    &lt;ls-input :objProps="iptIBObj" @compEvt="compEvt"&gt;&lt;/ls-input&gt;
                    <p class="txt">数据对象：（其中的prefix和suffix为样式名字，且样式重写的是before伪元素）</p>
                    data() {
                        return {
                            iptIBObj: {
                                placeholder: "两边图标",
                                prefix: "search",
                                suffix: "search",
                                radius: true,
                                shadow: true
                            }
                        }
                    }
                    <p class="txt">输入值及点击图标和输入框事件监听方法：</p>
                    methods: {
                        compEvt(val) {
                            if(val.id === "ID0001") {
                                this.inputRetVal = val.type === "enter" ? "Enter key Evt" : val.val;
                            }
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
                iptObj: {
                    value: "不可输入框",
                    type: 'disabled',
                    radius: true
                },
                iptSObj: {
                    placeholder: "带阴影圆角输入框",
                    radius: true,
                    shadow: true
                },
                iptTLObj: {
                    placeholder: "左边输入框",
                    lefttxt: "prefix",
                    txt: "txt"
                },
                iptTRObj: {
                    placeholder: "右边字符输入框",
                    type: "primary",
                    radius: true,
                    righttxt: "suffix"
                },
                iptTBObj: {
                    placeholder: "两边都有字符输入框",
                    lefttxt: "prefix",
                    righttxt: "suffix",
                    radius: true,
                    shadow: true
                },
                iptILObj: {
                    id: "ID0001",
                    clear: true,
                    placeholder: "左边图标",
                    radius: true,
                    prefix: "search",
                    txt: "txt",
                    value: "默认图标"
                },
                iptIRObj: {
                    placeholder: "右边图标",
                    suffix: "search"
                },
                iptIBObj: {
                    placeholder: "两边图标",
                    prefix: "search",
                    suffix: "search",
                    radius: true,
                    shadow: true
                },
                showContent: false,
                params: [
                    [{name: "参数", cls: "col"}, {name: "说明", cls: "col mark"}, {name: "单位", cls: "col"}],
                    [{name: "type", cls: "col"}, {name: "disabled、primary，默认为‘default’空心", cls: "col mark"}, {name: "string", cls: "col"}],
                    [{name: "height", cls: "col"}, {name: "默认为32px", cls: "col mark"}, {name: "number", cls: "col"}],
                    [{name: "radius", cls: "col"}, {name: "是否需要圆角", cls: "col mark"}, {name: "boolean", cls: "col"}],
                    [{name: "shadow", cls: "col"}, {name: "是否需要focus阴影", cls: "col mark"}, {name: "boolean", cls: "col"}],
                    [{name: "placeholder", cls: "col"}, {name: "输入框提示语", cls: "col mark"}, {name: "string", cls: "col"}],
                    [{name: "txtleft", cls: "col"}, {name: "左侧文字", cls: "col mark"}, {name: "string", cls: "col"}],
                    [{name: "txtright", cls: "col"}, {name: "右侧文字", cls: "col mark"}, {name: "string", cls: "col"}],
                    [{name: "prefix", cls: "col"}, {name: "带前缀图标", cls: "col mark"}, {name: "class name", cls: "col"}],
                    [{name: "suffix", cls: "col"}, {name: "带后缀图标", cls: "col mark"}, {name: "class name", cls: "col"}],
                    [{name: "clear", cls: "col"}, {name: "是否有清空图标", cls: "col mark"}, {name: "boolean", cls: "col"}],
                    [{name: "compEvt", cls: "col"}, {name: "组件的输入、点击事件，type分为：‘input’，‘enter’，‘click’", cls: "col mark"}, {name: "function", cls: "col"}]
                ],
                inputRetVal: ""
            }
        },
        methods: {
            footerEvt(){
                let that = this;
                that.showContent = !that.showContent;
            },
            compEvt(val) {
                if(val.id === "ID0001") {
                    this.inputRetVal = val.type === "enter" ? "Enter key Evt" : val.val;
                }
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
