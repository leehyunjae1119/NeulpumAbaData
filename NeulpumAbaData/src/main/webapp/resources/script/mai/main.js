$(document).ready(function() {
	
	$("#memberMemoCard").on("click", function() {
		$("#memberMemoInput").focus();
	});
	
	$("#memberMemoInput").on("focusout", function() {
		var contents = $("#memberMemoInput").val();
		var param = {
				memberSeq : _authSeq,
				boardContents : contents
		};

		$.ajax({
			url: "/mai/ajax.updateMemberMemo"
			, type : "POST"
			, data : JSON.stringify(param)
			, contentType : 'application/json; charset=utf-8'
			, async : true
			, dataType: 'JSON'
			, success : function(data) {
			}
			, error : function(request, status, error) {
			}
		});
	});
	
	$("#schedulerEditBtn").on('click', function() {
		$("#schedulerEditModal").modal('show');
	});
	
	$("#schedulerEditModal").on('show.bs.modal', function() {
		$("#schedulerChildrenSelect > option").prop("selected", false);
		$("#schedulerChildrenSelect > option").eq(0).prop("selected", true);
		chkInputSelected();
	});
	
	$("#schedulerEditModal").on('hidden.bs.modal', function() {
		schedulerInit();
	});
	
	$("#schedulerChildrenSelect").on('change', function() {
		chkInputSelected();
	});
	
	$("#schedulerSaveBtn").on('click', function() {
		
		if($("#schedulerChildrenSelect > option").eq(0).is(":selected")){
			fn_alert("저장 할 아동을 선택하세요.", "danger");
			$("#schedulerChildrenSelect").focus();
			return;
		}
		
		var param = {
				childrenSeq : $("#schedulerChildrenSelect").val()
		};
		
		var weekCdArr = new Array();
		var timeCdArr = new Array();
		var memoArr = new Array();
		
		$(".weekInputArea a.list-group-item.active").each(function(i, element) {
			weekCdArr.push($(this).parent().data("value"));
			timeCdArr.push($(this).data("value"));
			
			var memo = $(this).parent().parent().find(".scheduler-textarea").val().replace(/,/g, '@A');
			memo = memo ? memo : ' ';
			memoArr.push(memo);
		});
		
		param.schedulerWeekCd = weekCdArr.toString();
		param.schedulerTimeCd = timeCdArr.toString();
		param.schedulerMemo = memoArr.toString();
		
		$.ajax({
			url: "/mai/ajax.saveSchedulerData"
			, type : "POST"
			, data : JSON.stringify(param)
			, contentType : 'application/json; charset=utf-8'
			, async : false
			, dataType: 'JSON'
			, success : function(data) {
				fn_alert("스케줄러 정보를 저장하였습니다.", "success");
			}
			, error : function(request, status, error) {
				fn_alert("스케줄러 정보를 저장하지 못했습니다. 담당자에게 연락하세요.", "warning");
			}
		});
	});
	
	$(".weekInputArea a.list-group-item").on("click", function() {
		
		if(!$(this).hasClass("active")) {
			$(this).addClass("active");
		} else {
			$(this).removeClass("active");
		}
		
		chkInputTextarea();
	});
	
	$.mainInit = function() {
		schedulerInit();
		
		autoResize(document.getElementById("memberMemoInput"));
		
		calendarInit();
	};
	
	$.mainInit();
});

function setSchedulerData(childrenSeq) {
	var param = {
			childrenSeq : childrenSeq,
			centerSeq : sessionStorage.getItem("centerSeq")
	};

	$.ajax({
		url: "/mai/ajax.selectSchedulerList"
		, type : "POST"
		, data : JSON.stringify(param)
		, contentType : 'application/json; charset=utf-8'
		, async : false
		, dataType: 'JSON'
		, success : function(data) {
			data.resultList.forEach(function(elt, i, array) {	
				$(".weekInputArea .list-group[data-value="+elt.schedulerWeekCd+"]").find(".list-group-item[data-value="+elt.schedulerTimeCd+"]").addClass("active");

				if(elt.schedulerMemo) {
					$("#textarea_"+elt.schedulerWeekCd).val(elt.schedulerMemo.replace(/@A/g, ','));
				} else {
					$("#textarea_"+elt.schedulerWeekCd).val("");
				}
			});
		}
		, error : function(request, status, error) {
			fn_alert("스케줄러 정보를 조회하지 못했습니다. 담당자에게 연락하세요.", "warning");
		}
	});
}

