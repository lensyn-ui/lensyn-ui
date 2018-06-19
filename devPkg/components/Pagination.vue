<template>
    <div class="page-box">
        <div class="total" v-if="isShowTotal">共 <span class="red">{{ total }}</span> 条数据</div>
        <ul class="pagination">
            <li :class="{'disabled': currentPage == 1}" v-if="isHFShow"><a href="javascript:;" @click="setCurrent(1)">
                首页 </a></li>
            <li :class="{'disabled': currentPage == 1}"><a href="javascript:;" @click="setCurrent(currentPage - 1)">
                上一页 </a></li>
            <li v-for="p in grouplist" :class="{'active': currentPage == p.val}"><a href="javascript:;"
                                                                                    @click="setCurrent(p.val)">
                {{ p.text }} </a></li>
            <li :class="{'disabled': currentPage == page}"><a href="javascript:;" @click="setCurrent(currentPage + 1)">
                下一页</a></li>
            <li :class="{'disabled': currentPage == page}" v-if="isHFShow"><a href="javascript:;"
                                                                              @click="setCurrent(page)"> 尾页 </a>
            </li>
        </ul>
        <div class="pagination" v-if="isGoShow">
            <span>跳转到: </span>
            <input type="text" v-model.trim="inputPage" @keyup.enter="setCurrent(inputPage)"/>
            <span class="btn" @click="setCurrent(inputPage)">go</span>
        </div>
        <div class="pagination">
            <span>每页显示</span>
            <select v-model.number="displayItem">
                <option v-for="item in displayLists" :value="item.value">{{item.label}}</option>
            </select>
            <span>条记录</span>
        </div>
    </div>
</template>

<script>
    import {Component, Watch} from "vue-property-decorator";
    import FormWidget from './base/FormWidget.vue';

    @Component({
        props: {
            isShowTotal: {
                type: Boolean,
                default: true
            },
            isGoShow: {
                type: Boolean,
                default: true
            },
            isHFShow: {
                type: Boolean,
                default: true
            },
            total: {            // 数据总条数
                type: Number,
                default: 0
            },
            display: {            // 每页显示条数
                type: Number,
                default: 10
            },
            displayLists: {
                type: Array,
                default: () => [
                    {
                        label: 10, value: 10
                    },
                    {
                        label: 20, value: 20
                    },
                    {
                        label: 50, value: 50
                    },
                    {
                        label: 100, value: 100
                    }
                ]
            },
            current: {            // 当前页码
                type: Number,
                default: 1
            },
            pagegroup: {        // 分页条数 -- 奇数
                type: Number,
                default: 5
            }
        }
    })
    export default class Pagination extends FormWidget {
        widgetName = 'pagination';

        currentPage = 1;  //当前页
        inputPage = ''; //输入框页数
        displayItem = 10;  //每页多少条

        @Watch('inputPage')
        onInputPage(newVal) {
            let str = /^[0-9]+$/;
            if (!str.test(newVal) && newVal != '') {
                this.inputPage = 1;
                return;
            }
            this.inputPage = newVal;
        }

        @Watch('displayItem')
        onDisplayItem() {
            this.currentPage = 1;
            this.emitEvent({action: 'page', currentPage: this.currentPage, displayItem: this.displayItem});
        }

        mounted() {
            this.$nextTick(() => {
                this.currentPage = this.current;
                this.displayItem = this.display;
            });
        }

        setCurrent(idx) {
            if (this.currentPage != idx && idx > 0 && idx < this.page + 1) {
                this.currentPage = idx * 1;
            } else {
                this.inputPage = 1;
                this.currentPage = 1;
            }
            this.emitEvent({action: 'page', currentPage: this.currentPage, displayItem: this.displayItem});
        }

        get page() { // 总页数
            return Math.ceil(this.total / this.displayItem);
        }

        get grouplist() { // 获取分页页码
            let len = this.page, temp = [], list = [], count = Math.floor(this.pagegroup / 2),
                center = this.currentPage;
            if (len <= this.pagegroup) {
                while (len--) {
                    temp.push({text: this.page - len, val: this.page - len});
                }
                return temp;
            }
            while (len--) {
                temp.push(this.page - len);
            }
            let idx = temp.indexOf(center);
            (idx < count) && ( center = center + count - idx);
            (this.currentPage > this.page - count) && ( center = this.page - count);
            temp = temp.splice(center - count - 1, this.pagegroup);
            do {
                let t = temp.shift();
                list.push({
                    text: t,
                    val: t
                });
            } while (temp.length);
            if (this.page > this.pagegroup) {
                (this.currentPage > count + 1) && list.unshift({text: '...', val: list[0].val - 1});
                (this.currentPage < this.page - count) && list.push({
                    text: '...',
                    val: list[list.length - 1].val + 1
                });
            }
            return list;
        }
    }
</script>
