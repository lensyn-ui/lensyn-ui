/*********************************************************************
* Created by zhangtao on 2018/1/16       
* Modify  by zhangtao on 2018/1/20
*    增加在下、左、右三个方向显示，
*    并在对应方向空间不足时自动切换到另外一边显示                               
*********************************************************************/
class Tooltip {
    constructor(el, binding) {
        this._target = el;
        this._content = binding.value;
        this._tooltipPosition = this._getTooltipPositionByModifiers(binding.modifiers);
        this._isInit = false;
        this._arrowBorderWidth = null;
        this._bindEventHandler();
    }

    /**
     * 初始化 tooltip
     */
    _init() {
        let container = document.createElement("div"),
            content = document.createElement("div"),
            msg = document.createElement("div");

        container.setAttribute("class", "tooltip");
        content.setAttribute("class", "tooltip-content");
        msg.setAttribute("class", "msg");

        content.appendChild(msg);
        container.appendChild(content);

        document.body.appendChild(container);

        this._containerEl = container;
        this._contentEl = content;
        this._msgEl = msg;
    }

    _getTooltipPositionByModifiers(modifiers) {
        if (modifiers.left) {
            return "left";
        } else if (modifiers.right) {
            return "right";
        } else if (modifiers.bottom) {
            return "bottom";
        } else {
            return "top";
        }
    }

    /**
     * 绑定事件
     */
    _bindEventHandler() {
        this._onMouseOver = this._onMouseOver.bind(this);
        this._onMouseOut = this._onMouseOut.bind(this);

        this._target.addEventListener("mouseover", this._onMouseOver);
        this._target.addEventListener("mouseout", this._onMouseOut);        
    }

    _onMouseOver() {
        this.show();
    }

    _onMouseOut() {
        this.hide();
    }

    /**
     * 显示 tooltip
     * 如果对应的 tooltip 不存在则，创建该元素
     */
    show() {
        if (!this._isInit) {
            this._init();
            this.setContent(this._content);
            this._isInit = true;
        }
        this._containerEl.setAttribute("class", "tooltip show");
        setTimeout(() => {
            this._updateTooltipPosition();
        });

    }

    _updateTooltipPosition() {
        let size = this._getToolltipSizeInfo();

        switch (this._tooltipPosition) {
            case "left":
                if (this._isCanShowTooltipInLeft(size)) {
                    this._showTooltipInLeft();
                } else {
                    this._showTooltipInRight();
                }
                break;
            case "right":
                if (this._isCanShowTooltipInRight(size)) {
                    this._showTooltipInRight();
                } else {
                    this._showTooltipInLeft();
                }
                break;
            case "bottom":
                if (this._isCanShowTooltipInBottom(size)) {
                    this._showTooltipInBottom();
                } else {
                    this._showTooltipInTop();
                }
                break;
            default:
                if (this._isCanShowTooltipInTop(size)) {
                    this._showTooltipInTop();
                } else {
                    this._showTooltipInBottom();
                }
                break;
        }
    }

    _getToolltipSizeInfo() {
        let targetWidth = this._target.offsetWidth,
            targetHeight = this._target.offsetHeight,
            targetPosition = this._target.getBoundingClientRect(),
            tooltipHeight = this._containerEl.offsetHeight,
            tooltipWidth = this._containerEl.offsetWidth,
            arrowHeight = this._getArrowBorderWidth() * 2;

        return {
            targetWidth,
            targetHeight,
            targetPosition,
            tooltipHeight,
            tooltipWidth,
            arrowHeight
        };
    }

    /**
     * 判断是否有足够的空间在底部显示 tooltip
     * @param {object} size
     */
    _isCanShowTooltipInBottom(size) {
        return screen.availHeight > (size.targetPosition.bottom + size.arrowHeight + size.tooltipHeight);
    }

    /**
     * 在元素下方显示 tooltip
     */
    _showTooltipInBottom() {
        let size = this._getToolltipSizeInfo();

        this._containerEl.style.top = `${size.targetPosition.bottom + size.arrowHeight}px`;
        this._containerEl.style.left = `${size.targetPosition.left - size.tooltipWidth / 2 + size.targetWidth / 2}px`;
        this._containerEl.setAttribute("class", "tooltip show active bottom");
    }

    /**
     * 判断是否可以在上方显示 tooltip
     * @param {object} size
     */
    _isCanShowTooltipInTop(size) {
        return size.targetPosition.top > (size.tooltipHeight + size.arrowHeight)
    }

    /**
     * 在元素上方显示 tooltip
     */
    _showTooltipInTop() {
        let size = this._getToolltipSizeInfo();

        this._containerEl.style.top = `${size.targetPosition.top - size.tooltipHeight - size.arrowHeight}px`;
        this._containerEl.style.left = `${size.targetPosition.left - size.tooltipWidth / 2 + size.targetWidth / 2}px`;
        this._containerEl.setAttribute("class", "tooltip show active top");
    }

    /**
     * 判断是否可以在左边显示 tooltip
     * @param {object} size
     * @returns {boolean}
     */
    _isCanShowTooltipInLeft(size) {
        return size.targetPosition.left > (size.tooltipWidth + size.arrowHeight);
    }

    /**
     * 在元素左边显示 tooltip
     */
    _showTooltipInLeft() {
        let size = this._getToolltipSizeInfo();

        this._containerEl.style.top = `${size.targetPosition.top - size.tooltipHeight / 2 + size.targetHeight / 2}px`;
        this._containerEl.style.left = `${size.targetPosition.left - size.tooltipWidth - size.arrowHeight}px`;
        this._containerEl.setAttribute("class", "tooltip show active left");
    }

    /**
     * 判断是否可以在右边显示 tooltip
     * @param {object} size
     * @returns {boolean}
     */
    _isCanShowTooltipInRight(size) {
        return screen.availWidth > (size.targetPosition.right + size.tooltipWidth + size.arrowHeight); 
    }

    /**
     * 在元素右边显示 tooltip
     */
    _showTooltipInRight() {
        let size = this._getToolltipSizeInfo();

        this._containerEl.style.top = `${size.targetPosition.top - size.tooltipHeight / 2 + size.targetHeight / 2}px`;
        this._containerEl.style.left = `${size.targetPosition.left + size.targetWidth + size.arrowHeight}px`;
        this._containerEl.setAttribute("class", "tooltip show active right");        
    }

    /**
     * 获取箭头边框的宽度
     */
    _getArrowBorderWidth() {
        if (this._arrowBorderWidth === null) {
            let widthStr = getComputedStyle(this._contentEl, "before").getPropertyValue("border-width");            
            this._arrowBorderWidth = parseFloat(widthStr, "10");
        }
        return this._arrowBorderWidth;
    }

    /**
     * 隐藏 tooltip
     */
    hide() {
        this._containerEl.setAttribute("class", "tooltip");        
    }

    /**
     * 设置 tooltip 的内容
     * @param {string} str 
     */
    setContent(str) {
        this._msgEl.innerHTML = str;
    }

    /**
     * 销毁 tooltip
     * 如果在销毁时未滑过目标控件则还未添加对应的结点到页面上，所以需要判断
     */
    destroy() {
        this._target.removeEventListener("mouseover", this._onMouseOver);
        this._target.removeEventListener("mouseout", this._onMouseOut);
        if (this._isInit) {
            document.body.removeChild(this._containerEl);            
        }
    }
}


export default {
    _tooltip: null,

    bind(el, binding) {
        let tooltip = new Tooltip(el, binding);
        el._tooltip = tooltip;
    },

    unbind(el) {
        if (el._tooltip) {
            el._tooltip.destroy();
        }
    }
};