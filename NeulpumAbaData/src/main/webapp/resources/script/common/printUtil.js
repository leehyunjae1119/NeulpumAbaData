
function fn_htmlPrint(id) {
	$('#'+id).printThis({
		debug: false,		   
		importCSS: true,		
		importStyle: false,	   
		printContainer: true,	 
		loadCSS: ["../js/bootstrap-5.3.0-dist/css/bootstrap.css", "../js/bootstrap-icons/font/bootstrap-icons.css", "../css/common.css", "../css/np-bs.css"], 
		pageTitle: "",	 
		removeInline: false,	
		printDelay: 100,		 
		header: null,			
		formValues: false,
		beforePrint: function() {
			$(".nonPrintArea").hide();
		},			 
		afterPrint: function() {
			$(".nonPrintArea").show();
		}
	});
}

function fn_saveJPG(id) {
	$(".nonPrintArea").hide();
	
	html2canvas($("#"+id)[0]).then(function(canvas) {
		var myImage = canvas.toDataURL();
		downloadURI(myImage, id + '_' + $.getToday() + ".jpg")
	});
	
	$(".nonPrintArea").show();
}

function downloadURI(uri, name) {
	var link = document.createElement("a")
	link.download = name;
	link.href = uri;
	document.body.appendChild(link);
	link.click();
}

function fn_savePDF(id){
	$(".nonPrintArea").hide();
	
	html2canvas($("#"+id)[0] ,{	
		//logging : true,		// 디버그 목적 로그
		//proxy: "html2canvasproxy.php",
		allowTaint : true,	// cross-origin allow 
		useCORS: true,		// CORS 사용한 서버로부터 이미지 로드할 것인지 여부
		scale : 2			// 기본 96dpi에서 해상도를 두 배로 증가
		
	}).then(function(canvas) {	
		// 캔버스를 이미지로 변환
		var imgData = canvas.toDataURL('image/png');
		
		var imgWidth = 190; // 이미지 가로 길이(mm) / A4 기준 210mm
		var pageHeight = imgWidth * 1.414;	// 출력 페이지 세로 길이 계산 A4 기준
		var imgHeight = canvas.height * imgWidth / canvas.width;
		var heightLeft = imgHeight;
		var margin = 10; // 출력 페이지 여백설정
		var doc = new jsPDF('p', 'mm');
		var position = 10;

		// 첫 페이지 출력
		doc.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
		heightLeft -= pageHeight;

		// 한 페이지 이상일 경우 루프 돌면서 출력
		while (heightLeft >= 20) {			// 35
			position = heightLeft - imgHeight;
			position = position - 20 ;		// -25
	
			doc.addPage();
			doc.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
			heightLeft -= pageHeight;
		}

		// 파일 저장
		doc.save(id + '_' + $.getToday() + '.pdf');
	});
	
	$(".nonPrintArea").show();
}