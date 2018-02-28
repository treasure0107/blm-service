function UrlSearch() {
    var name, value;
    var str = location.href;
    var num = str.indexOf("?");
    str = str.substr(num + 1);
    var arr = str.split("&");
    for (var i = 0; i < arr.length; i++) {
        num = arr[i].indexOf("=");
        if (num > 0) {
            name = arr[i].substring(0, num);
            value = arr[i].substr(num + 1);
            this[name] = value;
        }
    }
}

function findFromUrl(str, schars, num) {
    var x = str.indexOf(schars);
    for (var i = 0; i < num; i++) {
        x = str.indexOf(schars, x + 1);
    }
    return x;
}

//更改路径
function getUrlpre() {
    var urlval = location.href;
    var indexval = findFromUrl(urlval, '/', 2);
    var preUrl = urlval.substring(0, indexval);
    return preUrl;
}

$(".commonMain").prepend(
    '<div class="header_con">'
    + '<span class="merchant_name">您好，<span class="user_name">商户名称</span>！</span>'
    + '<div class="phone_num">'
    + '<span><img src="../desImages/icon_phone.png" alt=""></span>'
    + '<span class="phone_n">400-830-6690</span>'
    + '</div>'
    + '<span class="icon_setting"><img src="../desImages/icon_setting.png" alt=""></span>'
    + '<span class="icon_message"><img src="../desImages/icon_message_top.png" alt=""></span>'
    + '<span class="turn_off"><img src="../desImages/icon_turnoff.png" alt=""></span>'
    + '</div>'
    + '<div class="sidebar_nav">'
    + '<div class="logo"><img src="../desImages/logo_beryl-mart.png" alt=""></div>'
    + '<ul>'
    + '<li data-hrefid="indexPage.html">'
    + '<a href="indexPage.html">'
    + '<span class="nav_img"><img src="../desImages/icon_index.png" alt=""></span>'
    + '<span>首页</span>'
    + '</a>'
    + '</li>'
    + '<li data-hrefid="accountCollections.html">'
    // + '<a href="../../src/accountCollections.html">'
    + '<a href="accountCollections.html">'
    + '<span class="nav_img "><img src="../desImages/icon_gathering.png" alt=""></span>'
    + '<span>应收账款</span>'
    + '</a>'
    + '</li>'
    + '<li data-hrefid="accountPay.html">'
    + '<a href="accountPay.html">'
    + '<span class="nav_img "><img src="../desImages/icon_pay.png" alt=""></span>'
    + '<span>应付账款</span>'
    + '</a>'
    + '</li>'
    + '<li data-hrefid="merchantContract.html">'
    + '<a href="merchantContract.html">'
    + '<span class="nav_img "><img src="../desImages/icon_contract.png" alt=""></span>'
    + '<span>商户合同</span>'
    + '</a>'
    + '</li>'
    + '<li data-hrefid="onLineBlm.html">'
    + '<a href="onLineBlm.html">'
    + '<span class="nav_img "><img src="../desImages/icon_on_line.png" alt=""></span>'
    + '<span>连线百利玛</span>'
    + '</a>'
    + '</li>'
    + '<li data-hrefid="messageCenter.html">'
    + '<a href="messageCenter.html">'
    + '<span class="nav_img "><img src="../desImages/icon_message.png" alt=""></span>'
    + '<span>消息中心</span>'
    + '</a>'
    + '</li>'
    + '</ul>'
    + '</div>'
    + '<div class="merchant_details">'
    + '<span class="merchant_tit">商户详情</span>'
    + '<div class="container-fluid details_con">'
    + '<div class="row">'
    + '<div class="col-md-3">'
    + '<span class="iconImg"><img src="../desImages/icon_brand.png" alt=""></span>品牌展示：'
    + '<span class="business_brand"></span>'
    + '</div>'
    + '<div class="col-md-3">'
    + '<span class="iconImg"><img src="../desImages/icon_number.png" alt=""></span>商家编号：'
    + '<span class="b_num"></span>'
    + '</div>'
    + '<div class="col-md-2">'
    + '<span class="iconImg"><img src="../desImages/icon_store.png" alt=""></span>分店：<span class="store_area"></span>'
    + '</div>'
    + '<div class="col-md-4" style="text-align: center;">'
    + '<span class="iconImg"><img src="../desImages/icon_map.png" alt=""></span>'
    + '地址：<span class="house_number"></span>'
    + '</div>'
    + '</div>'
    + '</div>'
    + '</div>'
);

$(".user_name").text(localStorage.username);

function getUrlInit() {
    var strUrl = window.location.href;
    $(".sidebar_nav li").each(function (i, val) {
        var dataUrl = $(this).data("hrefid");
        if (strUrl.indexOf(dataUrl) != -1) {
            $(this).addClass("navActive");
        }
    })
}

getUrlInit();

//商家信息
merchantInfoQueryById(function (data) {
    // console.log(data);
    $(".business_brand").text(data.brand);
    $(".store_area").text(data.area);
    $(".b_num").text(data.sn);
    $(".house_number").text(data.houseNumber);
    localStorage.merchantName=data.name;
}, function (data) {
    $(".pop_up").text(data.msg).fadeIn(200).fadeOut(1000);
});
//点击退出登录
$(".turn_off").click(function () {
    logout(function (data) {
        location.href = '../login.html';
    }, function () {

    })
});

