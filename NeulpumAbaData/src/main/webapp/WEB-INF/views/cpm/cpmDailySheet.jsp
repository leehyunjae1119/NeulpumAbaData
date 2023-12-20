<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>

<script src='../script/cpm/cpmDailySheet.js?version=${RESC_VERSION }'></script>
<script src='../script/cpm/cpmDailySheetChart.js?version=${RESC_VERSION }'></script>

<style>
.btn:hover {
    border-color: rgb(158 158 158 / 35%);
}
</style>

<div>
	<div class="daily-sheet-header">
		<span class=""></span>
		<span class="date"></span>
		<div class=""></div>
	</div>
	<div class="title-label mx-4 my-2">
		<i class="bi bi-card-checklist"></i>
		<p class="m-0" style="font-size: 20px;">Daily Sheet</p>
	</div>
	<div class="row mb-4">
		<c:choose>
			<c:when test="${!empty initData }">
				<c:forEach var="sto" items="${initData }">
					<div class="col-lg-6 col-12">
						<div class="daily-sto-card">
							<div class="daily-sto-contents">
								<div class="daily-sto-contents-title">
									<small>${sto.stoDetil.domainName } &gt; ${sto.stoDetil.ltoName } &gt;</small>
									<span>${sto.stoDetil.stoName }</span>
								</div>
								<div class="daily-sto-contents-detail">
									<p>[도달 기준] ${sto.stoDetil.stoArrStdPst } %</p>
									<p>[촉구 방법] - ${sto.stoDetil.stoUrgContents }</p>
									<p>[강화 계획] - ${sto.stoDetil.stoRnfcContents }</p>
									<p>[메모] - ${sto.stoDetil.stoMemoContents }</p>
								</div>
							</div>
							<div class="daily-sto-point-edit" data-seq="${sto.stoDetil.stoSeq }" data-cnt="${sto.stoDetil.stoTrialCnt }" data-pst="${sto.stoDetil.stoArrStdPst }">
								<!-- 포인트 카드 -->
								<div class="point-border">
									<c:forEach var="point" items="${sto.pointList }" varStatus="status">
										<c:if test="${(status.index % 5) eq 0 }">
											<ul class="point-list-group">
										</c:if>
										
										<c:choose>
											<c:when test="${point.pointRpnCd eq 'P' }">
												<li class="point-list-item score bg-skyblue text-20">P</li>
											</c:when>
											<c:when test="${point.pointRpnCd eq '+' }">
												<li class="point-list-item score bg-teal text-20"><i class="bi bi-plus-lg"></i></li>
											</c:when>
											<c:when test="${point.pointRpnCd eq '-' }">
												<li class="point-list-item score bg-yellow text-20"><i class="bi bi-dash-lg"></i></li>
											</c:when>
											<c:otherwise>
												<li class="point-list-item non-score"></li>
											</c:otherwise>
										</c:choose>
										
										<c:if test="${status.last }">
											<c:forEach begin="1" end="${4 - (status.index % 5)}">
												<li class="point-list-item empty-score"></li>
											</c:forEach>
										</c:if>
										
										<c:if test="${(status.index % 5) eq 4 or status.last}">
											</ul>
										</c:if>
									
									</c:forEach>
								</div>
								<div class="point-edit-btn-area mt-1">
									<!-- 포인트 조작버튼 -->
									<div class="f-between mb-1 point-btn-area">
										<button type="button" class="btn btn-lg btn-outline-small strong-text w-100 point-btn" data-value="P">P</button>
										<button type="button" class="btn btn-lg btn-outline-small strong-text w-100 point-btn" data-value="+"><i class="bi bi-plus-lg"></i></button>
										<button type="button" class="btn btn-lg btn-outline-small strong-text w-100 point-btn" data-value="-"><i class="bi bi-dash-lg"></i></button>
										<button type="button" class="btn btn-lg btn-outline-small strong-text w-100 reply-btn"><i class="bi bi-reply"></i></button>
									</div>
									<div class="f-between mb-1">
										<button type="button" class="btn btn-sm btn-outline-small w-100 next-btn">회차추가</button>
										<button type="button" class="btn btn-sm btn-outline-small w-100 graph-btn">그래프</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</c:forEach>
			</c:when>
			<c:otherwise>
				<div class="empty-info">
					<img alt="empty data" src="../image/common_img/undraw_Empty_re_opql.png" width="400">
					<p class="h4 m-4">진행할 프로그램이 없습니다.</p>
				</div>
			</c:otherwise>
		</c:choose>
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

