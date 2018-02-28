// 测试环境
var ajaxurl = "http://192.168.1.240/blm-service-gateway/";

//生产环境
// var ajaxurl = "http://www.onlineblm.com/blm-service-gateway/";
// var sessionID = localStorage.sessionID;

//jquery全局配置
$.ajaxSetup({
    cache: false,
    headers: {
        "token": localStorage.token
    },
    xhrFields: {
        withCredentials: true
    },
    complete: function (xhr) {
        if (xhr.responseJSON) {
            //token过期，则跳转到登录页面
            if (xhr.responseJSON.code == "2") {
                localStorage.removeItem("token");
                location.href = '../login.html';
            }else if(xhr.responseJSON.code != 0){
                $(".pop_up").text("请求失败").fadeIn(200).fadeOut(1000);
            }
        }
    }
});

// 登录
function login(account, password, successBk, failBk) {
    $.ajax({
        type: "POST",
        url: ajaxurl + "login",
        dataType: "json",
        data: {
            account: account,
            password: password
        },
        success: function (data) {
            if (data.code == 0) {
                successBk(data.obj);
            } else {
                failBk(data);
            }
        }
    });
}

//退出登录
function logout(successBk, failBk) {
    $.ajax({
        type: "get",
        url: ajaxurl + "logout",
        dataType: "json",
        data: {
            token: localStorage.token
        },
        success: function (data) {
            if (data.code == 0) {
                successBk(data.obj);
            } else {
                failBk(data);
            }
        }
    });
}

//商家信息查询
function merchantInfoQueryById(successBk, failBk) {
    $.ajax({
        type: "get",
        url: ajaxurl + "merchant/info/queryById",
        dataType: "json",
        data: {
            // token: localStorage.token
        },
        success: function (data) {
            if (data.code == 0) {
                successBk(data.obj);
            } else {
                failBk(data);
            }
        }
    });
}

//  商家信息分页查询
function merchantMessageQueryListPage(pageNum, pageSize, title, successBk, failBk) {
    $.ajax({
        type: "get",
        url: ajaxurl + "merchant/message/queryListPage",
        dataType: "json",
        async: false,
        data: {
            pageNum: pageNum,
            pageSize: pageSize,
            title: title
        },
        success: function (data) {
            if (data.code == 0) {
                successBk(data.obj);
            } else {
                failBk(data);
            }
        }
    });
}

// 商家信息详情
function merchantMessageDetail(id, successBk, failBk) {
    $.ajax({
        type: "get",
        url: ajaxurl + "merchant/message/detail",
        dataType: "json",
        data: {
            id: id
        },
        success: function (data) {
            if (data.code == 0) {
                successBk(data.obj);
            } else {
                failBk(data);
            }
        }
    });
}

//  商家信息删除
function merchantMessageDelete(id, successBk, failBk) {
    $.ajax({
        type: "DELETE",
        url: ajaxurl + "merchant/message/delete",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(id),
        success: function (data) {
            if (data.code == 0) {
                successBk(data.obj);
            } else {
                failBk(data);
            }
        }
    });
}

//  merchant/contract/queryListPage?type=0 商铺合同分页查询
function merchantContractQueryListPage(type, pageNum, pageSize, keyword, successBk, failBk) {
    $.ajax({
        type: "get",
        url: ajaxurl + "merchant/contract/queryListPage",
        dataType: "json",
        async: false,
        data: {
            type: type,
            pageNum: pageNum,
            pageSize: pageSize,
            keyword: keyword
        },
        success: function (data) {
            if (data.code == 0) {
                successBk(data.obj);
            } else {
                failBk(data);
            }
        }
    });
}

//  merchant/feedback/save 商家意见反馈
function merchantFeedbackSave(type, content, successBk, failBk) {
    $.ajax({
        type: "POST",
        url: ajaxurl + "merchant/feedback/save",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({type: type, content: content}),
        success: function (data) {
            if (data.code == 0) {
                successBk(data.obj);
            } else {
                failBk(data);
            }
        }
    });
}


//  merchant/dues/queryOderListPage  应收款  参数：
// 开始时间 startDate
// 结束时间 endDate
// 代收款编号 orderNumber
function merchantDuesQueryOderListPage(pageNum, pageSize, orderNumber, startDate, endDate, successBk, failBk) {
    $.ajax({
        type: "get",
        url: ajaxurl + "merchant/dues/queryOderListPage",
        dataType: "json",
        async: false,
        data: {
            pageNum: pageNum,
            pageSize: pageSize,
            orderNumber: orderNumber,
            startDate: startDate,
            endDate: endDate
        },
        success: function (data) {
            if (data.code == 0) {
                successBk(data.obj);
            } else {
                failBk(data);
            }
        }
    });
}

//  merchant/dues/queryDuesListPage  应付款
function merchantDuesQueryDuesListPage(pageNum, pageSize, type, months, successBk, failBk) {
    $.ajax({
        type: "get",
        url: ajaxurl + "merchant/dues/queryDuesListPage",
        dataType: "json",
        async: false,
        data: {
            pageNum: pageNum,
            pageSize: pageSize,
            type: type,
            months: months
        },
        success: function (data) {
            if (data.code == 0) {
                successBk(data.obj);
            } else {
                failBk(data);
            }
        }
    });
}

// merchant/dues/queryDuesDetails  应付款详情
function merchantDuesQueryDuesDetails(id, successBk, failBk) {
    $.ajax({
        type: "get",
        url: ajaxurl + "merchant/dues/queryDuesDetails",
        dataType: "json",
        data: {
            id: id
        },
        success: function (data) {
            if (data.code == 0) {
                successBk(data.obj);
            } else {
                failBk(data);
            }
        }
    });
}
