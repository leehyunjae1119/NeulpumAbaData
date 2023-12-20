$(document).ready(function() {
	
});

function makeDailyReport(data) {
	
	isDailyReportComplate = true;
	
	$("#dailyReportDate").text($("#reportEndDt").val());
	$("#dailyReportName").text(_childrenInfo.childrenName);
	
	$("#dailyReportTable").empty();
	
	data.domainList.forEach(function(domain, i, domainArray) {
		
		var html = '';
		
		html += '	<tr>';
		html += '		<td rowspan="2">'+domain.domainName+'</td>';
		html += '		<td>진행중</td>';
		html += '		<td><span>';
		
		// 진행사항 추가
		var detailContents = '';
		var ltoSeq = 0;
		data.reportData.forEach(function(data, index, dataArray) {
			if(data.stoStatusCd === 'ING' && data.domainSeq === domain.domainSeq){
				if(ltoSeq !== data.ltoSeq){
					if(index !== 0 && detailContents !== ''){
						detailContents = '<br>';
					}
					detailContents += data.ltoName;
					detailContents += ' - ';
				} else {
					detailContents += ', ';
				}
				detailContents += data.stoName;
				ltoSeq = data.ltoSeq;
			}
		});
		html += detailContents;
		
		html += '</span></td>';
		html += '	</tr>';
		html += '	<tr>';
		html += '		<td>완료</td>';
		html += '		<td><span>';
		
		// 완료 추가
		detailContents = '';
		ltoSeq = 0;
		data.reportData.forEach(function(data, index, dataArray) {
			if(data.stoStatusCd === 'CMP' && data.domainSeq === domain.domainSeq){
				if(ltoSeq !== data.ltoSeq){
					if(index !== 0 && detailContents !== ''){
						detailContents += '<br>';
					}
					detailContents += data.ltoName;
					detailContents += ' - ';
				} else {
					detailContents += ', ';
				}
				detailContents += data.stoName;
				ltoSeq = data.ltoSeq;
			}
		});
		html += detailContents;
		
		html += '</span></td>';
		html += '	</tr>';
		
		$("#dailyReportTable").append(html);
	});
}
