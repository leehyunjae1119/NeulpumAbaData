var chart;

$(document).ready(function() {
	
	$(".curriculum-dto-box").on('click', function(){
        if($(this).hasClass('open')){
            $(this).removeClass('open');
        } else {
            $(".curriculum-dto-box").removeClass('open');
            $(this).addClass('open');
        }
    });

    $(".memo-card-simple").on('click', function(){
        if($(this).find('.collapse').hasClass('open')){
            $(this).find('.collapse').removeClass('open');
        } else {
            $(".memo-card-simple .collapse").removeClass('open');
            $(this).find('.collapse').addClass('open');
        }
    });
    
    $("#programMoveLink").on('click', function() {	
    	fn_formUrlMove("/cpm/cpmProgram", "GET", {});
	});
    
    $("#counselingMoveLink").on('click', function() {
    	fn_formUrlMove("/cpm/cpmCounseling", "GET", {});
    });
	
	renderChart('stoComplateChart');
	
});

function selectStoComplateData() {
	var resultData = null;
	var childrenSeq = sessionStorage.getItem("childrenSeq");
	var param = {
			childrenSeq : childrenSeq
	};
	
	$.ajax({
		url: "/cpm/ajax.selectStoComplateData"
		, type : "POST"
		, data : JSON.stringify(param)
		, contentType : 'application/json; charset=utf-8'
		, async : false
		, success : function(data) {
			resultData = data.stoComplateData;
		}
		, error : function(request, status, error) {
		}
	});
	
	return resultData;
}

function getData(data, type) {
	var labels = [];
	var datas = [];
	
	data.forEach(function(item, i, array) {
		labels.push(item.domainName);
		datas.push(item.stoComplateCnt);
	});
	
	if(type == "label"){
		return labels;
	}
	return datas;
}

function renderChart(id) {
	chart = document.getElementById(id);

	var _stoComplateData = selectStoComplateData();
	
	if(!_stoComplateData) {
		$("#"+id).parent("div").html('<p class="h5">데이터가 없습니다.</p>');
		return; 
	}
	
	var _labels = getData(_stoComplateData, 'label');
	var _data = getData(_stoComplateData, 'data'); 
	var colorArray = colorUtil_getChartColor(5, '0.5');

	var options = {
			type: 'bar',
			data: {
				labels: _labels,
				datasets: [{
					data: _data,
					borderWidth: 1,
					backgroundColor: colorArray
				}]
			},
			options: {
				scales: {
					y: {
						beginAtZero: true,
						suggestedMax: 5,
						ticks: {
							stepSize: 1
						}
					},
				},
				plugins: {
					legend : {
						display : false
					}
				},
			},
			
		};
	
	
	new Chart(chart, options);
};
