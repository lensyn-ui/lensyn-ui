/*********************************************************************
 * Created by deming-su on 2017/11/25                                *
 * Modify by zhangtao on 2017/12/8                                   *
 * 增加属性                                                           *
 *     1. 配置显示的字段 showFieldKey                                  *
 *     2. 主键 idKey                                                  *
 *     3. 是否被禁用 isDisabled                                       *
 *     4. 输入框额外的样式 inputClass                                  *
 * 增加方法                                                           *
 *     1. 获取选中的数据 getSelected                                   *
 *     2. 清空选中的数据 clearSelected                                 *
 *     3. 设置某行数据被选中 setItemBeSelected                          *
 * Modify by zhangtao on 2017/12/15                                   *
 * 增加属性                                                           *
 *     1. showType - filter 时对匹配的数据进行过滤，只显示匹配的数据     *
 *                   scroll 时只是滚动到匹配的第一条数据                *
 **********************************************************************/


<template>
    <div class="selection-box" :class="{label: haveLabel()}">
        <label ref="label" v-if="haveLabel()">
            {{label}}
        </label>
        <div ref="inputBox" class="ipt-box">
            <input class="ipt" :class="inputClass" :disabled="isDisabled" :selection-obj="nowId" ref="selectIpt" :placeholder="objProps.placeholder" @click="iptClickEvt" @keyup="keyupEvt" v-model="objProps.filterValue"/>
            <i class="icon" :class="[{'active': showBox}]" :selection-obj="nowId" @click="iptClickEvt"></i>
        </div>
        <div class="box" ref="box" v-show="showBox" :style="[{'top': pos.t + 'px'}, {'left': pos.l + 'px'}, {'width': boxW + 'px'}]">
            <div class="block">
                <ul class="list" ref="dropList">
                    <li v-for="item in objProps.list" class="item" 
                        :key="_getItemId(item)" :selection-obj="nowId"  
                        @click="clickEvt" :now-id="_getItemId(item)" :class="[{'active': _isActiveItem(item)}]" 
                        v-show="_isItemShow(item)">{{ _getItemShowValue(item) }}</li>
                </ul>
            </div>
            <i class="icon"></i>
        </div>
    </div>
