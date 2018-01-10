/**
 * Created by ty on 17/9/20.
 *
 *
 */

/**
 *
 * @param args
 * @param elementSelector 元素id
 * @param brickLength 必须传入倒计时时间的最长字符长度，例如：显示123.45~1234.567的情况时传入8
 * @param data初始时显示的时间，位数必须小于等于brickLength
 * @param float 精度，默认2位，一旦设定，不可修改
 */
function TimerCount(args){
        /*用户参数覆盖默认参数*/
        this.options = $.extend({
            elementSelector:'',
            brickLength:7,
            float:2,
            data:''
        },args);

        this.init();
}

TimerCount.prototype = {
    init:function () {
        /* 验证用户传入参数 start */
        if(!this.options.elementSelector){
            throw "需传入页面元素选择器，比如#myId 或者 .myClass,建议用id";
        }
        if(this.options.brickLength < 1 ){
            throw "必须传入倒计时时间的最长字符长度，例如：显示123.45~1234.56的情况时传入7";
        }
        /* 验证用户传入参数 end */

        /* 缓存页面元素 */
        this.$rootElement = $(this.options.elementSelector);

        /* 格式化显示数据 */
        this.data = this._getFormattedData(this.options.data);

        this.setValue(this.data);

        /* 生成页面元素 */
        this.generateDoms();
    },

    /**
     * 生成页面元素
     */
    generateDoms: function () {
        var that = this;
        var $rootElement = that.$rootElement;

        var maxLength = that.options.brickLength;
        var data = that.data;
        var float = that.options.float * 1;
        /* 循环的标识索引 */
        var loopIndex = 0;
        /* 将放小数点的位置索引 */
        var floatIndex = maxLength - float - 1;

        $rootElement.addClass("timer-count-wrapper");
        for(var i = 0;i < maxLength;i++){
            var number = data.substr(i, 1);
            that._generateEachColumn(number);
            loopIndex++;
        }
    },

    /**
     * 用新数据刷新旧数据
     * @param {String} 新数值
     */
    refresh: function (data) {
        if(!data){
            throw "刷新数据，需要传入新数据";
        }
        if(String(data).length > this.options.brickLength){
            throw "新数据的总位数必须小于等于初始化时设置的最高位数";
        }

        /* 格式化显示数据 */
        var formattedData = this._getFormattedData(data);
        // this.data = this._getFormattedData(data);

        this._refreshDoms(formattedData);
    },

    getValue: function () {
        return this.currentValue;
    },

    setValue: function (value) {
        this.currentValue = value;
    },

    _getFormattedData: function (metaData) {
        var that = this;

        var metaData = String(metaData);
        var maxLength = that.options.brickLength;
        var float = that.options.float;
        /* 位数补足后的数据 */
        var formattedData = "";
        /* 补足数值 */
        /* 先将数据的精度部分处理为指定格式 */
        if(float > 0){
            var _index = metaData.indexOf(".");
            //传入数据有小数点
            if(_index > -1){
                var _diff = float - metaData.substring(_index).length;
                if(_diff > -1){//传入数据有小数位，但是小数位少于指定的位数
                    for(var i = 0, len = _diff + 1; i< len;i++){
                        metaData += "0";
                    }
                }else if(_diff < -1){//传入数据有小数位，但是小数位多于指定的位数
                    metaData = metaData.substring(0, _index + 3);
                }
            }else{
                //传入数据没有小数点
                metaData += ".00";
            }

        }
        var diff = maxLength - metaData.length;
        if(diff > 0){
            for(var i = 0; i < diff; i++){
                formattedData += "0";
            }
        }
        formattedData += metaData;

        return formattedData;
    },

    /**
     * 生成每一列数字在页面上
     * @param num
     * @private
     */
    _generateEachColumn: function (num) {
        var that = this;

        var $rootElement = that.$rootElement;
        var $numberColumnWrapper = $("<div class='timer-count-column'></div>");
        var marginTop = "";
        var innerContentStr = "";

        if(num == "."){
            innerContentStr = "<div class='column-item'>.</div>";
        }else{
            innerContentStr = "<div class='column-item'>0</div>" +
                "<div class='column-item'>1</div>" +
                "<div class='column-item'>2</div>" +
                "<div class='column-item'>3</div>" +
                "<div class='column-item'>4</div>" +
                "<div class='column-item'>5</div>" +
                "<div class='column-item'>6</div>" +
                "<div class='column-item'>7</div>" +
                "<div class='column-item'>8</div>" +
                "<div class='column-item'>9</div>";

            marginTop = "-" + (28 * num) + "px";
        }

        $numberColumnWrapper.html(innerContentStr);
        $numberColumnWrapper.css("margin-top", marginTop);
        $rootElement.append($numberColumnWrapper);
    },

    /**
     * 根据传入的数据刷新当前计数器中的页面显示数据
     * @param data
     * @private
     */
    _refreshDoms: function (data) {
        var that = this;

        var maxLength = that.options.brickLength;

        /* 页面元素 */
        var $numberColumnWrappers = $(".timer-count-column");
        for(var i = 0; i < maxLength; i++){
            var $element = $($numberColumnWrappers.eq(i));
            var newNumber = data.substr(i, 1) * 1;

            if(newNumber !== "."){
                $element.css("margin-top", "-" + (28 * newNumber) + "px");
            }
        }
    }
};

