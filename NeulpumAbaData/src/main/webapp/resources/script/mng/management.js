var target = "member";
var modalMode = "add"; // add 추가 , mod 수정
var pageNum = 1;

$(document).ready(function() {
	
	$("#centerManagementBtn").on("click", function() {
		$.fn_centerManagerOpen(true, false);
	});
	
	$("#centerChoiceModal").on("hidden.bs.modal", function() {
		location.reload();
	});
	
	$("input[name=managementBtn]").on("click", function() {
		target = $(this).val();
		$("#centerSelect").val("0")
		$("#searchName").val("");
		fn_viewManagement();

		if(_authCd !== "master"){
			$("#childrenPositionCd").val(_authPositionCd).prop("disabled", true).addClass("disabled"); 
			$("#centerSelect").val(_authPositionCd).prop("disabled", true).addClass("disabled"); 
		}
		$.goSearch(1);
	});
	
	$("#searchBtn").on("click", function() {
		$.goSearch(1);
	});
	
	$("#addInfoBtn").on("click", function() {
		
		modalMode = "add";
		fn_setInfoData();
		fn_viewModalMode();
		$("#"+target+"EditModal").modal("show");
	});
	
	$(".modal").on("hidden.bs.modal", function() {
		fn_devalidation();
	});
	
	$(".saveInfoBtn").on("click", function() {
//		
//		if($("input[name=memberUseYn]:checked").val() === 'Y') {
//			if($("#memberPositionCd").val() === '0') {
//				fn_alert("선생님을 활성화 하려면 소속센터를 지정해야 합니다.", "warning");
//				return;
//			}
//		}
		
		fn_saveInfoData();
	});
	
	$(".deleteInfoBtn").on("click", function() {
		fn_confirm("정말 삭제하시겠습니까?<br>삭제 이후 데이터를 불러올 수 없습니다.", fn_deleteInfoData, "danger");
	});
	
	$("#pwResetBtn").on("click", function() {
		var param = {
				memberSeq : $("#infoDataSeq").val()
			};
		
		$.ajax({
			url: "/mng/ajax.resetMemberPw"
			, type : "POST"
			, data : JSON.stringify(param)
			, contentType : 'application/json; charset=utf-8'
			, async : false
			, dataType: 'JSON'
			, success : function(data) {
				fn_alert("패스워드 초기화하였습니다. ", "success");
			}
			, error : function(request, status, error) {
				fn_alert("패스워드 초기화에 실패하였습니다. 담당자에게 연락하세요.", "warning")
			}
		});
	});
	
	$("#childrenBookImg").on("change", function() {
		var childrenBookImg = $("#childrenBookImg").val();
		if(childrenBookImg){
			$("#sampleImg").attr("src", "../image/book_img/"+childrenBookImg+".png")
		}
	});
	
	$.goSearch = function(pageNum) {
		var url = target === "member" ? "/mng/ajax.selectMemberList" : "/mng/ajax.selectChildrenList";
		var param = {
				pageNum : pageNum,
				startNum : (pageNum - 1) * 10
			};
		var searchName = $("#searchName").val();
		var centerSelect = $("#centerSelect").val() == "0" ? "" : $("#centerSelect").val();
		
		if(target === "member") {
			param.memberName = searchName;
			param.memberPositionCd = centerSelect;
		} else {
			param.childrenName = searchName;
			param.childrenPositionCd = centerSelect;
		}
		
		$.ajax({
			url: url
			, type : "POST"
			, data : JSON.stringify(param)
			, contentType : 'application/json; charset=utf-8'
			, async : false
			, dataType: 'JSON'
			, success : function(data) {
				fn_makeInfoRow(data.dataList);
				fn_pagination("mngPaging", data.pagingVO);
				
				$("#pageNum").val(pageNum);
			}
			, error : function(request, status, error) {
				var errorMsg = target === "member" ? "회원" : "아동";
				fn_alert(errorMsg+" 리스트 조회에 실패하였습니다. 담당자에게 연락하세요.", "warning")
			}
		});
	};
	
	$.init = function() {
		
		if(_authCd === 'master') {
			$.goSearch(1);
		} else {
			$("#childrenMngBtn").trigger("click");
		}
		
		fn_viewManagement();
	};
	
	$.init();
});

function fn_openInfoDetail(seq) {
	modalMode = "mod";
	fn_setInfoData(seq);
	fn_viewModalMode();
	$("#"+target+"EditModal").modal("show");
}

