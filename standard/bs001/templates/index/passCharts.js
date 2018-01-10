/*********************************************************************
 * Created by tr on 2017/9/27.                                       *
 *********************************************************************/
var pageData1 = [
    {val: 90, checked: true, color: '#4c8eec'},
    {val: 300, checked: true, color: '#61f6c3'}
];
var pageData2 = [
    {val: 200, checked: true, color: '#65cfdf'},
    {val: 720, checked: true, color: '#22c673'}
];
var pageData3 = [
    {val: 25, checked: true, color: '#0053c9'},
    {val: 640, checked: true, color: '#7ae375'}
];
var pageData4 = [
    {val: 75, checked: true, color: '#76afff'},
    {val: 800, checked: true, color: '#22c6b8'}
];


/* 修改外送通道容量的柱状图的颜色 Modified by tangyue 2017年09月28日15:45:09*/
// passInit(
//     [90,300],
//     ['#4c8eec','#61f6c3'],
//     [200,720],
//     ['#65cfdf','#22c673'],
//     [25,640],
//     ['#0053c9','#7ae375'],
//     [75,800],
//     ['#76afff','#22c6b8']
// );


passInit(
    [90,300],
    ['#5dfb99',
        '#f3a956'],
    [200,720],
    ['#65cfdf',
        '#cf8bdf'],
    [25,640],
    ['#1AD879',
        '#f7a550'],
    [75,800],
    ['#3f7fff',
        '#FC6360']
);


;$(function () {
    $('#passData label').bind('click',function(){
        var that = $(this),
            dataIndex = that.attr("data-index"),
            dataName = that.attr("data-name");

        if(that.hasClass('select')){
            that.removeClass('select');
        }else {
            that.addClass('select');
        }
        var nowData1 = [],
            nowColor1 = [],
            nowData2 = [],
            nowColor2 = [],
            nowData3 = [],
            nowColor3 = [],
            nowData4 = [],
            nowColor4 = [];

        switch (dataName){
            case 'pageData1':
                pageData1[dataIndex].checked = !pageData1[dataIndex].checked;
                break;
            case 'pageData2':
                pageData2[dataIndex].checked = !pageData2[dataIndex].checked;
                break;
            case 'pageData3':
                pageData3[dataIndex].checked = !pageData3[dataIndex].checked;
                break;
            case 'pageData4':
                pageData4[dataIndex].checked = !pageData4[dataIndex].checked;
                break;
            default:
                break;
        }
        for(var i = 0; i < pageData1.length; i++){
            if(pageData1[i].checked){
                nowData1.push(pageData1[i].val);
                nowColor1.push(pageData1[i].color);
            }else if(!pageData1[i].checked){
                nowData1.push('');
                nowColor1.push('');
            }
        }
        for(var i = 0; i < pageData2.length; i++){
            if(pageData2[i].checked){
                nowData2.push(pageData2[i].val);
                nowColor2.push(pageData2[i].color);
            }else if(!pageData2[i].checked){
                nowData2.push('');
                nowColor2.push('');
            }
        }
        for(var i = 0; i < pageData1.length; i++){
            if(pageData3[i].checked){
                nowData3.push(pageData3[i].val);
                nowColor3.push(pageData3[i].color);
            }else if(!pageData3[i].checked){
                nowData3.push('');
                nowColor3.push('');
            }
        }
        for(var i = 0; i < pageData4.length; i++){
            if(pageData4[i].checked){
                nowData4.push(pageData4[i].val);
                nowColor4.push(pageData4[i].color);
            }else if(!pageData4[i].checked){
                nowColor4.push('');
                nowColor4.push('');
            }
        }
        passInit(nowData1,nowColor1,nowData2,nowColor2,nowData3,nowColor3,nowData4,nowColor4);
    });
});


function passInit(nowData1,nowColor1,nowData2,nowColor2,nowData3,nowColor3,nowData4,nowColor4) {
    var passOption = {
        grid: {
            left: '5%',
            right: '10%',
            bottom: '15%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: ['交流通道', '直流通道'],
                axisTick: {
                    show: false,
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
                name: '四川省外送通道容量',
                type: 'bar',
                barGap: 0,
                data: nowData1,
                itemStyle: {
                    normal: {
                        color: function (params) {
                            return nowColor1[params.dataIndex];
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
                name: '四川省外送通道容量',
                type: 'bar',
                data: nowData2,
                itemStyle: {
                    normal: {
                        color: function (params) {
                            return nowColor2[params.dataIndex];
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
                name: '四川省外送通道容量',
                type: 'bar',
                data: nowData3,
                itemStyle: {
                    normal: {
                        color: function (params) {
                            return nowColor3[params.dataIndex];
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
                name: '四川省外送通道容量',
                type: 'bar',
                data: nowData4,
                itemStyle: {
                    normal: {
                        color: function (params) {
                            return nowColor4[params.dataIndex];
                        },
                        //以下为是否显示
                        label: {
                            show: true,
                            position: 'top'
                        }
                    }
                }
            }
        ]
    };
    DrawEChart('passChart', passOption);
}
