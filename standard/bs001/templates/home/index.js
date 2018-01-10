/*********************************************************************
 * Created by tr on 2017/12/22                                       *
 *********************************************************************/

$(function() {
    var DATA_SERVER_SUFFIX = "/dataService",
        DAY_SALE_PATH = "/dayLineChartData",
        TARGET_PATH = "/monthGenData",
        BAR_WIDTH = 55,
        monthData = {},
        a = ['今天', '昨天', '上月', '去年'],
        colors = ['#b03330', '#4d8dee', '#42f0d7', '#2f4554'];;

    /* 左上角第一块 --- start --- */
    var percentBarChart = echarts.init(document.getElementById("percentBar")),
        purposeBarChart = echarts.init(document.getElementById("purposeBar"));

    $(".header-box").on("click", function(event) {
        var link = event.target.getAttribute("data-link");

        if (link) {
            if (link === "server-center") {
                window.location = "index.html";
            } else if (link === "manage-center") {
                window.location = "new-source/html/Index/index.html";
            }
        }
    });

    function getDefaultBarOptions() {
        return {
            color: ["#1BDD7C", "#4D8DEE", "#42F0D7"],
            tooltip: {
                show: false
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '8%',
                containLabel: true
            },
            legend: {
                x: "center",
                y: "bottom",
                textStyle: {
                    color: "#fff"
                }
            },
            xAxis: [{
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
                axisLabel: {
                    color: "#fff"
                },

                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: "#fff"
                    }
                }
            }],
            yAxis: [
                {
                    type: 'value',
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: "#fff"
                        }
                    }
                }
                /*{
                    name: "总额",
                    type: 'value',
                    position: "left",
                    axisLabel: {
                        color: "#fff"
                    },
                    axisLine: {
                        lineStyle: {
                            color: "#fff"
                        }
                    },
                    splitLine: {
                        show: false
                    }
                },

                {
                    name: "百分比",
                    type: "value",
                    min: 0,
                    max: 200,
                    splitLine: {
                        show: false,
                    },
                    axisLabel: {
                        color: "#fff",
                        formatter: '{value} %'
                    },
                    axisLine: {
                        lineStyle: {
                            color: "#fff"
                        }
                    }
                }*/
            ]
        }
    }

    /**
     * 更新目标的图
     */
    function updatePurposeBarChart(data) {
        var options = getDefaultBarOptions();

        // TODO use the title value to show
        data = monthData;
        options.series = [];
        options.legend.data = ["月度目标", "已完成"];
        options.xAxis[0].data = ["月度目标", "已完成"];
        options.series[0] = {
            type: "bar",
            barWidth: BAR_WIDTH,
            name: "月度目标",
            stack: "target",
            data: [data.plan, 0]
        }
        options.series[1] = {
            type: "bar",
            barWidth: BAR_WIDTH,
            name: "已完成",
            stack: "target",
            data: [0, data.finish]
        }
        purposeBarChart.setOption(options, true);
    }

    /**
     * 更新环比同比的图
     */
    function updatePercentBarChart(data) {
        var options = getDefaultBarOptions();

        options.xAxis[0].data = ["同比", "环比"];
        options.series = [];
        options.legend.data = ["去年当月度", "今年当月度", "上月度"];

        options.series[0] = {
            name: "今年当月度",
            type: "bar",
            barWidth: BAR_WIDTH,
            data: [(data.currentMonth/100000).toFixed(2), (data.currentMonth/100000).toFixed(2)]
        };
        options.series[1] = {
            name: "去年当月度",
            type: "bar",
            barWidth: BAR_WIDTH,
            stack: "compareData",
            data: [(data.previousYear/100000).toFixed(2), 0]
        };
        options.series[2] = {
            name: "上月度",
            type: "bar",
            barWidth: BAR_WIDTH,
            stack: "compareData",
            data: [0, (data.previousMonth/100000).toFixed(2)]
        };

        percentBarChart.setOption(options, true);
    }

    function buildTargetUrl(date) {
        if (!date) {
            date = echarts.format.formatTime('yyyy-MM-dd', new Date());
        }

        return DATA_SERVER_SUFFIX + TARGET_PATH + "?timeStart=" + date;
    }

    function formatTargetData(data) {
        var result = {};

        result.percent = {
            currentMonth: data.dataThisMonth,
            previousYear: data.dataTheMonthLastYear,
            previousMonth: data.dataLastMonth
        };

        result.plan = {
            plan: data.planThisMonth,
            finish: data.dataThisMonth
        };

        return result;
    }

    function loadTargetData(time, callback) {
        var url = buildTargetUrl(time);

        $.ajax({
            url: url,
            method: "GET",
            dataType: "json",
            success: callback
        });
    }

    function loadTargetStatisticsData(date, callback) {
        if (!date) {
            date = echarts.format.formatTime('yyyy-MM-dd', new Date());
        }
        $.get('/dataService/month?timeStart=' + date, callback);
    }

    /**
     * 更新第一个区块的数据
     * @param {Date} time 
     */
    function updateTargetData(time) {
        loadTargetData(time, function(data) {
            var formatData = formatTargetData(data);

            updatePercentBarChart(formatData.percent);
            updatePurposeBarChart(formatData.plan);
        });
        updateTargetStatisticsData(time);
    }

    function updateTargetStatisticsData(date) {
        loadTargetStatisticsData(date, function(data) {
            monthData = {
                plan: (data.target / 10000).toFixed(2),
                finish: (data.alreadyDone / 10000).toFixed(2)
            }
            $("#monthTarget").html((data.target / 10000).toFixed(2) + "亿");
            $("#alreadyFinish").html((data.alreadyDone / 10000).toFixed(2) + "亿");
            $("#finishPercent").html((data.percentOfDone * 100).toFixed(2) + "%");

            if (data.compareWithLastYear > -1) {
                $("#compareLastYear").addClass("normal");
                $("#compareLastYear").find(".summary-content").addClass("arrow-up");
                $("#compareLastYear").find(".summary-content").html((data.compareWithLastYear / 10000).toFixed(2) + "亿");
            } else {
                $("#compareLastYear").addClass("error");
                $("#compareLastYear").find(".summary-content").addClass("arrow-down");
                $("#compareLastYear").find(".summary-content").html(((data.compareWithLastYear * -1) / 10000).toFixed(2) + "亿");
            }

            if (data.mom * 1 >= 1) {
                $("#tongbi").addClass("normal");
                $("#tongbi").find(".summary-content").addClass("arrow-up");
                $("#tongbi").find(".summary-content").html(((data.mom * 1 - 1) * 100).toFixed(2) + "%");
            } else {
                $("#tongbi").addClass("error");
                $("#tongbi").find(".summary-content").addClass("arrow-down");
                $("#tongbi").find(".summary-content").html(((data.mom * 1 - 1) * -100).toFixed(2) + "%");
            }

            if (data.yoy * 1 >= 1) {
                $("#huanbi").addClass("normal");
                $("#huanbi").find(".summary-content").addClass("arrow-up");
                $("#huanbi").find(".summary-content").html(parseInt((data.yoy * 1 - 1) * 100).toFixed(2) + "%");
            } else {
                $("#huanbi").addClass("error");
                $("#huanbi").find(".summary-content").addClass("arrow-down");
                $("#huanbi").find(".summary-content").html(parseInt((data.yoy * 1 - 1) * -100).toFixed(2) + "%");
            }
        });
    }

    updateTargetData();
    /* 左上角第一块 --- end --- */

    function getGreen(data) {
        var rtn = [];
        for (var i = 0; i < data.length; i++) {
            if (data[i].value[2] >= 0) {
                rtn.push(data[i]);
            }
        }
        return rtn;
    }

    function getRed(data) {
        var rtn = [];
        for (var i = 0; i < data.length; i++) {
            if (data[i].value[2] < 0) {
                rtn.push(data[i]);
            }
        }
        return rtn;
    }

    function tooltipGreen(params) {
        var rtn = '配额盈缺量</br>';
        var number = params.data.value[2] ? params.data.value[2] : '--';
        rtn += params.data.name + ':<font color="#1fd52f">' + number + '</font>';
        return rtn;
    }

    function tooltipRed(params) {
        var rtn = '配额盈缺量</br>';
        rtn += params.data.name + ':<font color="#d81e06">' + params.data.value[2] + '</font>';
        return rtn;
    }

    var map = echarts.init(document.getElementById('map'));
    map.setOption({
        title: {
            text: '风险管控',
            left: 'center',
            top: 50,
            textStyle: {
                fontSize: 13,
                color: '#fff'
            }
        },
        legend: {
            left: 20,
            top: "top",
            orient: 'vertical',
            itemHeight: 24,
            itemWidth: 24,
            data: [
                { name: '控排主体履约正常', textStyle: { fontWeight: 'bold', color: '#1afa29' } },
                { name: '控排主体履约异常', textStyle: { fontWeight: 'bold', color: '#d81e06' } }
            ],
            textStyle: {
                fontSize: 16
            }
        },
        tooltip: {
            trigger: 'item'
        },
        //backgroundColor: '#404a59',
        geo: {
            map: 'china',
            label: {
                normal: {
                    show: true,
                    color: '#FFFFFF',
                    fontSize: 14
                }
            },
            zoom: 1.2,
            itemStyle: {
                normal: {
                    areaColor: 'rgba(47, 98, 213, 0.8)',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    shadowOffsetX: 9,
                    shadowOffsetY: 9,
                    shadowBlur: 50,
                    borderWidth: 2,
                    shadowColor: 'rgba(255, 255, 255, 0.3)'
                },
                emphasis: {
                    //areaColor: '#017ad5',
                    areaColor: null,
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowBlur: 20,
                    borderWidth: 0,
                    shadowColor: 'rgba(0,0,0, 0.5)'
                }
            }
        },
        series: [{
                data: getGreen(ventureData),
                name: '控排主体履约正常',
                type: 'scatter',
                coordinateSystem: 'geo',
                symbolSize: 20,
                symbol: 'image://assets/images/电厂green.svg',
                tooltip: {
                    formatter: tooltipGreen
                }
            },
            {
                data: getRed(ventureData),
                name: '控排主体履约异常',
                type: 'effectScatter',
                rippleEffect: {
                    scale: 2.5,
                    brushType: 'stroke',
                    period: 1
                },
                geoIndex: 0,
                coordinateSystem: 'geo',
                symbolSize: 15,
                symbol: 'image://assets/images/电厂red.svg',
                tooltip: {
                    formatter: tooltipRed
                }
            }
        ]
    });


    /* 今日销售日报 --- start --- */
    var todaySaleChart = echarts.init(document.getElementById("todaySaleChart")),
        saleChartYMap = {
            today: "今天",
            yestoday: "昨天",
            theDayLastMonth: "上月",
            theDayLastYear: "去年"
        },
        todaySaleOptions = {
            legend: {
                textStyle: {
                    color: "#fff"
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true,
                borderColor: '#dcdcdc'
            },
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                axisLabel: {
                    color: "#fff"
                },
                axisLine: {
                    lineStyle: {
                        color: "#fff"
                    }
                }
            }],
            yAxis: [{
                type: 'value',
                axisLine: {
                    lineStyle: {
                        color: "#fff"
                    }
                },
                axisLabel: {
                    color: "#fff"
                },
                splitLine: {show: true,
                    lineStyle: {
                        color: '#fff',
                        opacity: .4
                    }
                }
            }]
        };

    function updateDaySaleData(time) {
        loadDaySaleData(time, function(data) {
            var formatData = formatDaySaleData(data);

            todaySaleOptions.xAxis[0].data = formatData.xData;
            todaySaleOptions.legend.data = formatData.yData.map(function(item) {
                return item.name;
            });

            todaySaleOptions.series = formatData.yData.map(function(item, nowIdx) {
                return {
                    name: item.name,
                    data: item.data,
                    type: 'line',
                    lineStyle: {
                        normal: {
                            color: colors[nowIdx]
                        }
                    }
                    /*areaStyle: { normal: {} },*/
                }
            });

            todaySaleChart.setOption(todaySaleOptions, true);
        });
    }

    function formatDaySaleData(data) {
        var xData = [],
            yData = [],
            name = null,
            item = null,
            yItem = null;

        for (var key in data) {
            if (data.hasOwnProperty(key) && key !== "plan") {
                item = data[key]
                name = saleChartYMap[key];
                yItem = { name: saleChartYMap[key], data: [] };

                for (var i = 0, j = item.length; i < j; ++i) {
                    if (key === "theDayLastYear") {
                        xData.push(item[i].hour + "时");
                    }
                    yItem.data.push(item[i].data.toFixed(2));
                }

                yData.push(yItem);

            }
        }
        return { xData: xData, yData: yData };
    }

    function buildDaySaleUrl(date) {
        if (!date) {
            date = echarts.format.formatTime('yyyy-MM-dd', new Date());
        }

        return DATA_SERVER_SUFFIX + DAY_SALE_PATH + "?timeStart=" + date;
    }

    function loadDaySaleData(time, callback) {
        var url = buildDaySaleUrl(time);

        $.ajax({
            url: url,
            method: "GET",
            dataType: "json",
            success: callback
        });
    }

    updateDaySaleData();
    /* 今日销售日报 --- end --- */

    /* 控排主体履约信息 --- start --- */
    /*var seBarChart = echarts.init(document.getElementById('se_bar')),
        seBarOptions = {
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                show: false,
                type: 'value'
            },
            yAxis: [
                {
                    show: false,
                    type: 'category',
                    data: ['排放量']
                }, {
                    show: false,
                    type: 'category',
                    data: ['配额量']
                }
            ],
            series: [{
                    name: '排放量',
                    type: 'bar',
                    barWidth: 60,
                    yAxisIndex: 0,
                    z: 20,
                    itemStyle: {
                        normal: {
                            color: '#d81e06',
                            barBorderRadius: 30
                        }
                    },
                    label: {
                        normal: {
                            formatter: '排放量：{c}',
                            show: true,
                            position: 'insideRight',
                            offset: [0, 50],
                            color: 'd81e06',
                            fontSize: 14
                        }
                    },
                    data: [319846626]
                },
                {
                    name: '配额量',
                    type: 'bar',
                    z: 10,
                    barWidth: 60,
                    yAxisIndex: 1,
                    itemStyle: {
                        normal: {
                            color: '#28d32b',
                            barBorderRadius: 30
                        }
                    },
                    label: {
                        normal: {
                            formatter: '配额量：{c}',
                            show: true,
                            position: 'insideRight',
                            offset: [0, -50],
                            color: '28d32b',
                            fontSize: 14
                        }
                    },
                    data: [324644325]
                }
            ]
        };
    seBarChart.setOption(seBarOptions);*/
    /* 控排主体履约信息 --- end --- */

    /* 控排主体履约信息 --- end --- */
    var swiper = new Swiper('.swiper-container', {
        slidesPerView: 4,
        autoplay: 3000,
        paginationClickable: true,
        direction: 'vertical',
        loop: true
    });
    /* 控排主体履约信息 --- end --- */
});