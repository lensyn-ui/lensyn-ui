/*********************************************************************
 * Created by tr on 2017/9/27.                                       *
 *********************************************************************/
;$(function () {
    $('#graph').on('click','div',function (evt) {
        /* 阻止冒泡 */
        var event = evt || window.event;
        event.stopPropagation();

        var that = $(this);
        var _layer = $('#floatingLayer');
        var _left = that.position().left;//获取当前元素的left值
        var _top = that.position().top;//获取当前元素的top值

        var newLeft = _left + 51; //新的left值
        var newTop = _top - 78;//新的top值

        var dataPop = that.attr('data-pop'); //当前选的值
        var dataId1 = that.attr('data-id1'); //当前选的值
        var dataId2 = that.attr('data-id2'); //当前选的值

        if(dataPop === '瀑布沟水电站' || dataPop === '深溪沟水电站' || dataPop === '沙南水电站') {
            newLeft = _left + 81;
            newTop = _top - 90;
        }else if(dataPop === '枕头坝水电站' || dataPop === '龚站水电站'){
            newLeft = _left + 81;
            newTop = _top - 74;
        }else if(dataPop === '铜站水电站'){
            newLeft = _left + 102;
            newTop = _top - 74;
        }
        _layer.css("left",newLeft + "px");
        _layer.css("top",newTop + "px");
        getPopValue(dataPop,dataId1,dataId2);
        _layer.show();
    });

    $("#floatingLayer").on("click", function (event) {
        /* 阻止冒泡 */
        var evt = event || window.event;
        evt.stopPropagation();
    })
});
/*弹出框的值*/
function getPopValue(name,id1,id2) {
    $('#floatingLayer .title-f').text(name);
    $.get('/dataService/siteData?timeStart='+getDate().fameData+'&siteId='+id1+'&idJkzx='+id2,function (data) {
        $('#floatingLayer .zj').text((data.capacity / 10 * 1).toFixed(2) + '万');
        $('#floatingLayer .rf').text((data.genToday  * 1).toFixed(2));
        $('#floatingLayer .yf').text((data.genMonth * 1).toFixed(2));
        $('#floatingLayer .nf').text((data.genYear  * 1).toFixed(2));
    });
}