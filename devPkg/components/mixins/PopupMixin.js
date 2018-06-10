import { Component, Vue } from "vue-property-decorator";

import { isArray } from "../helper/util";

const POSITION = {
    TOP: "top",
    RIGHT: "right",
    BOTTOM: "bottom",
    LEFT: "left",
    WINDOW_TOP: "windowTop",
    WINDOW_CENTER: "windowCenter",
    WINDOW_TOP_RIGHT: "windowTopRight",
    WINDOW_TOP_LEFT: "windowTopLeft",
    WINDOW_BOTTOM_RIGHT: "windowBottomRight",
    WINDOW_BOTTOM_LEFT: "windowBottomLeft"
}

@Component({
    props: {
        zIndex: {
            type: Number
        },

        popupPosition: {
            type: [String, Array],
            default: "bottom"
        },

        horizontalOffset: {
            type: Number,
            default: 10
        },

        verticalOffset: {
            type: Number,
            default: 5
        }
    }
})
export default class Popup extends Vue {
    showPopup(popupElement, targetElement) {
        if (isArray(this.popupPosition)) {
            this.showFixedPosition(popupElement, targetElement);
        } else {
            this.showRelativePosition(popupElement, targetElement);
        }
    }

    showFixedPosition(popupElement, targetElement) {
        /* tslint: disable: no-empty */
    }

    showRelativePosition(popupElement, targetElement) {
        switch (this.popupPosition) {
            case POSITION.TOP:
                this.showPopupInTop(popupElement, targetElement);
                break;
            case POSITION.RIGHT:
                this.showPopupInRight(popupElement, targetElement);
                break;
            case POSITION.BOTTOM:
                if (this.isCanShowPopupInBottom(popupElement, targetElement)) {
                    this.showPopupInBottom(popupElement, targetElement);
                } else {
                    this.showPopupInTop(popupElement, targetElement);
                }
                break;
            case POSITION.LEFT:
                this.showPopupInLeft(popupElement, targetElement);
                break;
            case POSITION.WINDOW_TOP:
                this.showPopupInWindowTop(popupElement, targetElement);
                break;
            case POSITION.WINDOW_CENTER:
                this.showPopupInWindowCenter(popupElement, targetElement);
                break;
            case POSITION.WINDOW_TOP_RIGHT:
                this.showPopupInWindowTopRight(popupElement, targetElement);
                break;
            case POSITION.WINDOW_TOP_LEFT:
                this.showPopupInWindowTopLeft(popupElement, targetElement);
                break;
            case POSITION.WINDOW_BOTTOM_RIGHT:
                this.showPopupInWindowBottomRight(popupElement, targetElement);
                break;
            case POSITION.WINDOW_BOTTOM_LEFT:
                this.showPopupInWindowBottomLeft(popupElement, targetElement);
                break;
            default:
                this.showPopupInBottom(popupElement, targetElement);
                break;
        }
    }

    /**
     * 获取弹出框的位置信息
     * @param {HTMLElement} targetElement
     * @param {HTMLElement} popupElement
     */
    getPopupPositionInfo(popupElement, targetElement) {
        let targetWidth = targetElement ? targetElement.offsetWidth : 0,
            targetHeight = targetElement ? targetElement.offsetHeight : 0,
            targetPosition = targetElement ? targetElement.getBoundingClientRect() :
                {top: 0, left: 0, width: 0, height: 0, right: 0, bottom: 0},
            popupWidth = popupElement.offsetWidth,
            popupHeight = popupElement.offsetHeight;

        return {
            targetWidth,
            targetHeight,
            targetPosition,
            popupWidth,
            popupHeight,
            horizontalOffset: this.horizontalOffset,
            verticalOffset: this.verticalOffset
        };
    }

    /**
     * 在元素上面显示弹出元素
     * @param {HTMLElement} targetElement
     * @param {HTMLElement} popupElement
     */
    showPopupInTop(popupElement, targetElement) {
        let size = this.getPopupPositionInfo(popupElement, targetElement);

        popupElement.style.top = `${size.targetPosition.top - size.popupHeight - size.verticalOffset}px`;
        popupElement.style.left = `${size.targetPosition.left - size.popupWidth / 2 + size.targetWidth / 2}px`;

    }

