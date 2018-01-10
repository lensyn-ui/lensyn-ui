/**
 * Created by cyb on 2017/7/29.
 */
var toggleFlag = true;

var series = [];

$(function () {
    dragZoom("sc-map-bg");
});

var dianList = [
    {
        name: "大岗山水电站",  //名称
        id: "11000029",      //唯一值
        state: "1",          //状态 1已接入，2未接入，3告警
        type: "1",       //1电厂，2大用户，3检修厂
        left: "430",     //左定位
        top: "510"       //上定位
    }, {
        name: "龚嘴水电站",
        id: "11000001",
        state: "1",
        type: "1",
        left: "544",
        top: "528"
    }, {
        name: "铜街子水电站",
        id: "11000000",
        state: "1",
        type: "1",
        left: "564",
        top: "534"
    }, {
        name: "猴子岩水电站",
        id: "11000324",
        state: "1",
        type: "1",
        left: "581",
        top: "498"
    }, {
        name: "吉牛水电站",
        id: "11000024",
        state: "1",
        type: "1",
        left: "389",
        top: "344"
    }, {
        name: "瀑布沟水电站",
        id: "11000004",
        state: "1",
        type: "1",
        left: "492",
        top: "537"
    }, {
        name: "深溪沟水电站",
        id: "11000005",
        state: "1",
        type: "1",
        left: "498",
        top: "528"
    }, {
        name: "枕头坝一级水电站",
        id: "11000030",
        state: "3",
        type: "1",
        left: "504",
        top: "526"
    }, {
        name: "沙坪 二级水电站",
        id: "11000325",
        state: "1",
        type: "1",
        left: "520",
        top: "526"
    }, {
        name: "玉林桥水电站",
        id: null,
        state: "2",
        type: "1",
        left: "530",
        top: "530"
    }, {
        name: "大渡河检修公司",
        id: null,
        state: "1",
        type: "3",
        left: "556",
        top: "510"
    }, {
        name: "双江口水电站",
        id: null,
        state: "2",
        type: "1",
        left: "406",
        top: "256"
    }, {
        name: "屏山电站",
        id: null,
        state: "2",
        type: "1",
        left: "600",
        top: "598"
    }, {
        name: "水富电站",
        id: null,
        state: "2",
        type: "1",
        left: "624",
        top: "600"
    }, {
        name: "月江电站",
        id: null,
        state: "2",
        type: "1",
        left: "631",
        top: "595"
    }, {
        name: "油罐口电站",
        id: null,
        state: "2",
        type: "1",
        left: "631",
        top: "608"
    }, {
        name: "来复电站",
        id: null,
        state: "2",
        type: "1",
        left: "633",
        top: "600"
    }, {
        name: "雪坨电站",
        id: null,
        state: "2",
        type: "1",
        left: "577",
        top: "588"
    }, {
        name: "官地水电站",
        id: null,
        state: "2",
        type: "1",
        left: "254",
        top: "694"
    }, {
        name: "孟底沟水电站",
        id: null,
        state: "2",
        type: "1",
        left: "326",
        top: "578"
    }, {
        name: "桐子林水电站",
        id: null,
        state: "2",
        type: "1",
        left: "382",
        top: "790"
    }, {
        name: "牙根二级水电站",
        id: null,
        state: "2",
        type: "1",
        left: "298",
        top: "444"
    }, {
        name: "杨房沟水电站",
        id: null,
        state: "2",
        type: "1",
        left: "332",
        top: "590"
    }
    , {
        name: "两河口水电站",
        id: null,
        state: "2",
        type: "1",
        left: "296",
        top: "434"
    }, {
        name: "向家坝水电站",
        id: null,
        state: "2",
        type: "1",
        left: "628",
        top: "596"
    }, {
        name: "拉拉山水电站",
        id: null,
        state: "2",
        type: "1",
        left: "612",
        top: "600"
    }, {
        name: "木里河卡基娃水电站",
        id: null,
        state: "2",
        type: "1",
        left: "298",
        top: "568"
    }, {
        name: "上通坝水电站",
        id: null,
        state: "2",
        type: "1",
        left: "234",
        top: "444"
    }, {
        name: "立洲水电站",
        id: null,
        state: "2",
        type: "1",
        left: "312",
        top: "660"
    }, {
        name: "宁朗水电站",
        id: null,
        state: "2",
        type: "1",
        left: "262",
        top: "656"
    }, {
        name: "金元水电站",
        id: null,
        state: "2",
        type: "1",
        left: "428",
        top: "390"
    }, {
        name: "金平水电站",
        id: null,
        state: "2",
        type: "1",
        left: "428",
        top: "396"
    }, {
        name: "纬络纺织",
        id: null,
        state: "1",
        type: "2",
        left: "638",
        top: "556"
    }, {
        name: "天顺水泥",
        id: null,
        state: "1",
        type: "2",
        left: "644",
        top: "534"
    }, {
        name: "成都",
        id: null,
        state: 0,
        type: "1",
        left: "591",
        top: "377"
    }
];
function dragZoom(id) {
    var oImg = document.getElementById(id);

    function draw() {
        var cdCity = "";
        $(oImg).html("");
        for (var i = 0; i < dianList.length; i++) {

            //默认的高度和宽度
            var defaultHeight = 911;
            var defaultWidth = 993;
            var blHeight = $(oImg).height() / defaultHeight;
            var blWidth = $(oImg).width() / defaultWidth;
            var dianLeft = dianList[i].left * blHeight;
            var dianTop = dianList[i].top * blWidth;
            //状态0成都市，1已接入，2未接入，3告警
            //1电厂，2大用户，3检修厂
            var nameLeft = parseInt(dianLeft) + 20;
            var nameTop = parseInt(dianTop) + 20;

            var className;
            if (dianList[i].type == 1) {
                className = "dc";

            } else if (dianList[i].type == 2) {
                className = "dyh";
            } else {
                className = "jxc";
            }

            if (dianList[i].state == 0) {
                className += " cd";
            } else if (dianList[i].state == 1) {
                className += " dcgr";
            } else if (dianList[i].state == 2) {
                className += " dcwgr";
            } else {
                className += " dcgj";
                nameLeft = nameLeft + 10;
                nameTop = nameTop + 10;
            }
            var html = '<div data-name="' + dianList[i].name + '"  onmouseover="showName(' + i + ')"  ' +
                'onmouseleave ="hideName(' + i + ')"  onclick="clickData(\'' + dianList[i].id + '\',\'' +
                dianList[i].type + '\',\'' + dianList[i].name + '\',\'' + dianList[i].state + '\')" ' +
                'style="left:' + dianLeft + 'px; top:' + dianTop + 'px" class="dian ' + className + '"></div>';

            var name = '<div id="name' + i + '" style="left:' + nameLeft + 'px; top:' + nameTop + 'px" ' +
                'class="dianName"><div class="dianNameText" >' + dianList[i].name + '</div></div>';

            var cityLeft = parseInt(dianLeft) - 42,
                cityTop = parseInt(dianTop) - 4;

            cdCity = '<div  style="left:' + cityLeft + 'px; top:' + cityTop + 'px" class="cdCity" >成都市</div>';

            $(oImg).append(html);
            $(oImg).append(name);
        }
        $(oImg).append(cdCity);
    }

    draw();
    var indexValue = 5;
    //鼠标滑动
    fnWheel(oImg, function (down, oEvent) {
        var oldWidth = this.offsetWidth;
        var oldHeight = this.offsetHeight;
        var oldLeft = this.offsetLeft;
        var oldTop = this.offsetTop;

        var scaleX = (oEvent.clientX - oldLeft) / oldWidth;//比例
        var scaleY = (oEvent.clientY - oldTop) / oldHeight;
        if (indexValue > 10) {

        }
        if (down) {
            indexValue--;
            if (this.offsetWidth > 400) {
                this.style.width = this.offsetWidth * 0.9 + "px";
                this.style.height = this.offsetHeight * 0.9 + "px";
            }

        }
        else {
            indexValue++;
            if (this.offsetWidth < 2300) {
                this.style.width = this.offsetWidth * 1.1 + "px";
                this.style.height = this.offsetHeight * 1.1 + "px";
            }

        }

        var newWidth = this.offsetWidth;
        var newHeight = this.offsetHeight;

        this.style.left = oldLeft - scaleX * (newWidth - oldWidth) + "px";
        this.style.top = oldTop - scaleY * (newHeight - oldHeight) + "px";
        draw();
    });
    mouse();
    //鼠标拖拽
    function mouse() {
        oImg.onmousedown = function (ev) {
            console.log(ev)
            var oEvent = ev;
            var disX = oEvent.clientX - oImg.offsetLeft;
            var disY = oEvent.clientY - oImg.offsetTop;
            document.onmousemove = function (ev) {
                oEvent = ev;
                oImg.style.left = oEvent.clientX - disX + "px";
                oImg.style.top = oEvent.clientY - disY + "px";
            }
            document.onmouseup = function () {
                document.onmousemove = null;
                document.onmouseup = null;
            }
        }
    }

    function fnWheel(obj, fncc) {
        obj.onmousewheel = fn;
        if (obj.addEventListener) {
            obj.addEventListener('DOMMouseScroll', fn, false);
        }

        function fn(ev) {
            var oEvent = ev || window.event;
            var down = true;

            if (oEvent.detail) {
                down = oEvent.detail > 0
            }
            else {
                down = oEvent.wheelDelta < 0
            }

            if (fncc) {
                fncc.call(this, down, oEvent);
            }

            if (oEvent.preventDefault) {
                oEvent.preventDefault();
            }
            return false;
        }
    }
}

