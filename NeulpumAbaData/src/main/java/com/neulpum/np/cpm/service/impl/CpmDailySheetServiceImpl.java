package com.neulpum.np.cpm.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.neulpum.np.cpm.dao.CpmDailySheetDao;
import com.neulpum.np.cpm.service.CpmDailySheetService;
import com.neulpum.np.cpm.vo.DailySheetVO;
import com.neulpum.np.cpm.vo.StoPointVO;
import com.neulpum.np.cpm.vo.StoVO;

@Service
public class CpmDailySheetServiceImpl implements CpmDailySheetService {

	@Inject
	CpmDailySheetDao cpmDailySheetDao;

	@Override
	public List<Map<String, Object>> selectDailySheetInit(DailySheetVO dailySheetVO) throws Exception {
		
		List<Map<String, Object>> resultList = new ArrayList<Map<String,Object>>();
		
		// sto data select
		List<StoVO> stoList = cpmDailySheetDao.selectStoList(dailySheetVO);
		
		for(StoVO vo : stoList) {
			Map<String, Object> dailySheetMap = new HashMap<String, Object>();
			
			DailySheetVO paramVO = new DailySheetVO();
			paramVO.setChildrenSeq(dailySheetVO.getChildrenSeq());
			paramVO.setStoSeq(vo.getStoSeq());
			
			// point data select
			List<StoPointVO> pointList = cpmDailySheetDao.selectStoPointList(paramVO);
			
			int stoTrialCnt = vo.getStoTrialCnt();
			int stoPointCnt = pointList.size();
			
			for(int i = 0; i < (stoTrialCnt - stoPointCnt); i++) {
				StoPointVO emptyPointVO = new StoPointVO();
				pointList.add(emptyPointVO);
			}
			
			// set dailySheet data 
			dailySheetMap.put("stoDetil", vo);
			dailySheetMap.put("pointList", pointList);
			
			// add dailySheet to List
			resultList.add(dailySheetMap);
		}
		
		return resultList;
	}

	@Override
	public int insertStoPointData(StoPointVO stoPointVO) throws Exception {
		
		StoVO stoVO = new StoVO();
		stoVO.setStoSeq(stoPointVO.getStoSeq());
		StoVO rsltStoVO = cpmDailySheetDao.dailySheetStoRoundSelect(stoVO);
		stoPointVO.setPointRound(rsltStoVO.getStoRound());
		int result = cpmDailySheetDao.insertStoPointData(stoPointVO);
		return result;
	} 
	
	@Override
	public int deleteStoPointData(StoPointVO stoPointVO) throws Exception {
		int result = cpmDailySheetDao.deleteStoPointData(stoPointVO);
		return result;
	} 
	
	@Override
	public int updateStoStatus(StoVO stoVO) throws Exception {
		int result = cpmDailySheetDao.updateStoStatus(stoVO);
		return result;
	}
	
	@Override
	public int updateStoRound(StoVO stoVO) throws Exception {
		int result = cpmDailySheetDao.updateStoRound(stoVO);
		return result;
	}

	@Override
	public List<List<DailySheetVO>> ltoChartDataSelect(DailySheetVO dailySheetVO) throws Exception {
		List<List<DailySheetVO>> resultList = new ArrayList<List<DailySheetVO>>();
		List<DailySheetVO> selectList = cpmDailySheetDao.dailySheetChartDataListSelect(dailySheetVO);
		List<DailySheetVO> stoList = cpmDailySheetDao.dailySheetChartStoListSelect(dailySheetVO);
		
		for(DailySheetVO stoVO : stoList) {
			List<DailySheetVO> subList = new ArrayList<DailySheetVO>();
			
			for(DailySheetVO chartData : selectList) {
				if(chartData.getStoSeq() == stoVO.getStoSeq()) {
					subList.add(chartData);
				}
			}
			
			resultList.add(subList);
		}
		
		return resultList;
	} 
}
