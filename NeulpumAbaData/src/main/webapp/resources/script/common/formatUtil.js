$(document).ready(function () {
	$.numFormat = function(variable) {
		variable = Number(variable).toString();
		if(Number(variable) < 10 && variable.length == 1)
			variable = "0" + variable;
		return variable;
	};
	
	$.isLatestDate = function(date, day) {
		date = date.substring(0, 10).replace(/-/g, "/");
		var d = new Date(date);
		var today = new Date();
		var tmpDay = new Date();
		var anotherDay = new Date(tmpDay.setDate(tmpDay.getDate() - day));
		
		var isResult = false;
		if(d >= anotherDay && d <= today){
			isResult = true;
		}
		return isResult;
	};
	
	$.getCustomDate = function(date, lineBreak) {
		date = date.substring(0, 10).replace(/-/g, "/");
		var d = new Date(date);
		var yyyy = d.getFullYear();
		var yy = (""+yyyy).substr(2, 2);
		var mm = $.numFormat(d.getMonth()+1);
		var dd = $.numFormat(d.getDate());
		
		var today = new Date();
		var today_yy = today.getFullYear();
		var today_mm = $.numFormat(today.getMonth()+1);
		
		var di_y = today_yy - yyyy;
		var di_m = today_mm - mm;
		
		var btMs = (di_y * 12) + di_m;
		
		var gubun = ".";
		var d_str = "";
		if(lineBreak){
			d_str = yy + gubun + mm + gubun + dd + "<br>( "+ btMs + "개월 )";
		} else {
			d_str = yy + gubun + mm + gubun + dd + " ( "+ btMs + "개월 )";
		}
		
		return d_str;
	};
	
	$.getDateFormat = function(date, format) {
		date = date.substring(0, format.length).replace(/-/g, "/");
		var d = new Date(date);
		var yyyy = d.getFullYear();
		var mm = $.numFormat(d.getMonth()+1);
		var dd = $.numFormat(d.getDate());
		var hh = $.numFormat(d.getHours());
		var mi = $.numFormat(d.getMinutes());
		var ss = $.numFormat(d.getSeconds());
		
		var d_str = "";
		var gubun = "";
		if(format.substring(4,5) == "-"){
			gubun = "-";
		} else if(format.substring(4,5) == "."){
			gubun = ".";
		} else if(format.substring(4,5) == "/"){
			gubun = "/";
		}
		
		if(format.indexOf("YYYY") > -1){
			d_str += yyyy;
		}
		if(format.indexOf("MM") > -1){
			if(d_str != "") d_str+=gubun;
			d_str += mm;
		}
		if(format.indexOf("DD") > -1){
			if(d_str != "") d_str+=gubun;
			d_str += dd;
		}
		if(format.indexOf("HH") > -1){
			if(d_str != "") d_str+=" ";
			d_str += hh;
		}
		if(format.indexOf("MI") > -1){
			if(d_str != "") d_str+=":";
			d_str += mi;
		}
		if(format.indexOf("SS") > -1){
			if(d_str != "") d_str+=":";
			d_str += ss;
		}
		
		return d_str;
	};
	
	$.getDateFormat2 = function(str, gubun) {
		var date = "";
		date += str.substring(0, 4) + gubun;
		date += str.substring(4, 6) + gubun;
		date += str.substring(6, 8);
		return date ;
	};
	
	$.getDateFormat3 = function(_date) {
		const week = ['일', '월', '화', '수', '목', '금', '토'];
		
		_date = _date.replace(/-/g, "/");
		
		var date = new Date(_date);
		var year = date.getFullYear();
		var month = ("0" + (1 + date.getMonth())).slice(-2);
		var day = ("0" + date.getDate()).slice(-2);
		var dayOfWeek = date.getDay();	//0:일, 1:월, 2:화, 3:수, 4:목, 5:금, 6:토
		
		return year + "년 " + month + "월 " + day + "일 " + week[dayOfWeek] + "요일 ";
	};
	
	$.getToday = function() {
		var date = new Date();
		var year = date.getFullYear();
		var month = ("0" + (1 + date.getMonth())).slice(-2);
		var day = ("0" + date.getDate()).slice(-2);
		
		return year + "-" + month + "-" + day;
	};
	
	$.getAnotherDay = function(day) {
		var today = new Date();
		var anotherDay = new Date(today.setDate(today.getDate() + day));
		var year = anotherDay.getFullYear();
		var month = ("0" + (1 + anotherDay.getMonth())).slice(-2);
		var day = ("0" + anotherDay.getDate()).slice(-2);
		
		return year + "-" + month + "-" + day;
	};
});