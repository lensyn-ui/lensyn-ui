/*********************************************************************
 * Created by tr on 2017/9/27.                                       *
 *********************************************************************/
	var insData = [
	    {val: '', checked: true, color: '#F39221',name:''},
	    {val: 3206 , checked: true, color: '#F39221',name:'全网'},
	    {val: 4417, checked: true, color: '#7F6DD8',name:'国调'},
	    {val: 3790, checked: true, color: '#3E7FDB',name:'网调'},
	    {val: 2524, checked: true, color: '#22c6bf',name:'省调'},
	    {val: 2881, checked: true, color: '#D4AA62',name:'地调'},
	    {val: '', checked: true, color: '',name:''}
	];


;$(function(){
	

	
    $('#insData label').bind('click',function(){
        var that = $(this),
            dataIndex = that.attr("data-index");
        if(that.hasClass('select')){
            that.removeClass('select');
        }else {
            that.addClass('select');
        }
        var nowData = [],
            nowColor = [],
            nowName = [];

        insData[dataIndex].checked = !insData[dataIndex].checked;

        for(var i = 0; i < insData.length; i++){
            if(insData[i].checked){
                nowData.push(insData[i].val);
                nowColor.push(insData[i].color);
                nowName.push(insData[i].name);
            }
        }
        insInit(nowName,nowData,nowColor);
    });
});

insInit(
    ['','全网', '国调', '网调', '省调', '地调',''],
    ['',3206.00, 4417.00, 3790.00, 2524.00, 2881.00,''],
    ['#F39221','#F39221', '#7F6DD8', '#3E7FDB', '#22c6bf', '#D4AA62','']
);
function insInit(nowName,nowData,nowColor) {
    $.get('/dataService/year?timeStart=' + getDate().fameData, function (e) {
        window.insLineData = (e.utilizationOfYear * 1).toFixed(2);

    var insOption = {
        grid: {
            left: '5%',
            right: '10%',
            bottom: '15%',
            containLabel: true
        },
        xAxis: [
            {boundaryGap: false,
                type: 'category',
                data: nowName,
                axisTick: {
                    alignWithLabel: true,
                    lineStyle: {
                        color: 'rgba(45,252,235,0.4)'
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(45,252,235,0.4)'
                    }
                },
                axisLabel: {
                    color: 'rgba(126,143,162,1)'
                }
            }
        ],
        yAxis: [
            {
                name: '(小时)',
                type: 'value',
                show: true,
                axisLabel: {
                    color: 'rgba(126,143,162,1)'
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(45,252,235,0.4)'
                    }
                },
                axisPointer: {
                    show: false
                },
                splitLine: {
                    show: false
                }
            }
        ],
        series: [
            {
                name: '全网',
                type: 'bar',
                barWidth:'50',
                data: nowData,
                itemStyle: {
                    normal: {
                        color: function (params) {
                            return nowColor[params.dataIndex]
                        },
                        //以下为是否显示
                        label: {
                            show: true,
                            position: 'top'
                        }
                    }
                }
            },
            {
                name: '国调',
                type: 'pie'
            },
            {
                name: '网调',
                type: 'pie'
            },
            {
                name: '省调',
                type: 'pie'
            }, {
                name: '地调',
                type: 'pie'
            },
            // {
            //     name: '基础线',
            //     type: 'line',
            //     data: [window.insLineData,
            //         window.insLineData,
            //         window.insLineData,
            //         window.insLineData,
            //         window.insLineData,
            //         window.insLineData,
            //         window.insLineData],
            //     itemStyle:{
            //         normal: {
            //             color: "red",
            //             lineStyle: {
            //                 color: "purple",
            //                 type: "dotted"
            //             }
            //         }
            //     }
            // }

            {
                name: '基础线',
                type: 'line',
                data: [
                    window.insLineData,
                    window.insLineData,
                    window.insLineData,
                    window.insLineData,
                    window.insLineData,
                    window.insLineData,
                    window.insLineData
                ],
                itemStyle:{
                    normal: {
                        color: "lightblue",
                        lineStyle: {
                            color: "#fff",
                            type: "dotted"
                        }
                    }
                }
            }
        ]
    };
    DrawEChart('insChart', insOption);
    });

}