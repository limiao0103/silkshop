
$(document).ready(function(){
    //home->商品导航
    $('#productSidebar>li').mouseover(function () {
        $(this).addClass('on');
        $(this).siblings('li').removeClass('on');
        $(this).children('.hidden').show();
        $(this).siblings('li').children('.hidden').hide();
    });
    $('#productSidebar>li').mouseout(function () {
        $(this).removeClass('on');
        $(this).children('.hidden').hide();
    });
    //home->商品导航 结束





});
//goods->筛选商品
var abc = [];
$(function(){
    //选中filter下的所有a标签，为其添加hover方法，该方法有两个参数，分别是鼠标移上和移开所执行的函数。
    $("#filter a").hover(function(){
        $(this).addClass("seling");
    },function(){
        $(this).removeClass("seling");
    });
    //选中filter下所有的dt标签，并且为dt标签后面的第一个dd标签下的a标签添加样式seled。(感叹jquery的强大)
    $("#filter dt+dd a").attr("class", "seled"); /*注意：这儿应该是设置(attr)样式，而不是添加样式(addClass)，
	不然后面通过$("#filter a[class='seled']")访问不到class样式为seled的a标签。*/
    //为filter下的所有a标签添加单击事件
    $("#filter a").click(function(){
        $(this).parents("dl").children("dd").each(function(){
            $(this).children("div").children("a").removeClass("seled");
        });

        $(this).attr("class", "seled");
        var needhide = $(this);
        needhide.parentsUntil("dl").parent().hide();
        abc.push(needhide);
        var val = $(this).html().replace(/ /g, "kongge");
        var condition = '<a class="inbtn pzbtn" rel="'+$(this).html()+'"><i class="icon"></i><span onclick=deleteC("'+val+'")>'+$(this).html()+'</span></a>';
        $("#condition").append(condition);
        // alert(RetSelecteds()); //返回选中结果
    });
// alert(RetSelecteds()); //返回选中结果
});
function deleteC(v){
    var val = v.replace(/kongge/g, " ");
    $("#condition").find("a[rel='"+val+"']").remove();
    for(var i = 0; i<abc.length; i++){
        if(abc[i].html() == val){
            abc[i].parentsUntil("dl").parent().show();
            abc.splice(i, 1);
            i--;
        }else{
            abc[i].parentsUntil("dl").parent().hide();
        }
    }
}
function RetSelecteds(){
    var result = "";
    $("#filter a[class='seled']").each(function(){
        result += $(this).html()+"\n";
    });
    return result;
}
//筛选商品 结束

//goods->对比栏
var isopen = false;
//关闭div层
function hidediv() {
    $('div.product-contrast:visible').hide();
    isopen = false;
}
//显示div层
function showdiv() {
    $('div.product-contrast:hidden').show();
    isopen = true;
}
//点击清空对比栏
function emptydiv() {
    $('.product-contrast>ul').empty()
    $('.product').find('input').prop('checked',false)
}
//checkbox的点击
function actionplan(obj) {
    var planid = obj.parentNode.parentNode.getAttribute("planid");
    var tit=obj.parentNode.parentNode.getAttribute("tit");
    var src=obj.parentNode.parentNode.getAttribute("productsrc");
    if (isopen == false) {
        showdiv();
    }
    addplan(planid,tit,src);
}
//选中一个元素添加到对比
function addplan(planid,tit,src) {
    if (document.getElementById("planid" + planid).checked) {
        if ($("#selectedplan li").length > 3) {
            document.getElementById("planid" + planid).checked = false;
            alert("最多只能选取四个商品呦！");
            return false;
        }

        var abc='<li style="cursor:pointer;" id="li'+ planid +'"><a class="contrast-image"><image src="'+src+'" alt=""></a><div class="contrast-drc"><h5>'+tit+'</h5><p>'+tit+'</p><span>待询价格</span></div> </li>';

        $("#selectedplan").append(abc);

    } else {
        var obj = document.getElementById("li" + planid);
        obj.parentNode.removeChild(obj);

    }
}

//goods->点赞
function zan(a) {
    // if (($(this)).hasClass('elec')) return;
    $(a).addClass('elec');
    $(a).siblings('span').html('已收藏')

}


