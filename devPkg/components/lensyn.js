/* 打包入口文件 */

/* 样式表 --- start --- */
import "../styles/components/index.less";

/* 组件 --- start --- */
import * as LensynComponents from "./index";
/* 组件 --- end --- */

/* mixins --- start --- */
export { default as PopupMixin } from  "./mixins/PopupMixin";
export { default as DraggableMixin } from "./mixins/DraggableMixin";
/* mixins --- end --- */

/* 全局 --- start --- */
import GlobalComponent from "./global";
/* 全局 --- end --- */

const COMPONENT_PREFIX = "ls";
const HYPHENATE_RE = /\B([A-Z])/g;
const hyphenate = (str) => {
    return str.replace(HYPHENATE_RE, '-$1').toLowerCase()
};

let Lensyn = {
    install(Vue) {
        GlobalComponent.install(Vue);
        this.installComponents(Vue);
    },

    installComponents(Vue) {
        for (let key in LensynComponents) {
            if (LensynComponents.hasOwnProperty(key)) {
                Vue.component(this.getComponentName(key), LensynComponents[key]);
            }
        }
    },

    getComponentName(component) {
        return `${COMPONENT_PREFIX}-${hyphenate(component)}`;
    }
};

export default Lensyn;
