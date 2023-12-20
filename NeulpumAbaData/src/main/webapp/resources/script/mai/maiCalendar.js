$(document).ready(function() {
	$("#addScheduleBtn").on("click", function() {
		isEditMode = false;
		$("#inputCalendarDt").val($.getDateFormat(selectDay, 'YYYY-MM-DD'));
		$("#calendarModal").modal("show");
	});
	
	$("#calendarSaveBtn").on("click", function() {
		var url = '';
		var param = {};
		
		if(isEditMode) { 
			url = '/mai/ajax.updateCalendarData';
			param.calendarSeq = $("#calendarSeq").val();
			param.calendarDt = $.getDateFormat($("#inputCalendarDt").val(), 'YYYY/MM/DD');
			param.calendarContents = $("#inputCalendarContents").val();
			param.calendarColorCd = $("#inputCalendarColor").val();
		} else {
			url = '/mai/ajax.insertCalendarData';
			param.calendarDt = $.getDateFormat($("#inputCalendarDt").val(), 'YYYY/MM/DD');
			param.calendarContents = $("#inputCalendarContents").val();
			param.calendarColorCd = $("#inputCalendarColor").val();
			param.centerSeq = sessionStorage.getItem("centerSeq");
		}
		
		if($("#inputCalendarDt").val() === ''){
			$("#inputCalendarDt").focus();
			fn_alert("스케줄 날짜를 입력하세요.", "danger");
			return;
		}
		if($("#inputCalendarContents").val() === ''){
			$("#inputCalendarContents").focus();
			fn_alert("스케줄 내용을 입력하세요.", "danger");
			return;
		}

		$.ajax({
			url: url
			, type : "POST"
			, data : JSON.stringify(param)
			, contentType : 'application/json; charset=utf-8'
			, async : false
			, dataType: 'JSON'
			, success : function(data) {
				fn_alert("스케줄을 저장했습니다. ", "success");
				calendarInit();
			}
			, error : function(request, status, error) {
				fn_alert("스케줄 저장에 실패했습니다. ", "warning");
			}
		});
		
		$("#calendarModal").modal("hide");
	});
	
	$("#calendarModal").on("hide.bs.modal", function() {
		$("#inputCalendarDt").val('');
		$("#inputCalendarColor").val('01');
		$("#inputCalendarContents").val('');
		$("#calendarSeq").val('');
	});
});

/*
	달력 렌더링 할 때 필요한 정보 목록 

	현재 월(초기값 : 현재 시간)
	금월 마지막일 날짜와 요일
	전월 마지막일 날짜와 요일
*/
var isEditMode = false;

var selectDay = '';
var dataDtList = [];

// 날짜 정보 가져오기
var date = new Date(); // 현재 날짜(로컬 기준) 가져오기
var utc = date.getTime() + (date.getTimezoneOffset() * 60 * 1000); // uct 표준시 도출
var kstGap = 9 * 60 * 60 * 1000; // 한국 kst 기준시간 더하기
var today = new Date(utc + kstGap); // 한국 시간으로 date 객체 만들기(오늘)

var thisMonth = new Date(today.getFullYear(), today.getMonth(), today.getDate());
// 달력에서 표기하는 날짜 객체

var currentYear = thisMonth.getFullYear(); // 달력에서 표기하는 연
var currentMonth = thisMonth.getMonth(); // 달력에서 표기하는 월
var currentDate = thisMonth.getDate(); // 달력에서 표기하는 일


function calendarInit() {
	// 캘린더 렌더링
	renderCalender(thisMonth);
}

