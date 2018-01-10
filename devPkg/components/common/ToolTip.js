/*********************************************************************
 * Created by deming-su on 2017/10/20                                *
 *********************************************************************/

export const ToolTip = function () {
    let startMove = false;
    let node = null;
    /* 页面提示信息 */
    document.addEventListener("mouseover", function (evt) {
        let txt = evt.target.getAttribute("mouse-hover");
        if(txt) {
            startMove = true;
            /* 如果要展示提示信息框，并且没有初始化信息框，则添加信息框 */
            if(!node) {
                /* 创建提示框并获取展示位置 设置提示框样式 */
                node = document.createElement("div");
                let top = evt.target.getBoundingClientRect().top;
                let left = evt.target.getBoundingClientRect().left;
                let st = "position: fixed;padding: 3px 6px;background-color: #f00;color: #fff; border: solid 1px #dcdcdc; min-width: 160px;" +
                    "min-height: 30px;border-radius: 4px;box-shadow: 0 0 5px rgba(0, 0, 0, .8);font-size: 14px;z-index: 9999;";
                /* 根据页面提示框类型展示到不同的位置 */
                if(txt === "left") {
                    top = document.body.offsetWidth - left - 3;
                    st += "top: "+top+"px;right: "+left+"px;";
                } else if (txt === "right") {
                    left = left + evt.target.clientWidth + 3;
                    st += "top: "+top+"px;left: "+left+"px;";
                } else {
                    top = top + evt.target.clientHeight + 3;
                    st += "top: "+top+"px;left: "+left+"px;";
                }
                node.setAttribute("style", "position: fixed;top: "+top+"px;left: "+left+"px;" +
                    "padding: 3px 6px;background-color: #f00;color: #fff; border: solid 1px #dcdcdc; min-width: 160px;max-width: 600px;" +
                    "min-height: 30px;border-radius: 4px;box-shadow: 0 0 5px rgba(0, 0, 0, .8);font-size: 14px;z-index: 9999;");
                document.body.appendChild(node);
            }
            /* 添加展示内容 */
            node.innerHTML = evt.target.innerHTML;
        }
    });
    document.addEventListener("mouseout", function () {
        if(startMove && node) {
            /* 如果是处于插件显示状态，关闭提示信息框 */
            document.body.removeChild(node);
            node = null;
        }
    });
};