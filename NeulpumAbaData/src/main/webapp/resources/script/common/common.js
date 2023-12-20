$(document).ready(function() {
	
	$(".nav-sticky").css({"height":"100vh !important"});
	$(".sub-nav-sticky").css({"height":"100vh !important"});
	$(".main-contents").css({"height":"100vh !important"});
	$(".login_body").css({"height":"100vh !important"});
	
	//유효성 검사 실패 시 안내 
	$.fn_invalidationInput = function(id, message) {
		
		var parentDiv = $("#"+id).parent();
		var errorMessage = '<div class="error-massage">' + message + '</div>';
		
		$(parentDiv).children(".error-massage").remove();
		$(parentDiv).append(errorMessage);
		$(parentDiv).addClass("error-input-group");

		$("#"+id).on("change", function() {
			$(parentDiv).removeClass("error-input-group");
			$(parentDiv).children(".error-massage").remove();
		});
	};

//	$(".modal").on("shown.bs.modal", function() {
//		$(".modal-backdrop").remove();
//		$(this).parent().append('<div class="modal-backdrop show np-backdrop"></div>');
//	});
//	$(".modal").on("hidden.bs.modal", function() {
//		$(".modal-backdrop").remove();
//	});
	
	$(".modal").on("shown.bs.modal", function() {
		$("body").append(this);
	});
	
	//사이드바 깜빡임 방지
	$('html').removeClass('no-js');
});

$('html').on("click", function(e) {
	if(!$(e.target).parent().hasClass("np-dropdown") && !$(e.target).hasClass("np-dropdown")){
		if($(".sidebar-dropdown").hasClass("show")){
			$(".sidebar-dropdown").removeClass("show");
		}
	}
});


/* *********************************************************************************
 * 	유효성 검사 
 * 		fn_devalidation()
 * 		fn_inputValidation(id, patternCheckYn)
 * 		fn_inputPatternCheck(id, type)
 * 		fn_nullCheck(str)
 ********************************************************************************* */
// 유효성 검사 안내 파괴
function fn_devalidation() {
	$(".error-input-group").children(".error-massage").remove();
	$(".error-input-group").removeClass("error-input-group");
}

//유효성 검사
// 해당 인풋태크에 속성 추가해줘야함.
// data-type:패턴검사에 필요한 타입, data-title:인풋타이틀(안내문구에 출력될 제목)
function fn_inputValidation(id, patternCheckYn) {
	var inputValue = $("#"+id).val();
	var inputType = $("#"+id).attr("data-type");
	var itemTitle = $("#"+id).attr("data-title");
	var message = itemTitle + "를(을) 입력하세요."
	
	if($("#"+id).prop('tagName').toLowerCase() == 'select'){
		inputValue = $("#"+id+" > option:selected").val();
	}
	
	if(!fn_nullCheck(inputValue)){
		$.fn_invalidationInput(id, message);
		return false;
	}
	
	if(patternCheckYn){
		if(!fn_inputPatternCheck(id, inputType)){
			return false;
		}
	}
	
	return true;
}

