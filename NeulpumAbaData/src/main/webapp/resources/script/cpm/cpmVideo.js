$(document).ready(function() {
	
	$("#addVideoMoal").on("hidden.bs.modal", function() {
		$("#videoSeqInput").val("0");
		$("#videoUrlInput").val("");
		$("#videoContentsInput").val("");
	});
	
	$('#viewVideoModal').on('hidden.bs.modal', function (e) {
		$("#youtubeBox").prop("src", "");
		$("#youtubeBox").prop("title", "" );
		$("#youtubeBox").prop("frameborder", "");
		$("#youtubeBox").prop("allow", "");
		$("#youtubeBox").prop("allowfullscreen", false);
	});
	
	$(".saveBtn").on("click", function() {
		
		if($("#videoUrlInput").val().trim() === "" ){
			fn_alert("영상 주소를 입력하세요.", "danger");
			$("#videoUrlInput").focus();
			return;
		}
		if($("#videoUrlInput").val().indexOf("https://youtu.be/") !== 0 ){
			fn_alert("영상 주소를 알맞게 입력하세요.", "danger");
			$("#videoUrlInput").focus();
			return;
		}
		if($("#videoContentsInput").val().trim() === "" ){
			fn_alert("영상 내용을 입력하세요.", "danger");
			$("#videoContentsInput").focus();
			return;
		}
		
		var url = "";
		var param = {
				videoContents : $("#videoContentsInput").val(),
				videoUrl : $("#videoUrlInput").val()
		};
		
		if($("#videoSeqInput").val() === '0'){
			url = "/cpm/ajax.insertVideoData";
			param.childrenSeq = _childrenInfo.childrenSeq;
		} else {
			url = "/cpm/ajax.updateVideoData";
			param.videoSeq = $("#videoSeqInput").val();
		}
		
		$.ajax({
			url: url
			, type : "POST"
			, data : JSON.stringify(param)
			, contentType : 'application/json; charset=utf-8'
			, async : false
			, dataType: 'JSON'
			, success : function(data) {
				$("#addVideoModal").modal("hide");
				$.goSearch(1);
			}
			, error : function(request, status, error) {
				fn_alert("영상정보 저장에 실패하였습니다. 담당자에게 연락하세요.", "warning")
			}
		});
		
	});
	
	$.goSearch = function(pageNum) {
		var url = "/cpm/ajax.selectVideoList";
		var param = {
				childrenSeq : _childrenInfo.childrenSeq,
				pageNum : pageNum,
				startNum : (pageNum - 1) * 6,
			};
		
		$.ajax({
			url: url
			, type : "POST"
			, data : JSON.stringify(param)
			, contentType : 'application/json; charset=utf-8'
			, async : false
			, dataType: 'JSON'
			, success : function(data) {
				makeInfoRow(data.resultList);
				fn_pagination("cpmVideoPaging", data.pagingVO);
				
				$("#pageNum").val(pageNum);
			}
			, error : function(request, status, error) {
				fn_alert("영상목록 조회에 실패하였습니다. 담당자에게 연락하세요.", "warning")
			}
		});
	};
	
	$.videoInit = function() {
		$.goSearch(1);
	};
	
	$.videoInit();
});


function makeInfoRow(dataList) {
	var html = '';
	
	dataList.forEach(function(elt, i, array) {
		var videoId = getYoutubeId(elt.videoUrl);
		var imgUrl = getThumnailUrl(videoId);
		
		if(!videoId) {
			imgUrl = "../image/no-thumnail.png";
		}
		
		html += '	<div class="col-xl-3 col-lg-4 col-6 mb-3">';
		html += '		<div class="card box-shadow videoCard">';
		html += '			<input type="hidden" name="videoSeq" value="'+elt.videoSeq+'">';
		html += '			<input type="hidden" name="videoUrl" value="'+elt.videoUrl+'">';
		html += '			<img src="'+imgUrl+'" class="card-img-top" >';
		html += '			<div class="card-body text-bs-font">';
		html += '				<p class="card-text videoContents">'+elt.videoContents+'</p>';
		html += '				<div class="f-between f-align-end">';
		html += '					<small>'+elt.videoRegDt+'</small>';
		html += '					<div class="btn-group btn-group-sm" role="group" >';
		html += '						<button type="button" class="btn btn-outline-success editBtn">Edit</button>';
		html += '						<button type="button" class="btn btn-outline-success removeBtn">Remove</button>';
		html += '					</div>';
		html += '				</div>';
		html += '			</div>';
		html += '		</div>';
		html += '	</div>';
	});
	
	if(dataList.length < 1) {
		html += '<div class="empty-info">';
		html += '	<img alt="empty data" src="../image/common_img/undraw_Empty_re_opql.png" width="400">';
		html += '	<p class="h4 m-4">등록된 영상이 없습니다.</p>';
		html += '</div>';
	}
	
	$("#videoListArea").empty();
	$("#videoListArea").append(html);
	
	renderCounselingEvent();
}


function renderCounselingEvent() {
	
	$(".videoCard").each(function() {
		this.addEventListener("click", function(e) {
			if(!$(e.target).hasClass("btn")){
				var url = $(this).find("input[name=videoUrl]").val()
				var videoId = getYoutubeId(url);
				var videoUrl = 'https://www.youtube.com/embed/'+videoId;
				$("#youtubeBox").prop("src", videoUrl);
				$("#youtubeBox").prop("title", "YouTube video player" );
				$("#youtubeBox").prop("frameborder", "0");
				$("#youtubeBox").prop("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
				$("#youtubeBox").prop("allowfullscreen", true);
				
	            $("#viewVideoModal").modal("show");
	        }
		});
	});
	
	$(".editBtn").each(function() {
		this.addEventListener("click", function(e) {
			var videoSeq = $(this).parents(".videoCard").find("input[name=videoSeq]").val();
			var videoContents = $(this).parents(".videoCard").find("p.videoContents").text();
			var videoUrl = $(this).parents(".videoCard").find("input[name=videoUrl]").val();
			
			$("#videoSeqInput").val(videoSeq);
			$("#videoContentsInput").val(videoContents);
			$("#videoUrlInput").val(videoUrl);
			
			$("#addVideoModal").modal("show");
		});
	});
	
	$(".removeBtn").each(function() {
		this.addEventListener("click", function(e) {
			
			var thisElement = this;
			
			function okCallback() {
				var videoSeq = $(thisElement).parents(".videoCard").find("input[name=videoSeq]").val();
				removeVideoData(videoSeq);
			}
			
			fn_confirm("삭제하시겠습니까?", okCallback, "danger");
		});	
	});
}

function removeVideoData(videoSeq) {
	var param = {
			videoSeq : videoSeq
	};
	
	$.ajax({
		url: "/cpm/ajax.deleteVideoData"
		, type : "POST"
		, data : JSON.stringify(param)
		, contentType : 'application/json; charset=utf-8'
		, async : false
		, dataType: 'JSON'
		, success : function(data) {
			$.goSearch(1);
		}
		, error : function(request, status, error) {
			fn_alert("영상정보 삭제에 실패하였습니다. 담당자에게 연락하세요.", "warning")
		}
	});
}

function getThumnailUrl(id) {
	var imgUrl = "";
	
	imgUrl += 'https://img.youtube.com/vi/'+id+'/mqdefault.jpg';
	
	return imgUrl;
}

function getYoutubeId(url) {
	var start = url.lastIndexOf("/")+1;
	var end = url.length;
	var id = url.substring(start, end);
	
	if(id.indexOf("?") > 0){
		id = id.substring(0, id.indexOf("?"))
	}
	
	return id;
}
