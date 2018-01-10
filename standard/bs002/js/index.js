// 电站点击后出现的折线图
var leftchart=echarts.init(document.getElementById('leftchart'));
function linrchar(arr) {
    leftchart.clear();
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
                name:'',
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
                data:arr
            },
        ]
    };
    leftchart.setOption(option3);
    console.log('111')
    // window.addEventListener("resize",function(){
    //     leftchart.resize();
    // });
}

//弹窗显示与否
$('.show-mask').on('click',function () {
    $('.mask1').css('display','block')
})
$('.icon-close').on('click',function () {
    $('.mask').css('display','none')
})
//弹窗点击显示内容切换
$('.mask-box_title li').on('click',function () {
   $(this).addClass('pitchon').siblings("li").removeClass('pitchon');
    var index=$(this).index();
    $('.mask-box_content li').eq(index).addClass('mask-show').siblings('li').removeClass('mask-show');
})

//之前地图点击的js--目前无用
$('.center-area,.center-area div').on('click',function () {
    event.stopPropagation();
    var imgsrc=$(this).attr('data-src');
    var dataShow=$(this).attr('data-show');
    var dataName=$(this).attr('data-name');
    if(imgsrc){
        $('.center-area').css({'background':'url('+imgsrc+')','background-repeat':'noe-repeat','background-size':'100% 100%'});
        if(!dataShow) {
            $('.cl_1,.cl_2').css('display', 'none');
            $('.show_content').css('display', 'block');
            $('.contentRight-clickShow').css('display', 'block');
            // 电站名字
            $('.sc_1_bottom h3').text(dataName+'电站介绍');
            //弹出框隐藏
            $('.powerList').css('display','none')
            $('.rightBox').css('display','none')
        } else {
            $('.cl_1,.cl_2').css('display','block');
            $('.show_content').css("display",'none');

            //弹出框显示
            $('.powerList').css('display','block');
            $('.rightBox').css('display','block')

            $('.contentRight-clickShow').css('display', 'none');
        }
    } else {
        $('.center-area').css({'background':'url(./indeximgs/地图默认.png) no-repeat','background-size':'100% 100%'});
        $('.cl_1,.cl_2').css('display','block');
        $('.show_content').css("display",'none');
        //弹出框隐藏
        $('.powerList').css('display','block')
        $('.rightBox').css('display','block')
        $('.contentRight-clickShow').css('display', 'none');
    }

})
//3d地貌展示
$('.sanD').on('click',function () {
    $('.mask2').css('display','block')
})
$('.icon-close').on('click',function () {
    $('.mask').css('display','none')
})
//左边内容的显示与隐藏
$('.list-left').on('click',function () {
    var flag=  $(".list-right").attr('data-contolShow');
    if (flag=='true') {
        $(".list-right").animate({left:'-87%'},"slow",function () {
            $(".list-right").attr('data-contolShow','false');
            $('.left-icon').css({'background':'url(./indeximgs/jiantou.png) no-repeat','background-size':'100% 100%'});
        });
    } else {
        $(".list-right").animate({left:'+13%'},"slow",function () {
            $(".list-right").attr('data-contolShow','true');
            $('.left-icon').css({'background':'url(./indeximgs/jiantou2.png) no-repeat','background-size':'100% 100%'});
        });
    }
})
//右边内容的显示与隐藏
function controlShow(clickDiv,obj,icon) {
        var flag = $(obj).attr('data-contolShow');
        console.log(flag);
        if (flag == 'true') {
            $(obj).animate({right: '+13%'}, "slow", function () {
                $(obj).attr('data-contolShow', 'false');
                $(icon).css({'background': 'url(./indeximgs/jiantou.png) no-repeat', 'background-size': '100% 100%'});
            });
        } else {
            $(obj).animate({right: '-87%'}, "slow", function () {
                $(obj).attr('data-contolShow', 'true');
                $(icon).css({'background': 'url(./indeximgs/jiantou2.png) no-repeat', 'background-size': '100% 100%'});
            });
        }

}
$('.rb1-right').on('click',function () {
    controlShow('.rb1-right','.rb1-left','.right1-icon')
})
$('.rb2-right').on('click',function () {
    controlShow('.rb2-right','.rb2-left','.right2-icon')
})
$('.rb3-right').on('click',function () {
    controlShow('.rb3-right','.rb3-left','.right3-icon')
})
$('.rb4-right').on('click',function () {
    controlShow('.rb4-right','.rb4-left','.right4-icon')
})
$('.rb5-right').on('click',function () {
    controlShow('.rb5-right','.rb5-left','.right5-icon')
})


