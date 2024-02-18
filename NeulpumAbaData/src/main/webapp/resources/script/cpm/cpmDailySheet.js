$(document).ready(function() {
	
	$(".daily-sto-contents").on('click', function() {
        if($(this).hasClass("open")) {
            $(this).removeClass("open");
        } else {
            $(this).addClass("open");
        }
    });
	
	//포인트 입력 버튼
	$(".point-btn").on('click', function() {
		var stoSeq = getStoSeq(this);
		var pointRpnCd = $(this).data("value");
		var pointStyle = '';
		var pointText = '';
		
		//입력 데이터 저장 
		if($(this).parents(".daily-sto-point-edit").find("li.non-score").length > 0) {
			insertStoPointData(stoSeq, pointRpnCd);
		}
		
		if(pointRpnCd === "P"){
			pointStyle = "score bg-skyblue text-20";
			pointText = 'P';
		} else if(pointRpnCd === "+") {
			pointStyle = "score bg-teal text-20";
			pointText = '<i class="bi bi-plus-lg"></i>';
		} else if(pointRpnCd === "-") {
			pointStyle = "score bg-yellow text-20";
			pointText = '<i class="bi bi-dash-lg"></i>';
		}
		
		$(this).parents(".daily-sto-point-edit").find("li.non-score").eq(0).addClass(pointStyle);
		$(this).parents(".daily-sto-point-edit").find("li.non-score").eq(0).html(pointText);
		$(this).parents(".daily-sto-point-edit").find("li.non-score").eq(0).removeClass("non-score");
		
	});
	
	//포인트 되돌리기 버튼
	$(".reply-btn").on('click', function() {
		var stoSeq = getStoSeq(this);
		var scoreCnt = $(this).parents(".daily-sto-point-edit").find(".score").length;
		
		if(scoreCnt === 0){
			return;
		}
		
		$(this).parents(".daily-sto-point-edit").find("li.score").last().addClass("non-score");
		$(this).parents(".daily-sto-point-edit").find("li.score").last().html('');
		$(this).parents(".daily-sto-point-edit").find("li.score").last().removeClass("score bg-skyblue bg-teal bg-yellow text-20");
		
		//데이터 삭제 처리
		deleteStoPointData(stoSeq);
	});
	
	// 회차 추가 버튼
	$(".next-btn").on('click', function() {
		var totTrialCnt = $(this).parents(".daily-sto-point-edit").find(".point-list-item").length;
		var nonScoreCnt = $(this).parents(".daily-sto-point-edit").find(".non-score").length;
		var scsScoreCnt = $(this).parents(".daily-sto-point-edit").find(".score.bg-teal").length;
		var arrStdPst   = Number($(this).parents(".daily-sto-point-edit").data("pst"));
		
		if(nonScoreCnt !== 0) {
			fn_alert("해당 회차를 마무리하세요.", "warning");
			return;
		}
		if(scsScoreCnt / totTrialCnt * 100 > arrStdPst){
			fn_alert("준거 도달하여 추가할 수 없습니다.", "warning");
			return;
		}
		
		var stoSeq = getStoSeq(this);
		var scoreEle = $(this).parents(".daily-sto-point-edit").find(".point-list-item.score");
		
		var param = {
				stoSeq : stoSeq
		};
		
		function okCallBack() {
			$.ajax({
				url: "/cpm/ajax.updateStoRound"
				, type : "post"
				, data : JSON.stringify(param)
				, contentType : 'application/json; charset=utf-8'
				, async : false
				, success : function(data) {
					//포인트판 초기화
					$(scoreEle).html("");
					$(scoreEle).addClass("non-score");
					$(scoreEle).removeClass("bg-yellow");
					$(scoreEle).removeClass("bg-skyblue");
					$(scoreEle).removeClass("bg-teal");
					$(scoreEle).removeClass("text-20");
					$(scoreEle).removeClass("score");
				}
				, error : function(request, status, error) {
					fn_alert("처리에 실패했습니다. 담당자에게 연락하세요.", "warning");
				}
			});
		}

		fn_confirm("회차를 추가하시겠습니까?", okCallBack);
	});
	
	//종료 버튼
	$(".end-btn").on('click', function() {
		var stoSeq = getStoSeq(this);
		var stoStatusCd = "";
		
		if($(this).hasClass("btn-outline-small")){ // 종료버튼
			$(this).parents(".point-edit-btn-area").find(".point-btn-area").hide();
			$(this).text("진행");
			$(this).removeClass("btn-outline-small");
			$(this).addClass("btn-success");
			
			stoStatusCd = "STP";
			
		} else { // 진행버튼
			$(this).parents(".point-edit-btn-area").find(".point-btn-area").show();
			$(this).text("종료");
			$(this).removeClass("btn-success");
			$(this).addClass("btn-outline-small");
			
			stoStatusCd = "ING";
		}
		
		updateStoStatus(stoSeq, stoStatusCd);
	});
	
	//그래프 버튼
	$(".graph-btn").on('click', function() {
		var stoSeq = getStoSeq(this);
		
		$("#positiveReactionChk").prop("checked", true);
		$("#urgingChk").prop("checked", true);
		
		$.selectLtoChartData(stoSeq);
		$("#stoGraphModal").modal("show");
	});
	
	$.cpmDailySheetInit = function() {
		$(".daily-sheet-header .date").text($.getDateFormat3($.getToday()) + "프로그램");
	};
	
	$.cpmDailySheetInit();

});

