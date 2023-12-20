$(document).ready(function() {
	
	$.maiNoticeInit = function() {
		selectNoticeList();
	};
	
	$.maiNoticeInit();
});

function selectNoticeList() {
	var url = "/ntc/ajax.selectNoticeList";
	var param = {
			centerSeq : sessionStorage.getItem("centerSeq"),
			pageNum : 1,
			startNum : 0
		};
	
	$.ajax({
		url: url
		, type : "POST"
		, data : JSON.stringify(param)
		, contentType : 'application/json; charset=utf-8'
		, async : false
		, dataType: 'JSON'
		, success : function(data) {
			makeInfoRow(data.resultList);
		}
		, error : function(request, status, error) {
			fn_alert("공지사항 조회에 실패하였습니다. 담당자에게 연락하세요.", "warning")
		}
	});
}

function makeInfoRow(dataList) {
	var html = '';

	dataList.forEach(function(elt, i, array) {
		if(i < 3){
			html += '	<a href="javascript:void(0);" class="list-item notice-card">';
			
			if($.isLatestDate(elt.boardRegDt, 3)) {
				html += '	<span class="position-absolute top-0 start-100 translate-middle badge">NEW</span>';
			}
			
			html += '		<div class="d-flex w-100 justify-content-between my-2">';
			html += '			<h5 class="mb-1 notice-card-title">'+elt.boardTitle+'</h5>';
			html += '			<small class="text-body-secondary">'+$.getDateFormat(elt.boardRegDt, "YYYY.MM.DD")+'</small>';
			html += '		</div>';
			html += '		<span class="notice-card-contents">'+elt.boardContents+'</span>';
			html += '	</a>';
		}
	});
	
	if(dataList.length < 1) {
		html += '	<p>공지사항이 없습니다.</p>';
	}
	
	$("#noticeListArea").empty();
	$("#noticeListArea").append(html);
	
	renderNoticeEvent();
}

function renderNoticeEvent() {
	
	$("#noticeListArea .notice-card").each(function() {
		this.addEventListener("click", function(e) {
			fn_formUrlMove("/ntc/notice", "GET", {});
		});
	});
	
}