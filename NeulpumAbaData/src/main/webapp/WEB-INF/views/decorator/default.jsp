<%@page import="com.neulpum.np.lgn.vo.LgnVO"%>
<%@page import="com.neulpum.np.common.utils.SessionManager"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="x" uri="http://java.sun.com/jsp/jstl/xml" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!DOCTYPE html>
<html lang="en" class="no-js">
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
	
	<script>
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', vh + 'px');
		window.addEventListener('resize', function () {
		    let vh = window.innerHeight * 0.01;
		    document.documentElement.style.setProperty('--vh', vh + 'px');
		});
	</script>
	
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Gamja+Flower&display=swap" rel="stylesheet">

    <link rel='stylesheet' type='text/css' media='screen' href='../js/bootstrap-5.3.0-dist/css/bootstrap.css?version=${RESC_VERSION }'>
    <link rel='stylesheet' type='text/css' media='screen' href='../js/bootstrap-icons/font/bootstrap-icons.css?version=${RESC_VERSION }'>
    <link rel='stylesheet' type='text/css' media='screen' href='../css/common.css?version=${RESC_VERSION }'>
    <link rel='stylesheet' type='text/css' media='screen' href='../css/np-bs.css?version=${RESC_VERSION }'>

    <script src='../js/bootstrap-5.3.0-dist/js/bootstrap.bundle.min.js?version=${RESC_VERSION }'></script>
    <script src='../js/jquery/jquery.min.js?version=${RESC_VERSION }'></script>
    <script src="../js/chart.js/chart.min.js?version=${RESC_VERSION }"></script>
	<script src="../js/chart.js/chartjs-plugin-datalabels.min.js?version=${RESC_VERSION }"></script>
	<script src="../js/chart.js/chartjs-plugin-annotation.min.js?version=${RESC_VERSION }"></script>
	
	<script src="../js/html2canvas/html2canvas.js?version=${RESC_VERSION }"></script>
	<script src="../js/jspdf/jspdf.min.js?version=${RESC_VERSION }"></script>
	<script src="../js/printThis/printThis.js?version=${RESC_VERSION }"></script>

    <script src='../script/common/common.js?version=${RESC_VERSION }'></script>
    <script src='../script/common/formatUtil.js?version=${RESC_VERSION }'></script>
    <script src='../script/common/colorUtil.js?version=${RESC_VERSION }'></script>
	<script src='../script/common/printUtil.js?version=${RESC_VERSION }'></script>
	<script src='../script/common/authUtil.js?version=${RESC_VERSION }'></script>
    
	<sitemesh:write property="head"></sitemesh:write>
	
	<%
		SessionManager s = new SessionManager();
		LgnVO vo = (LgnVO) s.getSession(request);
	%>
	<c:set var="authSeq" value="<%=vo.getMemberSeq() %>" scope="request" />
	<c:set var="authId" value="<%=vo.getMemberId() %>" scope="request" />
	<c:set var="authName" value="<%=vo.getMemberName() %>" scope="request" />
	<c:set var="authCd" value="<%=vo.getMemberAuthCd() %>" scope="request" />
	<c:set var="authPositionCd" value="<%=vo.getMemberPositionCd() %>" scope="request" />

</head>

<script type="text/javascript">
	var _authSeq = Number("${authSeq}");
	var _authId = "${authId}";
	var _authName = "${authName}";
	var _authCd = "${authCd}";
	var _authPositionCd = Number("${authPositionCd}");
	
	
	var _full_logo_url = "${FULL_LOGO_URL}";
	var _mini_logo_url = "${MINI_LOGO_URL}";
	var _report_logo_url = "${REPORT_LOGO_URL}";
</script> 

<body>
	<main class="d-flex flex-nowrap none-sub-sidebar" name="main-wrap">
		<!-- 사이드바 -->
		<jsp:include page="../common/sidebar.jsp"></jsp:include>
		
		<!-- 메인컨텐츠 -->
		<div class="main-contents" id="mainContents">
			<sitemesh:write property="body"></sitemesh:write>
			
			<!-- 푸터 -->
			<jsp:include page="../common/footer.jsp"></jsp:include>
		</div>
	</main>
	
	<ul class="dropdown-menu text-small sidebar-dropdown" >
		<li><a class="dropdown-item" href="javascript:void(0);" id="sdd_profile">프로필 관리</a></li>
		<li><a class="dropdown-item auth-hidden-item" data-auth="master" href="javascript:void(0);" id="sdd_centerSelect">센터 선택</a></li>
		<li>
			<hr class="dropdown-divider">
		</li>
		<li><a class="dropdown-item" href="javascript:void(0);" id="sdd_signOut">로그아웃</a></li>
	</ul>
	
	
	<jsp:include page="../common/centerManagement.jsp"></jsp:include>
	
	<jsp:include page="../common/profileManagement.jsp"></jsp:include>
	
	<div class="dim"></div>
</body>
</html>

