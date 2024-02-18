package com.neulpum.np.cpm.service;

import java.util.List;
import java.util.Map;

import com.neulpum.np.cpm.vo.DailySheetVO;
import com.neulpum.np.cpm.vo.StoPointVO;
import com.neulpum.np.cpm.vo.StoVO;

public interface CpmDailySheetService {

	public List<Map<String, Object>> selectDailySheetInit(DailySheetVO dailySheetVO) throws Exception;
	
	public int insertStoPointData(StoPointVO stoPointVO) throws Exception;
	
	public int deleteStoPointData(StoPointVO stoPointVO) throws Exception;
	
	public int updateStoStatus(StoVO stoVO) throws Exception;
	
	public List<List<DailySheetVO>> ltoChartDataSelect(DailySheetVO dailySheetVO) throws Exception;
	
	public int updateStoRound(StoVO stoVO) throws Exception;
	
	public String selectStoStatusCd(StoVO stoVO) throws Exception;
}