function fn_makeInfoRow(dataList) {
	var html = '';

	if(target === "member"){
		dataList.forEach(function(item, index, array) {
			html += '	<tr onclick="fn_openInfoDetail('+item.memberSeq+');">';
			html += '		<th scope="row">'+item.rownum+'</th>';
			html += '		<td>'+item.centerName+'</td>';
			html += '		<td>'+item.memberName+'</td>';
			html += '		<td>'+item.memberEmail+'</td>';
			html += '		<td>'+item.memberCp+'</td>';
			html += '		<td>'+item.memberAuthCd+'</td>';
			if(item.memberApprovalYn === "Y"){
				html += '	<td><span class="badge text-bg-success">활성</span></td>';
			} else {
				html += '	<td><span class="badge text-bg-danger">비활성</span></td>';
			}
			html += '	</tr>';
		});
		
		$("#memberTableBody").empty();
		$("#memberTableBody").append(html);
		if(dataList.length === 0){
			$("#memberTableBody").append('<tr><td colspan="7">데이터가 없습니다.</td</tr>');
		}
		
	} else {
		dataList.forEach(function(item, index, array) {
			html += '	<tr onclick="fn_openInfoDetail('+item.childrenSeq+');">';
			html += '		<th scope="row">'+item.rownum+'</th>';
			html += '		<td>'+item.centerName+'</td>';
			html += '		<td>'+item.groupName+'</td>';
			html += '		<td width="2%">';
			html += '			<img src="../image/book_img/'+item.childrenBookImg+'.png" style="height: 35px;">';
			html += '		</td>';
			html += '		<td>'+item.childrenName+'</td>';
			html += '		<td>'+$.getDateFormat(item.childrenBirth, "YYYY-MM-DD")+'</td>';
			html += '		<td>'+item.childrenParents+'</td>';
			if(item.childrenActiveYn === "Y"){
				html += '	<td><span class="badge text-bg-success">활성</span></td>';
			} else {
				html += '	<td><span class="badge text-bg-danger">비활성</span></td>';
			}
			html += '	</tr>';
		});
		$("#childrenTableBody").empty();
		$("#childrenTableBody").append(html);
		if(dataList.length === 0){
			$("#childrenTableBody").append('<tr><td colspan="7">데이터가 없습니다.</td</tr>');
		}
	}
}
function fn_deleteInfoData() {
	var url = target === "member" ? "/mng/ajax.deleteMember" : "/mng/ajax.deleteChildren";
	var param = {};
	if(target === "member") {
		param.memberSeq = $("#infoDataSeq").val();
	} else {
		param.childrenSeq = $("#infoDataSeq").val();
	}
	
	$.ajax({
		url: url
		, type : "post"
		, data : JSON.stringify(param)
		, contentType : 'application/json; charset=utf-8'
		, async : false
		, success : function(data) {
			$.goSearch(1);
			$("#"+target+"EditModal").modal("hide");
			
			var msg = target === "member" ? "회원" : "아동";
			fn_alert(msg+" 정보를 삭제하였습니다. ", "success");
			
		}
		, error : function(request, status, error) {
			var errorMsg = target === "member" ? "회원" : "아동";
			fn_alert(errorMsg+" 삭제에 실패하였습니다. 담당자에게 연락하세요.", "warning")
		}
	});
}

function fn_saveInfoData() {
	fn_devalidation();
	
	if(target === "member"){
		if(modalMode === "add") {
			if(!fn_inputValidation("memberId", true)){ return;}
			if(!fn_inputValidation("memberPw", true)){ return;}
		}
		if(!fn_inputValidation("memberName", false)){ return;}
		
	} else {
		if(!fn_inputValidation("childrenName", false)){ return;}
		if(!fn_inputValidation("childrenBirth", false)){ return;}
//		if(!fn_inputValidation("childrenProgStDt", false)){ return;}
//		if(!fn_inputValidation("childrenProgEdDt", false)){ return;}
	}
	
	var url = target === "member" ? "/mng/ajax.updateMember" : "/mng/ajax.updateChildren";
	var param = fn_setSaveInfoDataParam();
	
	$.ajax({
		url: url
		, type : "post"
		, data : JSON.stringify(param)
		, contentType : 'application/json; charset=utf-8'
		, async : false
		, success : function(data) {
			if(data.messageCd === "4"){
				fn_alert("중복된 아이디가 존재합니다.", "warning");
			} else {
				//모달 닫기 및 리스트 재조회
				$.goSearch(1);
				$("#"+target+"EditModal").modal("hide");
				
				var msg = target === "member" ? "회원" : "아동";
				fn_alert(msg+" 정보를 저장하였습니다. ", "success");
			}
			
		}
		, error : function(request, status, error) {
			var errorMsg = target === "member" ? "회원" : "아동";
			fn_alert(errorMsg+" 등록에 실패하였습니다. 담당자에게 연락하세요.", "warning")
		}
	});
}

