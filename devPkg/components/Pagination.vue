<template>
    <div class="page-box">
        <div class="total">共 <span class="red">{{ total }}</span> 条数据</div>
        <ul class="pagination">
            <li :class="{'disabled': currentPage == 1}"><a href="javascript:;" @click="setCurrent(1)"> 首页 </a></li>
            <li :class="{'disabled': currentPage == 1}"><a href="javascript:;" @click="setCurrent(currentPage - 1)">
                上一页 </a></li>
            <li v-for="p in grouplist" :class="{'active': currentPage == p.val}"><a href="javascript:;"
                                                                                    @click="setCurrent(p.val)">
                {{ p.text }} </a></li>
            <li :class="{'disabled': currentPage == page}"><a href="javascript:;" @click="setCurrent(currentPage + 1)">
                下一页</a></li>
            <li :class="{'disabled': currentPage == page}"><a href="javascript:;" @click="setCurrent(page)"> 尾页 </a>
            </li>
        </ul>
        <div class="pagination">
            <span>跳转到: </span>
            <input type="text" v-model.trim="inputPage" @keyup.enter="setCurrent(inputPage)"/>
            <span class="btn" @click="setCurrent(inputPage)">go</span>
        </div>
        <div class="pagination">
            <span>每页显示</span>
            <select v-model.number="displayItem">
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="100">100</option>
            </select>
            <span>条记录</span>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            total: {            // 数据总条数
                type: Number,
                default: 0
            },
            display: {            // 每页显示条数
                type: Number,
                default: 10
            },
            current: {            // 当前页码
                type: Number,
                default: 1
            },
            pagegroup: {        // 分页条数 -- 奇数
                type: Number,
                default: 5
            }
        },
        data() {
            return {
                currentPage: 1,  //当前页
                inputPage: '',  //输入框页数
                displayItem: 10  //每页多少条
            }
        },
        watch: {
            inputPage: function (newVal) {
                let str = /^[0-9]+$/;
                if (!str.test(newVal) && newVal != '') {
                    this.inputPage = 1;
                    return;
                }
                this.inputPage = newVal;
            },
            displayItem: function (newVal) {
                this.currentPage = 1;
                this.$emit('on-change', {
                    currentPage: this.currentPage,
                    displayItem: this.displayItem
                });
            }
        },
        mounted() {
            this.$nextTick(function () {
                this.currentPage = this.current;
                this.displayItem = this.display;
            });
        },
        computed: {
            page: function () { // 总页数
                return Math.ceil(this.total / this.displayItem);
            },
            grouplist: function () { // 获取分页页码
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
        },
        methods: {
            setCurrent: function (idx) {
                if (this.currentPage != idx && idx > 0 && idx < this.page + 1) {
                    this.currentPage = idx * 1;
                    this.$emit('on-change', {
                        currentPage: this.currentPage,
                        displayItem: this.displayItem
                    });
                }
            }
        }
    }
</script>

<style scoped>
    .page-box {
        margin: 20px 0;
    }

    .total {
        display: inline-block;
        margin-right: 20px;
        vertical-align: middle;
        height: 36px;
        line-height: 40px;
    }

    .total .red {
        color: red;
    }

    .pagination {
        vertical-align: middle;
        display: inline-block;
        padding-left: 0;
        border-radius: 4px;
        margin: 0 10px;
    }

    .pagination > li {
        display: inline
    }

    .pagination > li > a, .pagination > li > span {
        position: relative;
        float: left;
        padding: 6px 12px;
        margin-left: -1px;
        line-height: 1.42857143;
        color: #337ab7;
        text-decoration: none;
        background-color: #fff;
        border: 1px solid #ddd
    }

    .pagination > li:first-child > a, .pagination > li:first-child > span {
        margin-left: 0;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px
    }

    .pagination > li:last-child > a, .pagination > li:last-child > span {
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px
    }

    .pagination > li > a:focus, .pagination > li > a:hover, .pagination > li > span:focus, .pagination > li > span:hover {
        z-index: 2;
        color: #23527c;
        background-color: #eee;
        border-color: #ddd
    }

    .pagination > .active > a, .pagination > .active > a:focus, .pagination > .active > a:hover, .pagination > .active > span, .pagination > .active > span:focus, .pagination > .active > span:hover {
        z-index: 3;
        color: #fff;
        cursor: default;
        background-color: #337ab7;
        border-color: #337ab7
    }

    .pagination > .disabled > a, .pagination > .disabled > a:focus, .pagination > .disabled > a:hover, .pagination > .disabled > span, .pagination > .disabled > span:focus, .pagination > .disabled > span:hover {
        color: #777;
        cursor: not-allowed;
        background-color: #fff;
        border-color: #ddd
    }

    .pagination > input {
        outline: none;
        width: 40px;
        height: 30px;
        padding: 0 8px;
        margin: 0 3px;
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 4px;
        -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
        -webkit-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
        -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
        transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
        font-size: 14px;
        line-height: 1.42857143;
        color: #555;
    }

    .pagination > select {
        outline: none;
        width: 60px;
        height: 30px;
        padding: 0 5px;
        margin: 0 3px;
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 4px;
        -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
        -webkit-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
        -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
        transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
        font-size: 14px;
        line-height: 1.42857143;
        color: #555;
    }

    .pagination > input:focus, .pagination > select:focus {
        border-color: #66afe9;
        outline: 0;
        -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, .6);
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, .6);
    }

    .pagination > .btn {
        display: inline-block;
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        cursor: pointer;
        border: 1px solid #337ab7;
        border-radius: 4px;
        background: #337ab7;
        color: #fff;
    }
</style>
