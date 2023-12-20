var isInit = true;

$(document).ready(function() {
	
	childrenSelectInit();
});

function childrenSelectInit() {
	// 클래스 리스트 조회
	fn_childrenGroupSelect();
	// 전체 아동 리스트 조회
	fn_childrenSelect();
	// 초기화 끝
	isInit = false;
	// 필터 아동 리스트 조회
	fn_childrenSelect();
}

function fn_childrenGroupSelect() {
	var param = {
			groupPosiotionCd : sessionStorage.getItem("centerSeq")
		};

	$.ajax({
		url: "/common/ajax.selectChildrenGroupList"
		, type : "post"
		, data : JSON.stringify(param)
		, contentType : 'application/json; charset=utf-8'
		, async : false
		, success : function(data) {
			makeChdGroupBadge(data.chdGroupList);
		}
		, error : function(request, status, error) {
			fn_alert("반 목록을 조회하지 못했습니다. 담당자에게 연락하세요.", "warning")
		}
	});
}

function makeChdGroupBadge(chdGroupList) {
	var html = '';
	
	html += '<span class="badge active" id="allGroupBadge">All</span>';
	chdGroupList.forEach(function(item, index, array) {
		html += '<span class="badge" data-seq="'+item.groupSeq+'">'+item.groupName+'</span>';
	});
	$("#groupBadgeArea").empty();
	$("#groupBadgeArea").append(html);
	
	$(".badge").on("click", function() {
		if($(this).hasClass("active")){
			$(this).removeClass("active");
		} else {
			$(this).addClass("active");
		}
		
		if($(this).attr("id") === "allGroupBadge"){
			$(".badge").each(function(i, element) {
				if(i != 0){
					$(element).removeClass("active");
				}
			});
		} else {
			$("#allGroupBadge").removeClass("active");
		}
		
		fn_childrenSelect();
	});
}

function getActiveChdGroupSeq() {
	var chdGroupSeqArray = "";
	$(".badge.active").each(function(index, element) {
		chdGroupSeqArray += $(element).data("seq");
		if(index < ($(".badge.active").length - 1)){
			chdGroupSeqArray += ",";
		}
	});
	return chdGroupSeqArray;
}

function fn_childrenSelect() {
	var param = {
			childrenPositionCd : sessionStorage.getItem("centerSeq")
		};
	
	if(!$("#allGroupBadge").hasClass("active") && !isInit){
		param.chdGroupSeqArray = getActiveChdGroupSeq();
	}

	$.ajax({
		url: "/common/ajax.selectChildrenList"
		, type : "post"
		, data : JSON.stringify(param)
		, contentType : 'application/json; charset=utf-8'
		, async : false
		, success : function(data) {
			if(isInit){
				makeChildrenBookList("allListArea", data.childrenList);
			} else {
				makeChildrenBookList("filterListArea", data.childrenList);
			}
		}
		, error : function(request, status, error) {
			fn_alert("아동 목록을 조회 하지 못했습니다. 담당자에게 연락하세요.", "warning")
		}
	});
}

function makeChildrenBookList(targetId, childrenList) {
	
	var html = '';
	
	childrenList.forEach(function(item, index, array) {
		var childrenBirth = $.getCustomDate(item.childrenBirth, true);
		var childrenProgStDt = $.getDateFormat(item.childrenProgStDt, 'YYYY.MM.DD');
		var childrenProgEdDt = $.getDateFormat(item.childrenProgEdDt, 'YYYY.MM.DD');
		var textColor = "text-black";
		
		if(item.childrenBookImg == "book_1" || item.childrenBookImg == "book_3" || item.childrenBookImg == "book_4"){
			textColor = "text-white"
		};
		
		html += '	<div class="col-lg-2 col-md-3 col-sm-4 style-book" onclick="moveNextPage('+item.childrenSeq+')">';
		html += '		<img src="../image/book_img/'+item.childrenBookImg+'.png">';
		html += '		<div class="book-cover '+textColor+'">';
		html += '			<small class="cover-class">'+item.groupName+'</small>';
		html += '			<h5 class="cover-name">'+item.childrenName+'</h5>';
		html += '			<small class="cover-birth">'+childrenBirth+'</small>';
		html += '		</div>';
		html += '		<small class="text-center">'+childrenProgStDt+' ~ '+childrenProgEdDt+'</small>';
		html += '	</div>';
	});
	
	$("#"+targetId).empty();
	$("#"+targetId).append(html);
}

function moveNextPage(seq) {
	
	var url = '';
	
	if(_packageName === "dpm") {
		url = "/dpm/dailySheet";
	} else if (_packageName === "cpm") {
		url = "/cpm/cpmMain";
	}
	
	sessionStorage.setItem("childrenSeq", seq);
	fn_formUrlMove(url, "GET", null);
}












