<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>

<script src='../script/cpm/report/cpmDailyReport.js?version=${RESC_VERSION }'></script>

<div class="reportPaper" id="dailyReport">
	<img src="../image/report_logo.png" class="report-header-img">
	<div class="report-title">
		<span>일일 보고서</span>
	</div>
	<div class="f-end mb-2">
		<span>진행 날짜 : </span>
		<span class="report-date" id="dailyReportDate"></span>
	</div>
	<div class="f-end mb-4">
		<span>아동 이름 : </span>
		<span class="report-name" id="dailyReportName"></span>
	</div>
	<div class="table-responsive">
		<table class="c-table c-table-bordered align-middle report-table">
			<colgroup>
				<col width="15%">
				<col width="15%">
				<col width="70%">
			</colgroup>
			<thead>
				<tr>
					<th>영역</th>
					<th colspan="2">목표</th>
				</tr>
			</thead>
			<tbody id="dailyReportTable">
			</tbody>
		</table>
	</div>
</div>