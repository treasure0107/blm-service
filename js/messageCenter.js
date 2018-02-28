var pageNum = 1;   //显示第几页
var pageSize = 8;  //每页的个数
var title = "";
var obj = {};
obj.pages = "";
initListPage();
// merchantMessageQueryListPage(pageNum, pageSize, title, function (data) {
//     // console.log(data);
//     obj.pages = data.pages;
//     $.each(data.list, function (i, val) {
//         val.indexNum = i + 1;
//         $("#newsCenterList").tmpl(val).appendTo('.news_table_tr');
//     })
// }, function () {
// });
//查询
$(".search_btn").click(function () {
    title = $("#keywords").val();
    $(".page_icon").empty();
    initListPage();
    //分页
    $('.page_icon').pagination({
        // maxentries:obj.pages,
        pageCount: obj.pages,              //总页数（默认值：9）
        num_edge_entries: 1,              //边缘页数
        num_display_entries: 1,          //主体页数
        items_per_page: pageSize,       //每页显示1项
        // showData: pageSize,         //每页显示的条数
        count: 2,
        coping: true,
        keepShowPN: true,
        current_page: 0,            //当前页索引
        load_first_page: false,
        link_to: "?id=__id__",     //分页的js中会自动把"__id__"替换为当前的数。0　
        callback: initListPage
    });
});
//分页
$('.page_icon').pagination({
    // maxentries:obj.pages,
    pageCount: obj.pages,              //总页数（默认值：9）
    num_edge_entries: 1,              //边缘页数
    num_display_entries: 1,          //主体页数
    items_per_page: pageSize,       //每页显示1项
    // showData: pageSize,         //每页显示的条数
    count: 2,
    coping: true,
    keepShowPN: true,
    current_page: 0,            //当前页索引
    load_first_page: false,
    link_to: "?id=__id__",     //分页的js中会自动把"__id__"替换为当前的数。0　
    callback: initListPage
});


function initListPage() {
    pageNum = $(".page_icon .active").text();
    merchantMessageQueryListPage(pageNum, pageSize, title, function (data) {
        if(data.list.length==0){
            $(".popUpData").show();
            $(".news_foot").hide();
            return false;
        }
        $(".news_table_tr").empty();
        obj.pages = data.pages;
        $.each(data.list, function (i, val) {
            val.indexNum = i + 1;
            $("#newsCenterList").tmpl(val).appendTo('.news_table_tr');
        })
    }, function (data) {
        $(".pop_up").text(data.msg).fadeIn(200).fadeOut(1000);
    });
}

//点击标题(查看详情)
$(".news_table_tr").on("click", ".news_tit", function () {
    var id = $(this).attr("data-titleId");
    merchantMessageDetail(id, function (data) {
        $(".main_con").hide();
        $(".mail_con").css("display", "block");
        $(".mail_tit").text(data.title);
        $(".senderName").text(data.createName);
        $(".senderTime").text(data.createDate);
        $(".merchantName").text(localStorage.merchantName);
        $(".mail_content").html(data.content);

    }, function (data) {
        console.log(data);
    })
});
//点击删除
$(".news_table_tr").on("click", ".delete_btn", function () {
    // var _self=$(this);
    var id = $(this).data("id");
    console.log(id);
    merchantMessageDelete(id, function (data) {
        $(".pop_up").text("删除成功").fadeIn(200).fadeOut(1000, function () {
            // _self.parents("tr").remove();
            window.location.reload();
        });
    }, function (data) {
        $(".pop_up").text(data.msg).fadeIn(200).fadeOut(1000, function () {
        });
    })
});

//点击隐藏详情弹窗
$(".delImg").click(function () {
    $(".main_con").show();
    $(".mail_con").hide();
});


// changePageEvent:function(e){
//     var t = this;
//     var evt = e.currentTarget;
//     if(t.page.pageNum==$(evt).attr('data-num')){
//         return false;
//     }
//     if($(evt).attr('data-num')<1){
//         return false;
//     }
//     if($(evt).attr('data-num')>t.page.totalPage){
//         return false;
//     }
//     var type=$(evt).closest("ul").attr("data-type");
//     switch(type){
//         case"Log":
//             t.initLogData($(evt).attr('data-num'));
//             break;
//     }
//
// },