// 地图
//地图电站  ——灰色的移入显示电站名，移除取消显示
$('.area span.circle').on('mouseover',function () {
    $(this).attr('data-mover')? $(this).css({'width':'23px','height':'23px'}).siblings('span').css('display','block'):'';
})
$('.area span.circle').on('mouseout',function () {
    $(this).attr('data-mover')? $(this).css({'width':'20px','height':'20px'}).siblings('span').css('display','none'):'';
})
//可点击的红色电站数据信息
function  evaluate(value) {
    var datajson=[
        {'temperature':'气温:17-22℃',
            'air':'天气:<img src="./indeximgs/xiaoyu.png" width="25" height="25" style="margin-right: 5px">阴转小雨',
            'rainfall':'降雨量：10mm',
            'topwater':'2267.23m',
            'bottomwater':'2250.50m',
            'expectwater':'854.5m<sup>3</sup>/S',
            'buildstate':'建设状态：已经开工',
            'machinecontent':'装机容量：2000MW',
            'averageelectric':'多年平均发电量：77.07亿Kw.h',
            'bsetheight':'最大坝高：312m',
            'watercontent':'水库库容：28.97亿m<sup>3</sup>',
            'satetynum':'9',
            'satetydays':'485',
            'qualityratio1':'100%',
            'qualityratio2':'98.1%',
            'schedule1':'2',
            'schedule2':'3',
            'investnum':'18.1',
            'investratio':'65.2%',
            'protect1':'0',
            'protect2':'1'
        },
        {'temperature':'气温:18-23℃',
            'air':'天气:<img src="./indeximgs/qzdy.png" width="25" height="25" style="margin-right: 5px">晴转多云',
            'rainfall':'降雨量：0mm',
            'topwater':'1842.0m',
            'bottomwater':'1636.4mm',
            'expectwater':'1209.2m<sup>3</sup>/S',
            'buildstate':'建设状态：在建电站',
            'machinecontent':'装机容量：1700MW',
            'averageelectric':'多年平均发电量：70.15亿Kw.h',
            'bsetheight':'最大坝高：223.5m',
            'watercontent':'水库库容：7.04亿m<sup>3</sup>',
            'satetynum':'4',
            'satetydays':'683',
            'qualityratio1':'100%',
            'qualityratio2':'98.3%',
            'schedule1':'0',
            'schedule2':'0',
            'investnum':'0.98',
            'investratio':'87.5%',
            'protect1':'0',
            'protect2':'2'
        },
        {'temperature':'气温:19-26℃',
            'air':'天气:<img src="./indeximgs/qzdy.png" width="25" height="25" style="margin-right: 5px">阴转多云',
            'rainfall':'降雨量：0mm',
            'topwater':'2068.23m',
            'bottomwater':'501.2m',
            'expectwater':'2108.1m<sup>3</sup>/S',
            'buildstate':'建设状态：在建电站',
            'machinecontent':'装机容量：348MW',
            'averageelectric':'多年平均发电量：16.10亿Kw.h',
            'bsetheight':'最大坝高：63m',
            'watercontent':'水库库容：0.208亿m<sup>3</sup>',
            'satetynum':'6',
            'satetydays':'576',
            'qualityratio1':'100%',
            'qualityratio2':'97.8%',
            'schedule1':'0',
            'schedule2':'0',
            'investnum':'1.52',
            'investratio':'92.5%',
            'protect1':'1',
            'protect2':'1'
        },
    ];
    $('.temperature').html(datajson[value].temperature);
    $('.air').html(datajson[value].air);
    $('.rainfall').html(datajson[value].rainfall);
    $('.topwater').html(datajson[value].topwater);
    $('.bottomwater').html(datajson[value].bottomwater);
    $('.expectwater').html(datajson[value].expectwater);
    $('.buildstate').html(datajson[value].buildstate);
    $('.machinecontent').html(datajson[value].machinecontent);
    $('.averageelectric').html(datajson[value].averageelectric);
    $('.bsetheight').html(datajson[value].bsetheight);
    $('.watercontent').html(datajson[value].watercontent);
    $('.satetynum').html(datajson[value].satetynum);
    $('.satetydays').html(datajson[value].satetydays);
    $('.qualityratio1').html(datajson[value].qualityratio1);
    $('.qualityratio2').html(datajson[value].qualityratio2);
    $('.schedule1').html(datajson[value].schedule1);
    $('.schedule2').html(datajson[value].schedule2);
    $('.investnum').html(datajson[value].investnum);
    $('.investratio').html(datajson[value].investratio);
    $('.protect1').html(datajson[value].protect1);
    $('.protect2').html(datajson[value].protect2);

}
//地图——红色电站点击显示左右两边内容
$('.area span.circle').on('click',function () {

    $('span.circle').find('.wave').removeClass("animate");
    if($(this).css('backgroundColor')=='rgb(218, 48, 75)'){

        //点击后添加一个波纹效果
        // $(this).css('background-color','#0feb8b');
        $(this).find('.wave').addClass("animate");
        //获取电站的data-name属性
        var name=$(this).attr('data-name');

        // 电站原点阴影
        // $('div.area span').css('box-shadow','0px 0px 0px #0feb8b');
        // $(this).css('box-shadow','0px 0px 50px #0feb8b');
        //点击红色电站-字体颜色变化
        $('div.area span').css('color','#ffffff')
        $(this).parents('div.area').find('span').css('color','#0feb8b');
        var dataName = $(this).attr('data-name');
        //不同电站的赋值操作
        if(name=='双江口'){
            evaluate(0);
            linrchar([700.5, 723.4, 730.2, 735.1, 738.3, 745.1, 854.5]);
        }else if(name=='猴子岩'){
            evaluate(1);
            linrchar([1150, 1170,1230, 1120,1150,1230, 1190]);
        }else{
            evaluate(2);
            linrchar([2030, 2100, 2150, 2050, 2130, 2140, 2120]);
        }
        if( $('.show_content').css('display')=='block'){
                //弹出框隐藏
                $('.show_content').hide("normal");
                $('.contentRight-clickShow').hide("normal");

            $('.show_content').show("normal");
            $('.contentRight-clickShow').show("normal");

                // 电站名字
            $('.sc_1_bottom h3').text(dataName+'电站介绍');

        }else {
            setTimeout(function () {
                //弹出框显示
                $('.powerList').hide("slow");
                $('.rightBox').hide("slow");
                // 电站名字
                $('.sc_1_bottom h3').text(dataName + '电站介绍');

                $('.show_content').show("slow");
                $('.contentRight-clickShow').show("slow");
            }, 500);
        }
    }
})