/*
//goods-compare->商品大小图切换
$(document).ready(function(){
    // 图片上下滚动
    var count = $("#imageMenu li").length - 5; /!* 显示 6 个 li标签内容 *!/
    var interval = $("#imageMenu li:first").width();
    var curIndex = 0;
    $('.scrollbutton').click(function(){
        if( $(this).hasClass('disabled') ) return false;
        if ($(this).hasClass('smallImgUp')) --curIndex;
        else ++curIndex;
        $('.scrollbutton').removeClass('disabled');
        if (curIndex == 0) $('.smallImgUp').addClass('disabled');
        if (curIndex == count-1) $('.smallImgDown').addClass('disabled');
        $("#imageMenu ul").stop(false, true).animate({"marginLeft" : -curIndex*interval + "px"}, 600);
    });
    // 解决 ie6 select框 问题
    $.fn.decorateIframe = function(options) {
        if ($.browser.msie && $.browser.version < 7) {
            var opts = $.extend({}, $.fn.decorateIframe.defaults, options);
            $(this).each(function() {
                var $myThis = $(this);
                //创建一个IFRAME
                var divIframe = $("<iframe />");
                divIframe.attr("id", opts.iframeId);
                divIframe.css("position", "absolute");
                divIframe.css("display", "none");
                divIframe.css("display", "block");
                divIframe.css("z-index", opts.iframeZIndex);
                divIframe.css("border");
                divIframe.css("top", "0");
                divIframe.css("left", "0");
                if (opts.width == 0) {
                    divIframe.css("width", $myThis.width() + parseInt($myThis.css("padding")) * 2 + "px");
                }
                if (opts.height == 0) {
                    divIframe.css("height", $myThis.height() + parseInt($myThis.css("padding")) * 2 + "px");
                }
                divIframe.css("filter", "mask(color=#fff)");
                $myThis.append(divIframe);
            });
        }
    };
    $.fn.decorateIframe.defaults = {
        iframeId: "decorateIframe1",
        iframeZIndex: -1,
        width: 0,
        height: 0
    };
    //放大镜视窗
    $("#bigView").decorateIframe();
    //点击到中图
    var midChangeHandler = null;
    $("#imageMenu li image").bind("click", function(){
        if ($(this).attr("id") != "onlickImg") {
            midChange($(this).attr("src").replace("small", "mid"));
            $("#imageMenu li").removeAttr("id");
            $(this).parent().attr("id", "onlickImg");
        }
    }).bind("mouseover", function(){
        if ($(this).attr("id") != "onlickImg") {
            window.clearTimeout(midChangeHandler);
            midChange($(this).attr("src").replace("small", "mid"));
            $(this).css({ "border": "3px solid #959595" });
        }
    }).bind("mouseout", function(){
        if($(this).attr("id") != "onlickImg"){
            $(this).removeAttr("style");
            midChangeHandler = window.setTimeout(function(){
                midChange($("#onlickImg image").attr("src").replace("small", "mid"));
            }, 1000);
        }
    });
    function midChange(src) {
        $("#midimg").attr("src", src).load(function() {
            changeViewImg();
        });
    }
    //大视窗看图
    function mouseover(e) {
        if ($("#winSelector").css("display") == "none") {
            $("#winSelector,#bigView").show();
        }
        $("#winSelector").css(fixedPosition(e));
        e.stopPropagation();
    }
    function mouseOut(e) {
        if ($("#winSelector").css("display") != "none") {
            $("#winSelector,#bigView").hide();
        }
        e.stopPropagation();
    }
    $("#midimg").mouseover(mouseover); //中图事件
    $("#midimg,#winSelector").mousemove(mouseover).mouseout(mouseOut); //选择器事件
    var $divWidth = $("#winSelector").width(); //选择器宽度
    var $divHeight = $("#winSelector").height(); //选择器高度
    var $imgWidth = $("#midimg").width(); //中图宽度
    var $imgHeight = $("#midimg").height(); //中图高度
    var $viewImgWidth = $viewImgHeight = $height = null; //IE加载后才能得到 大图宽度 大图高度 大图视窗高度
    function changeViewImg() {
        $("#bigView image").attr("src", $("#midimg").attr("src").replace("mid", "big"));
    }
    changeViewImg();
    $("#bigView").scrollLeft(0).scrollTop(0);
    function fixedPosition(e) {
        if (e == null) {
            return;
        }
        var $imgLeft = $("#midimg").offset().left; //中图左边距
        var $imgTop = $("#midimg").offset().top; //中图上边距
        X = e.pageX - $imgLeft - $divWidth / 2; //selector顶点坐标 X
        Y = e.pageY - $imgTop - $divHeight / 2; //selector顶点坐标 Y
        X = X < 0 ? 0 : X;
        Y = Y < 0 ? 0 : Y;
        X = X + $divWidth > $imgWidth ? $imgWidth - $divWidth : X;
        Y = Y + $divHeight > $imgHeight ? $imgHeight - $divHeight : Y;
        if ($viewImgWidth == null) {
            $viewImgWidth = $("#bigView image").outerWidth();
            $viewImgHeight = $("#bigView image").height();
            if ($viewImgWidth < 200 || $viewImgHeight < 200) {
                $viewImgWidth = $viewImgHeight = 800;
            }
            $height = $divHeight * $viewImgHeight / $imgHeight;
            $("#bigView").width($divWidth * $viewImgWidth / $imgWidth);
            $("#bigView").height($height);
        }
        var scrollX = X * $viewImgWidth / $imgWidth;
        var scrollY = Y * $viewImgHeight / $imgHeight;
        $("#bigView image").css({ "left": scrollX * -1, "top": scrollY * -1 });
        $("#bigView").css({ "top": 75, "left": $(".preview").offset().left + $(".preview").width() + 15 });
        return { left: X, top: Y };
    }
});
*/