function fn_setSaveInfoDataParam() {
	var returnParam = {};
	if(target === "member") {
		returnParam.memberSeq = $("#infoDataSeq").val();
		returnParam.memberId = $("#memberId").val();
		returnParam.memberPw = $("#memberPw").val();
		returnParam.memberName = $("#memberName").val();
		returnParam.memberEmail = $("#memberEmail").val();
		returnParam.memberCp = $("#memberCp").val();
		returnParam.memberAuthCd = $("#memberAuthCd").val();
		returnParam.memberPositionCd = $("#memberPositionCd").val();
		returnParam.memberApprovalYn = $("input[name=memberUseYn]:checked").val();
	} else {
		returnParam.childrenSeq = $("#infoDataSeq").val();
		returnParam.childrenName = $("#childrenName").val();
		returnParam.childrenBirth = $("#childrenBirth").val();
		returnParam.childrenParents = $("#childrenParents").val();
		returnParam.childrenPositionCd = $("#childrenPositionCd").val();
		returnParam.groupName = $("#groupName").val();
		returnParam.childrenDiagnosis = $("#childrenDiagnosis").val();
		returnParam.childrenMemo = $("#childrenMemo").val();
		returnParam.childrenProgStDt = $("#childrenProgStDt").val();
		returnParam.childrenProgEdDt = $("#childrenProgEdDt").val();
		returnParam.childrenActiveYn = $("input[name=childrenUseYn]:checked").val();
		returnParam.childrenBookImg = $("#childrenBookImg").val();
	}
	
	return returnParam;
}

function fn_viewManagement() {
	$("#addInfoBtn").text("Add " + target);
	
	$(".view-table").hide();
	$("#"+target+"Table").show();
}

function fn_viewModalMode() {
	$("#memberId").prop("disabled", false).removeClass("disabled");
	$(".pwArea").hide();
	
	if(modalMode === "add") {
		$("#pwInputArea").show();
		$(".deleteInfoBtn").hide();
	} else {
		$("#memberId").prop("disabled", true).addClass("disabled");
		$("#pwResetArea").show();
	}
}

function fn_setInfoData(seq) {
	if(modalMode === "add") {
		//인풋 값 초기화
		$("#infoDataSeq").val("0");
		$(".form-control").val("");
		$(".form-select").each(function() {
			if(!$(this).hasClass("disabled")){
				var defaultValue = $(this).children("option:eq(0)").val();
				$(this).val(defaultValue);
			}
		});
		$("input[type=radio][name="+target+"UseYn]").removeAttr("checked");
		$("#"+target+"UseYn_N").attr("checked", true);
	} else {
		var infoData = fn_selectInfoData(seq);
		if(target === "member") {
			$("#infoDataSeq").val(infoData.memberSeq);
			$("#memberId").val(infoData.memberId);
			$("#memberPw").val(infoData.memberPw);
			$("#memberName").val(infoData.memberName);
			$("#memberEmail").val(infoData.memberEmail);
			$("#memberCp").val(infoData.memberCp);
			$("#memberAuthCd").val(infoData.memberAuthCd);
			$("#memberPositionCd").val(infoData.memberPositionCd);
			$("input[name=memberUseYn]").removeAttr("checked");
			$("#memberUseYn_"+infoData.memberApprovalYn).prop("checked", true);
		} else {
			$("#infoDataSeq").val(infoData.childrenSeq);
			$("#childrenName").val(infoData.childrenName);
			$("#childrenBirth").val($.getDateFormat(infoData.childrenBirth, "YYYY-MM-DD"));
			$("#childrenParents").val(infoData.childrenParents);
			$("#childrenPositionCd").val(infoData.childrenPositionCd);
			$("#groupName").val(infoData.groupName);
			$("#childrenDiagnosis").val(infoData.childrenDiagnosis);
			$("#childrenMemo").val(infoData.childrenMemo);
			$("#childrenProgStDt").val($.getDateFormat(infoData.childrenProgStDt, "YYYY-MM-DD"));
			$("#childrenProgEdDt").val($.getDateFormat(infoData.childrenProgEdDt, "YYYY-MM-DD"));
			$("input[name=childrenUseYn]").removeAttr("checked");
			$("#childrenUseYn_"+infoData.childrenActiveYn).prop("checked", true);
			$("#childrenBookImg").val(infoData.childrenBookImg);
			$("#childrenBookImg").trigger("change");
		}
	}
}

function fn_selectInfoData(seq) {
	var url = target == "member" ? "/mng/ajax.selectMemberDetail" : "/mng/ajax.selectChildrenDetail";
	var returnData = null;
	var param = {};
	
	if(target === "member"){
		param.memberSeq = seq;
	} else {
		param.childrenSeq = seq;
	}
	
	$.ajax({
		url: url
		, type : "post"
		, data : JSON.stringify(param)
		, contentType : 'application/json; charset=utf-8'
		, async : false
		, success : function(data) {
			returnData = data.infoData;
		}
		, error : function(request, status, error) {
			var errorMsg = target === "member" ? "회원" : "아동";
			fn_alert("해당 "+errorMsg+" 정보를 조회하지 못했습니다. 담당자에게 연락하세요.", "warning")
		}
	});
	
	return returnData;
}







