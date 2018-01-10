/**
 * Created by 陈涛 on 2017-9-12.
 */
var str='\
 <div class="headerLeft">\
        <div>\
            <span class="navImg">\
                <img src="./indeximgs/incon1.png" class="menuImg" />\
                <!--导航栏-->\
                <div class="navMenu">\
                <ul>\
                    <li><a href="index.html"> 首页</a></li>\
                    <li>\
                        <a>前期管理</a>\
                        \ <ul class="secondMenu" style="height: 110px;top: 43px;">\
                                <li style="margin-top: 7%"> <a href="approvalManage.html" >核准管理</a></li>\
                                <li><a href="noraCheck.html">指标核算</a></li>\
                            </ul>\
                    </li>\
                    <li>\
                        <a>工程管理</a>\
                            <ul class="secondMenu">\
                                <li style="margin-top: 7%"> <a href="">安全控制</a></li>\
                                <li><a href="quality.html">质量控制</a></li>\
                                <li><a href="schedule.html">进度控制</a></li>\
                                <li><a href="" >投资控制</a></li>\
                                <li><a href="" >水保环保</a></li>\
                                <li><a href="" >其他管理</a></li>\
                            </ul>\
                    </li>\
                    <li>\
                    <a>工程评价</a>\
                           <ul class="secondMenu" style="height: 160px;top: 40px;">\
                                <li style="margin-top: 7%"> <a href="projectAccept.html">工程验收</a></li>\
                                <li><a href="evalute.html">后评价</a></li>\
                                <li><a href="projectBehavior.html">安全性态</a></li>\
                            </ul>\
                    </li>\
                    <li>\
                        <a >数据中心</a>\
                            <ul class="secondMenu" style="height: 110px;top: 43px;">\
                                <li style="margin-top: 6%">\
                                \ <li><a href="dataRepository.html">数据库</a></li>\
                                <li><a href="knowlodgeRepository.html">知识库</a></li>\
                            </ul>\
                    </li>\
                </ul>\
                </div>\
             </span>\
            <span id="Date"></span>\
            <span style="float: right;font-size: 18px">已有数据量：<span style="color: #0feb8b;">13243432</span>条</span>\
        </div>\
    </div>\
    <div class="headerCenter"></div>\
    <div class="headerRight"><span style="font-size: 18px">欢迎您，xxx</span>\
    <span><a href="meetingDiscuss.html" ><img src="./indeximgs/1.png" /></a> </span>\
    <span><img src="./indeximgs/2.png" /></span>\
    <span><a href="index.html" ><img src="./indeximgs/3.png" /></a></span></div>\
'

$('header').html(str);


getTime();

//获取准确时间的js
function getTime() {
    setInterval(function(){
        var date=new Date();
        var show_day=new Array('星期日','星期一','星期二','星期三','星期四','星期五','星期六');
        var year=date.getFullYear(); //获取当前年份
        var mon=date.getMonth()+1; //获取当前月份
        var da=date.getDate(); //获取当前日
        var day=date.getDay(); //获取当前星期几
        var h=date.getHours(); //获取小时
        var m=date.getMinutes(); //获取分钟
        if(m<0){
            m='0'+m;
        }
        var s=date.getSeconds(); //获取秒
        var d=document.getElementById('Date');
        d.innerText=year+'年'+mon+'月'+da+'日'+''+show_day[day]+' '+h+':'+m+':'+s;
    },1000)

}
//导航栏显示与否
$('header').on('mouseover','.navImg',function () {
    $('.menuImg').attr('src','./indeximgs/icon-light.png');
    $('.navMenu').css('display','block');
})
$('header').on('mouseout','.navImg',function () {
    $('.menuImg').attr('src','./indeximgs/incon1.png');
    $('.navMenu').css('display','none');
})

