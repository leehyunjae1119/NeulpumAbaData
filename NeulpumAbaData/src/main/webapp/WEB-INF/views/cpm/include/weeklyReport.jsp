<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>

<script src='../script/cpm/report/cpmWeeklyReport.js?version=${RESC_VERSION }'></script>

<div class="reportPaper" id="weeklyReport">
	<img src="../image/report_logo.png" class="report-header-img">
	<div class="report-title">
		<span>주간 보고서</span>
	</div>
	<div class="f-end mb-2">
		<span>진행 날짜 : </span>
		<span class="report-date" id="weeklyReportDate"></span>
	</div>
	<div class="f-end mb-4">
		<span>아동 이름 : </span>
		<span class="report-name" id="weeklyReportName"></span>
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
			<tbody id="weeklyReportTable">
			</tbody>
		</table>
	</div>
</div>