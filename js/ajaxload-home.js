$(function () {
    $.ajax({
        //请求方式为get
        type: "GET",
        //json文件位置
        url: "data/data.json",
        //返回数据格式为json
        dataType: "json",
        //请求成功完成后要执行的方法
        success: function (data) {
            //home->首页轮播
            var str = "";
            for (var i = 0; i < data.slider.length; i++) {
                str += '<li><a href="javascript:;"><image src="' + data.slider[i].image + '"></li>';
                $(".slider-img-ul").html(str);
            }
            console.log(str)
            //调用轮播图
            $(".slider").xSlider(config)
        }
    })                                      ;
});