function renderCalender(thisMonth) {
	
	// 렌더링을 위한 데이터 정리
	currentYear = thisMonth.getFullYear();
	currentMonth = thisMonth.getMonth();
	currentDate = thisMonth.getDate();
	
	var calendarMonthList = selectCalendarMonth();
	var calendarMonthArray = new Array();
	calendarMonthList.forEach(function(elt, i, array) {
		calendarMonthArray.push(elt.calendarDt);
	});

	// 이전 달의 마지막 날 날짜와 요일 구하기
	var startDay = new Date(currentYear, currentMonth, 0);
	var prevDate = startDay.getDate();
	var prevDay = startDay.getDay();

	// 이번 달의 마지막날 날짜와 요일 구하기
	var endDay = new Date(currentYear, currentMonth + 1, 0);
	var nextDate = endDay.getDate();
	var nextDay = endDay.getDay();

	// 현재 월 표기
	$('#monthName').text(getMonthName(currentMonth));

	// 렌더링 html 요소 생성
	var calendatHtml = '';
	
	var cnt = 1;
	var todayStr = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
	todayStr = $.getDateFormat(todayStr, 'YYYY/MM/DD');
	
	selectDay = selectDay == '' ? todayStr : selectDay;
	
	// 지난달
	for (var i = prevDate - prevDay + 1; i <= prevDate; i++) {
		
		if(cnt%7 == 1){ calendatHtml += '<tr>'; }
		
		calendatHtml += '<td></td>';
		cnt++;
	}
	// 이번달
	for (var i = 1; i <= nextDate; i++) {
		var dateStr = currentYear + '/' + (currentMonth + 1) + '/' + i;
		dateStr = $.getDateFormat(dateStr, 'YYYY/MM/DD');
		var classStr = '';
		
		if(calendarMonthArray.indexOf(dateStr) >= 0){
			classStr += 'scheduled-point ';
		}		
		if(todayStr == dateStr){
			classStr += 'today ';
		}
		if(selectDay == dateStr){
			classStr += 'active ';
		}
		
		if(cnt%7 == 1){ calendatHtml += '<tr>'; }
		
		calendatHtml += '<td class="'+classStr+'">' + i + '</td>';
		
		if(cnt%7 == 0){ calendatHtml += '</tr>'; }
		cnt++;
	}
	// 다음달
	for (var i = 1; i <= (7 - nextDay == 7 ? 0 : 7 - nextDay); i++) {
		calendatHtml += '<td></td>';
		
		if(cnt%7 == 0){ calendatHtml += '</tr>'; }
		cnt++;
	}
	
	$("#calendarBoard").empty();
	$("#calendarBoard").append(calendatHtml);
	
	$("#schedulerDate").text($.getDateFormat(selectDay, 'YYYY.MM.DD'));
	var scheduleList = selectCalendarList();
	makeScheduleListHtml(scheduleList);
	
}

function getMonthName(month) {
	var monthNameArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	return monthNameArr[month];
}

function parseStrToDate(str) {
    var y = str.substr(0, 4);
    var m = str.substr(4, 2);
    var d = str.substr(6, 2);
    return new Date(y,m-1,d);
}

function parseDateToStr(date) {
	var y  = date.getFullYear();
	var m  = date.getMonth() + 1;
    var d  = date.getDate();
    return y + '/' + m + '/' + d;
}

function selectCalendarMonth() {
	var returnData = new Array();
	var param = {
			centerSeq : sessionStorage.getItem("centerSeq"),
			calendarDt : $.getDateFormat(parseDateToStr(thisMonth), 'YYYY/MM/DD')
	};

	$.ajax({
		url: "/mai/ajax.selectCalendarMonth"
		, type : "POST"
		, data : JSON.stringify(param)
		, contentType : 'application/json; charset=utf-8'
		, async : false
		, dataType: 'JSON'
		, success : function(data) {
			returnData = data.resultList;
		}
		, error : function(request, status, error) {
		}
	});
	return returnData;
}

function selectCalendarList(calendarSeq) {
	var returnData = new Array();
	var param = {
			centerSeq : sessionStorage.getItem("centerSeq"),
			calendarDt : selectDay
	};
	
	if(calendarSeq){
		param.calendarSeq = calendarSeq;
	}
	
	$.ajax({
		url: "/mai/ajax.selectCalendarList"
		, type : "POST"
		, data : JSON.stringify(param)
		, contentType : 'application/json; charset=utf-8'
		, async : false
		, dataType: 'JSON'
		, success : function(data) {
			returnData = data.resultList;
		}
		, error : function(request, status, error) {
		}
	});
	
	return returnData;
}

