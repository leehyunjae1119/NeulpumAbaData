<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>

<script src='../script/cpm/report/cpmQuarterlyReport.js?version=${RESC_VERSION }'></script>

<div class="reportPaper" id="quarterlyReport">
	<img src="../image/report_logo.png" class="report-header-img">
	<div class="report-title">
		<span>분기 보고서</span>
	</div>
	<div class="f-end mb-2">
		<span>진행 날짜 : </span>
		<span class="report-date" id="quarterlyReportDate"></span>
	</div>
	<div class="f-end mb-4">
		<span>아동 이름 : </span>
		<span class="report-name" id="quarterlyReportName"></span>
	</div>
	<div class="mb-4">
		<div class="text-start my-2 nonPrintArea">
			<a class="btn btn-sm btn-outline-primary" onclick="lineChangeUpdateChart(1);" href="javascript:void(0)">라인 추가</a>
			<a class="btn btn-sm btn-outline-primary" onclick="lineChangeUpdateChart(-1);"href="javascript:void(0)">라인 삭제</a>
		</div>
		<canvas id="ltoComplateChart" width="100vw" height="50vh"></canvas>
	</div>
	<div class="mb-4">
		<canvas id="stoComplateChart" width="100vw" height="50vh"></canvas>
	</div>
	<div class="table-responsive mt-5 mb-4">
		<table class="c-table c-table-bordered align-middle report-table print-table">
			<colgroup>
				<col width="15%">
				<col width="85%">
			</colgroup>
			<thead>
				<tr>
					<th>영역</th>
					<th>전달사항</th>
				</tr>
			</thead>
			<tbody id="quarterlyReportTable">
			</tbody>
		</table>
	</div>
</div>
