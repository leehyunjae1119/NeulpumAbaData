<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
	<script src="../script/common/childrenSelect.js?version=${RESC_VERSION }"></script>

	<div class="row mb-4">
		<div class="filter-list">
			<div class="flex-nowrap c-title mb-2">
				<i class="bi bi-funnel-fill"></i>
				<span>Class List</span>
			</div>
			<div class="flex-nowrap" id="groupBadgeArea">
			</div>
		</div>
	</div>
	<div class="row mb-4">
		<div class="filter-result">
			<div class="flex-nowrap c-title mb-2">
				<i class="bi bi-funnel"></i>
				<span>Filter List</span>
			</div>
			<div class="contents-box">
				<div class="row child-book-list my-3" id="filterListArea">
				</div>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="flex-nowrap c-title mb-2">
			<i class="bi bi-bookmark-star-fill"></i>
			<span>All Child</span>
		</div>
		<div class="contents-box">
			<div class="row child-book-list my-3" id="allListArea">
			</div>
		</div>
	</div>