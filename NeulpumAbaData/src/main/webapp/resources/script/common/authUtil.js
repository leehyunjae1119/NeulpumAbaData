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
	
//	$(".auth-chk-item").each(function(i, element) {
//		
//	});
	
	/* 작업중 
	$(".auth-hidden-item").each(function(i, element) {
		if(_authCd === $(this).data('auth')){
			$(this).hide();
		}
	});
	
	$(".auth-disabled-item").each(function(i, element) {
		if(_authCd === $(this).data('auth')){
			$(this).addClass("disabled").prop("disabled", true);
		}
	});
	*/
}
