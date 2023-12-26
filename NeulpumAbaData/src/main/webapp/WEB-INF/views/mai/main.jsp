<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>

	<script src="../script/mai/main.js?version=${RESC_VERSION }"></script>
	<script src="../script/mai/maiNotice.js?version=${RESC_VERSION }"></script>
	<script src="../script/mai/maiCalendar.js?version=${RESC_VERSION }"></script>
	
	<div class="flex-nowrap c-title mb-3">
		<i class="bi bi-house-door icon-md"></i>
		<span>Dashboard</span>
	</div>
	<div class="row">
		<div class="col-sm-8 mb-3">
			<div class="f-between mb-2">
				<div class="title-label mx-3 my-2">
					<i class="bi bi-calendar-heart-fill"></i>
					<p class="m-0">수업 시간표</p>
				</div>
				<div class="d-flex f-align-center">
					<a class="btn btn-sm" id="schedulerEditBtn" href="javascript:void(0);">
						<i class="bi bi-pencil-square"></i>
						<span class="ms-2">편집</span>
					</a>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-12 mb-3">
					<table class="table table-bordered time-table">
						<thead>
							<th scope="col">월</th>
							<th scope="col">화</th>
							<th scope="col">수</th>
							<th scope="col">목</th>
							<th scope="col">금</th>
						</thead>
						<tbody>
							<tr id="time_01">
								<td class="weekName_MON"></td>
								<td class="weekName_TUE"></td>
								<td class="weekName_WED"></td>
								<td class="weekName_THU"></td>
								<td class="weekName_FRI"></td>
							</tr>
							<tr id="time_02">
								<td class="weekName_MON"></td>
								<td class="weekName_TUE"></td>
								<td class="weekName_WED"></td>
								<td class="weekName_THU"></td>
								<td class="weekName_FRI"></td>
							</tr>
							<tr id="time_03">
								<td class="weekName_MON"></td>
								<td class="weekName_TUE"></td>
								<td class="weekName_WED"></td>
								<td class="weekName_THU"></td>
								<td class="weekName_FRI"></td>
							</tr>
							<tr id="time_04">
								<td class="weekName_MON"></td>
								<td class="weekName_TUE"></td>
								<td class="weekName_WED"></td>
								<td class="weekName_THU"></td>
								<td class="weekName_FRI"></td>
							</tr>
							<tr id="time_05">
								<td class="weekName_MON"></td>
								<td class="weekName_TUE"></td>
								<td class="weekName_WED"></td>
								<td class="weekName_THU"></td>
								<td class="weekName_FRI"></td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="col-sm-6 mb-3">
					<div class="title-label">
						<i class="bi bi-chat-right-heart-fill"></i>
						<p class="m-0">공지사항</p>
					</div>
					<div class="notice-list-group" id="noticeListArea">
					</div>
				</div>
				<div class="col-sm-6 mb-3">
					<div class="title-label">
						<i class="bi bi-chat-right-quote-fill"></i>
						<p class="m-0">메모장</p>
					</div>
					<div class="card note-card">
						<div class="card-contents" id="memberMemoCard" style="min-height: 25vh;">
							<textarea id="memberMemoInput" class="contents-textarea w-100" placeholder="내용을 작성하세요." onkeyup="autoResize(this)" onkeydown="autoResize(this)" onload="autoResize(this)" >${memoData.boardContents }</textarea>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="col-sm-4 mb-3">
			<div class="title-label">
				<i class="bi bi-calendar2-week-fill"></i>
				<p class="m-0">스케줄러</p>
			</div>
			<div class="card sticky-card">
				<div class="card-body" style="overflow: hidden;">
					<div class="f-between">
						<h4 class="scheduler-title mt-2 mx-2" id="monthName"></h4>
						<div class="calendar-month-btn-area">
							<button class="btn" id="calendarPrevBtn">
								<i class="bi bi-chevron-left"></i>
							</button>
							<button class="btn" id="calendarNextBtn">
								<i class="bi bi-chevron-right"></i>
							</button>
						</div>
					</div>
					<div>
						<table class="table table-borderless scheduler-table" style="table-layout: fixed">
							<thead>
								<tr>
									<th width="14%">Mon</th>
									<th width="14%">Tus</th>
									<th width="14%">Wed</th>
									<th width="14%">Thu</th>
									<th width="14%">Fri</th>
									<th width="14%">Sat</th>
									<th width="14%">Sun</th>
								</tr>
							</thead>
							<tbody id="calendarBoard">
							</tbody>
						</table>
					</div>
					
					<div class="">
						<span class="mx-2 mt-4" id="schedulerDate"></span>
						<h4 class="scheduler-title mx-2">Schedule</h4>
						<div class="f-column scheduler-contents">
						</div>
					</div>
					
					<div class="scheduler-btn-area" style="z-index:9;">
						<button type="button" class="btn btn-outline-success" id="addScheduleBtn">
							<span>Add Schedule</span>
						</button>
					</div>
					
				</div>
			</div>
		</div>
	</div>
	
	
	
<!-- Modal -->
<div class="modal" id="calendarModal" tabindex="-1" aria-hidden="true">
	<input type="hidden" id="calendarSeq" value="0">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h1 class="modal-title fs-5">Add Schedule</h1>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body">
				<div class="mb-3">
					<label for="inputCalendarDt" class="form-label">date</label>
					<input type="date" class="form-control" id="inputCalendarDt">
				</div>
				<div class="mb-3">
					<label for="inputCalendarColor" class="form-label">color</label>
					<select class="form-select form-select-sm" id="inputCalendarColor">
						<option value="01">Blue</option>
						<option value="02">Green</option>
						<option value="03">Red</option>
						<option value="04">Yellow</option>
						<option value="05">Black</option>
					</select>
				</div>
				<div class="mb-3">
					<label for="inputCalendarContents" class="form-label">contents</label>
					<input type="text" class="form-control" id="inputCalendarContents">
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-success" id="calendarSaveBtn">Save</button>
				<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
			</div>
		</div>
	</div>
