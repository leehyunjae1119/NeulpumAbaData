const _rgbaArray = [
					'rgba(255, 99, 132, opacity)',
					'rgba(255, 159, 64, opacity)',
					'rgba(255, 205, 86, opacity)',
					'rgba(75, 192, 192, opacity)',
					'rgba(54, 162, 235, opacity)',
					'rgba(153, 102, 255, opacity)',
					'rgba(201, 203, 207, opacity)'
                  ];

colorUtil_getChartColor = function(size, opacity) {
	let returnColor = [];
	if(!opacity) {
		opacity = 1;
	}
	
	for(var i = 0; i < size; i++) {
		var color = _rgbaArray[i];
		color = color.replace('opacity', opacity);
		returnColor.push(color);
	}
	
	return returnColor;
};
