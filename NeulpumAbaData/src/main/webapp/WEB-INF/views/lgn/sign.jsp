<%@ page import="org.apache.ibatis.reflection.SystemMetaObject"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="x" uri="http://java.sun.com/jsp/jstl/xml" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!DOCTYPE html>
<html lang="en">
<head>
	<link rel="apple-touch-icon" sizes="180x180" href="/icon/apple-touch-icon.png">
	<link rel="icon" type="image/png" sizes="32x32" href="/icon/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="16x16" href="/icon/favicon-16x16.png">
	<link rel="manifest" href="/icon/site.webmanifest">
	<link rel="mask-icon" href="/icon/safari-pinned-tab.svg" color="#5bbad5">
	<meta name="apple-mobile-web-app-title" content="늘품 ABA - NEULPUM ABA">
	<meta name="application-name" content="늘품 ABA - NEULPUM ABA">
	<meta name="msapplication-TileColor" content="#b91d47">
	<meta name="theme-color" content="#ffffff">	
	<meta name="apple-mobile-web-app-capable" content="yes"> 

	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<meta name="description" content="">
	<meta name="author" content="">
	<title>늘품 ABA - NEULPUM ABA</title>

	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Gamja+Flower&display=swap" rel="stylesheet">

	<link rel='stylesheet' type='text/css' media='screen' href='../js/bootstrap-5.3.0-dist/css/bootstrap.css?version=${RESC_VERSION }'>
	<link rel='stylesheet' type='text/css' media='screen' href='../js/bootstrap-icons/font/bootstrap-icons.css?version=${RESC_VERSION }'>
	<link rel='stylesheet' type='text/css' media='screen' href='../css/common.css?version=${RESC_VERSION }'>
	<link rel='stylesheet' type='text/css' media='screen' href='../css/np-bs.css?version=${RESC_VERSION }'>

	<script src='../js/bootstrap-5.3.0-dist/js/bootstrap.bundle.min.js?version=${RESC_VERSION }'></script>
	<script src='../js/jquery/jquery.min.js?version=${RESC_VERSION }'></script>
	
	<script src='../script/common/common.js?version=${RESC_VERSION }'></script>
	<script src="../script/lgn/sign.js?version=${RESC_VERSION }"></script>
</head>
<body class="login_body">
	<main class="login_main">
		<article class="login_logo">
			<img style="width: 400px" src="../image/neulpum_logo.png">
		</article>
		<div class="w-100">
			<div class="join_contents">
				<section>
					<div class="login_title">
						<span>Create Account</span>
					</div>
					<form class="mb-3">
						<div class="mb-1">
							<label for="" class="form-label">User ID</label>
							<input type="text" class="form-control" id="upUserId" data-title="아이디" data-type="id">
						</div>
						<div class="mb-1">
							<label for="" class="form-label">User Name</label>
							<input type="text" class="form-control" id="upUserName" data-title="이름">
						</div>
						<div class="mb-1">
							<label for="" class="form-label">Password</label>
							<input type="password" class="form-control" id="upUserPw" data-title="비밀번호" data-type="password">
						</div>
						<div class="mb-1">
							<label for="" class="form-label">Confirm Password</label>
							<input type="password" class="form-control" id="upUserPwConfirm" data-title="비밀번호 확인">
						</div>
					</form>
				</section>
				<div class="login_btn_area">
					<button type="button" class="btn btn-outline-success w-100" id="signUpBtn">가입 신청</button>
					<p>이미 회원이신가요? <a href="javascript:void(0);" onclick="onclickSignIn();">Sign in</a></p>
				</div>
			</div>
		</div>
		<div class="w-100">
			<div class="login_contents show">
				<section>
					<div class="login_title">
						<span>Sign In</span>
					</div>
					<form class="mb-3">
						<div class="mb-1">
							<label for="inUserId" class="form-label">User ID</label>
							<input type="text" class="form-control" id="inUserId" data-title="아이디" data-type="id">
						</div>
						<div class="mb-1">
							<label for="inUserPw" class="form-label">Password</label>
							<input type="password" class="form-control" id="inUserPw" data-title="비밀번호" data-type="password">
						</div>
						<div class="mb-1 form-check">
							<input type="checkbox" class="form-check-input" id="isRememberMe" checked="checked">
							<label class="form-check-label" for="isRememberMe">로그인상태 유지</label>
						</div>
					</form>
				</section>
				<div class="login_btn_area">
					<button type="button" class="btn btn-outline-success w-100" id="signInBtn">로그인</button>
					<p>처음 사용자 인가요? <a href="javascript:void(0);" onclick="onclickSignUp();">Sign up</a></p>
				</div>
			</div>
		</div>
	</main>

	<footer class="login_footer">
		<span>© 2023 NEULPUM ABA. All rights reserved.</span>
	</footer>

	<jsp:include page="../common/centerManagement.jsp"></jsp:include>
</body>

</html>