function showName(id) {
    $("#name" + id).show();
}

function hideName(id) {
    $("#name" + id).hide();
}
/**
 * 四川地图点击
 */
function clickData(id, type, name, state) {
    //隐藏检修列表
    $(".serviceTask").hide();
    //状态是告警和已接入
    if (state == 1 || state == 3) {
        if (type == 1) {
            $("#stationName").html(name.substr(0, 3));
            $("#stationName1").html(name.substr(0, 3));
            if (toggleFlag) {
                $(".col-left").removeClass("left-active-show left-active-x left-active-x-show");

                $(".col-right").removeClass("right-active-show");
                $(".col-right").removeClass("right-active-x");
                $(".col-right").removeClass("right-active-x-show");

                $(".top-box").removeClass("top-active-show");
                $(".top-box").removeClass("top-active-y");
                $(".top-box").removeClass("top-active-y-show");

                $(".col-left").addClass("left-active-x");
                $(".col-right").addClass("right-active-x");
                $(".top-box").addClass("top-active-y");

                setTimeout(function () {
                    $(".col-left").addClass("left-active-x-show");
                    $(".col-right").addClass("right-active-x-show");
                    $(".top-box").addClass("top-active-y-show");
                }, 500);
            }
            toggleFlag = true;
        } else if (type == 2) {
            toggleFlag = false;
            $(".col-left-1").removeClass("left-1-active");
            $(".col-left-1").removeClass("left-1-active-show");
            $(".col-left-1").addClass("left-1-active");
            $(".col-right-1").removeClass("right-1-active");
            $(".col-right-1").removeClass("right-1-active-show");
            $(".col-right-1").addClass("right-1-active");
            $(".top-box-1").removeClass("top-1-active");
            $(".top-box-1").removeClass("top-1-active-show");
            $(".top-box-1").addClass("top-1-active");
            setTimeout(function () {
                $(".col-left-1").addClass("left-1-active-show");
                $(".col-right-1").addClass("right-1-active-show");
                $(".top-box-1").addClass("top-1-active-show");
            }, 500);
        }

    }
}

/* 打开弹出框 */
function openWrapper(title, type) {
    $(".wrapperScreen").removeClass("hidden");
}

/* 右键关闭事件 */
document.oncontextmenu = function(){
    return false;
}
function whichButton(evt) {
    if(evt.button === 2) {
        evt.stopPropagation();
        $(".wrapperScreen").addClass("hidden");
        evt.preventDefault();
    }
}