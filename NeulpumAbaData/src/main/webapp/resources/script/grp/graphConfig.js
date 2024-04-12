
var _config_01 = {
		type: 'line',
		data: {},
		options: {
			responsive: false,
			interaction: {
				mode: 'index',
		    },
			layout: {
				padding: 30
			},
			plugins : {
				legend : {
					display : false,
				},
				autocolors : true,
				tooltip : {
					titleFont: {
						size: 20,
						weight: 'bold',
					},
					bodyFont: {
						size: 16,
						lineHeight:1.6,
					},
					padding: 20,
					displayColors: false,
					callbacks: {
	                    label: function(context) {
	                    	
	                    	var strArray = new Array();
	                    	
	                    	var totCnt = 0;
	                    	var cmpCnt = 0;
	                    	
	                    	_dataList.forEach(function(item) {
								if(context.label == item.dtm){
									totCnt += Number(item.totCnt);
									cmpCnt += Number(item.cmpCnt);
								};
							});
	                    	
	                    	var totStr = 'Total Learn Unit : ' + cmpCnt + ' / ' + totCnt;
	                    	strArray.push(totStr);
	                    	
	                    	_dataList.forEach(function(item) {
	                    		
								if(context.label == item.dtm){
									var str = item.domainName + ' : ' + item.cmpCnt + ' / ' + item.totCnt;
									strArray.push(str);
								};
							});
	                    	
	                        if(context.datasetIndex%2 == 0){
	                        	return strArray;
	                        } else {
	                        	return;
	                        }
	                    }
	                }
				},
			},
			scales: {
				x: {
					ticks: {
						autoSkip : false,
						minRotation : 45,
						maxRotation : 45,
					}
				},
				y: {
					suggestedMin:0,
					suggestedMax:10,
					stepSize : 10,
					title : {
						display: true,
						text: '일별 시도수와 정반응',
						padding: 10,
						font: {
							size: 18,
						}
					}
				}
			}
		}
	};

var _config_02 = {
		type: 'line',
		data: {},
		options: {
			responsive: false,
			interaction: {
				mode: 'index',
		    },
			layout: {
				padding: 30
			},
			plugins : {
				legend : {
					display : false,
				},
				autocolors : true,
				tooltip : {
					titleFont: {
						size: 20,
						weight: 'bold',
					},
					bodyFont: {
						size: 16,
						lineHeight:1.6,
					},
					padding: 20,
					displayColors: false,
					callbacks: {
	                    label: function(context) {
	                    	
	                    	var strArray = new Array();
	                    	
	                    	_dataList.forEach(function(item) {
	                    		
								if(context.label == item.weekEnd){
									var str1 = '총 런유닛 : ' + item.rununit;
									var str2 = '준거도달 : ' + item.arrCnt;
									var str3 = 'Criterion : ' + item.criterion;
									strArray.push(str1);
									strArray.push(str2);
									strArray.push(str3);
								};
							});
	                    	
	                        if(context.datasetIndex%2 == 0){
	                        	return strArray;
	                        } else {
	                        	return;
	                        }
	                    }
	                }
				},
			},
			scales: {
				x: {
					ticks: {
						autoSkip : false,
						minRotation : 45,
						maxRotation : 45,
					}
				},
				y: {
					suggestedMin:0,
					suggestedMax:10,
					stepSize : 10,
					beginAtZero: true,
					title : {
						display: true,
						text: '영역별 크리테리아',
						padding: 10,
						font: {
							size: 18,
						}
					}
				},
			}
		}
	};

var _config_03 = {
		type: 'line',
		data: {},
		options: {
			responsive: false,
			interaction: {
				mode: 'index',
				intersect: false,
			},
			stacked: false,
			layout: {
				padding: 30
			},
			plugins : {
				legend : {
					display : false,
				},
				autocolors : true,
				tooltip : {
					titleFont: {
						size: 20,
						weight: 'bold',
					},
					bodyFont: {
						size: 16,
						lineHeight:1.6,
					},
					padding: 20,
					displayColors: false,
					callbacks: {
						label: function(context) {
							
							var strArray = new Array();
							
							var totCnt = 0;
							_dataList.forEach(function(item) {
								totCnt += item.arrCnt;
								if(context.label == item.weekEnd){
									var str1 = '도달 수 : ' + totCnt;
									var str2 = '누적 수 : ' + item.arrCnt;
									strArray.push(str1);
									strArray.push(str2);
								};
							});
							
							if(context.datasetIndex%2 == 0){
								return strArray;
							} else {
								return;
							}
						}
					}
				},
			},
			scales: {
				x: {
					ticks: {
						autoSkip : false,
						minRotation : 45,
						maxRotation : 45,
					}
				},
				y: {
					type: 'linear',
					suggestedMin:0,
					suggestedMax:10,
					stepSize : 10,
					beginAtZero: true,
					position: 'left',
					title : {
						display: true,
						text: '주별 준거도달 완료갯수',
						padding: 10,
						font: {
							size: 18,
						}
					},
					grid: {
				          drawOnChartArea: false, 
				        },
				},
				y1: {
					type: 'linear',
					suggestedMin:0,
					suggestedMax:10,
					stepSize : 10,
					beginAtZero: true,
					position: 'right',
					title : {
						display: true,
						text: '누적 준거도달 완료갯수',
						padding: 10,
						font: {
							size: 18,
						}
					},
			        
				}
			}
		}
};