//유효성 검사 - 패턴 검사
function fn_inputPatternCheck(id, type) {
	var inputValue = $("#"+id).val();
	
	var idPattern		= /^[0-9a-zA-Z_]{4,20}$/;
	var passwordPattern	= /^[0-9a-zA-Z!%&@#$^*?_~]{8,20}$/;
	var emailPattern 	= /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
	var phonePattern 	= /^[0-9]{8,12}$/;
	var message = "";
	
	var result = true;
	
	switch (type) {
	case "id":
		if(inputValue.match(idPattern) === null){
			message = "올바른 아이디를 입력하세요.";
			$.fn_invalidationInput(id, message);
			result = false;
		}
		break;
	case "password":
		if(inputValue.match(passwordPattern) === null){
			message = "올바른 비밀번호를 입력하세요.";
			$.fn_invalidationInput(id, message);
			result = false;
		}
		break;
	case "email":
		if(inputValue.match(emailPattern) === null){
			message = "올바른 이메일 주소를 입력하세요.";
			$.fn_invalidationInput(id, message);
			result = false;
		}
		break;
	case "phone":
		if(inputValue.match(phonePattern) === null){
			message = "올바른 연락처를 입력하세요.";
			$.fn_invalidationInput(id, message);
			result = false;
		}
		break;
	default:
		break;
	}
	
	return result;
}

// 널 체크
function fn_nullCheck(str) {
	if(str){
		if(str.replace(/ /g, '') === ''){
			return false;
		} else {
			return true;
		}
	}
	return false;
}


/* *********************************************************************************
 * 	커스텀 얼럿
 * 		
 ********************************************************************************* */
var alertSeq = 0;

function fn_alert(message, style) {
	var delay = 2000;
	alertSeq++;
	
	if(!style){
		style = 'success';
	}
	var alertHtml = ''
		+ '<div class="alert alert-'+style+' in" role="alert" id="alert'+alertSeq+'">'
		+ '<i class="bi bi-exclamation-circle-fill"></i><span>안내</span>'
		+ message
		+ '</div>';
	
	$("body").append(alertHtml);
	
	var alert = $("#alert"+alertSeq);
	
	setTimeout(function() {
		$(alert).removeClass("in");
		$(alert).addClass("out");
		setTimeout(function() {
			$(alert).remove();
		}, 1000);
	}, delay);
}

function fn_confirm(message, okCallbackFunction, style) {
	
	alertSeq++;
	
	if(!style){
		style = 'primary';
	}
	
	var confirmHtml = ''
		+ '<div class="alert alert-'+style+' in" role="alert" id="alert'+alertSeq+'">'
		+ '<i class="bi bi-exclamation-circle-fill"></i><span>확인</span>'
		+ message
		+ '<button type="button" class="btn btn-outline-dark confirmOkBtn ms-5">예</button>'
		+ '<button type="button" class="btn btn-outline-dark confirmNoBtn">아니요</button>'
		+ '</div>';
	
	fn_openDim();
	$("body").append(confirmHtml);
	
	var alert = $("#alert"+alertSeq);
	
	$(".confirmOkBtn").on('click', function() {
		
		okCallbackFunction();
		
		$(alert).removeClass("in");
		$(alert).addClass("out");
		setTimeout(function() {
			$(alert).remove();
		}, 1000);
		
		fn_closeDim();
	});
	
	$(".confirmNoBtn").on('click', function() {
		$(alert).removeClass("in");
		$(alert).addClass("out");
		setTimeout(function() {
			$(alert).remove();
		}, 1000);
		
		fn_closeDim();
	});
}

function fn_openDim() {
	if($(".dim").length < 1){
		$("body").append('<div class="dim"></div>');
	}
	$(".dim").show();
}
function fn_closeDim() {
	$(".dim").hide();
}

/* *********************************************************************************
 * 	페이지 이동 스크립트
 * 		
 ********************************************************************************* */
//url = String
//method = post or get
//param json
function fn_formUrlMove(url, method, param) {
	var form = $('<form></form>');
	form.attr('action', url);
	form.attr('method', method);
	form.appendTo('body');
	
	var paramStr = '?';
	var index = 0;
	
	for(prop in param){
		form.append($('<input type="hidden" name="'+prop+'" value="'+param[prop]+'">'));
		
		if(index != 0){
			paramStr += '&';
		}
		paramStr += prop+'='+param[prop];
		index++;
	}
	
	if(sessionStorage.length > 0) {
		var keyList = Object.keys(sessionStorage);
		for(var i=0; i<keyList.length; i++) {
			var key = keyList[i];
			var value = sessionStorage.getItem(key);
			if(key.indexOf("_") != 0){
				form.append($('<input type="hidden" name="'+key+'" value="'+value+'">'));
				
				if(index != 0){
					paramStr += '&';
				}
				paramStr += key+'='+value;
				index++;
			}
			
		}
	}
	
//	window.location.href = url + paramStr;
//	location.replace(url + paramStr);
	form.submit();
}

/* *********************************************************************************
 * 	페이징 생성
 * 		
 ********************************************************************************* */
function fn_pagination(id, pagingObject) {
	
	var prevDisabled = pagingObject.prevPage == 0 ? 'disabled' : '';
	var nextDisabled = pagingObject.nextPage == 0 ? 'disabled' : '';
	
	var pagingHtml = '';
	
	pagingHtml += '	<ul class="pagination pagination-green justify-content-end mb-4">';
	pagingHtml += '		<li class="page-item '+prevDisabled+'">';
	pagingHtml += '			<a class="page-link" onclick="$.goSearch('+pagingObject.prevPage+');" href="javascript:void(0);" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a>';
	pagingHtml += '		</li>';
	
	for(var i = pagingObject.startPage; i <= pagingObject.endPage; i++){
		var active = i==pagingObject.pageNum ? 'active' : '';
		
		pagingHtml += '	<li class="page-item '+active+'">';
		pagingHtml += '		<a class="page-link" onclick="$.goSearch('+i+');" href="javascript:void(0);">'+i+'</a>';
		pagingHtml += '	</li>';
	}
	
	pagingHtml += '		<li class="page-item '+nextDisabled+'">';
	pagingHtml += '			<a class="page-link" onclick="$.goSearch('+pagingObject.nextPage+');" href="javascript:void(0);" aria-label="Next"><span aria-hidden="true">&raquo;</span></a>';
	pagingHtml += '		</li>';
	pagingHtml += '	</ul>';
	
	$("#"+id).empty();
	$("#"+id).append(pagingHtml);
	
	if(pagingObject.pageCnt > 0){
		$("#"+id).show();
	} else {
		$("#"+id).hide();
	}
}

/* *********************************************************************************
 * 	특수문자 치환
 * 		
 ********************************************************************************* */
function fn_escapeHtml(str) {
	if(str === null || str === "" || str === undefined) {
		return "";
	} else {
		return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;')
		.replace(/(?:\r\n|\r|\n)/g, '<br>');
	}
}

//
function fn_getStatusBadgeHtml(status) {
	html = '';
	
	switch (status) {
	case 'WIT':
		html = '<span class="status badge text-bg-light">대기중</span>';
		break;
	case 'ING':
		html = '<span class="status badge text-bg-success">진행중</span>';
		break;
	case 'CMP':
		html = '<span class="status badge text-bg-danger">준거도달</span>';
		break;
	case 'STP':
		html = '<span class="status badge text-bg-primary">중단</span>';
		break;
	case 'RPT':
		html = '<span class="status badge text-bg-warning">레파토리</span>';
		break;

	default:
		break;
	}
	return html;
}

function fn_getStatusName(status) {
	contents = '';
	
	switch (status) {
	case 'WIT':
		contents = '대기중';
		break;
	case 'ING':
		contents = '진행중';
		break;
	case 'CMP':
		contents = '준거도달';
		break;
	case 'STP':
		contents = '중단';
		break;
	case 'RPT':
		contents = '레파토리';
		break;
		
	default:
		break;
	}
	return contents;
}
