$(document).ready(function() {
	_nonAuthBlock();
});

function _nonAuthBlock() {
	/* 
	 * 적용방법
	 * 1. auth-chk-item 클래스 추가
	 * 2. data-auth 속성에 코드 입력
	 * 
	 * 기능
	 * 해당 코드 상위만 접근허용
	 */
	
	// 숨김
	$(".auth-hidden-item").each(function(i, element) {
		
		var authTarget = ($(this).data('auth')||'').split(' ');
		
		if(!authTarget.includes(_authCd)){
			$(this).hide();
		}
	});
	//비활성화
	$(".auth-disabled-item").each(function(i, element) {
		
		var authTarget = ($(this).data('auth')||'').split(' ');
		
		if(!authTarget.includes(_authCd)){
			$(this).addClass("disabled").prop('disabled', true);
		}
	});
	
}
