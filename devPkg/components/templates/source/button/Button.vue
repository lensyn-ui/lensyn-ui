/*********************************************************************
 * Created by deming-su on 2017/11/29                                *
 * name 按钮显示文字，默认为：确定                                     *
 * objProps.radius 是否为圆角（默认：false）                           *
 * objProps.type primary、default、dashed、danger、disable、icon，（默认：default）   *
 * objProps.icon 当type为icon时，按钮类型默认为primary，icon有edit、save、delete、download（默认：edit）   *
 * objProps.height（默认：32px）                                      *
 *********************************************************************/


<template>
    <div class="button-temp" ref="buttonNodes" :style="[{'height': cls.height + 'px', 'line-height': cls.height + 'px'}]">
        <div v-for="item in cls.name" 
        :class="[cls.type, {'radius': cls.radius, 'active': item.checked}, cls.name.length > 1 ? 'group' : 'box']" :btton-target="item.id">
            <span @click="clickEvt" :now-id="item.id"><i v-show="cls.icon !== 'noicon'" class="icon" :class="cls.icon">
            </i>{{item.val}}</span>
        </div>
    </div>
</template>
<style>

</style>
<script>
    export default{
        props: ['objProps', 'name'],
        data() {
            return {
                cls: {
                    name: [],
                    height: 32,
                    type: "",
                    radius: false,
                    icon: "noicon"
                }
            }
        },
        methods: {
            clickEvt(evt) {
                let me = this;
                let id = evt.target.getAttribute("now-id");
                let len = me.cls.name.length;
                me.cls.name.map((item, i) => {
                    item.checked = (item.id === id && !item.checked);
                    if(item.checked && i !== 0) {
                        
                    }
                });
                this.$emit("clickEvt", evt.target.innerText);
            }
        },
        mounted() {
            let me = this;
            me.$nextTick(() => {
                document.addEventListener("click", (evt) => {
                    let tar = evt.target.parentNode;
                    let att = tar.getAttribute("btton-target");
                    if(!att) {
                        me.cls.name.map(item => item.checked = false);
                    }
                });
            });
        },
        created() {
            let me = this;
            let iid = (Math.random() *100000).toFixed(0);
            if(!me.name) {
                me.cls.name.push({checked: false, val: "确定", id: "ID001"});
            } else {
                me.name.split("|").map((item, i) => {
                    if(item !== "") {
                        me.cls.name.push({checked: false, val: item, id: "ID0" + i});
                    }
                })
            }
            if(me.objProps) {
                for(let name in me.cls) {
                    if(me.cls.hasOwnProperty(name)) {
                        if(me.objProps[name]){
                            me.cls[name] = me.objProps[name];
                        }
                    }
                }
            }
            if(me.cls.type === 'icon') {
                me.cls.type = 'primary';
                if(!me.cls.icon) me.cls.icon = "edit";
            }
        }
    }
</script>
