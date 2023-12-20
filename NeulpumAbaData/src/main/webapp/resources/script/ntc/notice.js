var modalMode = "view";

$(document).ready(function() {
	
	$("#noticeSearchBtn").on("click", function() {
		$.goSearch(1);
	});
	
    $("#addNoticeBtn").on("click", function() {
    	$("#noticeSeq").val("0");
    	$("#noticeTitleInput").val("");
		$("#noticeContentsInput").val("");
		
        modalModeSwitch("edit");
        
        $("#noticeRemoveBtn").hide();
        $("#noticeModal").modal("show");
    });

    $("#noticeSaveBtn").on("click", function() {

		if($("#noticeTitleInput").val().trim() === "" ){
			fn_alert("공지사항 제목을 입력하세요.", "danger");
			$("#noticeTitleInput").focus();
			return;
		}
		if($("#noticeContentsInput").val().trim() === "" ){
			fn_alert("공지사항 내용을 작성해주세요.", "danger");
			$("#noticeContentsInput").focus();
			return;
		}
		
		var url = "";
		var param = {
				boardTitle : $("#noticeTitleInput").val(),
				boardContents : $("#noticeContentsInput").val(),
				centerSeq : sessionStorage.getItem("centerSeq")
		};
		
		if($("#noticeSeq").val() === '0'){
			url = "/ntc/ajax.insertNoticeData";
		} else {
			url = "/ntc/ajax.updateNoticeData";
			param.boardSeq = $("#noticeSeq").val();
		}
		
		$.ajax({
			url: url
			, type : "POST"
			, data : JSON.stringify(param)
			, contentType : 'application/json; charset=utf-8'
			, async : false
			, dataType: 'JSON'
			, success : function(data) {
				selectNoticeDetail(data.boardSeq);
				
			}
			, error : function(request, status, error) {
				fn_alert("공지사항 저장에 실패하였습니다. 담당자에게 연락하세요.", "warning")
			}
		});
    });

    $("#noticeEditBtn").on("click", function() {
        modalModeSwitch("edit");
    });

    $("#noticeRemoveBtn").on("click", function() {
    	fn_confirm("정말 삭제하시겠습니까?", deleteNotice, "danger");
    	
    });
    
    $.goSearch = function(pageNum) {
		var url = "/ntc/ajax.selectNoticeList";
		var param = {
				centerSeq : sessionStorage.getItem("centerSeq"),
				pageNum : pageNum,
				startNum : (pageNum - 1) * 10
			};
		
		if($("#searchField").val()){
			param.searchField = $("#searchField").val();
		}
		
		$.ajax({
			url: url
			, type : "POST"
			, data : JSON.stringify(param)
			, contentType : 'application/json; charset=utf-8'
			, async : false
			, dataType: 'JSON'
			, success : function(data) {
				makeInfoRow(data.resultList);
				fn_pagination("noticePaging", data.pagingVO);
				
				$("#pageNum").val(pageNum);
			}
			, error : function(request, status, error) {
				fn_alert("공지사항 조회에 실패하였습니다. 담당자에게 연락하세요.", "warning")
			}
		});
	};
	
	$.noticeInit = function() {
		$.goSearch(1);
	};
	
	$.noticeInit();
    
});

function makeInfoRow(dataList) {
	var html = '';
	
	dataList.forEach(function(elt, i, array) {
		html += '	<tr class="noticeRow" data-seq="'+elt.boardSeq+'">';
		html += '		<th scope="row">'+elt.rownum+'</th>';
		
		if($.isLatestDate(elt.boardRegDt, 3)) {
			html += '		<td>'+elt.boardTitle+'<span class="badge new-badge ms-2">New</span></td>';
		} else {
			html += '		<td>'+elt.boardTitle+'</td>';
		}
		
		html += '		<td>'+elt.boardRegMmrName+'</td>';
		html += '		<td>'+$.getDateFormat(elt.boardRegDt, "YYYY-MM-DD")+'</td>';
		html += '	</tr>';

	});
	
	if(dataList.length < 1) {
		html += '	<tr class="">';
		html += '		 <th scope="row" colspan="4">작성된 공지사항이 없습니다.</th>';
		html += '	</tr>';
	}
	
	$("#noticeListArea").empty();
	$("#noticeListArea").append(html);
	
	renderNoticeEvent();
}

function renderNoticeEvent() {
	
	$(".noticeRow").each(function() {
		this.addEventListener("click", function(e) {
			var noticeSeq = $(this).data("seq");
			
			selectNoticeDetail(noticeSeq);
			$("#noticeModal").modal("show");
		});
	});
}


function selectNoticeDetail(noticeSeq) {
	if(!noticeSeq){
		noticeSeq = $("#noticeSeq").val();
	}
	
	var param = {
			boardSeq : noticeSeq
	};
	
	$.ajax({
		url: "/ntc/ajax.selectNoticeDetail"
		, type : "POST"
		, data : JSON.stringify(param)
		, contentType : 'application/json; charset=utf-8'
		, async : false
		, dataType: 'JSON'
		, success : function(data) {
			$("#noticeRegDt").text($.getDateFormat(data.result.boardRegDt, "YYYY-MM-DD"));
			$("#noticeRegMmrName").text(data.result.boardRegMmrName);
			$("#noticeTitle").text(data.result.boardTitle);
			$("#noticeContents").html(fn_escapeHtml(data.result.boardContents));
			$("#noticeSeq").val(data.result.boardSeq);
			
			$("#noticeTitleInput").val(data.result.boardTitle);
			$("#noticeContentsInput").val(data.result.boardContents);
			
			modalModeSwitch("view");
			
			$.goSearch($("#pageNum").val());
			
			if(_authSeq !== data.result.boardRegMmrSeq) {
				$("#noticeEditBtn").hide();
			}
		}
		, error : function(request, status, error) {
			fn_alert("공지사항 조회에 실패하였습니다. 담당자에게 연락하세요.", "warning")
		}
	});
}

function deleteNotice() {
	var param = {
			boardSeq : $("#noticeSeq").val()
	};
	
	$.ajax({
		url: "/ntc/ajax.deleteNoticeData"
		, type : "POST"
		, data : JSON.stringify(param)
		, contentType : 'application/json; charset=utf-8'
		, async : false
		, dataType: 'JSON'
		, success : function(data) {
			$("#noticeModal").modal("hide");
			$.goSearch($("#pageNum").val());
		}
		, error : function(request, status, error) {
			fn_alert("공지사항 삭제에 실패하였습니다. 담당자에게 연락하세요.", "warning")
		}
	});
}

function modalModeSwitch(mode) {
    if(mode) {
        modalMode = mode;
    }
    $(".mode-control").hide();
    $(".m-"+modalMode).show();
}
