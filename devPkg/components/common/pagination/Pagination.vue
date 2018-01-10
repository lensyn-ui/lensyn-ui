/****************************************************************************
* Created by huanghuaqiao on 2017/12/05                                     *
* 分页公共组件                                                                *
*****************************************************************************/
<template>
	<div class="component-content" ref="containerNode">
		<span class="title">分页</span>
		<span class="desc">列表进行分页展示，根据传入的当前页、每页显示的条数和总条数进行数据展示</span>
		<span class="sub">分页使用方法</span>
		<span class="desc">引入分页组件，传入对应参数</span>
		<div id="basicLayout" class="box">
			<div class="box-content">
				<!-- 分页组件 -->
				<ls-pagination :paginationData="paginationData" @paginationChange="paginationChange" @batchButtonClick="batchButtonClick"></ls-pagination>
			</div>
			<div class="box-tagger" ref="boxTagger" :style="[{'height': showContent ? 'auto' : '0'}]">
                <pre>
                    <p class="txt">vue 页面</p>
                    &lt;ls-pagination :paginationData="paginationData" @paginationChange="paginationChange" @batchButtonClick="batchButtonClick"&gt&lt;/ls-pagination&gt;
                    <p class="txt">页面数据</p>
                    paginationData: {
						total: 100,
						rows: 20,
						page: 2,
						pageGroup: 7,
						rowsData: [
							{value: 10,text: '10条/页'},
							{value: 20,text: '20条/页'},
							{value: 30,text: '30条/页'},
							{value: 40,text: '40条/页'},
							{value: 50,text: '50条/页'}
						],
						batchButtons: [
							{id: 'batchDelete',text: '批量删除'}
						],
						showBatchButtons: true
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
		<span class="sub">传入参数类型说明</span>
		<ul class="grid">
			<li class="row" v-for="item in params">
				<div v-for="(it,i) in item" :class="[it.cls]" :style="[{flex: i === 0 ? '0 0 20%' : i === 1 ? '0 0 70%' : '10%'}]" v-html="it.name"></div>
			</li>
		</ul>
	</div>
</template>
<script type="es6">
	export default{
		data(){
			return {
				paginationData: {
					total: 100,
					rows: 20,
					page: 2,
					pageGroup: 7,
					rowsData: [
						{value: 10,text: '10条/页'},
						{value: 20,text: '20条/页'},
						{value: 30,text: '30条/页'},
						{value: 40,text: '40条/页'},
						{value: 50,text: '50条/页'}
					],
					batchButtons: [
						{id: 'batchDelete',text: '批量删除'}
					],
					showBatchButtons: true
				},
				showContent: false,
				params: [
					[{name: "参数", cls: "col"}, {name: "说明", cls: "col mark"}, {name: "类型", cls: "col"}],
					[{name: "total", cls: "col"}, {name: "总条数", cls: "col mark"}, {name: "number", cls: "col"}],
					[{name: "page", cls: "col"}, {name: "当前页码", cls: "col mark"}, {name: "number", cls: "col"}],
					[{name: "pageGroup", cls: "col"}, {name: "页码按钮列表显示数量", cls: "col mark"}, {name: "number(odd)", cls: "col"}],
					[{name: "rows", cls: "col"}, {name: "每页显示条数", cls: "col mark"}, {name: "number", cls: "col"}],
					[{name: "rowsData", cls: "col"}, {name: "每页显示条数下拉数据，格式为[{value: 10,text: '10条/页'},t{value: 20,text: '20条/页'}]", cls: "col mark"}, {name: "array", cls: "col"}],
					[{name: "batchButtons", cls: "col"}, {name: "批量操作按钮数据，数组中每一个对象为一个按钮渲染数据格式为[{id: 'batchDelete',text: '批量删除',attr: [{'name': 'test'}]}]", cls: "col mark"}, {name: "array", cls: "col"}],
					[{name: "paginationBackground", cls: "col"}, {name: "分页背景色", cls: "col mark"}, {name: "string", cls: "col"}],
					[{name: "paginationPosition", cls: "col"}, {name: "分页内容显示位置", cls: "col mark"}, {name: "string", cls: "col"}],
					[{name: "pageGroupHoverBackground", cls: "col"}, {name: "页码列表数字点击时的背景色", cls: "col mark"}, {name: "string", cls: "col"}],
					[{name: "pageGroupHoverColor", cls: "col"}, {name: "页码列表数字点击时的字体颜色", cls: "col mark"}, {name: "string", cls: "col"}],
					[{name: "pageGroupborderColor", cls: "col"}, {name: "页码列表边框颜色", cls: "col mark"}, {name: "string", cls: "col"}],
					[{name: "hasPageGroupborder", cls: "col"}, {name: "页码列表是否有边框", cls: "col mark"}, {name: "boolean", cls: "col"}],
					[{name: "jumpBeforeContent", cls: "col"}, {name: "跳转输入框前面显示内容", cls: "col mark"}, {name: "string", cls: "col"}],
					[{name: "jumpAfterContent", cls: "col"}, {name: "跳转输入框后面显示内容", cls: "col mark"}, {name: "string", cls: "col"}],
					[{name: "showJumpPrompt", cls: "col"}, {name: "是否显示页码跳转输入框", cls: "col mark"}, {name: "boolean", cls: "col"}],
					[{name: "showBatchButtons", cls: "col"}, {name: "是否显示批量操作按钮", cls: "col mark"}, {name: "boolean", cls: "col"}]
				]
			}
		},
		computed: {
		
		},
		watch: {
		
		},
		/**
		 * @type {{}}
		 */
		methods: {
			paginationChange: function (data) {
				console.log(data);
			},
			batchButtonClick: function(buttonInfo) {
				console.log(buttonInfo);
			},
			footerEvt(){
				let me = this;
				me.showContent = !me.showContent;
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
			});
		}
	}
</script>