/* 以上为计分器函数，以下为使用方式 */

;$(function () {
    var date = new Date();
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m > 9 ? m : '0' + m;
    var d = date.getDate();
    d = d > 9 ? d : '0' + d;

    var formattedDate = y + '-' + m + '-' + d;
    var formatDate = y + '-' + m;
    /* 计分器对象 */
    var timerCount;

    function initTimer(){
        var date = new Date();
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m > 9 ? m : '0' + m;
        var d = date.getDate();
        d = d > 9 ? d : '0' + d;

        var formattedDate = y + '-' + m + '-' + d;
        /* 从后端获得计分器数据*/
        /* yehecan 调用后端接口改成 /dataService/dayFromJkzx 2017-10-08*/
        $.get("/dataService/dayFromJkzx?timeStart=" + formattedDate, function(param){
        // $.get("http://localhost:10302/testGet?timeStart=" + formattedDate, function(param){
            /* 精度2 */
            var fiexed2 = Number(param).toFixed(2);

            /**
             * 初始化页面上的计分功能呢
             * @param {String} elementSelector 计分器的页面dom
             * @param {Number} brickLength 计分器的数字的字符长度的最大长度，包括小数点
             * @param {String} data 初始时显示的数值
             * @type {TimerCount}
             */
            timerCount = new TimerCount({
                elementSelector: "#daylyPower",
                brickLength:7,
                data:fiexed2,
                float:2
            });
        });
    }

    function refreshTimer(){

        timeoutId = setTimeout(function(){
            $.get("/dataService/day?timeStart=" + formattedDate, function(param){
                /* 精度2 */
                var fiexed2 = Number(param).toFixed(2);

                timerCount.refresh(fiexed2);
            });
            getSaleData();
            clearTimeout(timeoutId);
            refreshTimer();
        }, 3*60*1000);
    }

    initTimer();
    refreshTimer();
    getGraphValue();

    /*月度的值*/
    function getGraphValue() {
        $.get("/dataService/saleMonth?timeStart=" + formatDate, function(data){
            /* 精度2 */
            $('#planMonth').text(Number(data.planMonth).toFixed(2) +"亿");
            $('#optGen').text(Number(data.optGen).toFixed(2) +"亿");
            $('#directGen').text(Number(data.directGen).toFixed(2) +"亿");
            $('#transProvincialGen').text(Number(data.transProvincialGen).toFixed(2) +"亿");
            $('#otherGen').text(Number(data.otherGen).toFixed(2) +"亿");
            $('#avgGen').text(data.avgGen);
            if(data.mom * 1 > 0){
                $('#mom').addClass('font-color-dd');
                $('#mom').html('<img class="indicator-icon indicator-icon-down" ' +
                    'src="../../assets/images/icon-red.png" width="10px">'+Number(data.mom).toFixed(2)+"%");
            }else {
                $('#mom').addClass('font-color-red');
                $('#mom').html('<img src="../../assets/images/icon-g.png" style="margin-bottom:6px;" width="10px">'+Number(data.mom * -1).toFixed(2)+"%");
            }
            if(data.yoy * 1 > 0){
                $('#yoy').addClass('font-color-dd');
                $('#yoy').html('<img class="indicator-icon indicator-icon-down" ' +
                    'src="../../assets/images/icon-red.png" width="10px">'+Number(data.yoy).toFixed(2)+"%");
            }else {
                $('#yoy').addClass('font-color-red');
                $('#yoy').html('<img src="../../assets/images/icon-g.png" style="margin-bottom:6px;" width="10px">'+Number(data.yoy * -1).toFixed(2)+"%");
            }
        });
    }
});

