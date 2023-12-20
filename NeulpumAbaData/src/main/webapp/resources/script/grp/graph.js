var myChart;
var _labels = new Array();
var _totData = new Array();
var _cmpData = new Array();
var _datasets = new Array();
var _chartWidth = 0;
var _dataList = new Array();
var _config = new Array();
var _data = new Array();

var _graphType = 1; // 1. 일별 시도수와 정반응 | 2. 영역별 크리테리아 | 3. 주별 준거도달 완료갯수
var _searchStd = 'indicator';

var _selectBoxData = {};

$(document).ready(function () {
	$(".saveJpgBtn").on("click", function() {
		$("#printMenu").dropdown("hide");
		fn_saveJPG("graphPage");
	});
	
	$(".savePdfBtn").on("click", function() {
		$("#printMenu").dropdown("hide");
		fn_savePDF("graphPage");
	});
	
	$(".printBtn").on("click", function() {
		$("#printMenu").dropdown("hide");
		fn_htmlPrint("graphPage");
	});
	
	$("#chartTypeSelect").on("change", function() {
		var type = Number($(this).children("option:selected").val());
		_graphType = type;
	});
	
	$("#standardSelect").on("change", function () {
		var idAlias = $(this).children("option:selected").val();

		$(".graph-standard-area").hide();
		$("#"+idAlias+"SelectArea").show();
		_searchStd = idAlias;
	});
	
	$("#applyBtn").on("click", function() {
		$.graphRender();
	});
	
	$("#chi_classSelect").on("change", function () {
		makeSelectBoxItem("chi_childSelect", _selectBoxData.childrenList);
	});
	
	$.graphRender = function() {
		_dataList = selectChartData();
    	if(_dataList.length > 0){
    		$("#chartLabel").show();
    		$("#emptyLabel").hide();
    	} else {
    		$("#chartLabel").hide();
    		$("#emptyLabel").show();
    	}
    	
    	_setLabels(_dataList);
    	_setData(_dataList);
    	_setChartWidth(_dataList);
    	_setDatasets();
    	_setConfig();
    	createChart("myChart")
    	
    	renderLegendLabel();
	};
	
	$.init = function() {
		if(_packageName === 'cpm'){
			$("#standardSelect").parent(".form-floating").hide();
			$("#ind_indicatorSelect").parent(".form-floating").addClass("ms-2");
		}
		
		selectGrahpSelectBoxData();
		
		makeSelectBoxItem("ind_indicatorSelect", _selectBoxData.memberList);
		
		makeSelectBoxItem("chi_classSelect", _selectBoxData.groupList);
		makeSelectBoxItem("chi_childSelect", _selectBoxData.childrenList);
		
		makeSelectBoxItem("cla_classSelect", _selectBoxData.groupList);
		
		makeSelectBoxItem("cen_centerSelect", _selectBoxData.centerList);
		
		$("#startDate").val($.getAnotherDay(-30));
		$("#endDate").val($.getToday());
	};
	
	$.init();
});

function selectGrahpSelectBoxData() {
	var param = {
			centerSeq : sessionStorage.getItem("centerSeq")
	};
	$.ajax({
		url: "/grp/ajax.selectGrahpSelectBoxData"
		, type : "post"
		, data : JSON.stringify(param)
		, contentType : 'application/json; charset=utf-8'
		, async : false
		, success : function(res) {
			_selectBoxData = res.dataList;
			
		}
		, error : function(request, status, error) {
			fn_alert("데이터 조회에 실패했습니다. 담당자에게 연락하세요.", "warning");
		}
	});
}

function makeSelectBoxItem(id, dataList) {
	var html = '';
	
	$("#"+id).empty();
	
	if(id === 'ind_indicatorSelect'){
		html += '<option value="0" selected>All Indicator</option>';
		dataList.forEach(function(item) {
			html += '<option value="'+item.memberSeq+'">'+item.memberName+'</option>';
		});
		
	} else if (id === 'chi_childSelect') {
		var idx = 0;
		dataList.forEach(function(item) {
			if($("#chi_classSelect").val() === '0'){
				if(idx === 0){
					html += '<option value="'+item.childrenSeq+'" selected>'+item.childrenName+'</option>';
				} else {
					html += '<option value="'+item.childrenSeq+'">'+item.childrenName+'</option>';
				}
				idx++;
			} else {
				if(Number($("#chi_classSelect").val()) === item.childrenGroupCd){
					if(idx === 0){
						html += '<option value="'+item.childrenSeq+'" selected>'+item.childrenName+'</option>';
					} else {
						html += '<option value="'+item.childrenSeq+'">'+item.childrenName+'</option>';
					}
					idx++;
				}
			}
		});
		
	} else if (id === 'cla_classSelect' || id === 'chi_classSelect') {
		html += '<option value="0" selected>All Class</option>';
		dataList.forEach(function(item) {
			html += '<option value="'+item.groupSeq+'">'+item.groupName+'</option>';
		});
		
	} else if (id === 'cen_centerSelect') {
		html += '<option value="0" selected>All Center</option>';
		dataList.forEach(function(item) {
			html += '<option value="'+item.centerSeq+'">'+item.centerName+'</option>';
		});
		
	}
	
	$("#"+id).html(html);
}






