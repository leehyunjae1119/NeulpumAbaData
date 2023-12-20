package com.neulpum.np.cpm.dao;

import java.util.List;

import com.neulpum.np.cpm.vo.DailySheetVO;
import com.neulpum.np.cpm.vo.StoPointVO;
import com.neulpum.np.cpm.vo.StoVO;

public interface CpmDailySheetDao {

	String namespace = "com.neulpum.np.cpm.dao.CpmDailySheetDao.";
	
	public List<StoVO> selectStoList(DailySheetVO dailySheetVO) throws Exception;
	
	public List<StoPointVO> selectStoPointList(DailySheetVO dailySheetVO) throws Exception;
	
	public int insertStoPointData(StoPointVO stoPointVO) throws Exception;
	
	public int deleteStoPointData(StoPointVO stoPointVO) throws Exception;
	
	public int updateStoStatus(StoVO stoVO) throws Exception;
	
	public List<DailySheetVO> dailySheetChartDataListSelect(DailySheetVO dailySheetVO) throws Exception;
	
	public List<DailySheetVO> dailySheetChartStoListSelect(DailySheetVO dailySheetVO) throws Exception;
	
	public StoVO dailySheetStoRoundSelect(StoVO stoVO) throws Exception;
	
	public int updateStoRound(StoVO stoVO) throws Exception;
	
}
