package com.neulpum.np.cpm.service;

import java.util.List;
import java.util.Map;

import com.neulpum.np.cpm.vo.ReportVO;

public interface CpmReportService {

	public List<ReportVO> selectReportDataList(ReportVO reportVO) throws Exception;
	
	public List<ReportVO> selectReportStoComplateChartData(ReportVO reportVO) throws Exception;
	
	public List<Map<String, Object>> selectReportLtoComplateChartData(ReportVO reportVO) throws Exception;
}
