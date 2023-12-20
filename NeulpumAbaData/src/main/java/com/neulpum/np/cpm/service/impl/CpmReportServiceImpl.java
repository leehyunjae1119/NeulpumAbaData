package com.neulpum.np.cpm.service.impl;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.neulpum.np.cpm.dao.CpmReportDao;
import com.neulpum.np.cpm.service.CpmReportService;
import com.neulpum.np.cpm.vo.ReportVO;

@Service
public class CpmReportServiceImpl implements CpmReportService {

	@Inject
	CpmReportDao cpmReportDao;

	@Override
	public List<ReportVO> selectReportDataList(ReportVO reportVO) throws Exception {
		return cpmReportDao.selectReportDataList(reportVO);
	}

	@Override
	public List<ReportVO> selectReportStoComplateChartData(ReportVO reportVO) throws Exception {
		return cpmReportDao.selectReportStoComplateChartData(reportVO);
	}

	@Override
	public List<Map<String, Object>> selectReportLtoComplateChartData(ReportVO reportVO) throws Exception {
		List<String> paramList = new ArrayList<String>();
		paramList = getDateParam(reportVO.getReportStartDt(), reportVO.getReportEndDt(), reportVO.getDateCnt());
		reportVO.setDateList(paramList);
		
		return cpmReportDao.selectReportLtoComplateChartData(reportVO);
	}
	
	private List<String> getDateParam(String startDt, String endDt, int itemCnt) throws ParseException{
		itemCnt = itemCnt < 2 ? 2 : itemCnt;
		List<String> resultList = new ArrayList<String>();
		
		Date startDate = new SimpleDateFormat("yyyy-MM-dd").parse(startDt);
        Date endDate = new SimpleDateFormat("yyyy-MM-dd").parse(endDt);
        
        long diffSec = (endDate.getTime() - startDate.getTime()) / 1000;
        long diffDays = diffSec / (24*60*60);
        
        int intervalDay = Long.valueOf(diffDays).intValue() / (itemCnt - 1);
        
        for(int i = 0; i < itemCnt; i++) {
        	if(i == 0) {
        		resultList.add(startDt);
        	} else if (i == (itemCnt - 1)) {
        		resultList.add(endDt);
        	} else {
        		Calendar cal = Calendar.getInstance();
        		cal.setTime(startDate);
        		cal.add(cal.DATE, intervalDay * i);
        		
        		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        		resultList.add(sdf.format(cal.getTime()));
        	}
        }
		
		return resultList;
	}
}
