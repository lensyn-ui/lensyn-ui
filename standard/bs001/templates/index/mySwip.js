/**
 * Created by ty on 17/9/20.
 */

;$(function(){

    var CONST_TOP_TITLE_URL = "C:/Users/zk-002/Desktop/%E5%BF%AB%E6%8D%B7%E6%96%B9%E5%BC%8F/%E6%9C%80%E7%BB%88%E7%89%88%E6%9C%AC/dist/html/Index/index.html";


    //初始化月度销售的下面legend轮播
    var mySwiper = new Swiper ('#monthPieLegend',{
        autoplay:10000
    });

    /*为页面顶部的大标题增加点击事件*/
    $("#topTitle").click(function(){
        // window.location.href = CONST_TOP_TITLE_URL;
        window.open(CONST_TOP_TITLE_URL);
    });
});