<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
    
<script type="text/javascript">
$(document).ready(function () {

	$(".main-contents").ready(function (params) {
		$(".main-contents").scroll();
	})
	
	$(".main-contents").scroll(function (params) {
		var scrollTop = $(this).scrollTop();
		var innerHeight = $(this).innerHeight();
		var scrollHeight = $(this).prop('scrollHeight');
		var value = 100 - ((scrollHeight - (scrollTop + innerHeight)) * 10);
		var color = "rgba(0 0 0 / " + value + "%)";
		$(".main_footer").css("color", color)
	})
})
</script>
<footer class="main_footer">
	<span>© 2023 NEULPUM ABA. All rights reserved.</span>
</footer>