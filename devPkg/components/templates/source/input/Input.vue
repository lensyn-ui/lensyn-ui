/*********************************************************************
 * Created by deming-su on 2017/11/29
 * bojProps 为整体组件的属性对象
 * type disabled、primary 默认为空心
 * height 组件高度，只提供了一个固定高度：32px
 * radius 是否有圆角，默认为 false
 * shadow 是否有组件focus 阴影，默认为 false
 * placeholder 组件提示语，默认为空
 * txtleft 左侧文字 txtright 右侧文字
 * prefix 带前缀图标 suffix 带后缀图标 为className
 * clear 是否有清空图标
 * compEvt 组件事件 return （type：‘input’，‘enter’，‘click’）
 *********************************************************************/


<template>
    <div class="input-temp" :style="[{'height': cls.height + 'px', 'line-height': cls.height + 'px'}]">
        <span class="box">
            <span class="prefix-icon" evt-type="prefix" @click="clickEvt" v-if="cls.lefticon" :class="[{'radius': cls.radius}, cls.prefix]"></span>
            <span class="prefix" evt-type="prefix" @click="clickEvt" v-if="cls.leftlabel" :class="[{'radius': cls.radius}, cls.type]">{{cls.lefttxt}}</span>
            <input type="text" class="ipt-box" evt-type="input" @click="clickEvt" @keyup="keyupEvt" v-model="cls.value" 
            :class="[{'left-radius': cls.leftRadius, 'right-radius': cls.rightRadius, 'shadow': cls.shadow, 'disabled': cls.type==='disabled'}]" 
            :placeholder="cls.placeholder" :disabled="cls.type === 'disabled'">
            <span class="clear" evt-type="clear" @click="clickEvt" v-show="cls.clear && cls.value !== ''"></span>
            <span class="suffix" evt-type="suffix" @click="clickEvt" v-if="cls.rightlabel" :class="[{'radius': cls.radius}, cls.type]">{{cls.righttxt}}</span>
            <span class="suffix-icon" evt-type="suffix" @click="clickEvt" v-if="cls.righticon" :class="[{'radius': cls.radius}, cls.suffix]"></span>
        </span>
    </div>
</template>
<style>

</style>
<script>
    export default{
        props: ['objProps'],
        data() {
            return {
                cls: {
                    id: "",
                    value: "",
                    type: "def",
                    height: 32,
                    radius: false,
                    leftRadius: false,
                    rightRadius: false,
                    shadow: false,
                    placeholder: "",
                    lefttxt: "",
                    righttxt: "",
                    prefix: "",
                    suffix: "",
                    clear: false,
                    leftlabel: false,
                    rightlabel: false,
                    lefticon: false,
                    righticon: false
                }
            }
        },
        methods: {
            clickEvt(evt) {
                let me = this;
                let type = evt.target.getAttribute("evt-type");
                let obj = {type: 'click', val: type};
                if(type === "clear") me.cls.value = "";
                if(me.cls.id && me.cls.id !== "") obj.id = me.cls.id;
                me.$emit("compEvt", obj);
            },
            keyupEvt(evt) {
                let me = this;
                let obj = {val: me.cls.value};
                if(me.cls.id && me.cls.id !== "") obj.id = me.cls.id;
                obj.type = evt.keyCode === 13 ? "enter" : "input";
                me.$emit("compEvt", obj);
            }
        },
        created() {
            let me = this;
            if(me.objProps) {
                 for(let name in me.cls) {
                    if(me.cls.hasOwnProperty(name)) {
                        if(me.objProps[name]){
                            me.cls[name] = me.objProps[name];
                        }
                    }
                }
            }
            me.cls.leftlabel = me.cls.lefttxt && me.cls.lefttxt !== "";
            me.cls.rightlabel = me.cls.righttxt && me.cls.righttxt !== "";
            me.cls.lefticon = me.cls.prefix && me.cls.prefix !== "";
            me.cls.righticon = me.cls.suffix && me.cls.suffix !== "";
            me.cls.leftRadius = me.cls.radius && !me.cls.leftlabel && !me.cls.lefticon;
            me.cls.rightRadius = me.cls.radius && !me.cls.rightlabel && !me.cls.righticon;
        }
    }
</script>
