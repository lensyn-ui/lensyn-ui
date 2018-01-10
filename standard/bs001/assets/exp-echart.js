/*********************************************************************
 * Created by tr on 2017/9/20.                                       *
 *********************************************************************/

$(function () {
    $(document).on('click scroll', function (evt) {
        var $tar = $(evt.target);
        $('#articleBox ul li').removeClass('select');
        if(($tar.attr('data-pop') || $tar.parents('li').attr('data-pop')) || ($tar.hasClass('popup') || $tar.parents('div').hasClass('popup'))){
            if ($tar.attr('data-pop') || $tar.parents('li').attr('data-pop')) {
                $.get('/dataService/year?timeStart=' + getDate().fameData, function (e) {
                    window.alreadyDone= (e.alreadyDone / 10000 * 1).toFixed(2);
                    var instOption = {
                        title: {
                            text: '大渡河所占省调水电图例',
                            textStyle:{
                                fontSize:14,
                                fontWeight:'normal',
                                color:'rgba(247,241,89,0.6)'
                            },
                            left:'60px',
                            top:'70px'
                        },
                        legend: {
                            bottom: '20px',
                            data: [
                                {
                                    name: '国调',
                                    textStyle: {
                                        color: '#7f6dd8',
                                        padding:[0,20,0,0]
                                    }
                                },
                                {
                                    name: '网调',
                                    textStyle: {
                                        color: '#3e7fdb',
                                        padding:[0,20,0,0]
                                    }
                                },
                                {
                                    name: '省调',
                                    textStyle: {
                                        color: '#22c6bf',
                                        padding:[0,20,0,0]
                                    }
                                },
                                {
                                    name: '地调',
                                    textStyle: {
                                        color: '#d4aa62'
                                    }
                                },
                                {
                                    name:'大渡河',
                                    textStyle: {
                                        color: '#2ea85c',
                                        padding:[0,20,0,0]
                                    }
                                }
                            ]
                        },
                        color: ['#7f6dd8', '#3e7fdb', '#22c6bf', '#d4aa62','#2ea85c'],
                        series: [
                            {
                                name: '发电量',
                                type: 'pie',
                                radius: '50%',
                                center: ['65%', '50%'],
                                data: [
                                    {value: 1020.30, name: '国调'},
                                    {value: 125.10, name: '网调'},
                                    {value: 1373.40, name: '省调'},
                                    {value: 470.00, name: '地调'}
                                ],
                                itemStyle: {
                                    emphasis: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                },
                                label: {
                                    normal: {
                                        show: true,
                                        formatter: ['{div|{c}亿}', '{per|{d}%}'].join('\n'),
                                        backgroundColor: 'transparent',
                                        borderColor: 'transparent',
                                        borderWidth: 1,
                                        borderRadius: 4,
                                        rich: {
                                            div: {
                                                fontSize: 14,
                                                fontWeight:'bolder',
                                                lineHeight: 33
                                            },
                                            per: {
                                                padding: [3, 0],
                                                borderRadius: 2
                                            }
                                        }

                                    }
                                }
                            },
                            {
                                name: '大渡河所占省调水电图例',
                                type: 'pie',
                                radius: '30%',
                                center: ['20%', '50%'],
                                data: [
                                    {value: (1373.4 - window.alreadyDone * 1).toFixed(2), name: '省调'},
                                    {value: window.alreadyDone, name: '大渡河'}
                                ],
                                itemStyle: {
                                    emphasis: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                },
                                label: {
                                    normal: {
                                        show: true,
                                        formatter: ['{div|{c}亿}', '{per|{d}%}'].join('\n'),
                                        backgroundColor: 'transparent',
                                        borderColor: 'transparent',
                                        borderWidth: 1,
                                        borderRadius: 4,
                                        rich: {
                                            div: {
                                                fontSize: 14,
                                                fontWeight:'bolder',
                                                lineHeight: 33
                                            },
                                            per: {
                                                padding: [3, 0],
                                                borderRadius: 2
                                            }
                                        }

                                    }
                                }
                            }
                        ]
                    };
                    /* 发电量结构图的echart */
                    DrawEChart('instChart', instOption);
                });
                var popData = $tar.attr('data-pop') || $tar.parents('li').attr('data-pop');
                var $this  = $tar.parents('li') || $tar;

                $this.addClass('select');
                $('#articleBox .popup').hide();
                $('#articleBox .' + popData + ' ').show();
            }
        }else {
            $('#articleBox .popup').hide();
        }

        /* 增加一个点击全局页面，隐藏地图小浮窗的功能 Modified by tangyue 2017年09月28日17:00:29 */
        var $elementFloatingLayer = $("#floatingLayer");
        if($elementFloatingLayer && $elementFloatingLayer.length){
            $elementFloatingLayer.hide();
        }
    });

});

