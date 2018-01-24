/*********************************************************************
* Created by tr on 2017/12/12.                                       *
* Tree 树形组件                                                      *
*********************************************************************/
<template>
    <!--树形图的显示-->
    <ul class="tree-list">
        <li class="ls-tree-item" v-for="item in treeObj" :key="item[idKey]" >
            <div class="tree-label" :class="{'tree-check':treeParams.isCheck}">
                <!--节点icon-->
                <span :class="{'tree-icon-select':item.checked,'tree-icon': item.children && item.children.length}"
                      @click="treeExpand(item)"></span>
                <span v-if="treeParams.isCheck"
                      :class="{'tree-show-label':treeParams.isCheck,'active':item.check}"
                      @click="treeSelectEvt(item)"></span>

                <div class="tree-label-text" :now-id="item.id" :now-pid="item.pid" @click="treeExpand(item)">
                    {{item[labelKey]}}
                </div>
            </div>
            <!--递归循环显示-->
            <treeItems :treeObj='item.children' :labelKey="labelKey" @treeEvt="onInnerClick" :treeParams="treeParams" v-show="item.checked"></treeItems>
        </li>
    </ul>
</template>

<script>
    import {mapGetters, mapActions} from "vuex"
    export default{
        name: "treeItems",
        props: {
            idKey: {
                type: String,
                default: "id"
            },

            treeObj: {
                type: Array,
            },

            treeParams: {
                type: Object,
                default: {
                    isCheck: false
                }
            },

            labelKey: {
                type: String,
                default: "name"
            }
        },
        data() {
            return {
                isBool: false
            }
        },
        methods: {
            /**
             * 节点的点击事件
             * @param resObj
             */
            treeExpand(resObj) {
                resObj.checked = !resObj.checked;
                this.$emit("treeEvt", {action: "expand", curObj: resObj, obj: this.treeObj});

            },
            /*递归获取子级元素*/
            getChildEle(data, ele, isBool){
                if (data) {
                    let newData = [];
                    if (data.length) {
                        data.map(da => {
                            let newDa = da;
                            if (ele !== 'pid') {
                                newDa[ele] = !isBool;
                            } else if (ele === 'pid' && isBool) {
                                newData.newPid = da.pid + '&' + da.id;
                            }
                            newData.push(newDa);
                            if (da.children && da.children.length) {
                                return this.getChildEle(da.children, ele, isBool);
                            }
                            return newData;
                        });
                    }

                } else {
                    return data;
                }
            },
            getParent(data, nodeId){
                data.map(item => {
                    let obj = item;
                    if (obj.id === nodeId) {

                    } else {
                        if (obj.children) {

                        }
                    }
                });
            },
            /*判断文件是否有子级*/
            isTreeChild: function (resObj) {
                let that = this;
                let newChild = resObj.children;

                if (newChild && newChild instanceof Array && newChild.length) {
                    that.getChildEle(newChild, 'check', resObj.check);
                }
            },
            /**
             * 选择框的点击事件
             * @param resObj
             */
            treeSelectEvt(resObj){
                let that = this;
                that.isTreeChild(resObj);
                resObj.check = !resObj.check;
                this.$emit('treeEvt', {action: "checkbox", obj: that.treeObj, curObj: resObj});
            },

            onInnerClick(event) {
                this.$emit("treeEvt", event);
            }
        },
        mounted() {
            let that = this;
            that.$nextTick(() => {
                that.getChildEle(that.treeObj, 'pid', true);
                //console.log(that.treeObj);
            });
        }

    }

</script>