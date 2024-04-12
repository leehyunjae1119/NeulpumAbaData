var authArray = ['master', 'level1', 'level2', 'level3'];

$(document).ready(function() {
	
	$("#startDate, #endDate, #counselingRegMmrSeq").on('change', function() {
		$.goSearch(1);
	});
	
	$("#counselingAddBtn").on('click', function() {
		$("#regDtLabel").text($.getToday());
		$("#regNameLabel").text(_authName);
		$("#counselingAddModal").modal("show");
	});
	
	$(".saveInfoBtn").on('click', function() {
		var contents = $("#counselingContents").val();
		if(contents === ''){
			fn_alert("상담일지 내용을 작성해주세요.", "danger");
			$("#counselingcontents").focus();
			return;
		}
		insertCounselingData(contents);
	});
	
	$("#counselingAddModal").on('hidden.bs.modal', function() {
		$("#counselingContents").val("");
	});
	
	$.goSearch = function(pageNum) {
		var url = "/cpm/ajax.selectCounselingList";
		var param = {
				pageNum : pageNum,
				startNum : (pageNum - 1) * 10,
				childrenSeq : $("#childrenSeq").val(),
				startDate : $("#startDate").val(),
				endDate : $("#endDate").val()
			};
		
		if($("#counselingRegMmrSeq").val() && $("#counselingRegMmrSeq").val() !== '0'){
			param.counselingRegMmrSeq = $("#counselingRegMmrSeq").val();
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
				fn_pagination("cpmPaging", data.pagingVO);
				
				$("#pageNum").val(pageNum);
			}
			, error : function(request, status, error) {
				fn_alert("상담일지 조회에 실패하였습니다. 담당자에게 연락하세요.", "warning")
			}
		});
	};
	
	$.init = function() {
		$.goSearch(1);
	};
	
	$.init();
});

function makeInfoRow(dataList) {
	
	var html = '';
	
	dataList.forEach(function(elt, i, array) {
		html += '<div class="col-xl-6 col-6 counselingCard">';
		html += '	<div class="card memo-card h-auto">';
		html += '		<div class="card-contents mh-10" data-seq="'+elt.counselingSeq+'">';
		html += '			<h5 class="card-title">'+elt.counselingRegDt+'<small class="mx-3">'+elt.memberName+'</small></h5>';
		html += '			<span class="counseling-contents viewElement">'+fn_escapeHtml(elt.counselingContents)+'</span>';

		if(authArray.includes(_authCd)){
			if(_authSeq === elt.counselingRegMmrSeq || _authCd === 'master'){
				html += '			<button type="button" class="btn contents-edit-btn viewElement"><i class="bi bi-pencil-square"></i></button>';
				html += '			<textarea class="contents-textarea w-100 editElement" placeholder="내용을 작성하세요." onkeyup="autoResize(this)" onkeydown="autoResize(this)" onload="autoResize(this)" style="display:none;">'+elt.counselingContents+'</textarea>';
				html += '			<div class="card-edit-area editElement" style="display:none;">';
				html += '				<button type="button" class="btn btn-outline-secondary btn-sm mx-1 saveBtn">저장</button>';
				html += '				<button type="button" class="btn btn-outline-secondary btn-sm mx-1 removeBtn">삭제</button>';
				html += '			</div>';
			}
		}
		
		html += '		</div>';
		html += '	</div>';
		html += '</div>';
		
	});
	
	if(dataList.length < 1) {
		html += '<div class="empty-info">';
		html += '	<img alt="empty data" src="../image/common_img/undraw_Empty_re_opql.png" width="400">';
		html += '	<p class="h4 m-4">작성된 상담일지가 없습니다.</p>';
		html += '</div>';
	}
	
	$("#counselingListArea").empty();
	$("#counselingListArea").append(html);
	
	renderCounselingEvent();
}

function renderCounselingEvent() {
	
	$(".contents-edit-btn").each(function() {
		this.addEventListener("click", function(e) {
			
			$(this).parents("div.card-contents").find(".viewElement").hide();
			$(this).parents("div.card-contents").find(".editElement").show();
			$(this).parents("div.card-contents").find(".contents-textarea.editElement").trigger('keyup');
		});
	});
	
	$(".saveBtn").each(function() {
		this.addEventListener("click", function(e) {
			var counselingSeq = $(this).parents(".card-contents").data("seq");
			var counselingContents = $(this).parents(".card-contents").children("textarea").val();
			
			if(counselingContents === ''){
				fn_alert("상담일지 내용을 작성해주세요.", "danger");
				$(this).parents(".card-contents").children("textarea").focus();
				return;
			}
			
			if(counselingSeq){
				updateCounselingData(counselingSeq, counselingContents);
				$(this).parents("div.card-contents").find(".counseling-contents").html(fn_escapeHtml(counselingContents));
			} else {
				insertCounselingData(counselingContents);
			}
			
			$(this).parents("div.card-contents").find(".viewElement").show();
			$(this).parents("div.card-contents").find(".editElement").hide();
		});
	});
	
	$(".removeBtn").each(function() {
		this.addEventListener("click", function(e) {
			
			var thisElement = this;
			
			function okCallback() {
				var counselingSeq = $(thisElement).parents(".card-contents").data("seq");
				
				if(counselingSeq){
					deleteCounselingData(counselingSeq);
				}
				$(thisElement).parents(".counselingCard").remove();
			}
			
			fn_confirm("삭제하시겠습니까?", okCallback, "danger");
		});	
	});
	
}

function insertCounselingData(contents) {
	var param = {
			childrenSeq : $("#childrenSeq").val(),
			counselingContents : contents
	};
	
	$.ajax({
		url: "/cpm/ajax.insertCounselingData"
		, type : "POST"
		, data : JSON.stringify(param)
		, contentType : 'application/json; charset=utf-8'
		, async : true
		, dataType: 'JSON'
		, success : function(data) {
			$.goSearch(1);
			$("#counselingAddModal").modal("hide");
		}
		, error : function(request, status, error) {
			fn_alert("상담일지 저장에 실패하였습니다. 담당자에게 연락하세요.", "warning")
		}
	});
}

function updateCounselingData(seq, contents) {
	var param = {
			counselingSeq : seq,
			counselingContents : contents
	};

	$.ajax({
		url: "/cpm/ajax.updateCounselingData"
		, type : "POST"
		, data : JSON.stringify(param)
		, contentType : 'application/json; charset=utf-8'
		, async : true
		, dataType: 'JSON'
		, success : function(data) {
		}
		, error : function(request, status, error) {
			fn_alert("상담일지 저장에 실패하였습니다. 담당자에게 연락하세요.", "warning")
		}
	});
}

function deleteCounselingData(seq) {
	var param = {
			counselingSeq : seq
	};
	
	$.ajax({
		url: "/cpm/ajax.deleteCounselingData"
		, type : "POST"
		, data : JSON.stringify(param)
		, contentType : 'application/json; charset=utf-8'
		, async : true
		, dataType: 'JSON'
		, success : function(data) {
		}
		, error : function(request, status, error) {
			fn_alert("상담일지 삭제에 실패하였습니다. 담당자에게 연락하세요.", "warning")
		}
	});
}

function autoResize(object) {
	object.style.height = 'auto';
	object.style.height = object.scrollHeight + 'px';
}