/* 使用模拟数据，渲染2个图表 --start-- */
var installOption = {
    title: {
        text: '大渡河所占省调水电图例',
        textStyle:{
            fontSize:14,
            fontWeight:'normal',
            color:'rgba(247,241,89,0.6)'
        },
        left:'60px',
        top:'70px'
    },
    legend: {
        bottom: '20px',
        data: [
            {
                name: '国调',
                textStyle: {
                    color: '#7f6dd8',
                    padding:[0,20,0,0]
                }
            },
            {
                name: '网调',
                textStyle: {
                    color: '#3e7fdb',
                    padding:[0,20,0,0]
                }
            },
            {
                name: '省调',
                textStyle: {
                    color: '#22c6bf',
                    padding:[0,20,0,0]
                }
            },
            {
                name: '地调',
                textStyle: {
                    color: '#d4aa62',
                    padding:[0,20,0,0]
                }
            },
            {
                name:'大渡河',
                textStyle: {
                    color: '#2ea85c',
                    padding:[0,20,0,0]
                }
            }
        ]
    },
    color: [
        '#7f6dd8',
        '#3e7fdb',
        '#22c6bf',
        '#d4aa62',
        '#2ea85c'],
    series: [
        {
            name: '全网装机结构图777',
            type: 'pie',
            radius: '50%',
            center: ['65%', '50%'],
            data: [
                {value: 2310.00, name: '国调'},
                {value: 330.00, name: '网调'},
                {value: 5610.00, name: '省调'},
                {value: 1270.40, name: '地调'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },
            label: {
                normal: {
                    show: true,
                    formatter: ['{div|{c}万}', '{per|{d}%}'].join('\n'),
                    backgroundColor: 'transparent',
                    borderColor: 'transparent',
                    borderWidth: 1,
                    borderRadius: 4,
                    rich: {
                        div: {
                            fontSize: 14,
                            fontWeight:'bolder',
                            lineHeight: 33
                        },
                        per: {
                            padding: [3, 0],
                            borderRadius: 2
                        }
                    }

                }
            }
        },
        {
            name: '大渡河所占省调水电图例',
            type: 'pie',
            radius: '30%',
            center: ['20%', '50%'],
            data: [
                {value: 2899.20, name: '省调'},
                {value: 1079.00, name: '大渡河'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },
            label: {
                normal: {
                    show: true,
                    formatter: ['{div|{c}万}', '{per|{d}%}'].join('\n'),
                    backgroundColor: 'transparent',
                    borderColor: 'transparent',
                    borderWidth: 1,
                    borderRadius: 4,
                    rich: {
                        div: {
                            fontSize: 14,
                            fontWeight:'bolder',
                            lineHeight: 33
                        },
                        per: {
                            padding: [3, 0],
                            borderRadius: 2
                        }
                    }

                }
            }
        }
    ]
};
DrawEChart('installChart', installOption);
/* 使用模拟数据，渲染2个图表 --end-- */


var option = {
    radar: {
        indicator: [
            {text: ''}
        ],
        center: ['50%', '50%'],
        radius: '70%',
        startAngle: 90,
        splitNumber: 10,
        shape: 'circle',
        splitArea: {
            show: false,
            areaStyle: {
                color: ['transparent']
            }
        },
        axisLine: {
            show: false
        },
        splitLine: {
            show: true,
            lineStyle: {
                color: 'rgba(55,135,225,0.1)'
            }
        }
    },

    color: ['#1bdd7c', '#F39221', '#42f0d7', '#4c8eec'],
    series: [{
        type: 'pie',
        radius: '60%',
        center: ['50%', '50%'],
        data: [
            {
                /* 其他电量的数值 */
                value: 6.7,
                // value: 2.858,
                // name: '39亿',
                name: '26.51亿',
                itemStyle: {
                    normal: {
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                        shadowBlur: 10,
                        shadowOffsetX: 3,
                        shadowOffsetY: 0
                    }
                },
                tooltip: {
                    position: ['0%', '0%'],
                    formatter: '{b0}: {c0}<br />{b1}: {c1}',
                    textStyle: {
                        color: 'red'
                    }
                }
            },
            {
                /* 计划合同数值 */
                value: 12,
                // name: '138.00亿',
                name: '145.49亿',
                itemStyle: {
                    normal: {
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                        shadowBlur: 10,
                        shadowOffsetX: 3,
                        shadowOffsetY: 0
                    }
                }
            },
            {
                value: 10.5,
                name: '86.00亿',
                itemStyle: {
                    normal: {
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                        shadowBlur: 10,
                        shadowOffsetX: 3,
                        shadowOffsetY: 0
                    }
                }
            },
            {
                /* 直购电量的数值 */
                value: 8,
                // value: 9.3,
                name: '87.00亿',
                itemStyle: {
                    normal: {
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                        shadowBlur: 10,
                        shadowOffsetX: 3,
                        shadowOffsetY: 0
                    }
                }

            }

        ],
        roseType: 'radius',
        label: {
            normal: {
                show: true,
                formatter: ['{div|{b}}', '{per|{d}%}'].join('\n'),
                backgroundColor: 'transparent',
                borderColor: 'transparent',
                borderWidth: 1,
                borderRadius: 4,
                rich: {
                    div: {
                        fontSize: 14,
                        fontWeight:'bolder',
                        lineHeight: 33
                    },
                    per: {
                        padding: [3, 0],
                        borderRadius: 2
                    }
                }

            }
        }
    }]
};
DrawEChart("pieChart", option);

//渲染ECharts图表
function DrawEChart(ele, opt) {
    //图表渲染的容器对象
    var pieChart = document.getElementById(ele);
    //加载图表
    var myChart = new echarts.init(pieChart);
    myChart.setOption(opt);
}