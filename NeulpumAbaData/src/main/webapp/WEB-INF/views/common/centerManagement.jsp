<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
	<script src="../script/common/centerManagement.js?version=${RESC_VERSION }"></script>
	
	<div class="modal fade" id="centerChoiceModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="staticBackdropLabel">센터 선택</h5>
					<button type="button" class="btn btn-success" id="centerAddBtn">
						<i class="bi bi-plus-lg" style="margin-right: 3px;"></i>
						<span>추가</span>
					</button>
				</div>
				<div class="modal-body">
					<div class="c-flex f-between form-center-editer" id="centerEditer" style="display: none;">
						<div class="form-area" style="padding: 0.5rem;">
							<div class="card exCard" style="width: 15rem;">
								<div>
									<img id="exCenterRepresentativeImage" src="../image/profile_img/01.jpg" class="card-img-top" alt="...">
									<div class="card-img-overlay card-img-overbody">
										<span class="card-img-label" id="exCenterName">센터명</span>
									</div>
								</div>
								<div class="card-body" style="z-index: 100;">
									<div class="card-title f-between">
										<div>
											<span>센터장</span>
											<h4 id="exCenterLeader">이름</h4>
										</div>
										<div class="dropup dropdown">
											<a href="#" class="card-drop text-secondary" >
												<i class="bi bi-three-dots-vertical"></i>
											</a>
										</div>
									</div>
<!-- 									<div class="card-text"> -->
<!-- 										<span>선생님 - 0 명</span><br> -->
<!-- 										<span>아동 - 0 명</span> -->
<!-- 									</div> -->
								</div>
							</div>
						</div>
						<div class="form-area" style="padding: 0.5rem;">
							<form>
								<input type="hidden" id="centerSeq">
								<div class="mb-3">
									<label for="projectName" class="form-label">센터 이름</label>
									<input type="text" class="form-control" id="centerName" placeholder="센터명을 입력해주세요..." data-title="센터 이름">
								</div>
								<div class="mb-3">
									<label for="" class="form-label">센터장</label>
									<select class="form-select" id="centerLeader" data-title="센터장">
									</select>
								</div>
								<div class="mb-3">
									<label for="" class="form-label">센터 대표 이미지</label>
									<select class="form-select" id="centerRepresentativeImage" data-title="센터 대표 이미지">
										<option value="" selected>센터 대표 이미지를 선택해주세요...</option>
										<option value="01">01 - 여성 베이지</option>
										<option value="02">02 - 남성 블루</option>
										<option value="03">03 - 여성 퍼플</option>
										<option value="04">04 - 남성 오렌지</option>
										<option value="05">05 - 남성 옐로우</option>
										<option value="06">06 - 여성 핑크</option>
										<option value="07">07 - 남성 브라운</option>
										<option value="08">08 - 여성 민트</option>
									</select>
								</div>
							</form>
							<div class="form-btn-area">
								<button type="button" class="btn btn-primary" id="centerSaveBtn">저장</button>
								<button type="button" class="btn btn-secondary" id="centerCancelBtn">취소</button>
							</div>
						</div>
					</div>
					<div class="c-flex flex-nowrap pb-3" id="centerBoard">
					</div>
				</div>
			</div>
		</div>
	</div>

