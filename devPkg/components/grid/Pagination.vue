<template>
    <div class="pagination">
		<div class="pagination-msg">
			共有 {{total}} 条，每页显示 
			<select v-model="perpage" @change="onChangePerpage">
				<option v-for="item in pageSelections" :selected="perpage === item.value" 
				    :key="item.value" :value="item.value">{{item.text}}</option>
		    </select>条
		</div>

		<ul class="pagination-list">
			<li :class="{disabled: this.isDisabledPreviousPage}" @click="jumpToFirstPage">&lt;&lt;</li>
			<li :class="{disabled: this.isDisabledPreviousPage}" @click="jumpToPreviousPage">&lt;</li>

			<li v-for="item in showPages" :class="{active: item.value === currentPage}" 
			    :key="item.value" @click.stop="jumpToPage(item.value)">{{item.label}}</li>

			<li :class="{disabled: this.isDisableNextPage}" @click="jumpToNextPage">&gt;</li>
			<li :class="{disabled: this.isDisableNextPage}" @click="jumpToLastPage">&gt;&gt;</li>
		</ul>

		<div class="pagination-jump">
			<input v-model="jumpPage" />
			<span class="jump-btn" @click="onClickJumpBtn"></span>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			total: {
				type: Number,
				default: 100
			},

			pageSelections: {
				type: Array,
				default: () => {
					return [
						{ text: 10, value: 10 },
						{ text: 50, value: 50 },
						{ text: 100, value: 100 },
						{ text: 200, value: 200 },
						{ text: 500, value: 500 }
					];
				}
			},

			showPageCount: {
				type: Number,
				default: 4
			},

			currentPage: {
			    type: Number,
				default: 1
			},

			perpageCount: {
			    type: Number
			}
		},

		data() {
			return {
				perpage: 10,
				totalPage: 0,
				jumpPage: "",
				showPages: []
			};
		},

		computed: {
			isDisabledPreviousPage() {
				return this.currentPage === 1;
			},

			isDisableNextPage() {
				return this.currentPage === this.totalPage;
			}
		},

		watch: {
			total() {
				this.refreshTotalPage();
				this.refreshShowPages();
			},

			perpageCount() {
			    this.perpage = this.perpageCount;
                this.refreshTotalPage();
                this.refreshShowPages();
			},

			currentPage() {
			    this.refreshShowPages();
			}
		},

		created() {
			this.perpage = this.perpageCount;
			this.refreshTotalPage();
			this.refreshShowPages();
		},

		methods: {
			refreshTotalPage() {
				this.totalPage = Math.ceil(this.total / this.perpage);
			},

			refreshShowPages() {
				let previousCount = Math.floor(this.showPageCount / 2),
					nextCount = this.showPageCount - previousCount,
					currentPage = this.currentPage,
					totalPage = this.totalPage,
					startPage = 0,
					endPage = 0,
					result = [];

				startPage = currentPage <= previousCount ? 1 : currentPage - previousCount;
				endPage = currentPage + nextCount >= totalPage ? totalPage : currentPage + nextCount;

				for (let i = startPage; i <= endPage; ++i) {
				    result.push({ value: i, label: i });
				}

				this.showPages = result;
			},

			jumpToFirstPage() {
				if (!this.isDisabledPreviousPage) {
				    this.jumpToPage(1);
				}
			},

			jumpToPreviousPage() {
				if (!this.isDisabledPreviousPage) {
				    this.jumpToPage(this.currentPage - 1);
				}
			},

			jumpToLastPage() {
				if (!this.isDisableNextPage) {
					this.jumpToPage(this.totalPage);
				}
			},

			jumpToNextPage() {
				if (!this.isDisableNextPage) {
					this.jumpToPage(this.currentPage + 1);
				}
			},

			jumpToPage(page) {
				this.emitEvent("jump", {toPage: page});
			},

			onChangePerpage() {
				this.emitEvent("perpage");
			},

			onClickJumpBtn() {
				if (this.jumpPage) {
					let page = Number(this.jumpPage);

					if (page >= 1 && page <= this.totalPage && page !== this.currentPage) {
						this.jumpToPage(page);
					}
				}
			},

			emitEvent(action, event) {
			    let data = {action, page: this.currentPage, rows: this.perpage, totalPage: this.totalPage};
			    if (event) {
			        data = {...data, ...event};
				}
				this.$emit("paginationEvt", data);
			}
		}
	}
</script>