</template>
<script>
    export default{
        props: {
            label: {
                type: String
            },

            objProps: {
                type: Object,
                required: true
            },

            inputClass: {
                type: String,
                default: ""
            },

            showFieldKey: {
                type: String,
                default: "name"
            },

            idKey: {
                type: String,
                default: "id"
            },

            isDisabled: {
                type: Boolean,
                default: false
            },

            showType: {
                type: String,
                default: "filter"
            }
        },

        data() {
            return {
                showBox: false,
                nowId: "ID" + Date.now(),
                pos: {
                    t: 0, 
                    l: 0
                },
                boxW: 160,
                itemHeight: null,
                activeId: null
            }
        },

        watch: {
            "objProps.list": function (datas) {
                if (datas && datas.length > 0 && typeof datas[0]._select_show === "undefined") {
                    datas.forEach(this._setItemBeShow);                    
                }
            }
        },

        methods: {
            haveLabel() {
                return !!this.label;
            },

            /**
             * 当点击输入框的图标时，切换下拉的收起展开状态
             */
            iptClickEvt() {
                if (this.isEnable()) {
                    this.showBox = !this.showBox;
                    if(this.showBox) {
                        this.showBoxFunc();
                    }
                }
            },

            /**
             * 当在输入框中按键弹起时触发，
             * 1. 是回车键且显示了下拉，则收起下拉
             * 2. 当下拉收起时则展开下拉
             * 3. 当已经展开下拉，则只需要刷新下拉中的数据
             * @param {object} evt
             */
            keyupEvt(evt) {
                // keyCode 13 为回车键
                if(evt.keyCode === 13) {
                    if(this.showBox) {
                        this.showBox = false;
                    } 
                } else {
                    if(!this.showBox) {
                        this.showBoxFunc();
                    } else {
                        this._refreshDropListData();
                    }
                }
            },

            /**
             * 显示下拉列表
             */
            showBoxFunc() {
                if (this.haveLabel()) {
                    this.pos.l = this.$refs.label.offsetWidth;
                    this.pos.t = this.$refs.inputBox.offsetHeight + 6;
                } else {
                    this.pos.t = this.$refs.selectIpt.offsetHeight + 6;                    
                }
                this.showBox = true;
                this._refreshDropListData();
            },

            /**
             * 当点击下拉列表中的数据时触发
             * 将点击的数据行设置为选中，并将其显示的内容设置到输入框中，
             * 然后收起下拉框并向外广播事件 clickEvt
             * @param {object} evt
             */
            clickEvt(evt) {
                let id = evt.target.getAttribute("now-id"),
                    itemId = null;

                this.objProps.list.map(it => {
                    itemId = this._getItemId(it);
                    if(itemId === id) {
                        this.setItemBeSelected(itemId);
                        this.showBox = false;                        
                        this.$emit('clickEvt', it);
                    } else {
                        this._setItemUnChecked(it);
                    }
                });
            },

            /**
             * 输入框是否可用
             * @returns {boolean} true 为可用，false 为禁用
             */
            isEnable() {
                return !this.isDisabled;
            },

            /**
             * 获取选中的数据
             * @returns {object} 返回选中的数据，如果没有选中的数据则返回 null
             */
            getSelected() {
                let result = null,
                    lists = this.objProps.list;

                for(let i = 0, j = lists.length; i < j; ++i) {
                    if (this._isChecked(lists[i])) {
                        result = lists[i];
                        break;
                    }
                }
                return result;
            },

            /**
             * 清空选中的数据
             */
            clearSelected() {
                let lists = this.objProps.list;

                for(let i = 0, j = lists.length; i < j; ++i) {
                    this._setItemUnChecked(lists[i]);
                }
                this.activeId = null;
                this.objProps.filterValue = "";
            },

            /**
             * 根据 id 设置某一项被选中
             * @param {number | string} id - 数据对应的主键
             */
            setItemBeSelected(id) {
                let item = this._findById(id);

                if (item !== null) {
                    this.activeId = id;
                    this._setItemBeChecked(item);
                    this.objProps.filterValue = this._getItemShowValue(item);
                }
            },

            /**
             * 判断某条数据是否为活动
             * @param {object} item
             */
            _isActiveItem(item) {
                return this._getItemId(item) === this.activeId;
            },

             /**
              * 设置某条数据被选中
              * @param {object} item
              */
            _setItemBeChecked(item) {
                item._select_checked = true;
            },

            /**
             * 设置某条数据不被选中
             * @param {object} item
             */
            _setItemUnChecked(item) {
                item._select_checked = false;
            },

            /** 
             * 判断某条数据是否被选中
             * @param {object} item
             */
            _isChecked(item) {
                return item._select_checked
            },

            /**
             * 设置某条数据在下拉中显示
             * @param {object} item
             */
            _setItemBeShow(item) {
                item._select_show = true;
            },

            /**
             * 设置某条数据不在下拉中显示
             * @param {object} item
             */
            _setItemNotShow(item) {
                item._select_show = false;
            },

            /**
             * 判断一条数据是否在下拉中显示
             * @param {object} item
             */
             _isItemShow(item) {
                 return item._select_show;
             },

            /**
             * 根据 id 查找对应的数据
             * 如果找到了则返回对应的数据，没找到则返回 null
             * @param {string | number} id - 数据对应的主键
             * @returns {object} 对应的数据
             */
            _findById(id) {
                let lists = this.objProps.list,
                    item = null,
                    result = null;
                
                for(let i = 0, j = lists.length; i < j; ++i) {
                    item = lists[i];

                    if (this._getItemId(item) === id) {
                        result = item;
                        break;
                    }
                }

                return result;   
            },

            /**
             * 判断一条数据是否匹配过滤条件
             * 如果输入框为空则所有数据都满足条件，
             * 如果输入框不为空则取数据显示的值中是否包含输入框中的值
             * @param {object} item
             * @param {boolean} true 为匹配，false 为不匹配
             */
            _isMatchInputValue(item) {
                let inputValue = this.objProps.filterValue.toLowerCase();

                return inputValue === "" || 
                       this._getItemShowValue(item).toLowerCase().indexOf(inputValue) !== -1;
            },

            /**
             * 刷新下拉列表中的数据，只显示匹配输入框中的值的数据
             */
            _refreshDropListData () {
                let temp = null;

                if (this.showType === "filter") {
                    this._showFilterListData();
                } else {
                    this.$nextTick(() => this._scrollToMatchData());
                }
            },

            /**
             * 滚动下拉到匹配的第一个数据
             */
            _scrollToMatchData() {
                let matchItem = null,
                    matchIndex = null,
                    item = null;
                
                for(let i = 0, j = this.objProps.list.length; i < j; ++i){
                    item = this.objProps.list[i];

                    if (this._isMatchInputValue(item)) {
                        matchIndex = i;
                        matchItem = item;
                        break;
                    }
                }

                if (this.itemHeight === null) {
                    this.itemHeight = this._getDataItemHeight();
                }
                if (matchItem !== null) {
                    this.activeId = this._getItemId(matchItem);
                    this.$refs.dropList.scrollTop = matchIndex * this.itemHeight;
                }
            },

            /**
             * 获取一条数据的高度
             */
            _getDataItemHeight() {
                return this.$refs.dropList.querySelector("li").offsetHeight;
            },

            /**
             * 使下拉中只显示过滤后的数据
             */
            _showFilterListData() {
                let temp = null;

                temp = this.objProps.list.map((item) => {
                    if (this._isMatchInputValue(item)) {
                        this._setItemBeShow(item);
                    } else {
                        this._setItemNotShow(item);
                    }
                    return item;
                });
                this.objProps.list = temp;
            },

            /**
             * 获取一条数据标识符的值
             * @returns {string | number} 对应数据的标识符的值
             */
            _getItemId(item) {
                return item[this.idKey]
            },

            /**
             * 获取数据显示到下拉中的值
             * @returns {*} 数据对应的显示值 
             */
            _getItemShowValue (item) {
                return item[this.showFieldKey];
            }
        },

        mounted() {
            let self = this;
            self.$nextTick(() => {
                // 绑定事件，当点击下拉以外的区域时，收起下拉列表
                self._clickListener = document.addEventListener("click", function (evt) {
                    let node = evt.target;
                    let attr = node.getAttribute("selection-obj");
                    if(!attr || attr !== self.nowId) {
                        if (self.showBox) {
                            self.showBox = false;
                        }
                    }
                });
            });
        },

        created() {
            if(this.objProps.width) {
                this.boxW = this.objProps.width;                
            }
            this.objProps.placeholder = this.objProps.placeholder ? this.objProps.placeholder : 
                                                                    "请输入关键字";
            this.$set(this.objProps, "filterValue", "");
        }
    }
</script>