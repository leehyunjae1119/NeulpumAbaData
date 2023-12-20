var isDailyReportComplate = false;
var isWeeklyReportComplate = false;
var isMonthlyReportComplate = false;
var isQuarterlyReportComplate = false;
var reportId = 'dailyReport';

$(document).ready(function() {
	
	$(".saveJpgBtn").on("click", function() {
		if(!checkReportComplate()){
			fn_alert("보고서를 먼저 작성해주세요.", "warning");
			return;
		}
		fn_saveJPG(reportId);
	});
	
	$(".savePdfBtn").on("click", function() {
		if(!checkReportComplate()){
			fn_alert("보고서를 먼저 작성해주세요.", "warning");
			return;
		}
		fn_savePDF(reportId);
	});
	
	$(".printBtn").on("click", function() {
		if(!checkReportComplate()){
			fn_alert("보고서를 먼저 작성해주세요.", "warning");
			return;
		}
		fn_htmlPrint(reportId);
	});
	
	$("#writeReportBtn").on('click', function() {
		
		if(reportId != 'dailyReport'){
			if(!$("#reportStartDt").val()){
				fn_alert("시작일자를 입력하세요.", "warning");
				return;
			} else if(!$("#reportEndDt").val()) {
				fn_alert("종료일자를 입력하세요.", "warning");
				return;
			}
		} else {
			if(!$("#reportEndDt").val()){
				fn_alert("작성일자를 입력하세요.", "warning");
				return;
			}
		}

		makeReport();
		viewReportPaper();
	});

	$(".card-header-tabs .nav-link").on("click", function () {
		$(".card-header-tabs .nav-link").removeClass("active");
		$(this).addClass("active");

		$(".reportPaper").hide();
		
		reportId = $(this).attr("data-value");
		
		viewReportPaper();
		settingWriteReportDate();
	});
	
	$.reportInit = function() {
		viewReportPaper();
		settingWriteReportDate();
	};
	
	$.reportInit();
});

$(document).on("click", ".report-table td", function () {
	
	if($(this).children('span').length > 0){
		const text = $(this).children('span').html().split('<br>').join("\r\n");
		const textarea = '<textarea rows="1" onkeyup="autoResize(this)" onkeydown="autoResize(this)"></textarea>';

		$(this).children('span').remove();
		$(this).append(textarea);
		$(this).children('textarea').focus();
		$(this).children('textarea').val(text);
		$(this).children('textarea').trigger('onkeyup');

		$(".report-table textarea").blur(function () {
			const textValue = $(this).val().replace(/(?:\r\n|\r|\n)/g, '<br>');
			const parentTd = $(this).parent('td');
			const span = '<span>' + textValue + '</span>';

			$(this).remove();
			$(parentTd).append(span);
		});				
	}
});

function viewReportPaper() {
	var isReportComplate = false;
	
	switch (reportId) {
	case "dailyReport":
		isReportComplate = isDailyReportComplate;
		$(".hiddenItem").hide();
		break;
	case "weeklyReport":
		isReportComplate = isWeeklyReportComplate;
		$(".hiddenItem").show();
		break;
	case "monthlyReport":
		isReportComplate = isMonthlyReportComplate;
		$(".hiddenItem").show();
		break;
	case "quarterlyReport":
		isReportComplate = isQuarterlyReportComplate;
		$(".hiddenItem").show();
		break;
	default:
		break;
	}
	
	$(".reportPaper").hide();
	if(!isReportComplate){
		$("#noReport").show();
	} else {
		$("#"+reportId).show();
	}
	
};

function settingWriteReportDate() {
	switch (reportId) {
	case "dailyReport":
		$("#reportStartDt").val($.getToday());
		$("#reportEndDt").val($.getToday());
		break;
	case "weeklyReport":
		$("#reportStartDt").val($.getAnotherDay(-7));
		$("#reportEndDt").val($.getToday());
		break;
	case "monthlyReport":
		$("#reportStartDt").val($.getAnotherDay(-30));
		$("#reportEndDt").val($.getToday());
		break;
	case "quarterlyReport":
		$("#reportStartDt").val($.getAnotherDay(-90));
		$("#reportEndDt").val($.getToday());
		break;
	default:
		break;
	}
}

function makeReport() {
	
	var data = selectReportDataList();
	
	switch (reportId) {
	case "dailyReport":
		makeDailyReport(data);
		break;
	case "weeklyReport":
		makeWeeklyReport(data);
		break;
	case "monthlyReport":
		makeMonthlyReport(data);
		break;
	case "quarterlyReport":
		makeQuarterlyReport(data);
		break;
	default:
		break;
	}
};

function selectReportDataList() {
	var resultData = {};
	
	var param = {
			childrenSeq : $("#childrenSeq").val(),
			reportEndDt : $("#reportEndDt").val()
		}
	
	if(reportId === 'dailyReport'){
		param.reportStartDt = $("#reportEndDt").val();
	} else {
		param.reportStartDt = $("#reportStartDt").val();
	}

	$.ajax({
		url: "/cpm/ajax.selectReportDataList"
		, type : "POST"
		, data : JSON.stringify(param)
		, contentType : 'application/json; charset=utf-8'
		, async : false
		, dataType: 'JSON'
		, success : function(data) {
			resultData.domainList = data.curriculumData.domainList;
			resultData.ltoList = data.curriculumData.ltoList;
			resultData.reportData = data.reportData;
		}
		, error : function(request, status, error) {
			fn_alert("보고서 작성에 실패하였습니다. 담당자에게 연락하세요.", "warning")
		}
	});
	
	return resultData;
}

function autoResize(textarea) {
	textarea.style.height = 'auto';
	textarea.style.height = textarea.scrollHeight + 'px';
};

function checkReportComplate() {
	var isReportComplate = false;
	
	switch (reportId) {
	case "dailyReport":
		isReportComplate = isDailyReportComplate;
		break;
	case "weeklyReport":
		isReportComplate = isWeeklyReportComplate;
		break;
	case "monthlyReport":
		isReportComplate = isMonthlyReportComplate;
		break;
	case "quarterlyReport":
		isReportComplate = isQuarterlyReportComplate;
		break;
	default:
		break;
	}
	
	return isReportComplate;
}

