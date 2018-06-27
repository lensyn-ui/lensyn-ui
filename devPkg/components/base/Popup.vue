/***********************************************
* Created by zhangtao on 2018/06/27
************************************************
<script>
    import { Component } from "vue-property-decorator";
    import { mixins} from "vue-class-component";

    import Widget from "./Widget";
    import PopupMixin from "../mixins/PopupMixin";

    @Component
    export default class Popup extends mixins(PopupMixin, Widget) {
    }

</script>
