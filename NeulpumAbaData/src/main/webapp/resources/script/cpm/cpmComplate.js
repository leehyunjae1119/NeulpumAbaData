$(document).ready(function() {
	
	$("#startDate, #endDate, #domainSeq").on('change', function() {
		$.goSearch(1);
	});

	$.goSearch = function(pageNum) {
		var url = "/cpm/ajax.selectComplateList";
		var param = {
				pageNum : pageNum,
				startNum : (pageNum - 1) * 10,
				childrenSeq : $("#childrenSeq").val(),
				startDate : $("#startDate").val(),
				endDate : $("#endDate").val()
			};
		
		if($("#domainSeq").val() && $("#domainSeq").val() !== '0'){
			param.domainSeq = $("#domainSeq").val();
		}
		
		$.ajax({
			url: url
			, type : "POST"
			, data : JSON.stringify(param)
			, contentType : 'application/json; charset=utf-8'
			, async : false
			, dataType: 'JSON'
			, success : function(data) {
				makeInfoRow(data.resultList);
				fn_pagination("cpmPaging", data.pagingVO);
				
				$("#pageNum").val(pageNum);
			}
			, error : function(request, status, error) {
				fn_alert("상담일지 조회에 실패하였습니다. 담당자에게 연락하세요.", "warning")
			}
		});
	};
	
	$.init = function() {
		$.goSearch(1);
	};
	
	$.init();
});


function makeInfoRow(dataList) {
	
	var html = '';
	
	dataList.forEach(function(elt, i, array) {
		
		html += '	<tr data-bs-toggle="tooltip" data-bs-custom-class="custom-tooltip" data-bs-title="'+getTooltipContents(elt)+'" data-bs-html="true">';
		html += '		<th scope="row">'+elt.rownum+'</th>';
		html += '		<td>'+elt.domainName+'</td>';
		html += '		<td>'+elt.ltoName+'</td>';
		html += '		<td>'+elt.stoName+'</td>';
		html += '		<td>'+fn_getStatusBadgeHtml(elt.stoStatusCd)+'</td>';
		html += '		<td>'+$.getDateFormat(elt.stoStatusChDt, 'YYYY-MM-DD')+'</td>';
		html += '	</tr>';
		
	});
	
	$("#complateListArea").empty();
	$("#complateListArea").append(html);
	
	const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
	const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
	
}

function getTooltipContents(data) {

	var contents = '';
	contents += 'No : '+data.rownum+'<br>';
	contents += 'Domain : '+data.domainName+'<br>';
	contents += 'LTO : '+data.ltoName+'<br>';
	contents += 'STO : '+data.stoName+'<br>';
	contents += '상태 : '+fn_getStatusName(data.stoStatusCd)+'<br>';
	contents += '도달일 : '+$.getDateFormat(data.stoStatusChDt, 'YYYY-MM-DD');
	return contents;
}