    /**
     * 在元素右边显示弹出元素
     * @param {HTMLElement} targetElement
     * @param {HTMLElement} popupElement
     */
    showPopupInRight(popupElement, targetElement) {
        let size = this.getPopupPositionInfo(popupElement, targetElement);

        popupElement.style.top = `${size.targetPosition.top - size.popupHeight / 2 + size.targetHeight / 2}px`;
        popupElement.style.left = `${size.targetPosition.left + size.targetWidth + size.horizontalOffset}px`;
    }

    /**
     * 判断是否可以在元素下方显示
     * @param {HTMLElement} targetElement
     * @param {HTMLElement} popupElement
     */
    isCanShowPopupInBottom(popupElement, targetElement) {
        let size = this.getPopupPositionInfo(popupElement, targetElement);

        return screen.availHeight > (size.targetPosition.bottom + size.verticalOffset + size.popupHeight);
    }

    /**
     * 在元素下方显示元素
     * @param {HTMLElement} targetElement
     * @param {HTMLElement} popupElement
     */
    showPopupInBottom(popupElement, targetElement) {
        let size = this.getPopupPositionInfo(popupElement, targetElement);

        popupElement.style.top = `${size.targetPosition.bottom + size.verticalOffset}px`;
        popupElement.style.left = `${size.targetPosition.left - size.popupWidth / 2 + size.targetWidth / 2}px`;
    }

    /**
     * 在元素左边显示弹出元素
     * @param {HTMLElement} targetElement
     * @param {HTMLElement} popupElement
     */
    showPopupInLeft(popupElement, targetElement) {
        let size = this.getPopupPositionInfo(popupElement, targetElement);

        popupElement.style.top = `${size.targetPosition.top - size.popupHeight / 2 + size.targetHeight / 2}px`;
        popupElement.style.left = `${size.targetPosition.left - size.popupWidth - size.horizontalOffset}px`;
    }

    /**
     * 在窗口上方显示弹出元素
     * @param {HTMLElement} targetElement
     * @param {HTMLElement} popupElement
     */
    showPopupInWindowTop(popupElement, targetElement) {
        let size = this.getPopupPositionInfo(popupElement, targetElement),
            bodyWidth = window.document.body.offsetWidth;

        popupElement.style.top = `${size.verticalOffset}px`;
        popupElement.style.left = `${bodyWidth / 2 - size.popupWidth / 2}px`;
    }

    /**
     * 在窗口中心显示元素
     * @param {HTMLElement} targetElement
     * @param {HTMLElement} popupElement
     */
    showPopupInWindowCenter(popupElement, targetElement) {
        let size = this.getPopupPositionInfo(popupElement, targetElement),
            body = window.document.body,
            bodyWidth = body.offsetWidth,
            bodyHeight = body.offsetHeight;

        popupElement.style.left = `${bodyWidth / 2 - size.popupWidth / 2}px`;
        popupElement.style.top = `${bodyHeight / 2 - size.popupHeight / 2}px`;
    }

    /**
     * 在窗口右上角显示弹出框
     * @param {HTMLElement} targetElement
     * @param {HTMLElement} popupElement
     */
    showPopupInWindowTopRight(popupElement, targetElement) {
        popupElement.style.top = this.verticalOffset + "px";
        popupElement.style.right = this.horizontalOffset + "px";
    }

    /**
     * 在窗口左上角显示弹出框
     * @param {HTMLElement} targetElement
     * @param {HTMLElement} popupElement
     */
    showPopupInWindowTopLeft(popupElement, targetElement) {
        popupElement.style.top = this.verticalOffset + "px";
        popupElement.style.left = this.horizontalOffset + "px";
    }

    /**
     * 在窗口右下角显示弹出框
     * @param {HTMLElement} targetElement
     * @param {HTMLElement} popupElement
     */
    showPopupInWindowBottomRight(popupElement, targetElement) {
        popupElement.style.bottom = this.verticalOffset + "px";
        popupElement.style.right = this.horizontalOffset + "px";
    }

    /**
     * 在窗口左下角显示弹出框
     * @param {HTMLElement} targetElement
     * @param {HTMLElement} popupElement
     */
    showPopupInWindowBottomLeft(popupElement, targetElement) {
        popupElement.style.bottom = this.verticalOffset + "px";
        popupElement.style.left = this.horizontalOffset + "px";
    }
}
