<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<script src="../script/ntc/notice.js?version=${RESC_VERSION }"></script>

<input type="hidden" id="pageNum" value="0">
<div>
	<div class="f-between mb-2">
		<div class="title-label mx-3 my-2">
			<i class="bi bi-file-earmark-check"></i>
			<p class="m-0" style="font-size: 20px;">Notice</p>
		</div>
		<div class="title-btn-area">
			<button type="button" class="btn btn-outline-success" id="addNoticeBtn">Add notice</button>
		</div>
	</div>
	<div class="search-area f-end mb-3">
		<div class="input-group m-2" style="width: 20rem;">
			<input type="text" class="form-control" id="searchField" placeholder="제목 또는 내용">
			<button type="button" class="btn btn-outline-success" id="noticeSearchBtn">
				<i class="bi bi-search"></i>
				<span>Search</span>
			</button>
		</div>
	</div>
	<div class="mb-3">
		<div class="table-area">
			<table class="table table-hover">
				<colgroup>
					<col width="10%" />
					<col width="50%" />
					<col width="20%" />
					<col width="20%" />
				</colgroup>
				<thead class="table-success">
					<tr>
						<th scope="col">#</th>
						<th scope="col">제목</th>
						<th scope="col">작성자</th>
						<th scope="col">작성일</th>
					</tr>
				</thead>
				<tbody class="table-group-divider" id="noticeListArea">
				</tbody>
			</table>
		</div>
	</div>
	<nav id="noticePaging"></nav> 
</div>
			
			
<!-- Modal -->
<div class="modal" id="noticeModal" tabindex="-1" aria-hidden="true">
	<input type="hidden" id="noticeSeq" value="0">
	<div class="modal-dialog">
		<div class="modal-content" style="height: 80vh;">
			<div class="modal-header">
				<h1 class="modal-title fs-5" id="exampleModalLabel">Notice</h1>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body mode-control m-view" id="viewer">
				<div class="d-flex flex-column mb-3">
					<div>
						<span id="noticeRegDt">2023.09.09</span>
						<span class="ms-3" id="noticeRegMmrName">이현재</span>
					</div>
					<span class="h4" id="noticeTitle">공지사항 제목</span>
				</div>
				<div>
					<p id="noticeContents"></p>
				</div>
			</div>
			<div class="modal-body mode-control m-edit" id="editer">
				<div class="mb-3">
					<input type="text" class="form-control" id="noticeTitleInput" placeholder="공지사항 제목">
				</div>
				<div style="position: relative; height: 85%;">
					<textarea class="form-textarea w-100" id="noticeContentsInput" placeholder="공지사항 내용"></textarea>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary mode-control m-view" id="noticeEditBtn">Edit</button>
				<button type="button" class="btn btn-success mode-control m-edit" id="noticeSaveBtn">Save</button>
				<button type="button" class="btn btn-danger mode-control m-edit" id="noticeRemoveBtn">Remove</button>
				
				<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
			</div>
		</div>
	</div>
</div>