var _isSidebarToggle = false;
var _pathName = window.location.pathname;
var _packageName = _pathName.substr(1, 3);
var _isCpmPage = _packageName === "cpm" ? true : false;
var _isChildrenChoice = _pathName.includes("/children");
var _childrenInfo;

$(document).ready(function () {
	//최초 설정
	
	$("#npDropdownUserName").text(_authName);
	
	if(JSON.parse(sessionStorage.getItem("_isSidebarToggle"))){
		sidebarToggle(1);
	} else {
		sidebarToggle(0);
	}
	if (_isCpmPage && !_isChildrenChoice) {
		$("main[name=main-wrap]").removeClass("none-sub-sidebar");
		sidebarToggle(1);
		setChildrenInfo();
	} else {
		$("main[name=main-wrap]").addClass("none-sub-sidebar");
	}
	$(".nav-sticky .sidebar a.nav-link").each(function(index, element) {
		var id = $(this).prop("id");
		
		if(id === _packageName){
			$(this).addClass("active");
		}
	});
	$(".sub-nav-sticky .sub-sidebar .nav-link").each(function(index, element) {
		var id = $(this).prop("id");
		if(_pathName.includes(id)){
			$(this).addClass("active");
		}
	});
	
	$(".np-dropdown").on("click", function() {
		if($(".sidebar-dropdown").hasClass("show")){
			$(".sidebar-dropdown").removeClass("show");
		} else {
			$(".sidebar-dropdown").addClass("show");
		}
	});
	
	$(".sidebar-dropdown .dropdown-item").on("click", function() {
		var id = $(this).prop("id");
		
		if(id === "sdd_profile") {
			$.fn_openProfile();
		} else if (id === "sdd_centerSelect") {
			$.fn_centerManagerOpen(false, true);
		} else if (id === "sdd_signOut") {
			location.href = "../lgn/signOut"
		}
		
		$(".sidebar-dropdown").removeClass("show");
	});
	
	//클릭 이벤트
	$(".nav-sticky .sidebar a.nav-link").on("click", function() {
		var id = $(this).prop("id");
		var url = getSidbarMenuUrl(id);
		var method = "GET";
		var param = {};
		
		fn_formUrlMove(url, method, param);
	});
	
	$("#sidebarToggle").on("click", function () {
		
		sessionStorage.setItem("_isSidebarToggle", !_isSidebarToggle);
		
		if (!_isSidebarToggle && _isCpmPage && !_isChildrenChoice) {
			$("main[name=main-wrap]").removeClass("none-sub-sidebar");
		} else {
			$("main[name=main-wrap]").addClass("none-sub-sidebar");
		}
		sidebarToggle();
	});
	
	$(".sub-nav-sticky .sub-sidebar .nav-link").on("click", function () {
		var id = $(this).prop("id");
		var url = "/cpm/"+id;
		var param = {};
		
		fn_formUrlMove(url, "GET", param);
	});
	
//	
//	// START 사이드바 함수
//	if ($(".nav-sticky a.nav-link").eq(2).hasClass("active")) {
//		$("main[name=main-wrap]").removeClass("none-sub-sidebar");
//	} else {
//		$("main[name=main-wrap]").addClass("none-sub-sidebar");
//	}
//
//	$("#sidebarToggle").on("click", function () {
//		if (!_isSidebarToggle && $(".nav-sticky a.nav-link").eq(2).hasClass("active")) {
//			$("main[name=main-wrap]").removeClass("none-sub-sidebar");
//		} else {
//			$("main[name=main-wrap]").addClass("none-sub-sidebar");
//		}
//		sidebarToggle();
//	});
//
//	$(".nav-sticky .nav-link").on("click", function () {
//		$(".nav-sticky .nav-link").removeClass("active");
//		$(this).addClass("active");
//		if ($(".nav-sticky a.nav-link").eq(2).hasClass("active")) {
//			$("main[name=main-wrap]").removeClass("none-sub-sidebar");
//			sidebarToggle(1);
//		} else {
//			$("main[name=main-wrap]").addClass("none-sub-sidebar");
//		}
//	});
//
//	$(".sub-nav-sticky .nav-link").on("click", function () {
//		$(".sub-nav-sticky .nav-link").removeClass("active");
//		$(this).addClass("active");
//	});
	// END 사이드바 함수
});
// START 사이드바 함수
function sidebarToggle(flag) {
	
	if (flag === 0) {
		_isSidebarToggle = false;
	} else if (flag === 1) {
		_isSidebarToggle = true;
	} else {
		_isSidebarToggle = !_isSidebarToggle;
	}
	
	if (!_isSidebarToggle) {
		$("img.logo").attr({"src":"../image/full_logo.png", "height":32});
		
		$('main.flex-nowrap').removeClass("sidebar-toggled");
		$('.nav-sticky').removeClass("toggled");
		$('.nav-sticky .dropdown a').addClass("dropdown-toggle");
		$('.nav-sticky .nav .nav-item i.bi').removeClass("icon-lg").addClass("icon-md");
		$("#sidebarToggle > i").removeClass("bi-arrow-right-circle-fill").addClass("bi-arrow-left-circle-fill");
	} else {
		$("img.logo").attr({"src":"../image/logo.png", "height":32});
		
		$('main.flex-nowrap').addClass("sidebar-toggled");
		$('.nav-sticky').addClass("toggled");
		$('.nav-sticky .dropdown a').removeClass("dropdown-toggle");
		$('.nav-sticky .nav .nav-item i.bi').removeClass("icon-md").addClass("icon-lg");
		$("#sidebarToggle > i").removeClass("bi-arrow-left-circle-fill").addClass("bi-arrow-right-circle-fill");
	}
};


function getSidbarMenuUrl(str) {
	var url = "";
	switch (str) {
	case 'mai':
		url = "/mai/main";
		break;
	case 'dpm':
		url = "/dpm/children";
		break;
	case 'cpm':
		url = "/cpm/children";
		break;
	case 'grp':
		url = "/grp/graph";
		break;
	case 'tpm':
		url = "/tpm/programManagement";
		break;
	case 'ntc':
		url = "/ntc/notice";
		break;
	case 'mng':
		url = "/mng/management";
		break;

	default:
		url = "/mai/main";
		break;
	}
	
	return url;
}

function setChildrenInfo() {
	var param = {
			childrenPositionCd : sessionStorage.getItem("centerSeq"),
			childrenSeq : sessionStorage.getItem("childrenSeq")
		};
	
	$.ajax({
		url: "/common/ajax.selectChildrenList"
		, type : "post"
		, data : JSON.stringify(param)
		, contentType : 'application/json; charset=utf-8'
		, async : false
		, success : function(data) {
			var childrenInfo = data.childrenList[0];
			$(".child-card .card-title").text(childrenInfo.childrenName);
			$(".child-card .card-text > span:eq(0)").text($.getCustomDate(childrenInfo.childrenBirth));
			$(".child-card .card-text > span:eq(1)").text(childrenInfo.childrenDiagnosis);
			_childrenInfo = childrenInfo;
		}
		, error : function(request, status, error) {
		}
	});
}

// END 사이드바 함수