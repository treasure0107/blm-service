//开始时间
$('.start_time').datetimepicker({
    format: 'yyyy-mm-dd',
    language: 'zh-CN',
    weekStart: 1,
    todayBtn: 1,
    autoclose: 1,
    todayHighlight: 1,
    startView: 2,
    minView: 2,
    forceParse: 0
});

//结束时间
$('.end_time').datetimepicker({
    format: 'yyyy-mm-dd',
    language: 'zh-CN',
    weekStart: 1,
    todayBtn: 1,
    autoclose: 1,
    todayHighlight: 1,
    startView: 2,
    minView: 2,
    forceParse: 0
});
var pageNum = 1;   //显示第几页
var pageSize = 8;  //每页的个数
var startDate = null, endDate = null, orderNumber = null;
var obj = {};
obj.pages = "";
initList();
// merchantDuesQueryOderListPage(pageNum, pageSize, orderNumber, startDate, endDate, function (data) {
//     console.log(data);
//     obj.pages = data.pages;
//     $.each(data.list, function (i, val) {
//         val.indexNum = i + 1;
//         console.log(val.paymentAmount);
//         totalSum+=val.paymentAmount;
//         // console.log(totalSum);
//         $("#collectionList").tmpl(val).appendTo('.account_table_con');
//     });
//     $("#total_sum").text(totalSum);
// }, function () {
// });

//分页
$('.page_icon').pagination({
    pageCount: obj.pages,              //总页数
    num_edge_entries: 1,              //边缘页数
    num_display_entries: 1,          //主体页数
    items_per_page: pageSize,       //每页显示1项
    // showData: pageSize,         //每页显示的条数
    count: 2,
    coping: true,
    keepShowPN: true,
    current_page: 0,            //当前页索引
    load_first_page: false,
    link_to: "?id=__id__",     //分页的js中会自动把"__id__"替换为当前的数。
    callback: initList
});

function initList() {
    var totalSum=null;
    pageNum = $(".page_icon .active").text();
    merchantDuesQueryOderListPage(pageNum, pageSize, orderNumber, startDate, endDate, function (data) {
        $(".account_table_con").empty();
        obj.pages = data.pages;
        if(data.list.length==0){
            $(".popUpData").show();
            $(".account_foot").hide();
            return false;
        }
        $.each(data.list, function (i, val) {
            val.indexNum = i + 1;
            totalSum+=val.paymentAmount;
            $("#collectionList").tmpl(val).appendTo('.account_table_con');
        });
        $("#total_sum").text(totalSum);
    }, function (data) {
        $(".pop_up").text(data.msg).fadeIn(200).fadeOut(1000);
    });
}

//点击查询
$(".search_btn").click(function () {
    orderNumber = $("#keywords").val();
    startDate = $(".start_time").val();
    endDate = $(".end_time").val();
    $(".page_icon").empty();
    initList();
    //分页
    $('.page_icon').pagination({
        pageCount: obj.pages,              //总页数
        num_edge_entries: 1,              //边缘页数
        num_display_entries: 1,          //主体页数
        items_per_page: pageSize,       //每页显示1项
        // showData: pageSize,         //每页显示的条数
        count: 2,
        coping: true,
        keepShowPN: true,
        current_page: 0,            //当前页索引
        load_first_page: false,
        link_to: "?id=__id__",     //分页的js中会自动把"__id__"替换为当前的数。
        callback: initList
    });
});