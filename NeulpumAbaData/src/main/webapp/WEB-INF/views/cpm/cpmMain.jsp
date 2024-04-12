<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>

<script src='../script/cpm/cpmMain.js?version=${RESC_VERSION }'></script>

<div class="row">	
	<div class="col-sm-12 mb-3">
		<div class="f-between">
			<div class="flex-nowrap c-title">
				<i class="bi bi-file-earmark-text"></i>
				<span>Curriculum</span>
			</div>
			<div class="d-flex f-align-center">
				<a id="programMoveLink" class="link-secondary link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" href="javascript:void(0);">
					관리하기 <i class="bi bi-arrow-right"></i>
				</a>
			</div>
		</div>
		<div class="card contents-card">
			<div class="card-body d-flex">
				<div class="curriculum-box">
					<c:forEach var="domain" items="${curriculumData.domainList }">
						<div class="curriculum-dto-box">
							<ul class="list-group list-standard">
								<c:forEach var="lto" items="${curriculumData.ltoList }">
									<c:if test="${lto.domainSeq eq domain.domainSeq }">
										<li class="list-group-item 
										<c:choose>
											<c:when test="${lto.ltoStatusCd eq 'ING' }">
												list-group-item-success
											</c:when>
											<c:when test="${lto.ltoStatusCd eq 'CMP' }">
												list-group-item-danger
											</c:when>
											<c:when test="${lto.ltoStatusCd eq 'STP' }">
												list-group-item-primary
											</c:when>
											<c:when test="${lto.ltoStatusCd eq 'RPT' }">
												list-group-item-warning
											</c:when>
											<c:otherwise>
												 
											</c:otherwise>
										</c:choose>
										">${lto.ltoName }</li>
									</c:if>
								</c:forEach>
							</ul>
							<hr class="black">
							<ul class="list-group list-standard">
								<li class="list-group-item 
									<c:choose>
										<c:when test="${domain.domainStatusCd eq 'ING' }">
											list-group-item-success
										</c:when>
										<c:when test="${domain.domainStatusCd eq 'CMP' }">
											list-group-item-danger
										</c:when>
										<c:when test="${domain.domainStatusCd eq 'STP' }">
											list-group-item-primary
										</c:when>
										<c:when test="${domain.domainStatusCd eq 'RPT' }">
											list-group-item-warning
										</c:when>
										<c:otherwise>
											 
										</c:otherwise>
									</c:choose> dto-label">${domain.domainName }</li>
							</ul>
						</div>
					</c:forEach>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="row">
	<div class="col-sm-6 mb-3">
		<div class="flex-nowrap c-title mb-2">
			<i class="bi bi-bar-chart-line"></i>
			<span>STO Performance Chart</span>
		</div>
		<div class="card contents-card">
			<div class="card-body">
				<div>
					<canvas id="stoComplateChart" width="100vw" height="100vh"></canvas>
				</div>
			</div>
		</div>
	</div>
	<div class="col-sm-6 mb-3">
		<div class="f-between">
			<div class="flex-nowrap c-title">
				<i class="bi bi-journal-text"></i>
				<span>Counseling Journal</span>
			</div>
			<div class="d-flex f-align-center">
				<a id="counselingMoveLink" class="link-secondary link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" href="javascript:void(0);">
					더보기 <i class="bi bi-arrow-right"></i>
				</a>
			</div>
		</div>
		<div class="card contents-card" style="min-height:0;">
			<div class="card-body">
				<c:choose>
					<c:when test="${empty counselingData}">
						<p>작성된 상담일지가 없습니다. </p>
					</c:when>
					<c:otherwise>
						<c:forEach var="counseling" items="${counselingData }">
							<div class="card memo-card-simple mb-2">
								<div class="card-body">
									<small>${counseling.counselingRegDt }</small>
									<span class="collapse">${counseling.counselingContents }</span>
								</div>
							</div>
						</c:forEach>
					</c:otherwise>
				</c:choose>
			</div>
		</div>
	</div>
</div>
