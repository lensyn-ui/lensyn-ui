/****************************************************************************
* Created by huanghuaqiao on 2017/12/05                                     *
* 分页公共组件                                                                *
*****************************************************************************/
<template>
	<div class="pagination-container" :style="[{background: currentData.paginationBackground}]">
		<!-- 批量操作按钮 -->
		<div class="batch-handle" v-if="currentData.showBatchButtons">
			<a href="javascript:void(0)" v-for="button in currentData.batchButtons" :now-id="button.id" ref="batchButton">{{button.text}}</a>
		</div>
		<!-- 分页内容 -->
		<div class="pagination-content">
			<!-- 分页展示信息(分页跳转) -->
			<div class="pagination-msg" v-if="currentData.showJumpPrompt">
				<span>{{currentData.jumpBeforeContent}}</span>
				<!-- 页码跳转输入框 -->
				<input type="text" ref="pageJump">
				<span>{{currentData.jumpAfterContent}}</span>
				<!-- 跳转按钮 -->
				<!--<input type="button" @click="pageJump" value="GO">-->
			</div>
			<!-- 分页按钮 -->
			<ul class="pagination" :style="[{float: currentData.paginationPosition}]">
				<li :class="{'disabled': current == 1}" :style="[{'border-width': currentData.hasPageGroupborder ? '1px' : 0}]">
					<a href="javascript:;" @click="setCurrent(1)">&lt;&lt;</a>
				</li>
				<li :class="{'disabled': current == 1}" :style="[{'border-width': currentData.hasPageGroupborder ? '1px' : 0}]">
					<a href="javascript:;" @click="setCurrent(current - 1)">&lt;</a>
				</li>
				<li v-for="p in grouplist" :style="[{background: current == p.val ? currentData.pageGroupHoverBackground : 'none'},{'border-color': current == p.val ? currentData.pageGroupHoverBackground : currentData.pageGroupborderColor},{'border-width': currentData.hasPageGroupborder ? '1px' : 0}]">
					<a href="javascript:;" :style="[{color: current == p.val ? currentData.pageGroupHoverColor : '#333'}]" @click="setCurrent(p.val)"> {{ p.text }} </a>
				</li>
				<li :class="{'disabled': current == page}" :style="[{'border-width': currentData.hasPageGroupborder ? '1px' : 0}]">
					<a href="javascript:;" @click="setCurrent(current + 1)">&gt;</a>
				</li>
				<li :class="{'disabled': current == page}" :style="[{'border-width': currentData.hasPageGroupborder ? '1px' : 0}]">
					<a href="javascript:;" @click="setCurrent(page)">&gt;&gt;</a>
				</li>
			</ul>
			<!-- 分页展示信息 -->
			<div class="pagination-msg">
				<span>共有{{currentData.total}}条，每页显示
					<select v-model="currentData.rows">
						<option :selected="item.value == currentData.rows" :value="item.value" v-for="item in currentData.rowsData">{{item.text}}</option>
					</select>条
				</span>
			</div>
		</div>
	</div>