function chkInputSelected() {
	var isNonSelected = $("#schedulerChildrenSelect > option").eq(0).is(":selected");
	
	$(".weekInputArea a.list-group-item").removeClass("active");
	
	if(!isNonSelected) {
		$(".weekInputArea a.list-group-item").removeClass("disabled");
		
		var childrenSeq = $("#schedulerChildrenSelect > option:selected").val();
		setSchedulerData(childrenSeq);
	} else {
		$(".weekInputArea a.list-group-item").addClass("disabled");
	}
	
	chkInputTextarea();
}

function chkInputTextarea() {
	$(".weekInputArea").each(function(i, element) {
		
		if($(this).find(".list-group-item.active").length > 0) {
			$(this).find(".scheduler-textarea").prop("disabled", false);
		} else {
			$(this).find(".scheduler-textarea").prop("disabled", true);
			$(this).find(".scheduler-textarea").val("");
		}
	});
}

function schedulerInit() {
	var dataList = selectSchedulerList();
	
	makeScheduler(dataList);
}

function makeScheduler(dataList) {
	
	$(".weekName_MON").empty();
	$(".weekName_TUE").empty();
	$(".weekName_WED").empty();
	$(".weekName_THU").empty();
	$(".weekName_FRI").empty();
	
	dataList.forEach(function(elt, i, array) {
		var timeCd = elt.schedulerTimeCd;
		var weekCd = elt.schedulerWeekCd;
		var tooltipContents = '아동 스케줄 상세\n';
		tooltipContents += '\n이름 : ' + elt.childrenName;
		tooltipContents += '\n요일 : ' + getKoreaWeekName(elt.schedulerWeekCd);
		tooltipContents += '\n내용 : ' + elt.schedulerMemo;
		
		var html = '';
		
		html += '<span class="time-item '+elt.childrenBookImg+'" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="'+tooltipContents+'" data-bs-custom-class="scheduler-tooltip">';
		html += elt.childrenName;
		html += '</span>';
		
		$("#time_"+timeCd).children("td.weekName_"+weekCd).append(html);
	});
	
	const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
	const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
}

function selectSchedulerList() {
	var returnData = null;
	
	var param = {
			centerSeq : sessionStorage.getItem("centerSeq")
	};

	$.ajax({
		url: "/mai/ajax.selectSchedulerList"
		, type : "POST"
		, data : JSON.stringify(param)
		, contentType : 'application/json; charset=utf-8'
		, async : false
		, dataType: 'JSON'
		, success : function(data) {
			returnData = data.resultList;
		}
		, error : function(request, status, error) {
			fn_alert("스케줄러 정보를 조회하지 못했습니다. 담당자에게 연락하세요.", "warning");
		}
	});
	return returnData;
}

function getKoreaWeekName(weekCd) {
	var koreaWeekName = '';
	
	switch (weekCd) {
	case 'MON' : koreaWeekName = '월요일';
		break;
	case 'TUE' : koreaWeekName = '화요일';
		break;
	case 'WED' : koreaWeekName = '수요일';
		break;
	case 'THU' : koreaWeekName = '목요일';
		break;
	case 'FRI' : koreaWeekName = '금요일';
		break;
	default:
		break;
	}
	
	return koreaWeekName;
}

function autoResize(object) {
	object.style.height = 'auto';
	object.style.height = object.scrollHeight + 'px';
}