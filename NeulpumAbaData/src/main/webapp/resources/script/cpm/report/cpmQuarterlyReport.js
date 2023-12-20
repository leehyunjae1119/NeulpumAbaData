$(document).ready(function() {
	
});

var _stoChart;
var _stoChartOption;
var _stoChartData;

var _ltoChart;
var _ltoChartOption;
var _ltoChartData;
var _ltoChartDatasetCnt = 2;

function makeQuarterlyReport(data) {

	isQuarterlyReportComplate = true;
	
	var dateSpan = $("#reportStartDt").val().substr(0, 7) + ' ~ ' + $("#reportEndDt").val().substr(0, 7);
	$("#quarterlyReportDate").text(dateSpan);
	$("#quarterlyReportName").text(_childrenInfo.childrenName);
	
	$("#quarterlyReportTable").empty();
	
	data.domainList.forEach(function(domain, i, domainArray) {
		
		var html = '';
		
		html += '	<tr>';
		html += '		<td>'+domain.domainName+'</td>';
		html += '		<td><span></span></td>';
		html += '	<tr>';
		
		$("#quarterlyReportTable").append(html);
	});
	
	renderLtoComplateChart();
	renderStoComplateChart();
}

/********************************************************
 * 단기목표 그래프
 ********************************************************/
function renderStoComplateChart() {
	
	var ctx = document.getElementById("stoComplateChart");
	
	_stoChartData = getStoChartData();
	_stoChartOption = getStoChartOption();
	
	if(Chart.getChart("stoComplateChart")){
		_stoChart.destroy();
	}
	
	_stoChart = new Chart(ctx, _stoChartOption);
}

function getStoChartOption() {
	var options = {
			type: 'bar',
			data: _stoChartData,
			options: {
				responsive: true,
				scales: {
					x: {
					},
					y: {
						beginAtZero: true,
						ticks: {
							stackWeight: 1,
							stepSize: 1,
							maxTicksLimit: 10
						}
					}
				},
				plugins: {
					legend: {
						position: 'bottom',
						align : 'start',
						labels : {
							padding : 20,
							font : {
								size : 14
							}
						},
					},
					title: {
						display: true,
						text: '영역별 준거도달 지표',
						padding: 20,
						font: {
							weight: 'bold',
							size: 18
						}
					},
				}
			}
		};
	
	return options;
}

function getStoChartData() {
	var _labels = new Array();
	var _cmpData = new Array();
	var _ingData = new Array();
	
	var chartData = selectReportStoComplateChartData();
	
	chartData.stoComplateChartData.forEach(function(item) {
		_labels.push(item.domainName);
		_cmpData.push(item.stoCmpCnt);
		_ingData.push(item.stoIngCnt);
	});
	
	var data = {
			labels: _labels,
			datasets: [
			    {
			    	label: '진행한 단기목표 수',
			    	data: _ingData,
			    	borderWidth: 1,
			    	borderColor: '#a3cfbb',
			    	backgroundColor: '#a3cfbb88',
				},
				{
					label: '준거도달한 단기목표 수',
			    	data: _cmpData,
			    	borderWidth: 1,
			    	borderColor: '#fb9393',
			    	backgroundColor: '#fb939388',
				}
			]
	};
	
	return data;
}

function selectReportStoComplateChartData() {
	var resultData = {};
	
	var param = {
			childrenSeq : $("#childrenSeq").val(),
			reportStartDt : $("#reportStartDt").val(),
			reportEndDt : $("#reportEndDt").val()
		}

	$.ajax({
		url: "/cpm/ajax.selectReportStoComplateChartData"
		, type : "POST"
		, data : JSON.stringify(param)
		, contentType : 'application/json; charset=utf-8'
		, async : false
		, dataType: 'JSON'
		, success : function(data) {
			resultData = data;
		}
		, error : function(request, status, error) {
			fn_alert("차트 데이터 조회에 실패하였습니다. 담당자에게 연락하세요.", "warning")
		}
	});
	
	return resultData;
}

