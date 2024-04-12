<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>

<script src='../script/cpm/cpmCounseling.js?version=${RESC_VERSION }'></script>

<div>
	<input type="hidden" id="pageNum">
	<input type="hidden" id="childrenSeq" value="${childrenSeq }">

	<div class="f-between mb-2">
		<div class="title-label mx-3 my-2">
			<i class="bi bi-journal-text"></i>
			<p class="m-0" style="font-size: 20px;">Counseling Journal</p>
		</div>
		<div class="title-btn-area">
			<button type="button" class="btn btn-outline-success auth-disabled-item" data-auth="master level1 level2 level3" id="counselingAddBtn">Add Memo</button>
		</div>
	</div>
	<div class="search-area hstack gap-2 mb-3">
		<div class="form-floating mw-10 m-2">
			<input type="date" class="form-control" id="startDate" placeholder="">
			<label for="startDate">Start date</label>
		</div>
		<div class="form-floating mw-10 m-2">
			<input type="date" class="form-control" id="endDate" placeholder="">
			<label for="endDate">End date</label>
		</div>
		<div class="form-floating ms-auto mw-10 m-2">
			<select class="form-select" id="counselingRegMmrSeq" aria-label="Floating label select example">
				<option value="0" selected>All author</option>
				<c:forEach var="auth" items="${authList }">
					<option value="${auth.memberSeq }">${auth.memberName }</option>
				</c:forEach>
			</select>
			<label for="floatingSelect">Author selects</label>
		</div>
	</div>
	<div class="row mb-3" id="counselingListArea">
	</div>
	
	<!-- 페이징 -->
	<nav id="cpmPaging"></nav>
</div>	

<div class="modal" id="counselingAddModal" tabindex="-1" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">상담일지 작성</h5>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body">
				<div class="mb-3">
					<label for="exampleFormControlTextarea1" class="form-label">
						<span class="m-2 h5" id="regDtLabel"></span>
						<span class="m-2 h5" id="regNameLabel"></span>
					</label>
					<textarea class="form-control" id="counselingContents" placeholder="내용을 작성하세요." onkeyup="autoResize(this)" onkeydown="autoResize(this)" rows="5"></textarea>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
				<button type="button" class="btn btn-success saveInfoBtn">Save</button>
			</div>
		</div>
	</div>
</div>