</div>

<div class="modal" id="schedulerEditModal" tabindex="-1" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<h1 class="modal-title fs-5">아동 시간표 편집</h1>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body">
				<div class="childrenSelectArea mb-2">
					<select class="form-select" id="schedulerChildrenSelect" aria-label="Default select example">
						<option selected>아동을 선택해주세요.</option>
						<c:forEach var="children" items="${childrenList }">
							<option value="${children.childrenSeq }">${children.childrenName } 
							<c:if test="${not empty children.childrenGroupCd && children.childrenGroupCd ne 0}">
								(${children.groupName })
							</c:if>
							</option>
						</c:forEach>
					</select>
				</div>
				<div class="scheduler-input-area">
					<div class="card weekInputArea mon">
						<div class="card-header">
							<span>월요일</span>
						</div>
						<div class="list-group list-group-flush" data-value="MON">
							<a href="javascript:void(0);" class="list-group-item mh-4" data-value="01">1교시</a>
							<a href="javascript:void(0);" class="list-group-item mh-4" data-value="02">2교시</a>
							<a href="javascript:void(0);" class="list-group-item mh-4" data-value="03">3교시</a>
							<a href="javascript:void(0);" class="list-group-item mh-4" data-value="04">4교시</a>
							<a href="javascript:void(0);" class="list-group-item mh-4" data-value="05">5교시</a>
						</div>
						<div class="form-floating">
							<textarea class="form-control scheduler-textarea" placeholder="" id="textarea_MON" maxlength="200"></textarea>
							<label for="textarea_MON">Comments</label>
						</div>
					</div>
					<div class="card weekInputArea tue">
						<div class="card-header">
							<span>화요일</span>
						</div>
						<div class="list-group list-group-flush" data-value="TUE">
							<a href="javascript:void(0);" class="list-group-item mh-4" data-value="01">1교시</a>
							<a href="javascript:void(0);" class="list-group-item mh-4" data-value="02">2교시</a>
							<a href="javascript:void(0);" class="list-group-item mh-4" data-value="03">3교시</a>
							<a href="javascript:void(0);" class="list-group-item mh-4" data-value="04">4교시</a>
							<a href="javascript:void(0);" class="list-group-item mh-4" data-value="05">5교시</a>
						</div>
						<div class="form-floating">
							<textarea class="form-control scheduler-textarea" placeholder="" id="textarea_TUE" maxlength="200"></textarea>
							<label for="textarea_TUE">Comments</label>
						</div>
					</div>
					<div class="card weekInputArea wed">
						<div class="card-header">
							<span>수요일</span>
						</div>
						<div class="list-group list-group-flush" data-value="WED">
							<a href="javascript:void(0);" class="list-group-item mh-4" data-value="01">1교시</a>
							<a href="javascript:void(0);" class="list-group-item mh-4" data-value="02">2교시</a>
							<a href="javascript:void(0);" class="list-group-item mh-4" data-value="03">3교시</a>
							<a href="javascript:void(0);" class="list-group-item mh-4" data-value="04">4교시</a>
							<a href="javascript:void(0);" class="list-group-item mh-4" data-value="05">5교시</a>
						</div>
						<div class="form-floating">
							<textarea class="form-control scheduler-textarea" placeholder="" id="textarea_WED" maxlength="200"></textarea>
							<label for="textarea_WED">Comments</label>
						</div>
					</div>
					<div class="card weekInputArea thu">
						<div class="card-header">
							<span>목요일</span>
						</div>
						<div class="list-group list-group-flush" data-value="THU">
							<a href="javascript:void(0);" class="list-group-item mh-4" data-value="01">1교시</a>
							<a href="javascript:void(0);" class="list-group-item mh-4" data-value="02">2교시</a>
							<a href="javascript:void(0);" class="list-group-item mh-4" data-value="03">3교시</a>
							<a href="javascript:void(0);" class="list-group-item mh-4" data-value="04">4교시</a>
							<a href="javascript:void(0);" class="list-group-item mh-4" data-value="05">5교시</a>
						</div>
						<div class="form-floating">
							<textarea class="form-control scheduler-textarea" placeholder="" id="textarea_THU" maxlength="200"></textarea>
							<label for="textarea_THU">Comments</label>
						</div>
					</div>
					<div class="card weekInputArea fri">
						<div class="card-header">
							<span>금요일</span>
						</div>
						<div class="list-group list-group-flush" data-value="FRI">
							<a href="javascript:void(0);" class="list-group-item mh-4" data-value="01">1교시</a>
							<a href="javascript:void(0);" class="list-group-item mh-4" data-value="02">2교시</a>
							<a href="javascript:void(0);" class="list-group-item mh-4" data-value="03">3교시</a>
							<a href="javascript:void(0);" class="list-group-item mh-4" data-value="04">4교시</a>
							<a href="javascript:void(0);" class="list-group-item mh-4" data-value="05">5교시</a>
						</div>
						<div class="form-floating">
							<textarea class="form-control scheduler-textarea" placeholder="" id="textarea_FRI" maxlength="200"></textarea>
							<label for="textarea_FRI">Comments</label>
						</div>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-success" id="schedulerSaveBtn">Save</button>
				<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
			</div>
		</div>
	</div>
</div>