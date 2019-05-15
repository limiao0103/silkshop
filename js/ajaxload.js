$(function(){
    $.ajax({
        //请求方式为get
        type:"GET",
        //json文件位置
        url:"../data/data.json",
        //返回数据格式为json
        dataType: "json",
        //请求成功完成后要执行的方法
        success: function(data){
            //使用$.each方法遍历返回的数据date,插入到id为#result中
            //goods->商品列表
            var str = '<ul>';
            $.each(data.list, function (i,n) {
                str += '<li>' +
                    '          <i class="goods-product-logo"></i>' +
                    '            <div class="product-image">' +
                    '                <a href="goods-detail.html">' +
                    '                   <image src="'+n["image"]+'" alt="">' +
                    '                </a>' +
                    '            </div>' +
                    '            <div class="product-name">' +
                    '                <a href="goods-detail.html">' +
                    '                   <span>待询价格</span>' +
                    '                   <p>'+n["desc"]+'</p>' +
                    '                </a>' +
                    '            </div>' +
                    '            <div class="product-appra">' +
                    '                <a href="goods-detail.html">已有<span>'+n["comment"]+'</span><i>+人评价</i></a>' +
                    '            </div>\n' +
                    '            <div class="product-funct">' +
                    '                <div class="contrast" planid="'+n["id"]+'" tit="'+n["desc"]+'" productsrc="'+n["image"]+'">' +
                    '                     <form action="" method="">' +
                    '                          <input type="checkbox"  id="planid'+n["id"]+'" onclick="actionplan(this)" name="compareplan" value="00'+n["id"]+'"> 对比' +
                    '                     </form>' +
                    '                </div>' +
                    '             <div class="coll">' +
                    '                  <i onclick="zan(this)"></i>&nbsp;' +
                    '                  <span>收藏</span>' +
                    '             </div>' +
                    '             <div class="car" >' +
                    '                 <i></i>' +
                    '                 <span>成功加入购物车</span>' +
                    '                 <a href="###" producttit="'+n["desc"]+'" productsrc="'+n["image"]+'" title="加入购物车" class="baseBg Q-buy-btn" id="buy-s-'+n["id"]+'" >加入购物车</a>' +
                    '              </div>' +
                    '           </div>' +
                    '         </li>'
            });
            str+="</ul>";
            $("#productGoods").append(str);

            //调用购物车
            $('.Q-buy-btn').shoping();





        }
    });
});