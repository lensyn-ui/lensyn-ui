/*********************************************************************
 * Created by deming-su on 2017/9/13                                 *
 *********************************************************************/

$(function () {
    /* 设置盒子的大小并且注册窗口缩放事件 */
    resizeMaterialBox();
    $(window).on('resize', resizeMaterialBox);

    /* 绑定列表查询条件 */
    $("#searchList").on('click', '.more', function () {
        var that = $(this);
        var node = that.siblings('div.condition');
        if(node.hasClass('active')) {
            that.text('展开');
            node.removeClass('active');
        } else {
            that.text('收起');
            node.addClass('active');
        }
    });

    /* 材料列表点击事件 */
    $(".material-index").on('click', '.item', function () {
        window.location.href = "../detail/index.html?id=" + $(this).attr("now-id");
    })
});

/* 重置材料盒子大小 */
function resizeMaterialBox() {
    /* 113为盒子模型底部元素的高度 */
    debugger
    var box = $('.material-index').find('div.box');
    box.css('height', (box.width() + 113) + 'px');
    box.find('div.logo').css('height', box.width() + 'px');

}