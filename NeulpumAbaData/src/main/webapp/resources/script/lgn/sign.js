$(document).ready(function() {
	$("#signUpBtn").on("click", function() {
		
		if(!fn_inputValidation("upUserId", true)){ return;}
		if(!fn_inputValidation("upUserName", false)){ return;}
		if(!fn_inputValidation("upUserPw", true)){ return;}
		if(!fn_inputValidation("upUserPwConfirm", false)){ return;}
		
		if($("#upUserPw").val() != $("#upUserPwConfirm").val()){
			$.fn_invalidationInput("upUserPwConfirm", "비밀번호가 일치하지 않습니다.");
			return;
		}
		
		var param = {
			memberId : $("#upUserId").val(),
			memberPw : $("#upUserPw").val(),
			memberName : $("#upUserName").val()
		};
		
		$.ajax({
			url: "/lgn/ajax.signUp"
			, type : "post"
			, data : JSON.stringify(param)
			, contentType : 'application/json; charset=utf-8'
			, async : true
			, success : function(data) {
				
                if(data.messageCd == "0"){
                	fn_alert("가입신청이 완료되었습니다.");
                	onclickSignIn();
                	
                } else if(data.messageCd == "4") {
                	fn_alert("이미가입된 아이디가 있습니다.", "warning");
                	$("#memberId").focus();
                	
                } else {
                	fn_alert("회원가입에 실패했습니다.", "warning");
                	
                }
			}
			, error : function(request, status, error) {
				fn_alert("서버오류. 담당자에게 연락하세요.", "warning")
			}
		});
	});
	$("#signInBtn").on("click", function() {
		
		if(!fn_inputValidation("inUserId", false)){ return;}
		if(!fn_inputValidation("inUserPw", false)){ return;}
		
		var param = {
			memberId : $("#inUserId").val(),
			memberPw : $("#inUserPw").val(),
			isRememberMe : ($("#isRememberMe").is(":checked") ? 1 : 0)
		};
		
		console.log(param)
		
		$.ajax({
			url: "/lgn/ajax.signIn"
			, type : "post"
			, data : JSON.stringify(param)
			, contentType : 'application/json; charset=utf-8'
			, async : true
			, success : function(data) {
				
				if(data.messageCd == '0'){
					if(!document.cookie.includes("NPSESSIONCOOKIE")){
						fn_alert("로그인에 실패하였습니다. 잠시 후 다시 시도해주세요.", "warning");
					} else {
						fn_alert("로그인하였습니다. 환영합니다.");
						// 센터 선택 모달 오픈
						$.fn_centerManagerOpen(false, false);
					}
					
            	} else if(data.messageCd == '1'){
            		fn_alert("승인되지 않은 계정입니다.", "warning");
            		
            	} else if(data.messageCd == '2'){
            		fn_alert("비밀번호가 일치하지 않습니다.", "warning");
            		$("#memberPw").focus();
            		
            	} else {
            		fn_alert("존재하지 않는 계정입니다.", "warning");
            		$("#memberId").focus();
            		
            	}
			}
			, error : function(request, status, error) {
				fn_alert("서버오류. 담당자에게 연락하세요.", "warning")
			}
		});
	});
	
	$("#inUserPw").on("keyup",function(key){
		if(key.keyCode == 13){
			$("#signInBtn").trigger("click");
		}
	});
	$("#inUserId").on("keyup",function(key){
		if(key.keyCode == 13){
			$("#inUserPw").focus();
		}
	});
});

function onclickSignUp() {
	$(".login_logo").removeClass('left');
	$(".login_logo").addClass('right')
	$(".join_contents").addClass('show');
	$(".login_contents").removeClass('show');
	
	$(".login_contents input").val('')
	fn_devalidation();
}

function onclickSignIn() {
	$(".login_logo").removeClass('right');
	$(".login_logo").addClass('left')
	$(".login_contents").addClass('show');
	$(".join_contents").removeClass('show');
	
	$(".join_contents input").val('')
	fn_devalidation();
} 