</template>
<script type="es6">
	export default{
		data() {
			return {
				current: 1,
				currentData: {
					total: 0,
					rows: 20,
					page: 1,
					pageGroup: 5,
					rowsData: [
						{value: 10,text: '10条/页'},
						{value: 20,text: '20条/页'},
						{value: 30,text: '30条/页'},
						{value: 40,text: '40条/页'},
						{value: 50,text: '50条/页'}
					],
					paginationBackground: '#F5F6FA',
					paginationPosition: 'right',
					pageGroupHoverBackground: '#407DD1',
					pageGroupHoverColor: '#fff',
					pageGroupborderColor: '#DCDCDC',
					hasPageGroupborder: true,
					jumpBeforeContent: '跳至',
					jumpAfterContent: '页',
					showJumpPrompt: true,
					showBatchButtons: false
				}
			}
		},
		props: {
			paginationData: {
				total: {
					type: Number,
					default: 0
				},
				rows: {// 每页显示条数
					type: Number,
					default: 20
				},
				page: {// 当前页码
					type: Number,
					default: 1
				},
				pageGroup: {// 分页条数
					type: Number,
					default: 5,
					coerce: function (v) {
						v = v > 0 ? v : 5;
						return v % 2 === 1 ? v : v + 1;
					}
				},
				rowsData: {
					type: Array,
					default: [
						{value: 10,text: '10条/页'},
						{value: 20,text: '20条/页'},
						{value: 30,text: '30条/页'},
						{value: 40,text: '40条/页'},
						{value: 50,text: '50条/页'}
					]
				},
				paginationBackground: {
					type: String,
					default: '#F5F6FA'
				},
				paginationPosition: {
					type: String,
					default: 'right'
				},
				pageGroupHoverBackground: {
					type: String,
					default: '#407DD1'
				},
				pageGroupborderColor: {
					type: String,
					default: '#DCDCDC'
				},
				jumpBeforeContent: {
					type: String,
					default: '跳至'
				},
				jumpAfterContent: {
					type: String,
					default: '页'
				}
		}
		},
		computed: {
			page: function () { // 总页数
				return Math.ceil(this.currentData.total / this.currentData.rows);
			},
			grouplist: function () { // 获取分页页码
				let len = this.page,
					temp = [],
					list = [],
					count = Math.floor(this.paginationData.pageGroup / 2),
					center = this.current;
				if (len <= this.paginationData.pageGroup) {
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
				(this.current > this.page - count) && ( center = this.page - count);
				temp = temp.splice(center - count - 1, this.paginationData.pageGroup);
				do {
					let t = temp.shift();
					list.push({
						text: t,
						val: t
					});
				} while (temp.length);
				if (this.page > this.paginationData.pageGroup) {
					(this.current > count + 1) && list.unshift({text: '...', val: list[0].val - 1});
					(this.current < this.page - count) && list.push({text: '...', val: list[list.length - 1].val + 1});
				}
				return list;
			}
		},
		watch: {
			'currentData.rows': function(val) {
				this.currentData.rows = val;
				/* 告诉父窗口改变rows数量 */
				this.$emit('paginationChange', this.currentData);
			}
		},
		/**
		 * @type {{setCurrent: Function,pageJump: Function}}
		 * setCurrent 设置当前
		 * pageJump 分页调整事件
		 */
		methods: {
			setCurrent: function (idx,isPrompt) {
				let me = this;
				if (me.current !== idx && idx > 0 && idx <= me.page) {
					me.current = idx;
					me.currentData.page = idx;
					me.$emit('paginationChange', me.currentData);
				} else {
					alert('页码不存在！');
				}
			},
			pageJump() {
				let me = this;
				let curPage = Number(me.$refs.pageJump.value);
				if (curPage && me.current !== curPage && curPage > 0 && curPage < me.currentData.page + 1) {
					me.current = curPage;
					me.currentData.page = curPage;
					/* 告诉父窗口改变rows数量 */
					this.$emit('paginationChange', me.currentData);
				}
			}
		},
		mounted() {
            console.log('this');
            console.log(this);
			let me = this;
			/* 获取分页输入框按钮 */
			let inputEle = me.$refs.pageJump;
			/* 获取批量操作按钮 */
			let batchButtons = me.$refs.batchButton;
			if (inputEle) {
				/* 为分页输入框绑定键盘按下事件 */
				inputEle.onkeydown = function (evt) {
					const keycode = evt.keyCode;
					if (keycode === 13) {
						let val = inputEle.value;
						/* 调用函数向负组件传递修改的数据 */
						me.setCurrent(val);
					}
				};
			}
			if (batchButtons && batchButtons.length) {
				/* 循环遍历批量操作按钮为按钮绑定点击事件 */
				for (let b = 0,len = batchButtons.length;b < len;b++) {
					let button = batchButtons[b];
					let buttonData = me.currentData.batchButtons;
					button.onclick = function(evt) {
						let target = evt.target;
						let id = target.getAttribute('now-id');
						buttonData.map(it => {
							/* 如果当前元素的id等于批量材质按钮数据中某一项的id，告诉父组件点击的按钮信息 */
							it.id === id && me.$emit('batchButtonClick', it);
						});
					}
				}
			}
		},
		created() {
			let me = this;
			/* 将默认数据和传入数据拼接到一起 */
			me.currentData = Object.assign(me.currentData,me.paginationData);
			/* 设置页数为总条数/页显示条数 */
			me.current = me.currentData.page;
		}
	}
</script>