/********************************************************
 * 장기목표 그래프
 ********************************************************/
function renderLtoComplateChart() {
	
	var ctx = document.getElementById("ltoComplateChart");
	
	_ltoChartData = getLtoChartData();
	_ltoChartOption = getLtoChartOption();
	
	if(Chart.getChart("ltoComplateChart")){
		_ltoChart.destroy();
	}
	
	_ltoChart = new Chart(ctx, _ltoChartOption);
}


function getLtoChartOption() {
	var options = {
			type: 'line',
			data: _ltoChartData,
			options: {
				responsive: true,
				interaction: {
					mode: 'index',
			    },
				plugins : {
					legend : {
						display : true,
						position : 'bottom',
						align : 'start',
						labels : {
							boxWidth : 10,
							boxHeight : 10,
							padding : 20,
							font : {
								size : 14
							}
						},
					},
					title: {
						display: true,
						text: '영역별 발달지표',
						padding: 20,
						font: {
							weight: 'bold',
							size: 18
						}
					},
					tooltip : {
						enabled : false,
					},
				},
				scales: {
					x: {
						ticks: {
							autoSkip : false,
						}
					},
					y: {
						stacked: false,
						suggestedMin:0,
						suggestedMax:5,
						ticks: {
							stepSize : 1,
					    }
					}
				},
			}
		};
	
	return options;
}

function getLtoChartData() {
	var chartData = selectReportLtoComplateChartData();
	
	var _labels = new Array();
	var _datasets = new Array();
	
	// 라인 
	var	tmpArray = Object.assign({}, chartData.ltoComplateChartData[0]);
	delete tmpArray.domain_seq;
	delete tmpArray.domain_name;
	var keyArray = Object.keys(tmpArray);
	keyArray.sort();
	
	chartData.ltoComplateDomainList.forEach(function(item) {
		_labels.push(item.domainName);
	});
	
	// 차트 형식을 위한 더미 데이타셋
	var fsDataset = {
		      label: '',
		      stack: 'combined',
		      type: 'bar',
		      hidden : true
	    };
	_datasets.push(fsDataset);
	
	keyArray.forEach(function(key, index, arr) {
		var tmpData = new Array();
		
		chartData.ltoComplateChartData.forEach(function(item) {
			tmpData.push(item[key]);
		});
		
		var dataset = {
				label: key,
				data : tmpData,
				pointRadius: 5,
				borderColor: colorUtil_getChartColor(7, 1)[index%7],
				backgroundColor: colorUtil_getChartColor(7, 1)[index%7],
				fill: false,
				tension: false,
				stack: 'combined',
			};
		
		_datasets.push(dataset);
	});
	
	var data = {
			labels: _labels,
			datasets: _datasets
	};
	
	return data;
}

function selectReportLtoComplateChartData() {
	var resultData = {};
	
	var param = {
			childrenSeq : $("#childrenSeq").val(),
			reportStartDt : $("#reportStartDt").val(),
			reportEndDt : $("#reportEndDt").val(),
			dateCnt : _ltoChartDatasetCnt
		}

	$.ajax({
		url: "/cpm/ajax.selectReportLtoComplateChartData"
		, type : "POST"
		, data : JSON.stringify(param)
		, contentType : 'application/json; charset=utf-8'
		, async : false
		, dataType: 'JSON'
		, success : function(data) {
			resultData = data;
		}
		, error : function(request, status, error) {
			fn_alert("차트 데이터 조회에 실패하였습니다. 담당자에게 연락하세요.", "warning")
		}
	});
	
	return resultData;
}

function lineChangeUpdateChart(num) {
	_ltoChartDatasetCnt = _ltoChartDatasetCnt + num;
	if(_ltoChartDatasetCnt < 2) {
		_ltoChartDatasetCnt = 2;
	}
	renderLtoComplateChart();
}