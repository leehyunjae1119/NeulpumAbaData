<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>

	<script src="../script/cpm/cpmProgramManagement.js?version=${RESC_VERSION }"></script>
	<script src="../script/cpm/cpmProgramChart.js?version=${RESC_VERSION }"></script>

	<div>
		<div class="f-between mb-2">
			<div class="title-label mx-3 my-2">
				<i class="bi bi-file-earmark-check"></i>
				<p class="m-0" style="font-size: 20px;">Program management</p>
			</div>
			<div style="padding: 0.5rem;">
				<button type="button" class="btn btn-secondary auth-disabled-item" data-auth="master level1 level2 level3" id="editModeChangeBtn">
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
			<div class="curriculum-partition">
				<div class="curriculum-title">
					<span>영역</span>
				</div>
				<div class="newBtnArea" style="display: none;">
					<button type="button" class="btn w-100 auth-disabled-item" data-auth="master level1 level2 level3" id="domainAddBtn">
						<i class="bi bi-plus"></i>
						NEW
					</button>
				</div>
				<ul class="list-group program-list-group" id="domainListArea">
				</ul>
			</div>
			<div class="curriculum-partition">
				<div class="curriculum-title">
					<span>장기목표</span>
				</div>
				<div class="newBtnArea" style="display: none;">
					<button type="button" class="btn w-100 auth-disabled-item" data-auth="master level1 level2 level3" id="ltoAddBtn">
						<i class="bi bi-plus"></i>
						NEW
					</button>
				</div>
				<ul class="list-group program-list-group" id="ltoListArea">
				</ul>
			</div>
			<div class="curriculum-partition">
				<div class="curriculum-title">
					<span>단기목표</span>
				</div>
				<div class="newBtnArea" style="display: none;">
					<button type="button" class="btn w-100 auth-disabled-item" data-auth="master level1 level2 level3" id="stoAddBtn">
						<i class="bi bi-plus"></i>
						NEW
					</button>
				</div>
				<ul class="list-group program-list-group" id="stoListArea">
				</ul>
			</div>
			<div class="curriculum-sto-detail">
				<div class="f-between mb-2 item-xy-center">
					<div class="title-label mx-3">
						<i class="bi bi-ticket-detailed"></i>
						<p class="m-0" style="font-size: 20px;">STO PROGRAM DETAIL</p>
					</div>
<!-- 					<div class=""> -->
<!-- 						<button type="button" class="btn btn-outline-secondary btn-sm"> -->
<!-- 							Edit -->
<!-- 						</button> -->
<!-- 					</div>   -->
				</div>
				<div class="curriculum-sto-detail-contents">
					<table>
						<colgroup>
							<col width="30%">
							<col width="70%">
						</colgroup>
						<tbody>
							<tr>
								<td>진행상태</td>
								<td id="detailStoStatusCd"></td>
							</tr>
							<tr>
								<td>단기목표</td>
								<td class="detailContents" id="detailStoName"></td>
							</tr>
							<tr>
								<td>시도 수</td>
								<td class="detailContents" id="detailStoTrialCnt"></td>
							</tr>
							<tr>
								<td>준거도달 기준</td>
								<td class="detailContents" id="detailStoArrStdPst"></td>
							</tr>
							<tr>
								<td>촉구방법</td>
								<td class="detailContents" id="detailStoUrgContents"></td>
							</tr>
							<tr>
								<td>강화스케줄</td>
								<td class="detailContents" id="detailStoRnfcContents"></td>
							</tr>
							<tr>
								<td>메모</td>
								<td class="detailContents" id="detailStoMemoContents"></td>
							</tr>
							<tr>
								<td colspan="2">
									<button type="button" class="btn btn-sm btn-outline-success" id="openGraphBtn">그래프 보기</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
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
						<div class="f-between">
							<label for="" class="form-label">영역 이름</label>
							<div class="form-check form-switch">
								<input class="form-check-input" type="checkbox" role="switch" id="domainTmpSelectChk">
								<label class="form-check-label" for="domainTmpSelectChk">불러오기</label>
							</div>
						</div>
						<div class="input-group mb-3">
							<input type="text" class="form-control" id="addDomainName" placeholder="" aria-describedby="domainListAddBtn">
							<select class="form-select" id="addDomainNameSelect" aria-describedby="domainListAddBtn" style="display:none;"></select>
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
						<div class="f-between">
							<label for="" class="form-label">장기목표 이름</label>
							<div class="form-check form-switch"> 
								<input class="form-check-input" type="checkbox" role="switch" id="ltoTmpSelectChk">
								<label class="form-check-label" for="ltoTmpSelectChk">불러오기</label>
							</div>
						</div>
						<div class="input-group mb-3">
							<input type="text" class="form-control" id="addLtoName" placeholder="" aria-describedby="ltoListAddBtn">
							<select class="form-select" id="addLtoNameSelect" aria-describedby="ltoListAddBtn" style="display:none;"></select>
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
							<tr>
								<td class="text-align-start"><label for="">메모</label></td>
								<td><input type="text" class="form-control" id="stoMemoContents" data-title="메모"></td>
							</tr>
						</tbody>
					</table>
					<div class="modalAddArea px-2">
						<div class="f-between">
							<label for="" class="form-label">단기목표 이름</label>
							<div class="form-check form-switch">
								<input class="form-check-input" type="checkbox" role="switch" id="stoTmpSelectChk">
								<label class="form-check-label" for="stoTmpSelectChk">불러오기</label>
							</div>
						</div>
						<div class="input-group mb-3">
							<input type="text" class="form-control" id="addStoName" placeholder="" aria-describedby="stoListAddBtn">
							<select class="form-select" id="addStoNameSelect" aria-describedby="stoListAddBtn" style="display:none;"></select>
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
	
	
	<!-- 그래프 모달 -->
	<div class="modal c-modal-1" id="stoGraphModal" tabindex="-1" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<h1 class="modal-title fs-5" id="exampleModalToggleLabel">LTO 정반응 그래프</h1>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<div class="graph-edit-area">
						<select class="form-select chartFilterItem" id="chartStandard" aria-label="Large select example">
							<option value="pct" selected>Percentage</option>
							<option value="cnt">Count</option>
						</select>
						<div class="form-check">
							<input class="form-check-input chartFilterItem" type="checkbox" value="" id="positiveReactionChk" checked>
							<label class="form-check-label" for="positiveReactionChk">
								정반응
							</label>
						</div>
						<div class="form-check">
							<input class="form-check-input chartFilterItem" type="checkbox" value="" id="urgingChk" checked>
							<label class="form-check-label" for="urgingChk">
								촉구
							</label>
						</div>
					</div>
					<div class="graph-area">
						<div class="mx-2 my-4" id="graphArea">
							<div class="chart-legend_area" id="stoChartItem" style="margin-left: 60px;"></div>
							<canvas id="myChart" width="600" height="400"></canvas>
						</div>
						<div class="empty-info my-4" id="nodata" style="height: 100%; display:none;">
							<img alt="empty data" src="../image/common_img/undraw_Taken_re_yn20.png" width="200">
							<p class="h4 m-4">그래프를 작성 할 <br>데이터가 없습니다.</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>