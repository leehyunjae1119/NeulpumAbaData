<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>

	<script src='../script/common/sidebar.js?version=${RESC_VERSION }'></script>
	
	<div class="d-flex flex-column flex-shrink-0 nav-sticky"> <!--toggled-->
		<a href="javascript:void(0);" class="d-flex align-items-center text-decoration-none logo-btn" id="logo">
			<img class="logo" src="../image/full_logo.png?version=${RESC_VERSION }" height="32">
		</a>
		<ul class="sidebar nav nav-pills flex-column mb-auto">
			<li class="nav-item">
				<a href="javascript:void(0);" class="nav-link text-white" id="mai">
					<i class="bi bi-house-door icon-md"></i>
					<span>대시보드</span>
				</a>
			</li>
			<li class="nav-item">
				<a href="javascript:void(0);" class="nav-link text-white" id="dpm">
					<i class="bi bi-calendar-week icon-md"></i>
					<span>데일리 시트</span>
				</a>
			</li>
			<li class="nav-item">
				<a href="javascript:void(0);" class="nav-link text-white" id="cpm">
					<i class="bi bi-people icon-md"></i>
					<span>아동 관리</span>
				</a>
			</li>
			<li class="nav-item">
				<a href="javascript:void(0);" class="nav-link text-white" id="grp">
					<i class="bi bi-graph-up icon-md"></i>
					<span>그래프</span>
				</a>
			</li>
			<li class="nav-item">
				<a href="javascript:void(0);" class="nav-link text-white auth-hidden-item" data-auth="master level1 level2 level4" id="tpm">
					<i class="bi bi-journal-bookmark-fill icon-md"></i>
					<span>프로그램 편집</span>
				</a>
			</li>
			<li class="nav-item">
				<a href="javascript:void(0);" class="nav-link text-white" id="ntc">
					<i class="bi bi-megaphone-fill icon-md"></i>
					<span>공지사항</span>
				</a>
			</li>
			<li class="nav-item">
				<a href="javascript:void(0);" class="nav-link text-white auth-hidden-item" data-auth="master level1 level2" id="mng">
					<i class="bi bi-person-gear icon-md"></i>
					<span>관리</span>
				</a>
			</li>
		</ul>
		<div class="sidebar-toggle-btn mr-40">
			<a id="sidebarToggle" onclick="">
				<i class="bi icon-lg bi-arrow-left-circle-fill"></i>
			</a>
		</div>
		<hr>
		<div class="px-3 py-3 mr-40">
			<a href="javascript:void(0);" class="d-flex align-items-center text-white text-decoration-none np-dropdown">
				<img src="../image/profile_img/user_profile.png" alt="" width="32" height="32" class="rounded-circle me-2 ">
				<strong id="npDropdownUserName"></strong>
			</a>
		</div>
	</div>
	
	<!-- 서브 사이드바 -->	
	<div class="d-flex flex-column flex-shrink-0 sub-nav-sticky">
		<div class="card child-card">
			<div class="card-body">
				<h3 class="card-title"></h3>
				<div class="card-text d-flex flex-column ">
					<span></span>
					<span></span>
				</div>
			</div>
		</div>
		<hr>
		<ul class="nav nav-pills flex-column mb-auto text-end sub-sidebar">
			<li class="nav-item"><a href="javascript:void(0);" class="nav-link text-white" id="cpmMain">Main</a></li>
			<li class="nav-item"><a href="javascript:void(0);" class="nav-link text-white" id="cpmDailySheet">데일리시트</a></li>
			<li class="nav-item"><a href="javascript:void(0);" class="nav-link text-white" id="cpmCounseling">상담일지</a></li>
			<li class="nav-item"><a href="javascript:void(0);" class="nav-link text-white" id="cpmComplate">완료목록</a></li>
			<li class="nav-item"><a href="javascript:void(0);" class="nav-link text-white" id="cpmReport">보고서</a></li>
			<li class="nav-item"><a href="javascript:void(0);" class="nav-link text-white" id="cpmGraph">그래프</a></li>
			<li class="nav-item"><a href="javascript:void(0);" class="nav-link text-white" id="cpmVideo">영상 및 교구</a></li>
			<li class="nav-item"><a href="javascript:void(0);" class="nav-link text-white" id="cpmProgram">프로그램관리</a></li>
		</ul>
	</div>