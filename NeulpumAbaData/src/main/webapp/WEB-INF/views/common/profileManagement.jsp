<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
<script src="../script/common/profileManagement.js?version=${RESC_VERSION }"></script>
<script>
</script>
<div class="modal fade" id="profileModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content profile-card">
			<div class="img-area">
				<img class="profile-img" alt="profile_img" src="../image/profile_img/user_profile.png">
			</div>
			<div class="modal-body">
				<div class="profile-body" id="">
					<div class="row">
						<label for="profile_memberId" class="col-4 col-form-label">ID</label>
						<div class="col-8">
							<input type="text" class="form-control-plaintext ms-1" id="profile_memberId" value="" readonly >
						</div>
					</div>
					<div class="row">
						<label for="profile_memberPw" class="col-4 col-form-label">PW</label>
						<div class="col-8">
							<input type="password" class="form-control" id="profile_memberPw" value="" data-title="비밀번호" data-type="password">
						</div>
					</div>
					<div class="row">
						<label for="profile_memberName" class="col-4 col-form-label">Name</label>
						<div class="col-8">
							<input type="text" class="form-control" id="profile_memberName" value="" data-title="이름">
						</div>
					</div>
					<div class="row">
						<label for="profile_memberEmail" class="col-4 col-form-label">Email</label>
						<div class="col-8">
							<input type="email" class="form-control" id="profile_memberEmail" value="" data-title="이메일">
						</div>
					</div>
					<div class="row">
						<label for="profile_memberCp" class="col-4 col-form-label">C.P</label>
						<div class="col-8">
							<input type="text" class="form-control" id="profile_memberCp" value="" data-title="연락처">
						</div>
					</div>
					<div class="row">
						<label for="profile_memberAuthCd" class="col-4 col-form-label">권한</label>
						<div class="col-8">
							<input type="text" class="form-control-plaintext ms-1" id="profile_memberAuthCd" value="" readonly >
						</div>
					</div>
					<div class="row">
						<label for="profile_memberPositionCd" class="col-4 col-form-label">소속</label>
						<div class="col-8">
							<input type="text" class="form-control-plaintext ms-1" id="profile_memberPosition" value="" readonly >
						</div>
					</div>
					<div class="row mb-4">
						<label for="profile_memberRegDt" class="col-4 col-form-label">가입일자</label>
						<div class="col-8">
							<input type="text" class="form-control-plaintext ms-1" id="profile_memberRegDt" value="" readonly >
						</div>
					</div>
					<div class="btn-area mb-4">
						<button type="button" class="btn btn-outline-success" id="profileSaveBtn">저장</button>
						<button type="button" class="btn btn-outline-secondary" id="profileCloseBtn">닫기</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