function makeScheduleListHtml(scheduleList) {
	
	var html = '';
	
	if(scheduleList.length > 0){
		scheduleList.forEach(function(elt, i, array) {
			var colorClass = getStyleColorClass(elt.calendarColorCd);
			
			html += '	<div class="d-flex flex-nowrap f-start mt-2 mx-2">';
			html += '		<small class="item-xy-center"><i class="bi bi-record-circle '+colorClass+' mr-1"></i></small>';
			html += '		<div class="f-column w-100 mx-2">';
			html += '			<div class="f-between">';
			html += '				<span class="text-body-secondary scheduler-contents-text">'+elt.calendarContents+'</span>';
			html += '				<div class="dropup dropdown">';
			html += '					<a href="#" class="card-drop text-secondary" data-bs-toggle="dropdown" aria-expanded="false">';
			html += '						<i class="bi bi-three-dots-vertical"></i>';
			html += '					</a>';
			html += '					<div class="dropdown-menu dropdown-menu-end" data-value="'+elt.calendarSeq+'">';
			html += '						<a href="javascript:void(0);" class="dropdown-item scheduler-edit-btn">Edit</a>';
			html += '						<a href="javascript:void(0);" class="dropdown-item scheduler-remove-btn">Remove</a>';
			html += '					</div>';
			html += '				</div>';
			html += '			</div>';
			html += '		</div>';
			html += '	</div>';
		});
	} else {
		html += '	<div class="d-flex flex-nowrap f-start mt-2 mx-2">';
		html += '		<small class="text-body-secondary">일정이 없습니다.</small>';
		html += '	</div>';
	}
	
	$(".scheduler-contents").empty();
	$(".scheduler-contents").append(html);
}

function getStyleColorClass(colorCd) {
	var className = '';
	switch (colorCd) {
	case '01': className = 'text-primary'; break;
	case '02': className = 'text-success'; break;
	case '03': className = 'text-danger'; break;
	case '04': className = 'text-warning'; break;
	case '05': className = 'text-dark'; break;
	default: break;
	}
	return className;
}

//이전달로 이동
$(document).on('click', '#calendarPrevBtn', function() {
	thisMonth = new Date(currentYear, currentMonth - 1, 1);
	renderCalender(thisMonth);
});

// 다음달로 이동
$(document).on('click', '#calendarNextBtn', function() {
	thisMonth = new Date(currentYear, currentMonth + 1, 1);
	renderCalender(thisMonth); 
});

// 날짜 클릭
$(document).on('click', '#calendarBoard td', function() {
	$('#calendarBoard td').removeClass("active");
	$(this).addClass("active");
	
	selectDay = currentYear + '/' + (currentMonth + 1) + '/' + $(this).text();
	selectDay = $.getDateFormat(selectDay, 'YYYY/MM/DD');
	
	$("#schedulerDate").text($.getDateFormat(selectDay, 'YYYY.MM.DD'));
	
	var scheduleList = selectCalendarList();
	makeScheduleListHtml(scheduleList);
});

$(document).on('click', '.scheduler-edit-btn', function() {
	var calendarSeq = $(this).parent().data("value");
	var scheduleData = selectCalendarList(calendarSeq)[0];
	
	isEditMode = true;
	$("#inputCalendarDt").val($.getDateFormat(scheduleData.calendarDt, 'YYYY-MM-DD'));
	$("#inputCalendarColor").val(scheduleData.calendarColorCd);
	$("#inputCalendarContents").val(scheduleData.calendarContents);
	$("#calendarSeq").val(scheduleData.calendarSeq);
	$("#calendarModal").modal("show");
});

$(document).on('click', '.scheduler-remove-btn', function() {
	var calendarSeq = $(this).parent().data("value");
	
	var param = {
			calendarSeq : calendarSeq
	};

	console.log(param);
	$.ajax({
		url: "/mai/ajax.deleteCalendarData"
		, type : "POST"
		, data : JSON.stringify(param)
		, contentType : 'application/json; charset=utf-8'
		, async : false
		, dataType: 'JSON'
		, success : function(data) {
			var scheduleList = selectCalendarList();
			makeScheduleListHtml(scheduleList);
			calendarInit();
		}
		, error : function(request, status, error) {
			fn_alert("스케줄 삭제에 실패했습니다. ", "warning");
		}
	});
});

