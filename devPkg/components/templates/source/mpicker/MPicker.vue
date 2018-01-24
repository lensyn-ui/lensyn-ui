/*********************************************************************
 * Created by wxx on 2017/11/25                                      *
 * modalColor 模态层颜色；                                            *
 * title 是否显示标题；                                               *
 * modalClose 模态层点击事件；                                        *
 * type 组件类型，'date', 'cascade', 'list',  默认'date'；            *
 * value 默认值，list 类型以数组的方式传列表数据的ID；                                                    *
 * list 列表数据；                                                   *
 * format 日期类型，y,m,d,h,mm,s；大小写不敏感，以','分开默认为：y,m,d  *
 *********************************************************************/
<template>
    <div class="datePicker-box"> 
        <!-- 页面整个蒙层 -->
        <div class="modal" :style="[{'background-color': pageObj.modalColor}]" now-type="modal" @click="btnEvt"></div>
        <div class="layer" :style="[{'height': pageObj.title ? '240px' : '210px'}]">
            <!-- 日期插件数据box -->
            <div class="title" v-show="pageObj.title">
                <span class="btn" now-type="cancel" @click="btnEvt">取消</span>
                <span class="btn sub" now-type="submit" @click="btnEvt">确定</span>
            </div>
            <div class="box">
                <div class="items">
                    <ul class="list" v-for="(item, i) in pageObj.list" :style="[{'top': item.pos + 'px', 'width': (100/pageObj.list.length) + '%', 'left': (100/pageObj.list.length)*i + '%'}]">
                        <li class="item" v-for="it in item.list"><span class="label" :class="it.cls">{{it.name}}</span></li>
                    </ul>
                </div>
                <span class="modal"></span>
                <span class="line"></span>
                <div class="touch" ref="nodes">
                    <span touch-modal="y" class="item" v-for="item in pageObj.list" :now-id="item.id" :style="[{'flex': '0 0 '+100/pageObj.list.length+'%'}]"></span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        props: ['objProps'],
        data() {
            return {
                cls: ['b2', 'b1', 'b0', '', 'a0', 'a1', 'a2'],
                dateProps: [
                    {key: 'y', id: 'YID', min: 1, max: 0, sub: '-'},
                    {key: 'm', id: 'MID', min: 1, max: 12, sub: '-'},
                    {key: 'd', id: 'DID', min: 1, max: 30, sub: ' '},
                    {key: 'h', id: 'HID', min: 1, max: 24, sub: ':'},
                    {key: 'mm', id: 'MMID', min: 1, max: 60, sub: ':'},
                    {key: 's', id: 'SID', min: 1, max: 60, sub: ''}
                ],
                pageObj: {
                    modalColor: "rgba(0, 0, 0, .6)",
                    modalClose: false,
                    title: true,
                    type: "date",
                    format: "y,m,d",
                    value: "",
                    list: []
                },
                defVal: ""
            }
        },
        methods: {
            assembleTime(str) {
                let me = this;
                let n = new Date();
                if(str) n = new Date(str);
                let obj = {
                    y: n.getFullYear(),
                    m: n.getMonth() + 1,
                    d: n.getDate(),
                    h: n.getHours(),
                    mm: n.getMinutes(),
                    s: n.getSeconds()
                };
                me.dateProps.map(it => {
                    it.val = obj[it.key];
                    if(it.key === 'y') {
                        it.min = obj.y - 40;
                        it.max = obj.y*1 + 40;
                    }
                    if(it.key === 'd') {
                        it.max = new Date(obj.y, obj.m + 1, 0).getDate();
                    }
                });
                me.formatDate();
            },
            formatDate() {
                let me = this;
                let types = me.pageObj.format.split(",");
                me.dateProps.map(it => {
                    if(types.indexOf(it.key) > -1) {
                        me.pageObj.list.push(me.assembleList(it.max, it.min, it.val, it.id));
                    }
                });
            },
            assembleList(max, min, nowNum, id) {
                let me = this;
                let arr = [];
                for(let i = min-nowNum; i <= max-nowNum; i ++) {
                    let clsIdx = me.getClsIdx(i);
                    arr.push({id: id + i, name: nowNum + i, checked: i === 0, cls: me.cls[clsIdx]});
                }
                return {
                        id: id,
                        pos: -((nowNum - min) - 3) *30,
                        list: arr
                    };
            },
            getClsIdx(idx) {
                let dis = idx + 3;
                return dis < 0 ? 0 : dis > 6 ? 6 : dis;
            },
            btnEvt(evt) {
                let me = this;
                let type = evt.target.getAttribute("now-type");
                if(type === 'modal' && !me.pageObj.modalClose) {
                    return false;
                }
                let resVal = '';
                if(me.pageObj.type === "date") {
                    let types = me.pageObj.format.split(',');
                    me.dateProps.map(it => {
                        if(types.indexOf(it.key) > -1) {
                            resVal += ((it.key !== 'mm' && it.key !== 's') ? it.val : it.val*1 === 60 ? 0 : it.val) + it.sub;
                        }
                    });
                }
                if(me.pageObj.type === "list") {
                    resVal = [];
                    me.pageObj.list.map(it => {
                        it.list.map(item => {
                            if(item.cls === "") resVal.push(item);
                        });
                    });
                }
                me.$emit("evtFunc", {type: type, val: resVal});
            },
            addEvent(node) {
                let me = this;
                let start = false; //触摸事件状态
                let sy = 0;//触摸目标在页面中的y坐标默认值
                let id = "";//触摸目标元素的数据ID
                let st = 0;//当前时间
                let sp = 0;//当前距离
                node.addEventListener("touchstart", function(evt) {
                    if(!start) {
                        evt.stopPropagation();//阻止事件冒泡
                        st = Date.now();
                        id = evt.target.getAttribute("now-id");//得到当前触摸的id
                        sy = evt.touches[0].pageY;//触摸目标在页面中的Y坐标
                        start = true;
                        me.pageObj.list.map(it => {
                            if(it.id === id) {
                                sp = it.pos;
                            }
                        })
                        evt.preventDefault();//阻止默认事件
                    }
                });
                node.addEventListener("touchmove", function(evt) {
                    if(start) {
                        evt.stopPropagation();
                        let y = evt.touches[0].pageY;
                        me.pageObj.list.map(it => {
                            if(it.id === id) {
                                it.pos = it.pos - (sy - y);//当前滑动的距离
                            }
                        })
                        sy = y;
                        evt.preventDefault();//阻止滚动
                    }
                });
                //touchend事件：当手指从屏幕上离开的时候触发。
                node.addEventListener("touchend", (evt) => {
                    if(start) {
                        let isMonth = false;
                        let dateIdx = -1;
                        me.pageObj.list.map((it, index) => {
                            if(it.id === id) {
                                //移动的时间
                                let dt = Date.now() - st;
                                //移动的距离
                                let dd = sp - it.pos;
                                /**
                                * 距离顶部和底部有三个空白元素位置：3*30px；
                                * 元素移动距离为：90-it.pos，对移动距离进行四舍五入后得到元素移动后，正常显示元素的下标；
                                */
                                let minTop = 120 - it.list.length * 30;
                                it.pos = it.pos > 90 ? 90 : it.pos < minTop ? minTop : it.pos;
                                let num = Math.round((90-it.pos)/30);
                                it.list.map((item, i) => {
                                    let idx = i - (num - 3);
                                    item.cls = me.cls[(idx < 0 ? 0 : idx > 6 ? 6 : idx)];
                                });
                                it.pos = 90 - num * 30;
                                me.dateProps.map(item => {
                                    if(item.id === id) {
                                        item.val = num + 1;
                                    }
                                    if(item.id === 'DID') {
                                        item.max = new Date(me.dateProps[0].val, me.dateProps[1].val, 0).getDate();
                                    }
                                });
                                isMonth = (it.id === 'MID' || it.id === 'YID');
                            }
                            if(isMonth && it.id === 'DID') dateIdx = index;
                        });
                        if(isMonth && dateIdx > -1) {
                            me.pageObj.list.splice(dateIdx, 1, me.assembleList(me.dateProps[2].max, me.dateProps[2].min, 1, me.dateProps[2].id));
                        }
                        start = false;
                    }
                });
            },
            assembleListTpl() {
                let me = this;
                let ids = me.objProps.value;
                me.objProps.list.map((it, idx) => {
                    me.pageObj.list.push({
                        id: "ID" + idx,
                        pos: 90,
                        list: it
                    })
                });
            }
        },
        mounted() {
            let me = this;
            me.$nextTick(() => {
                //跟滚动的span绑定事件
                let nodes = me.$refs.nodes.querySelectorAll("span[touch-modal]");
                nodes.forEach(it => {
                    //对nodes绑定触摸事件
                    me.addEvent(it);
                });
            });
        },
        created() {
            let me = this;
            if(me.objProps) {
                if(me.objProps.type) me.pageObj.type = me.objProps.type.toLowerCase().replace(/\，/gi, ',').replace(/\s/gi, '');
                if(me.pageObj.type === "date") {
                    if(me.objProps.format) me.pageObj.format = me.objProps.format;
                    if(me.objProps.value) me.pageObj.value = me.objProps.value.replace(/\-/g, '/');
                    me.assembleTime();
                }
                if(me.pageObj.type === "list") {
                    me.assembleListTpl();
                }
            } else {
                me.assembleTime();
            }
        }
    }
</script>
