/*********************************************************************
* Created by tr on 2017/12/5.                                       *
*********************************************************************/
<template>
    <div ref="tabsEvt" class="tabs-res-item" :class="[{'borderStyle':tabsData.borderShow},{'tab-position':(tabsData.position && tabsData.position !== 'top')},tabsData.position]">
        <span class="border"></span>
        <span class="item" v-for="item in tabsData.list" :class="[{'active': item.checked},{'borderStyle':tabsData.borderShow}]" :now-id="item.id" @click="clickEvt">{{item.name}}</span>
    </div>
</template>
<script>
    export default{
        /* 传递过来的初始化日期 */
        props:{
            tabsData:{
                type: Object,
                position:'top',
                borderStyle: false,
                list:[]
            }
        },
        methods: {
            /*选项卡的点击事件*/
            clickEvt(evt) {
                let that = this;
                let id = evt.target.getAttribute('now-id');
                let obj = that.tabsData.list;
                let temp = [];
                if(obj && obj.length) {
                    obj.map(it => {
                        it.checked = it.id === id;
                        if (it.checked) {
                            that.$emit('tabsEvt', {type: 'click', obj: it});
                        }
                        temp.push(it);
                    });
                }
                that.tabsData.list = temp;
            }
        },
        created() {
            let that = this;
            let newObj = that.tabsData.list;
            let sum = 0;
            if(newObj && newObj.length) {
                newObj.map(item => {
                    if (item.checked) {
                        sum++;
                        return false;
                    }
                });
                that.tabsData.list[0].checked = !sum;
            }
        }
    }

</script>