function getStoSeq(obj) {
	return $(obj).parents(".daily-sto-point-edit").data("seq");
}


function chkStoStatus(stoSeq, stoStatusCd) {
	
	if(stoStatusCd === 'CMP') {
		var html = '<span class="badge text-bg-danger daily-cmp-badge">준거도달</span>';
		
		if($("div.daily-sto-point-edit[data-seq="+stoSeq+"]").parent().find(".daily-cmp-badge").length <= 0
			&& $("div.daily-sto-point-edit[data-seq="+stoSeq+"]").parent().find(".daily-cmp-badge.out").length <= 0){
			$("div.daily-sto-point-edit[data-seq="+stoSeq+"]").parent().find(".daily-sto-contents").append(html);
		}
	} else {
		
		if($("div.daily-sto-point-edit[data-seq="+stoSeq+"]").parent().find(".daily-cmp-badge").length > 0){
			$("div.daily-sto-point-edit[data-seq="+stoSeq+"]").parent().find(".daily-cmp-badge").addClass("out");
			
			setTimeout(function() {
				$("div.daily-sto-point-edit[data-seq="+stoSeq+"]").parent().find(".daily-cmp-badge").remove();
			}, 500);
		}
	}
}

function insertStoPointData(stoSeq, pointRpnCd) {
	var param = {
			stoSeq : stoSeq,
			pointRpnCd : pointRpnCd
	};
	
	$.ajax({
		url: "/cpm/ajax.insertStoPointData"
		, type : "post"
		, data : JSON.stringify(param)
		, contentType : 'application/json; charset=utf-8'
		, async : false
		, success : function(data) {
			chkStoStatus(stoSeq, data.stoStatusCd);
		}
		, error : function(request, status, error) {
			$(".daily-sto-point-edit[data-seq="+stoSeq+"]").find(".reply-btn").trigger("click");
			fn_alert("처리에 실패했습니다. 담당자에게 연락하세요.", "warning");
		}
	});
}


function deleteStoPointData(stoSeq) {
	var param = {
			stoSeq : stoSeq
	};
	
	$.ajax({
		url: "/cpm/ajax.deleteStoPointData"
		, type : "post"
		, data : JSON.stringify(param)
		, contentType : 'application/json; charset=utf-8'
		, async : false
		, success : function(data) {
			chkStoStatus(stoSeq, data.stoStatusCd);
		}
		, error : function(request, status, error) {
			fn_alert("처리에 실패했습니다. 담당자에게 연락하세요.", "warning");
			setTimeout(function() {
				location.reload(true);
			}, 1000);
		}
	});
}

function updateStoStatus(stoSeq, stoStatusCd) {
	var param = {
			stoSeq : stoSeq,
			stoStatusCd : stoStatusCd
	};
	
	$.ajax({
		url: "/cpm/ajax.updateStoStatus"
		, type : "post"
		, data : JSON.stringify(param)
		, contentType : 'application/json; charset=utf-8'
		, async : true
		, success : function(data) {
		}
		, error : function(request, status, error) {
			fn_alert("처리에 실패했습니다. 담당자에게 연락하세요.", "warning");
		}
	});
}
