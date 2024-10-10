<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>

	<script src="../script/mng/management.js?version=${RESC_VERSION }"></script>
	
	<input type="hidden" id="infoDataSeq" value="0">
	<input type="hidden" id="pageNum" value="1">
	
	<div>
		<div class="f-between mb-2">
			<div class="title-label mx-3 my-2">
				<i class="bi bi-file-earmark-check"></i>
				<p class="m-0" style="font-size: 20px;" >Management</p>
			</div>
			<div class="d-flex f-align-center">
				<button type="button" id="centerManagementBtn" class="btn btn-secondary me-1 auth-hidden-item" data-auth="master">센터 관리</button>
				<div>
					<input type="radio" class="btn-check auth-hidden-item" data-auth="master" name="managementBtn" id="memberMngBtn" value="member" checked>
					<label class="btn btn-outline-success auth-hidden-item" data-auth="master" for="memberMngBtn">선생님</label>
					<input type="radio" class="btn-check" name="managementBtn" id="childrenMngBtn" value="children">
					<label class="btn btn-outline-success" for="childrenMngBtn">아동</label>
				</div>
			</div>
		</div>
		<div class="search-area f-between mb-3">
			<div class="f-row">
				<div class="form-floating mw-10 m-2">
					<select class="form-select" id="centerSelect" >
						<option value="0" selected>All Center</option>
						<c:forEach var="center" items="${centerList }">
							<option value="${center.centerSeq }">${center.centerName }</option>
						</c:forEach>
					</select>
					<label for="centerSelect">Center selects</label>
				</div>
				<div class="input-group m-2" style="width: 20rem;">
					<input type="text" class="form-control" id="searchName" placeholder="이름">
					<button type="button" class="btn btn-outline-success" id="searchBtn">
						<i class="bi bi-search"></i>
						<span>Search</span>
					</button>
				</div>
			</div>
			<div class="title-btn-area d-flex f-align-center me-2">
				<button type="button" class="btn btn-outline-success auth-hidden-item" data-auth="master level1 level2" id="addInfoBtn">Add Member</button>
			</div>
		</div>
		<div class="mb-3">
			<div class="table-area">
				<table class="table table-hover view-table management-table" id="memberTable">
					<thead class="table-success">
						<tr>
							<th scope="col">#</th>
							<th scope="col">센터</th>
							<th scope="col">이름</th>
							<th scope="col">이메일</th>
							<th scope="col">연락처</th>
							<th scope="col">권한</th>
							<th scope="col">사용 여부</th>
						</tr>
					</thead>
					<tbody class="table-group-divider view-table-body" id="memberTableBody">
					</tbody>
				</table>
				<table class="table table-hover view-table management-table" id="childrenTable" style="display:none;">
					<thead class="table-success">
						<tr>
							<th scope="col">#</th>
							<th scope="col">센터</th>
							<th scope="col">반</th>
							<th scope="col"></th>
							<th scope="col">이름</th>
							<th scope="col">생일</th>
							<th scope="col">부모님</th>
							<th scope="col">사용 여부</th>
						</tr>
					</thead>
					<tbody class="table-group-divider view-table-body" id="childrenTableBody">
					</tbody>
				</table>
			</div>
		</div>
		
		<!-- 페이징 -->
		<nav id="mngPaging">
		</nav>
	</div>
	
	<!-- member Edit Modal -->
	<div class="modal" id="memberEditModal" tabindex="-1" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">선생님 정보</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body mb-4">
					<table class="table table-borderless input-table">
						<colgroup>
							<col width="20%">
							<col width="80%">
						</colgroup>
						<tbody>
							<tr>
								<td><label for="" class="">아이디</label></td>
								<td><input type="text" class="form-control" id="memberId" data-title="아이디" data-type="id" placeholder=""></td>
							</tr>
							<tr>
								<td><label for="" class="">패스워드</label></td>
								<td>
									<div class="pwArea" id="pwInputArea">
										<input type="password" class="form-control" id="memberPw" data-title="비밀번호" data-type="password">
									</div>
									<div class="pwArea" id="pwResetArea" style="display: none;">
										<button type="button" class="btn btn-secondary auth-disabled-item" data-auth="master" id="pwResetBtn">초기화</button>
										<span class="font-bs-color ms-2">( 초기화 패스워드 : neulpum1234! )</span>
									</div>
								</td>
							</tr>
							<tr>
								<td><label for="" class="">이름</label></td>
								<td><input type="text" class="form-control auth-disabled-item" data-auth="master" id="memberName" data-title="이름" placeholder=""></td>
							</tr>
							<tr>
								<td><label for="" class="">이메일</label></td>
								<td><input type="text" class="form-control auth-disabled-item" data-auth="master" id="memberEmail" placeholder=""></td>
							</tr>
							<tr>
								<td><label for="" class="">연락처</label></td>
								<td><input type="text" class="form-control auth-disabled-item" data-auth="master" id="memberCp" placeholder=""></td>
							</tr>
							<tr>
								<td><label for="" class="">권한 등급</label></td>
								<td>
									<select class="form-select" id="memberAuthCd" >
										<option value="level1" selected>level1</option>
										<option value="level2">level2</option>
										<option value="level3">level3</option>
										<option value="level4">level4</option>
