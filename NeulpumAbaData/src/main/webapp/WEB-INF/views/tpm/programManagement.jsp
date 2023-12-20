<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>

	<script src="../script/tpm/programManagement.js?version=${RESC_VERSION }"></script>

	<div>
		<div class="f-between mb-2">
			<div class="title-label mx-3 my-2">
				<i class="bi bi-file-earmark-check"></i>
				<p class="m-0" style="font-size: 20px;">Program management</p>
			</div>
			<div style="padding: 0.5rem;">
				<button type="button" class="btn btn-secondary" id="editModeChangeBtn">
					<i class="bi bi-pencil-square me-2"></i> 편집
				</button>
			</div>
		</div>
		<div class="curriculum-diretory">
			<span id="dtoLabel"></span>
			<span id="ltoLabel" style="display: none;"></span>
			<span id="stoLabel" style="display: none;"></span>
		</div>
		<div class="curriculum-layout">
			<div class="curriculum-partition" style="width:15rem;">
				<div class="curriculum-title">
					<span>영역</span>
				</div>
				<div class="newBtnArea" style="display: none;">
					<button type="button" class="btn w-100" id="tmpDomainAddBtn">
						<i class="bi bi-plus"></i>
						NEW
					</button>
				</div>
				<ul class="list-group program-list-group" id="tmpDomainListArea">
				</ul>
			</div>
			<div class="curriculum-partition" style="width:15rem;">
				<div class="curriculum-title">
					<span>장기목표</span>
				</div>
				<div class="newBtnArea" style="display: none;">
					<button type="button" class="btn w-100" id="tmpLtoAddBtn">
						<i class="bi bi-plus"></i>
						NEW
					</button>
				</div>
				<ul class="list-group program-list-group" id="tmpLtoListArea">
				</ul>
			</div>
			<div class="curriculum-partition" style="width:15rem;">
				<div class="curriculum-title">
					<span>단기목표</span>
				</div>
				<div class="newBtnArea" style="display: none;">
					<button type="button" class="btn w-100" id="tmpStoAddBtn">
						<i class="bi bi-plus"></i>
						NEW
					</button>
				</div>
				<ul class="list-group program-list-group" id="tmpStoListArea">
				</ul>
			</div>
		</div>
	</div>
	
	<!-- domain Edit Modal -->
	<div class="modal" id="domainEditModal" tabindex="-1" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">영역 정보</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body mb-4">
					<div class="modalAddArea px-2">
						<label for="" class="form-label">영역 이름</label>
						<div class="input-group mb-3">
							<input type="text" class="form-control" id="addDomainName" placeholder="" aria-describedby="domainListAddBtn">
							<button class="btn btn-outline-secondary" type="button" id="domainListAddBtn">추가</button>
						</div>
						<label for="" class="form-label">등록 할 영역 목록</label>
						<div id="domainList">
							<p class="h6 pt-3 emptyContents">등록될 영역이 없습니다.</p>
						</div>
					</div>
					<div class="modalModifyArea px-2" style="display: none;">
						<div class="mb-3">
							<label for="" class="form-label">영역 이름</label>
							<input type="text" class="form-control" id="modifyDomainName">
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
					<button type="button" class="btn btn-success saveInfoBtn">Save</button>
				</div>
			</div>
		</div>
	</div>
	
	<!-- lto Edit Modal -->
	<div class="modal" id="ltoEditModal" tabindex="-1" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">장기목표 정보</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body mb-4">
					<div class="modalAddArea px-2">
						<label for="" class="form-label">장기목표 이름</label>
						<div class="input-group mb-3">
							<input type="text" class="form-control" id="addLtoName" placeholder="" aria-describedby="ltoListAddBtn">
							<button class="btn btn-outline-secondary" type="button" id="ltoListAddBtn">추가</button>
						</div>
						<label for="" class="form-label">등록 할 장기목표 목록</label>
						<div id="ltoList">
							<p class="h6 pt-3 emptyContents">등록될 장기목표가 없습니다.</p>
						</div>
					</div>
					<div class="modalModifyArea px-2" style="display: none;">
						<div class="mb-3">
							<label for="" class="form-label">장기목표 이름</label>
							<input type="text" class="form-control" id="modifyLtoName">
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
					<button type="button" class="btn btn-success saveInfoBtn">Save</button>
				</div>
			</div>
		</div>
	</div>
	
	<!-- sto Edit Modal -->
	<div class="modal" id="stoEditModal" tabindex="-1" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">단기목표 정보</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body mb-4">
					<table class="table table-borderless input-table mb-4">
						<colgroup>
							<col width="25%">
							<col width="75%">
						</colgroup>
						<tbody>
							<tr>
								<td class="text-align-start"><label for="">시도수</label></td>
								<td><input type="number" class="form-control" id="stoTrialCnt" value="15" data-title="시도수"></td>
							</tr>
							<tr>
								<td class="text-align-start"><label for="">준거도달 기준</label></td>
								<td>
									<select class="form-select" id="stoArrStdPst" >
										<option value="100">100%</option>
										<option value="95">95%</option>
										<option value="90" selected>90%</option>
										<option value="85">85%</option>
										<option value="80">80%</option>
										<option value="75">75%</option>
										<option value="70">70%</option>
									</select>
								</td>
							</tr>
							<tr>
								<td class="text-align-start"><label for="">촉구방법</label></td>
								<td><input type="text" class="form-control" id="stoUrgContents" data-title="촉구방법"></td>
							</tr>
							<tr>
								<td class="text-align-start"><label for="">강화스케줄</label></td>
								<td><input type="text" class="form-control" id="stoRnfcContents" data-title="강화스케줄"></td>
							</tr>
						</tbody>
					</table>
					<div class="modalAddArea px-2">
						<label for="" class="form-label">단기목표 이름</label>
						<div class="input-group mb-3">
							<input type="text" class="form-control" id="addStoName" placeholder="" aria-describedby="stoListAddBtn">
							<button class="btn btn-outline-secondary" type="button" id="stoListAddBtn">추가</button>
						</div>
						<label for="" class="form-label">등록 할 단기목표 목록</label>
						<div id="stoList">
							<p class="h6 pt-3 emptyContents">등록될 단기목표가 없습니다.</p>
						</div>
					</div>
					<div class="modalModifyArea px-2" style="display: none;">
						<div class="mb-3">
							<label for="" class="form-label">단기목표 이름</label>
							<input type="text" class="form-control" id="modifyStoName">
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
					<button type="button" class="btn btn-success saveInfoBtn">Save</button>
				</div>
			</div>
		</div>
	</div>