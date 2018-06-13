<template>
	<div class="loading" :style="{backgroundColor:bgColor}" v-if="showLoading" :class="{fixed:fixed}">
		<div class="content" :style="{height:name!==''?'84px':'64px'}">
			<p v-if="describe!==''">{{describe}}</p>
			<img src="../../images/components/loading.gif">
		</div>
	</div>
</template>

<script>
	import {Vue, Component, Prop} from "vue-property-decorator";
	import Widget from '../base/Widget.vue'
	@Component({
		props: {
			showLoading: {
				type: Boolean,
				default: false
			},
			fixed: {
				type: Boolean,
				default: true
			},
			describe: {
				type: String,
				default: ''
			},
			bgColor: {
				type: String,
				default: 'rgba(0, 0, 0, .3)'
			}
		}
	})

	export default class Loading extends Widget {
	}
</script>