<!-- 										<option value="master">master</option> -->
									</select>
								</td>
							</tr>
							<tr>
								<td><label for="" class="">소속 센터</label></td>
								<td>
									<select class="form-select" id="memberPositionCd" >
										<option value="0" selected>없음</option>
										<c:forEach var="center" items="${centerList }">
											<option value="${center.centerSeq }">${center.centerName }</option>
										</c:forEach>
									</select>
								</td>
							</tr>
							<tr>
								<td><label for="" class="">사용 여부</label></td>
								<td>
									<div class="btn-group w-100" role="group" aria-label="Basic radio toggle button group">
										<input type="radio" class="btn-check" name="memberUseYn" id="memberUseYn_Y" autocomplete="off" value="Y" checked>
										<label class="btn btn-outline-secondary" for="memberUseYn_Y">활성화</label>
										<input type="radio" class="btn-check" name="memberUseYn" id="memberUseYn_N" autocomplete="off" value="N">
										<label class="btn btn-outline-secondary" for="memberUseYn_N">비활성화</label>
									</div>
								</td>
							</tr>
							<tr>
								<td colspan="2">
									<button type="button" class="btn btn-danger deleteInfoBtn auth-hidden-item" data-auth="master level1">삭제</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
					<button type="button" class="btn btn-success saveInfoBtn">Save</button>
				</div>
			</div>
		</div>
	</div>
	<!-- children Edit Modal -->
	<div class="modal" id="childrenEditModal" tabindex="-1" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">아동 정보</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<table class="table table-borderless input-table mb-0">
						<colgroup>
							<col width="25%">
							<col width="75%">
						</colgroup>
						<tbody>
							<tr>
								<td><label for="" class="">책 색상</label></td>
								<td>
									<div class="f-between m-0">
										<img id="sampleImg" src="../image/book_img/book_1.png" style="width: 26px; margin-right: 1rem;">
										<select class="form-select" id="childrenBookImg" >
											<option value="" selected>랜덤</option>
											<option value="book_1">Blue</option>
											<option value="book_2">White</option>
											<option value="book_3">Black</option>
											<option value="book_4">Green</option>
											<option value="book_5">Red</option>
											<option value="book_6">Purple</option>
											<option value="book_7">Yellow</option>
											<option value="book_8">Orange</option>
											<option value="book_9">SkyBlue</option>
										</select>
									</div>
								</td>
							</tr>
							<tr>
								<td><label for="" class="">이름</label></td>
								<td><input type="text" class="form-control" id="childrenName" data-title="이름" placeholder=""></td>
							</tr>
							<tr>
								<td><label for="" class="">생일</label></td>
								<td><input type="date" class="form-control" id="childrenBirth" data-title="생일" placeholder=""></td>
							</tr>
							<tr>
								<td><label for="" class="">부모님</label></td>
								<td><input type="text" class="form-control" id="childrenParents" placeholder=""></td>
							</tr>
							<tr>
								<td><label for="" class="">소속 센터</label></td>
								<td>
									<select class="form-select" id="childrenPositionCd" >
										<option value="0" selected>없음</option>
										<c:forEach var="center" items="${centerList }">
											<option value="${center.centerSeq }">${center.centerName }</option>
										</c:forEach>
									</select>
								</td>
							</tr>
							<tr>
								<td><label for="" class="">반</label></td>
								<td><input type="text" class="form-control" id="groupName" placeholder=""></td>
							</tr>
							<tr>
								<td><label for="" class="">진단명</label></td>
								<td><input type="text" class="form-control" id="childrenDiagnosis" placeholder=""></td>
							</tr>
							<tr>
								<td><label for="" class="">메모</label></td>
								<td><input type="text" class="form-control" id="childrenMemo" placeholder=""></td>
							</tr>
							<tr>
								<td><label for="" class="">프로그램 시작</label></td>
								<td><input type="date" class="form-control" id="childrenProgStDt" data-title="프로그램 시작일" placeholder=""></td>
							</tr>
							<tr>
								<td><label for="" class="">프로그램 종료</label></td>
								<td><input type="date" class="form-control" id="childrenProgEdDt" data-title="프로그램 종료일" placeholder=""></td>
							</tr>
							<tr>
								<td><label for="" class="">사용 여부</label></td>
								<td>
									<div class="btn-group w-100" role="group" aria-label="Basic radio toggle button group">
										<input type="radio" class="btn-check" name="childrenUseYn" id="childrenUseYn_Y" autocomplete="off" value="Y" checked>
										<label class="btn btn-outline-secondary" for="childrenUseYn_Y">활성화</label>
										<input type="radio" class="btn-check" name="childrenUseYn" id="childrenUseYn_N" autocomplete="off" value="N">
										<label class="btn btn-outline-secondary" for="childrenUseYn_N">비활성화</label>
									</div>
								</td>
							</tr>
							<tr>
								<td colspan="2">
									<button type="button" class="btn btn-danger deleteInfoBtn auth-hidden-item" data-auth="master level1">삭제</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
					<button type="button" class="btn btn-success saveInfoBtn">Save</button>
				</div>
			</div>
		</div>
	</div>
	
	
	