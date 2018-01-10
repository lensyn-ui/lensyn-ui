/**
 * Created by 陈涛 on 2017-8-8.
 */
// var r_echart1=echarts.init(document.getElementById('r-echart1'));
// var r_echart2=echarts.init(document.getElementById('r-echart2'));
// var r_echart3=echarts.init(document.getElementById('r-echart3'));

var l_echart1=echarts.init(document.getElementById('le-echart1'));
var l_echart2=echarts.init(document.getElementById('le-echart2'));
var l_echart3=echarts.init(document.getElementById('le-echart3'));





var option1 = {
    backgroundColor: 'rgba(255,255,255,0)',
    tooltip : {
        trigger: 'item',
        backgroundColor:'rgba(43,71,90,.6)',
    },

    visualMap: {
        show: false,
        min: 80,
        max: 600,
        inRange: {
            colorLightness: [0, 1]
        }
    },
    color:['#154558','#319ac3','#2c8ab0','#257493','#1c5e78','#62b5d7'],
    series : [
        {
            name:'',
            type:'pie',
            radius : '55%',
            center: ['50%', '50%'],
            data:[
                {value:335, name:'双江口水电站'},
                {value:310, name:'金川水电站'},
                {value:310, name:'猴子岩水电站'},
                {value:274, name:'老鹰岩水电站'},
                {value:235, name:'大岗山水电站'},
                {value:234, name:'瀑布沟水电站'}
            ].sort(function (a, b) { return a.value - b.value; }),
            roseType: 'radius',
            label: {
                normal: {
                    textStyle: {
                        color: '#bababa'
                    }
                }
            },
            labelLine: {
                normal: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.3)'
                    },
                    smooth: 0.2,
                    length: 10,
                    length2: 20
                }
            },
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
                return Math.random() * 200;
            }
        }
    ]
};
var option2 = {
    backgroundColor: 'rgba(255,255,255,0)',
    tooltip : {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    color: ['#56d89f'],
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            data : ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
            axisTick: {
                alignWithLabel: true
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#bababa'
                }
            }
        }
    ],
    yAxis : [
        {
            type : 'value',
             splitLine:{show: false},//去除网格线
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#bababa'
                }
            }
        }
    ],
    series : [
        {
            name:'',
            type:'bar',
            barWidth: '60%',
            data:[10, 52, 200, 334, 390, 330, 220,43,54,423,34,23]
        }
    ]
};
var option3 = {
    tooltip : {
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
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            data : ['周一','周二','周三','周四','周五','周六','周日'],
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#bababa'
                }
            }
        }
    ],
    yAxis : [
        {
            type : 'value',
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#bababa'
                }
            },
           splitLine:{show: false},//去除网格线
        }
    ],
    series : [
        {
            name:'邮件营销',
            type:'line',
            stack: '总量',
            itemStyle : {
                normal : {
                    color:'#6fd6e3',
                    lineStyle:{
                        color:'#6fd6e3'
                    }
                }
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: '#11354d'
                    }, {
                        offset: 1,
                        color: '#1f6075'
                    }])
                }
            },
            data:[120, 132, 101, 134, 90, 230, 210]
        },
    ]
};
var labelTop = {//上层样式
    normal : {
        color :'#40ccdd',
        label : {
            show : true,
            position : 'center',
            formatter : '{b}',
            textStyle: {
                baseline : 'center',
                fontSize:26,
            }
        },
        labelLine : {
            show : false
        }
    }
};
var labelFromatter = {//环内样式
    normal : {//默认样式
        label : {//标签
            formatter : function (a,b,c){return 100 - c + '%'},
            // labelLine.length：30,  //线长，从外边缘起计算，可为负值
            textStyle: {//标签文本样式
                color:'black',
                align :'center',
                baseline : 'top'//垂直对其方式
            }
        }
    },
};
var labelBottom = {//底层样式
    normal : {
        color: '#333e52',
        label : {
            show : true,
              position : 'center',
            x:'10%',
            y:'10%',
            fontSize:20
        },
        labelLine : {
            show : false
        }
    },
    // emphasis: {//悬浮式样式
    //     color: 'rgba( 0,0,0,0)'
    // }
};
var radius = [35,50];// 半径[内半径，外半径]
var option4 = {
    title : {
        text: '79%',
        x:'center',
        y:'center',
        textStyle: {
            fontSize: '24',
            color:'#fff'
        }
    },
    animation:false,
    // tooltip : {         // 提示框. Can be overwrited by series or data
    //     trigger: 'axis',
    //     //show: true,   //default true
    //     showDelay: 0,
    //     hideDelay: 50,
    //     transitionDuration:0,
    //     borderRadius : 8,
    //     borderWidth: 2,
    //     padding: 10,    // [5, 10, 15, 20]
    // },
    series : [
        {
            type : 'pie',
            center : ['50%', '50%'],//圆心坐标（div中的%比例）
            radius : radius,//半径
            x: '0%', // for funnel
            itemStyle : labelTop,//graphStyleA,//图形样式 // 当查到的数据不存在（并非为0），此属性隐藏
            data : [
                {name:'', value:79,itemStyle : labelTop},
                {name:'', value:21, itemStyle : labelBottom}
            ]
        }
    ]
};






// r_echart1.setOption(option1);
// r_echart2.setOption(option2);
// r_echart3.setOption(option3);

l_echart2.setOption(option4);
l_echart3.setOption(option4);
l_echart1.setOption(option4);



window.addEventListener("resize",function(){
    // r_echart1.resize();
    // r_echart2.resize();
    // r_echart3.resize();
    l_echart1.resize();
    l_echart2.resize();
    l_echart3.resize();

});