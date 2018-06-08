<template>
	<div id="loading" :style="{backgroundColor:bgColor}" v-if="showLoading" :class="{fixed:fixed}">
		<div class="content" :style="{height:name!==''?'84px':'64px'}">
			<p v-if="name!==''">{{name}}</p>
			<img src="./loading.gif">
		</div>
	</div>
</template>

<script>
  export default {
    name: "loading",
    props: {
      showLoading: {
        type: Boolean,
        default: false
      },
      fixed: {
        type: Boolean,
        default: true
      },
      name: {
        type: String,
        default: ''
      },
      bgColor: {
        type: String,
        default: 'rgba(0, 0, 0, .3)'
      }
    }
  }
</script>

<style scoped lang="less">
	#loading {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		&.fixed {
			position: fixed;
		}
		.content {
			width: 64px;
			height: 64px;
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			margin: auto;
			text-align: center;
			p {
				height: 20px;
				line-height: 20px;
			}
			img {
				width: 64px;
				height: 64px;
				float: left;
			}
		}
	}
</style>