var tmpMemberPw = '';

$(document).ready(function() {
	
	$("#profileSaveBtn").on("click", function() {
		fn_saveProfileInfo();
	});
	
	$("#profileCloseBtn").on("click", function() {
		$("#profileModal").modal("hide");
	});
	
	$("#profileModal").on("hide.bs.modal", function() {
		fn_destroyProfileInfo();
	});
	
	$("#profileModal").on("show.bs.modal", function() {
		fn_selectProfileInfo();
	});
	
	$.fn_openProfile = function() {
		$("#profileModal").modal("show");
	};
	
});

function fn_selectProfileInfo() {
	var param = {
			memberSeq : _authSeq
		};
	
	$.ajax({
		url: "/common/ajax.selectProfileInfo"
		, type : "post"
		, data : JSON.stringify(param)
		, contentType : 'application/json; charset=utf-8'
		, async : false
		, success : function(data) {
			$("#profile_memberId").val(data.result.memberId);
			$("#profile_memberPw").val(data.result.memberPw);
			$("#profile_memberName").val(data.result.memberName);
			$("#profile_memberEmail").val(data.result.memberEmail);
			$("#profile_memberCp").val(data.result.memberCp);
			$("#profile_memberAuthCd").val(data.result.memberAuthCd);
			$("#profile_memberPosition").val(data.result.memberPosition);
			$("#profile_memberRegDt").val(data.result.memberRegDt);
			
			tmpMemberPw = data.result.memberPw;
		}
		, error : function(request, status, error) {
			fn_alert("프로필 정보 조회에 실패하였습니다.", "warning");
		}
	});
}

function fn_saveProfileInfo() {
	
	if(!fn_inputValidation("profile_memberPw", true)){ return;}
	if(!fn_inputValidation("profile_memberName", false)){ return;}
	if(!fn_inputValidation("profile_memberEmail", false)){ return;}
	if(!fn_inputValidation("profile_memberCp", false)){ return;}
	
	var param = {
			memberSeq : _authSeq,
			memberName : $("#profile_memberName").val(),
			memberEmail : $("#profile_memberEmail").val(),
			memberCp : $("#profile_memberCp").val()
		};
	
	if($("#profile_memberPw").val() !== tmpMemberPw) {
		function changePwCallback() {
			param.memberPw = $("#profile_memberPw").val();
			
			$.ajax({
				url: "/common/ajax.saveProfileInfo"
				, type : "post"
				, data : JSON.stringify(param)
				, contentType : 'application/json; charset=utf-8'
				, async : false
				, success : function(data) {
					tmpMemberPw = $("#profile_memberPw").val();
					fn_alert("프로필 정보를 저장하였습니다.", "success");
				}
				, error : function(request, status, error) {
					fn_alert("프로필 정보 저장에 실패하였습니다.", "warning");
				}
			});

		}
		
		fn_confirm("패스워드 변경을 시도합니까?", changePwCallback, "warning");
		
	} else {
		
		$.ajax({
			url: "/common/ajax.saveProfileInfo"
			, type : "post"
			, data : JSON.stringify(param)
			, contentType : 'application/json; charset=utf-8'
			, async : false
			, success : function(data) {
				fn_alert("프로필 정보를 저장하였습니다.", "success");
			}
			, error : function(request, status, error) {
				fn_alert("프로필 정보 저장에 실패하였습니다.", "warning");
			}
		});
	}
	
}

function fn_destroyProfileInfo() {
	$("#profile_memberId").val("");
	$("#profile_memberPw").val("");
	$("#profile_memberName").val("");
	$("#profile_memberEmail").val("");
	$("#profile_memberCp").val("");
	$("#profile_memberAuthCd").val("");
	$("#profile_memberPosition").val("");
	$("#profile_memberRegDt").val("");
}