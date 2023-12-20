<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>

<script src='../script/cpm/cpmComplate.js?version=${RESC_VERSION }'></script>

<div>
	<input type="hidden" id="pageNum">
	<input type="hidden" id="childrenSeq" value="${childrenSeq }">
	
	<div class="f-between mb-2">
		<div class="title-label mx-3 my-2">
			<i class="bi bi-file-earmark-check"></i>
			<p class="m-0" style="font-size: 20px;">Criterion reach list</p>
		</div>
	</div>
	<div class="search-area hstack gap-2 mb-3">
		<div class="form-floating mw-10 m-2">
			<select class="form-select" id="domainSeq" >
				<option value="0" selected>All domain</option>
				<c:forEach var="dto" items="${domainList }">
					<option value="${dto.domainSeq }">${dto.domainName }</option>
				</c:forEach>
			</select>
			<label for="domainSelect">Domain selects</label>
		</div>
		<div class="form-floating ms-auto mw-10 m-2">
			<input type="date" class="form-control" id="startDate" placeholder="">
			<label for="startDate">Start date</label>
		</div>
		<div class="form-floating mw-10 m-2">
			<input type="date" class="form-control" id="endDate" placeholder="">
			<label for="endDate">End date</label>
		</div>
	</div>
	<div class="mb-3">
		<div class="table-area">
			<table class="table table-hover">
				<colgroup>
					<col width="10%" />
					<col width="15%" />
					<col width="20%" />
					<col width="20%" />
					<col width="15%" />
					<col width="20%" />
				</colgroup>
				<thead class="table-success">
					<tr>
						<th scope="col">#</th>
						<th scope="col">Domain</th>
						<th scope="col">LTO</th>
						<th scope="col">STO</th>
						<th scope="col">상태</th>
						<th scope="col">도달일</th>
					</tr>
				</thead>
				<tbody class="table-group-divider" id="complateListArea">
					<tr data-bs-toggle="tooltip" data-bs-custom-class="custom-tooltip" data-bs-title="No : 1<br>Domain : #<br>LTO : #<br>STO : #<br>상태 : #<br>도달일 : #" data-bs-html='true'>
						<th scope="row">1</th>
						<td>#</td>
						<td>#</td>
						<td>#</td>
						<td>#</td>
						<td>#</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<nav id="cpmPaging"></nav>
</div>

