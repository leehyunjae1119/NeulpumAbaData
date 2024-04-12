<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>

<script src='../script/grp/graph.js?version=${RESC_VERSION }'></script>
<script src='../script/grp/graphConfig.js?version=${RESC_VERSION }'></script>
<script src='../script/grp/graphController.js?version=${RESC_VERSION }'></script>

<div id="graphPage" style="padding:1rem;">
	<input type="hidden" id="childrenSeq" value="${childrenSeq }">
	
	<div>
		<div class="f-between mb-2">
			<div class="title-label mx-3 my-2">
				<i class="bi bi-bar-chart-line"></i>
				<p class="m-0" style="font-size: 20px;">Graph</p>
			</div>
			<div class="title-btn-area">
				<div class="dropdown">
					<button class="btn btn-success dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
						<i class="bi bi-printer-fill" style="margin-right: 0.5rem;"></i>
						프린트
					</button>
					<ul class="dropdown-menu" id="printMenu">
						<li><a class="dropdown-item saveJpgBtn" href="javascript:void(0);">JGP 저장</a></li>
						<li><a class="dropdown-item savePdfBtn" href="javascript:void(0);">PDF 저장</a></li>
						<li><a class="dropdown-item printBtn" href="javascript:void(0);">인쇄 하기</a></li>
					</ul>
				</div>
			</div>
		</div>
		<div class="search-area mb-3">
			<div class="d-flex f-between">
				<div class="form-floating w-100 m-2 mb-0">
					<select class="form-select" id="chartTypeSelect">
						<option value="1">1. 일별 시도수와 정반응</option>
						<option value="2">2. 영역별 크리테리아</option>
						<option value="3">3. 주별 준거도달 완료갯수</option>
					</select>
					<label for="chartTypeSelect">Chart type selects</label>
				</div>
				<div class="pt-2 pe-2">
					<button type="button" class="btn btn-outline-primary mw-10 h-100 fs-4" id="applyBtn">
						<i class="bi bi-arrow-repeat"></i>
						<span>APPLY</span>
					</button>
				</div>
			</div>
			<div class="d-flex hstack gap-0">
				<div class="form-floating mw-10 m-1 ms-2">
					<select class="form-select" id="standardSelect">
						<option value="indicator" selected>지시자</option>
						<option value="child">아동</option>
						<option value="class">반</option>
<!-- 						<option value="center">센터</option> -->
					</select>
					<label for="indicatorSelect">Standard select</label>
				</div>
				<div class="graph-standard-area" id="indicatorSelectArea">
					<div class="form-floating mw-10 m-1">
						<select class="form-select" id="ind_indicatorSelect">
							<option value="0" selected>All Indicator</option>
							<option value="1">이현재</option>
							<option value="2">김선혜</option>
							<option value="3">이종오</option>
						</select>
						<label for="indicatorSelect">Indicator selects</label>
					</div>
				</div>
				<div class="graph-standard-area" id="childSelectArea" style="display: none;">
					<div class="form-floating mw-10 m-1">
						<select class="form-select" id="chi_classSelect">
							<option value="0" selected>All Class</option>
							<option value="1">A Class</option>
							<option value="2">B Class</option>
							<option value="3">C Class</option>
						</select>
						<label for="indicatorSelect">Class selects</label>
					</div>
					<div class="form-floating mw-10 m-1">
						<select class="form-select" id="chi_childSelect">
							<option value="1" selected>아동1</option>
							<option value="2">아동2</option>
							<option value="3">아동3</option>
							<option value="4">아동4</option>
						</select>
						<label for="indicatorSelect">Child selects</label>
					</div>
				</div>
				<div class="graph-standard-area" id="classSelectArea" style="display: none;">
					<div class="form-floating mw-10 m-1">
						<select class="form-select" id="cla_classSelect">
							<option value="0" selected>All Class</option>
							<option value="1">A Class</option>
							<option value="2">B Class</option>
							<option value="3">C Class</option>
						</select>
						<label for="indicatorSelect">Class selects</label>
					</div>
				</div>
				<div class="graph-standard-area" id="centerSelectArea" style="display: none;">
					<div class="form-floating mw-10 m-1">
						<select class="form-select" id="cen_centerSelect">
							<option value="0" selected>All Center</option>
							<option value="1">A Center</option>
							<option value="2">B Center</option>
							<option value="3">C Center</option>
						</select>
						<label for="indicatorSelect">Center selects</label>
					</div>
				</div>
				<div class="ms-auto">
					<div class="form-floating mw-10 m-1" id="domainSelectArea" style="display: none;">
						<select class="form-select" id="domainSelect">
							<option value="0" selected>모든 발달영역</option>
							<option value="1">A domain</option>
							<option value="2">B domain</option>
							<option value="3">C domain</option>
						</select>
						<label for="indicatorSelect">발달영역 selects</label>
					</div>
				</div>
				<div class="form-floating mw-10 ms-1 my-2 me-1">
					<input type="date" class="form-control" id="startDate" placeholder="">
					<label for="startDate">Start date</label>
				</div>
				<div class="form-floating mw-10 ms-1 my-2 me-2">
					<input type="date" class="form-control" id="endDate" placeholder="">
					<label for="endDate">End date</label>
				</div>
			</div>
		</div>
		<div class="search-area mb-3 p-3">
			<div class="" id="chartLabel" style="display:none; overflow: auto;">
				<div class="">
					<canvas id="myChart" width="500" height="500"></canvas>
				</div>
				<div class="f-row pb-4" id="legendLabel" style="padding-left:6rem;">
				</div>
			</div>
			<div class="empty-info" id="emptyLabel">
				<p class="h4 m-4">데이터가 없습니다.</p>
				<img alt="empty data" src="../image/common_img/undraw_Faq_re_31cw.png" width="300">
			</div>
		</div>
	</div>

</div>