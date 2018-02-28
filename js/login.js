window.onload = function(){
    var oInput = document.getElementById("username");
    oInput.focus();
};

//点击登录
$(".login_btn").click(function(){
    // var url=getUrlpre()+'/src/indexPage.html';
    var username=$("#username").val();
    var password=$("#password").val();
    login(username, password, function(data){
        localStorage.username=username;
        localStorage.token=data.token;
        // console.log(data);
        $(".pop_up").text("登录成功").fadeIn(200).fadeOut(1000,function () {
            window.location.href="src/index.html";
        });
    }, function(data){
        $(".pop_up").text(data.msg).fadeIn(200).fadeOut(1000);
    })
});
//按回车登录
$(".login_page").on("keydown","input",function(e){
    var keyCode=e.keyCode;
    if(keyCode==13){
        if($(this).next()){
            $(this).next().focus();
            return;
        }
        $(".login_btn").click();
    }
});


//获取地址栏url
// function UrlSearch() {
//     var name, value;
//     var str = location.href;
//     var num = str.indexOf("?");
//     str = str.substr(num + 1);
//     var arr = str.split("&");
//     for (var i = 0; i < arr.length; i++) {
//         num = arr[i].indexOf("=");
//         if (num > 0) {
//             name = arr[i].substring(0, num);
//             value = arr[i].substr(num + 1);
//             this[name] = value;
//         }
//     }
// }
//
// function findFromUrl(str, schars, num) {
//     var x = str.indexOf(schars);
//     for (var i = 0; i < num; i++) {
//         x = str.indexOf(schars, x + 1);
//     }
//     return x;
// }
//
// //更改路径
// function getUrlpre() {
//     var urlval = location.href;
//     var indexval = findFromUrl(urlval, '/', 3);
//     var preUrl = urlval.substring(0, indexval);
//     return preUrl;
// }