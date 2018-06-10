/***********************************************
 * Created by zhangtao on 2018/05/16
 ************************************************/

import { Component, Vue } from "vue-property-decorator";

@Component
export default class DraggableMixin extends Vue {
    isChangePositionByDraggable = false;

    mouseDownListener = null;
    mouseUpListener = null;
    mouseMoveListener = null;

    draggableElement = null;
    targetElement = null;

    isBeginDraggable = false;

    initDraggableTargetPosition = null;
    initMousePositionX = 0;
    initMousePositionY = 0;

    bindDraggableEvent(draggableElement, targetElement) {
        this.mouseDownListener = this.handleMouseDown.bind(this);
        this.mouseUpListener = this.handleMouseUp.bind(this);
        this.mouseMoveListener = this.handleMouseMove.bind(this);

        draggableElement.addEventListener("mousedown", this.mouseDownListener);
        document.addEventListener("mouseup", this.mouseUpListener);
        document.addEventListener("mousemove", this.mouseMoveListener);

        this.draggableElement = draggableElement;
        this.targetElement = targetElement;
    }

    beforeDestroy() {
        if (this.draggableElement !== null) {
            this.draggableElement.removeEventListener("mousedown", this.mouseDownListener);
            document.removeEventListener("mouseup", this.mouseUpListener);
            document.removeEventListener("mousemove", this.mouseMoveListener);
        }
    }

    handleMouseDown($event) {
        this.isBeginDraggable = true;
        this.initDraggableTargetPosition = this.targetElement.getBoundingClientRect();
        this.initMousePositionX = $event.screenX;
        this.initMousePositionY = $event.screenY;
    }

    handleMouseUp() {
        this.isBeginDraggable = false;
    }

    handleMouseMove($event) {
        if (this.isBeginDraggable) {
            let currentX = $event.screenX,
                currentY = $event.screenY,
                xDistance = currentX - this.initMousePositionX,
                yDistance = currentY - this.initMousePositionY,
                targetX = this.initDraggableTargetPosition.left + xDistance,
                targetY = this.initDraggableTargetPosition.top + yDistance;

            if (!this.isChangePositionByDraggable) {
                this.isChangePositionByDraggable = true;
                this.$nextTick(() => {
                    this.updateTargetPosition({x: targetX, y: targetY});
                });
            } else {
                this.updateTargetPosition({x: targetX, y: targetY});
            }
        }
    }

    updateTargetPosition(position) {
        this.targetElement.style.left = position.x + "px";
        this.targetElement.style.top = position.y + "px";
    }

}
