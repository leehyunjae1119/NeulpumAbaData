
function selectChartData() {
	var returnData = new Array();
	var url = '';
	var param = {};
	
	if(_graphType === 1){
		url = '/grp/ajax.selectDailyReactionData';
	} else if (_graphType === 2) {
		url = '/grp/ajax.selectCriterionByDomainData';
	} else if (_graphType === 3) {
		url = '/grp/ajax.selectWeeklyCompletionData';
		// x:1주일 간격 날짜 y:sto수 line:누적데이터 bar:당일데이터
	} else {
		return returnData;
	}
	
	if(_searchStd === "indicator"){
		param = { memberSeq : $("#ind_indicatorSelect").val() };
		
	} else if(_searchStd === "child") {
		if(!$("#chi_childSelect").val()) {
			return returnData;
		}
		param = { childrenSeq : $("#chi_childSelect").val() };
		
	} else if(_searchStd === "class") {
		param = { groupSeq : $("#cla_classSelect").val() };
		
	} else if(_searchStd === "center") {
		param = { centerSeq : $("#cen_centerSelect").val() };
		
	} else {
		return returnData;
	}
	
	param.centerSeq = sessionStorage.getItem("centerSeq");
	
	if(_packageName === 'cpm'){
		param.childrenSeq = _childrenInfo.childrenSeq;
	}
	
	if(!$("#startDate").val() || !$("#endDate").val()){
		fn_alert("검색할 기간을 설정하세요.", "warning");
		return returnData;
	} else {
		param.startDate = $("#startDate").val();
		param.endDate = $("#endDate").val();
	}
	
	if(_graphType === 2){
		param.domainSeq = $("#domainSelect").val();
	}
	
	$.ajax({
		url: url
		, type : "post"
		, data : JSON.stringify(param)
		, contentType : 'application/json; charset=utf-8'
		, async : false
		, success : function(res) {
			if(res.dataList){
				returnData = res.dataList;
			}
		}
		, error : function(request, status, error) {
			fn_alert("데이터 조회에 실패했습니다. 담당자에게 연락하세요.", "warning");
		}
	});
	
	return returnData;
}

function _setLabels(dataList) {
	var labels = new Array();
	
	if(_graphType === 1){
		dataList.forEach(function(item) {
			labels.push(item.dtm);
		});
		_labels = labels.filter(function(element, index) {
			return labels.indexOf(element) === index;
		});
		
	} else if (_graphType === 2) {
		dataList.forEach(function(item) {
			labels.push(item.weekEnd);
		});
		_labels = labels;
		
	} else if (_graphType === 3) {
		dataList.forEach(function(item) {
			labels.push(item.weekEnd);
		});
		_labels = labels;
		
	}
	
}

function _setData(dataList) {
	var totData = new Array();
	var cmpData = new Array();
	var data = new Array();
	
	if(_graphType === 1){
		_labels.forEach(function(item) {
			var totCnt = 0;
			var cmpCnt = 0;
			dataList.forEach(function(obj) {
				if(item == obj.dtm){
					totCnt += Number(obj.totCnt);
					cmpCnt += Number(obj.cmpCnt);
				}
			});
			totData.push(totCnt);
			cmpData.push(cmpCnt);
		});
		
		_totData = totData;
		_cmpData = cmpData;
		
	} else if (_graphType === 2) {
		dataList.forEach(function(item) {
			data.push(item.criterion);
		});
		_data = data;
		
	} else if (_graphType === 3) {
		var totCnt = 0;
		
		dataList.forEach(function(item) {
			totCnt += item.arrCnt;
			totData.push(totCnt);
			cmpData.push(item.arrCnt);
		});
		
		_totData = totData;
		_cmpData = cmpData;
	}
}

function _setDatasets() {
	
	var datasets = new Array();
	var totDataset = new Object();
	var cmpDataset = new Object();
	
	if(_graphType === 1){
		totDataset = {
				data : _totData,
				backgroundColor: "rgba(255,255,255,1)",
				borderColor: "rgba(0,0,0,0.7)",
				borderDash: [10,5],
				pointRadius: 5,
				fill: false,
				tension: false,
			};
		
		cmpDataset = {
				data : _cmpData,
				backgroundColor: "rgba(0,0,0,1)",
				borderColor: "rgba(0,0,0,0.7)",
				pointRadius: 5,
				fill: false,
				tension: false,
			};
		
		datasets.push(totDataset);
		datasets.push(cmpDataset);
		
		_datasets = datasets;
		
	} else if (_graphType === 2) {
		dataset = {
				data : _data,
				backgroundColor: "rgba(0,0,0,1)",
				borderColor: "rgba(0,0,0,0.7)",
				borderDash: [10,5],
				pointRadius: 5,
				fill: false,
				tension: false,
			};
		
		datasets.push(dataset);
		_datasets = datasets;
		
	} else if (_graphType === 3) {
		totDataset = {
				data : _totData,
				borderColor: "rgba(0,0,0,0.7)",
				backgroundColor: "rgba(0,0,0,1)",
				pointRadius: 5,
				fill: false,
				tension: false,
				yAxisID: 'y1',
			};
		
		cmpDataset = {
				type: 'bar',
				data : _cmpData,
				borderColor: "rgba(0,0,0,0.5)",
				backgroundColor: "rgba(0,0,0,0.1)",
				yAxisID: 'y',
				borderWidth: 1
			};
		
		datasets.push(totDataset);
		datasets.push(cmpDataset);
		
		_datasets = datasets;
	}

}

function _setConfig() {
	if(_graphType === 1){
		_config = _config_01;

	} else if (_graphType === 2) {
		_config = _config_02;
		
	} else if (_graphType === 3) {
		_config = _config_03;
	}
	
	_config.data.labels = _labels;
	_config.data.datasets = _datasets;

};

function _setChartWidth() {
	var idx = _labels.length;
	_chartWidth = idx*60 + 120;
}

function createChart(id) {
	var ctx = document.getElementById(id);
	
	if(Chart.getChart(id)){
		myChart.destroy();
	}
	$("#"+id).attr("width", _chartWidth);
	myChart = new Chart(ctx, _config);
}

function getDateStr(day) {
	var today = new Date();
	today.setDate(today.getDate() + day);
	
	var year = today.getFullYear();
	var month = ('0' + (today.getMonth() + 1)).slice(-2);
	var day = ('0' + today.getDate()).slice(-2);
	
	return year + '-' + month  + '-' + day;
}

function renderLegendLabel() {
	var html = '';
	
	$("#legendLabel").empty();
	if(_graphType === 1){
		html += '<img class="me-2" alt="" src="../image/common_img/unfill_point.png" style="width: 2.5rem;">';
		html += '<span class="me-4" >런유닛</span>';
		html += '<img class="me-2" alt="" src="../image/common_img/fill_point.png" style="width: 2.5rem;">';
		html += '<span class="me-4" >정반응</span>';
	} else if (_graphType === 2) {
		html += '<img class="mr-2" alt="" src="../image/common_img/fill_point.png" style="width: 2rem;">';
		html += '<span class="mr-4" >크리테리아</span>';
	} else if (_graphType === 3) {
		html += '<img class="me-2" alt="" src="../image/common_img/unfill_bar.png" style="width: 2.5rem;">';
		html += '<span class="me-4" >도달 수</span>';
		html += '<img class="me-2" alt="" src="../image/common_img/fill_point.png" style="width: 2.5rem;">';
		html += '<span class="me-4" >누적 수</span>';
	} else {
		
	}
	
	$("#legendLabel").html(html);
}