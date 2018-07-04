import Util from "./GridUtil";

class StyleSheet {
    constructor(selectorPrefix) {
        this.selectorPrefix = selectorPrefix;
        this._init();
    }

    _init() {
        this._ruleIndexs = [];
        this.style = document.createElement("style");
        document.head.appendChild(this.style);
        this.sheet = this.style.sheet;
    }

    _buildFullSelector(selector) {
        return `.${this.selectorPrefix} ${selector}`;
    }

    _buildFullRule(selector, rule) {
        return `${selector} {${rule}}`;
    }

    addRule(partSelector, rule) {
        let selector = this._buildFullSelector(partSelector),
            fullRule = this._buildFullRule(selector, rule),
            index = this._ruleIndexs.length,
            self = this;

        this._ruleIndexs[index] = this.sheet.insertRule(fullRule, index);

        return {
            remove() {
                self.removeRule(index);
            },

            set(property,value) {
                if (!Util.isUndefined(self._ruleIndexs[index])) {
                    self.sheet.cssRules[self._ruleIndexs[index]].style[property] = value;
                }
            }
        };
    }

    removeRule(index) {
        let realIndex = this._ruleIndexs[index];

        if (Util.isUndefined(realIndex)) {
            return;
        }

        this.sheet.removeRule(realIndex);
        this._ruleIndexs[index] = undefined;

        for (let i = index + 1, j = this._ruleIndexs.length; i < j; ++i) {
            if (this._ruleIndexs[i] > realIndex) {
                this._ruleIndexs[i]--;
            }
        }
    }

    destroy() {
        document.head.removeChild(this.style);
    }
}

export default StyleSheet;