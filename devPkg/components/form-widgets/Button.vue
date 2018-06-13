<template>
	<div class="button-box" @click="clickEvt($event)">
		<div class="button" :class="[size,{'disabled':disabled},type]">
			<slot v-if="isHaveCustomContent"></slot>
			<span v-else>{{text}}</span>
		</div>
	</div>
</template>

<script>
  import {Component} from "vue-property-decorator";
  import FormWidget from '../base/FormWidget.vue';

  @Component({
    props: {
      text: {  //按钮文字
        type: String,
        default: ''
      },
      type: {  //按钮样式
        type: String,
        default: 'default'
      }
    }
  })
  export default class Button extends FormWidget {
    widgetName = 'button';

    get isHaveCustomContent() {
      return !!this.$slots.default;
    }

    clickEvt($event) {
      if (!this.isDisabled()) {
        console.log(this.$slots.default);
        this.emitEvent({action: "click", $event});
      }
    }
  }
</script>