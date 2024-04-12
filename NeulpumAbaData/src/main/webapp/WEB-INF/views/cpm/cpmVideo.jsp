<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<script src="../script/cpm/cpmVideo.js?version=${RESC_VERSION }"></script>

<input type="hidden" id="pageNum" value="0">

<div>
	<div class="f-between mb-2">
		<div class="title-label mx-3 my-2">
			<i class="bi bi-journal-text"></i>
			<p class="m-0" style="font-size: 20px;">Videos and teaching aids</p>
		</div>
		<div class="title-btn-area">
			<button type="button" class="btn btn-outline-success auth-disabled-item" data-auth="master level1 level2 level3" data-bs-toggle="modal" data-bs-target="#addVideoModal">Add video</button>
		</div>
	</div>
	<div class="container mb-3">
		<div class="row" id="videoListArea">
		</div>
	</div>
	<nav id="cpmVideoPaging"></nav>
</div>
	
<div class="modal" id="addVideoModal" tabindex="-1">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">Add Video</h5>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body mb-4">
				<form>
					<input type="hidden" id="videoSeqInput" value="0">
					<div class="mb-3">
						<label for="videoUrlInput" class="form-label">Video URL</label>
						<input type="text" class="form-control" id="videoUrlInput" placeholder="https://youtu.be/***">
					</div>
					<div class="mb-3">
						<label for="videoContentsInput" class="form-label">Contents</label>
						<input type="text" class="form-control" id="videoContentsInput" placeholder="">
					</div>
				</form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
				<button type="button" class="btn btn-success saveBtn">Save</button>
			</div>
		</div>
	</div>
</div>

<div class="modal" id="viewVideoModal" tabindex="-1" role="dialog" aria-hidden="true">
	<div class="modal-dialog modal-lg" style="height: 80%;">
		<div class="modal-content" style="height: 80%;">
			<iframe id="youtubeBox" width="100%" height="100%"></iframe>
		</div>
	</div>
</div>