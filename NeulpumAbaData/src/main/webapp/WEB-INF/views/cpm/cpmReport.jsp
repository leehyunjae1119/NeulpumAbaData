<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>

<script src='../script/cpm/cpmReport.js?version=${RESC_VERSION }'></script>

<div>
	<input type="hidden" id="childrenSeq" value="${childrenSeq }">

	<div>
		<div class="f-between mb-2">
			<div class="title-label mx-3 my-2">
				<i class="bi bi-file-earmark-medical"></i>
				<p class="m-0" style="font-size: 20px;">Report</p>
			</div>
			<div class="title-btn-area">
				<div class="dropdown">
					<button class="btn btn-outline-success dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
						<i class="bi bi-printer-fill" style="margin-right: 0.5rem;"></i>
						프린트
					</button>
					<ul class="dropdown-menu">
						<li><a class="dropdown-item saveJpgBtn" href="javascript:void(0);">JGP 저장</a></li>
						<li><a class="dropdown-item savePdfBtn" href="javascript:void(0);">PDF 저장</a></li>
						<li><a class="dropdown-item printBtn" href="javascript:void(0);">인쇄 하기</a></li>
					</ul>
				</div>
			</div>					
		</div>
	</div>
	<div class="card" style="min-width: 660px;">
		<div class="card-header">
			<ul class="nav nav-tabs card-header-tabs">
				<li class="nav-item">
					<a class="nav-link link-body-emphasis active" data-value="dailyReport" href="javascript:void(0);">일일 보고서</a>
				</li>
				<li class="nav-item">
					<a class="nav-link link-body-emphasis" data-value="weeklyReport" href="javascript:void(0);">주간 보고서</a>
				</li>
				<li class="nav-item">
					<a class="nav-link link-body-emphasis" data-value="monthlyReport" href="javascript:void(0);">월간 보고서</a>
				</li>
				<li class="nav-item">
					<a class="nav-link link-body-emphasis" data-value="quarterlyReport" href="javascript:void(0);">분기 보고서</a>
				</li>
			</ul>
		</div>
		<div class="card-body report-card text-center">
			<div>
				<div class="report-edit-area mb-3">
					<input type="date" class="form-control form-control-sm hiddenItem" id="reportStartDt" style="display: none;">
					<span class="hiddenItem" style="display: none;">~</span>
					<input type="date" class="form-control form-control-sm" id="reportEndDt">
					<button type="button" class="btn btn-sm btn-outline-success" id="writeReportBtn">작성</button>
				</div>
				<div class="report-area">
					<div class="reportPaper" id="noReport" style="display: block;">
						<p>보고서가 작성되지 않았습니다.</p>
						<p>날짜 선택후 작성하여 주세요.</p>
					</div>
					
					<!-- 일일보고서 -->
					<jsp:include page="../cpm/include/dailyReport.jsp"></jsp:include>
					<!-- 주간보고서 -->
					<jsp:include page="../cpm/include/weeklyReport.jsp"></jsp:include>
					<!-- 월간보고서 -->
					<jsp:include page="../cpm/include/monthlyReport.jsp"></jsp:include>
					<!-- 분기보고서 -->
					<jsp:include page="../cpm/include/quarterlyReport.jsp"></jsp:include>
				</div>
				
			</div>
		</div>
	</div>
</div>