// 点击地图其他地方返回初始状态
$('.content').on('click',function (event) {
    if (event.target==this) {
        //取消电站名字颜色和电站原点阴影,波纹,
        $('div.area span').css('box-shadow','0px 0px 0px #0feb8b');
        $('div.area span').css('color','#ffffff');
        $('span.circle').find('.wave').removeClass("animate");
        $('.circle1').css('background-color','rgb(218, 48, 75)');

        setTimeout(function(){
            $('.show_content').hide("slow");
            $('.contentRight-clickShow').hide("slow");
            //弹出框显示
            $('.powerList').show("slow");
            $('.rightBox').show("slow");

        },500);

    }

})


//鼠标移入预警信息显示预警信息框
$('.center-title ul li p span').on('mouseover',function () {
    var str1='<div id="promptbox"><p ><span><img src="./indeximgs/red.png" ></span><span>双江口电站</span><span>堆石区压实度优良率-89%</span><br/></p><p ><span><img src="./indeximgs/red.png" ></span><span>双江口电站</span><span>结合部位优良率-92%</span></p></div>'
    var str2='<div id="promptbox"><p ><span><img src="./indeximgs/red.png" ></span><span>双江口电站</span><span>心墙填筑进度-滞后2月</span><br/></p></div>'
   var num=Number($(this).text());
    if(num==2){
        $(this).parents('li').append(str1);
    }else if(num==1){
        $(this).parents('li').append(str2);
    }
})
$('.center-title ul li p span').on('mouseout',function () {
    $(this).parents('li').find("#promptbox").remove();
})

//footer的显示和消失
$('footer').on('mouseover',function () {
    $('.foot').css('display','block');
})
$('footer').on('mouseout',function () {
    $('.foot').css('display','none');
})
//footer的链接点击
$('.catenatelist>div>p>span').on('click',function () {
    if( $(this).parent('p').parent('div').find('ul').css('display')=='none') {
        $(this).parent('p').parent('div').find('ul').fadeIn('slow');
    }else{
        $(this).parent('p').parent('div').find('ul').fadeOut('slow');
    }
})



