class TooltipClass {
  constructor(el, bind) {
    this.currentElement = el;  // tooltip 的元素
    this.bindValue = bind.value; // tooltip 的内容
    this.bindPosition = bind.rawName.split('.')[1]; // tooltip 定位的位置
    this.tooltipPadding = 0; // tooltip 距离元素的距离
    this.tooltip = null;
    this._init = null;
    this.timer = null;
    this.addListen();
  }

  // 初始化 并显示tooltip
  show() {
    if (!this._init) {
      this.init();
    }
    clearTimeout(this.timer);
    this.tooltip.setAttribute('class', 'lensyn_tooltip show');
  }

  hide() {
    this.tooltip.setAttribute('class', 'lensyn_tooltip');
    this.timer = setTimeout(() => {
      this._init = false;
      document.body.removeChild(this.tooltip);
    }, 10000)
  }

  // 删除 tooltip
  destroy() {
    this._init = false;
    document.body.removeChild(this.tooltip);
    this.currentElement.removeEventListener('mouseenter', this.show);
    this.currentElement.removeEventListener('mouseleave', this.hide);
  }

  setContent(msg) {
    if (this._init) {
      this.tooltip.innerHTML = msg;
    } else {
      this.init();
    }
  }

  addListen() {
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.currentElement.addEventListener('mouseenter', this.show);
    this.currentElement.addEventListener('mouseleave', this.hide);
  }

  // 获取tooltip定义的位置信息 没有时 给定默认值
  getTooltipPosition(position) {
    switch (position) {
      case 'top':
        this.setTooltipPositionTop();
        break;
      case 'bottom':
        this.setTooltipPositionBottom();
        break;
      case 'left':
        this.setTooltipPositionLeft();
        break;
      case 'right':
        this.setTooltipPositionRight();
        break;
      default:
        this.setTooltipPositionTop();
        break;
    }
  }

  // 初始化tooltip
  init() {
    let wrapperTooltip = document.createElement('div');
    wrapperTooltip.innerHTML = this.bindValue;
    this.tooltip = wrapperTooltip;
    document.body.appendChild(this.tooltip);
    this._init = true;
    this.getTooltipPosition(this.bindPosition);
  }

  // 上面显示
  setTooltipPositionTop() {
    const info = this.currentElement.getBoundingClientRect();
    const t = info.top - this.tooltip.offsetHeight - this.tooltipPadding;
    if (t < 0) {
      this.setTooltipPositionBottom();
      return
    }
    this.tooltip.style.left = `${info.left}px`;
    this.tooltip.style.top = `${t}px`;
  }

  // 下面显示
  setTooltipPositionBottom() {
    const info = this.currentElement.getBoundingClientRect();
    const b = info.top + info.height + this.tooltipPadding;
    if (b > window.innerHeight) {
      this.setTooltipPositionTop();
      return;
    }
    this.tooltip.style.left = `${info.left}px`;
    this.tooltip.style.top = `${b}px`;
  }

  // 左边显示
  setTooltipPositionLeft() {
    const info = this.currentElement.getBoundingClientRect();
    const l = info.left - this.tooltip.offsetWidth - this.tooltipPadding;
    if (l < 0) {
      this.setTooltipPositionRight();
      return;
    }
    this.tooltip.style.left = `${l}px`;
    this.tooltip.style.top = `${info.top}px`;
  }

  // 右边显示
  setTooltipPositionRight() {
    const info = this.currentElement.getBoundingClientRect();
    const l = info.left + info.width + this.tooltipPadding;
    if (l > window.innerWidth) {
      this.setTooltipPositionLeft();
      return;
    }
    this.tooltip.style.left = `${info.left + info.width + this.tooltipPadding}px`;
    this.tooltip.style.top = `${info.top}px`;
  }

}

const tooltipOptions = {
  bind(el, binding) {
    let tooltip = new TooltipClass(el, binding);
    el._tooltip = tooltip;
  },
  componentUpdated(el, binding) {
    if (binding.oldValue !== binding.value) {
      el._tooltip.setContent(binding.value);
    }
  },
  unbind(el) {
    el._tooltip.destroy();
  }
};

export default tooltipOptions;
