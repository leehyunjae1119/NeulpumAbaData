package com.neulpum.np.cpm.dao.impl;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.neulpum.np.cpm.dao.CpmDailySheetDao;
import com.neulpum.np.cpm.vo.DailySheetVO;
import com.neulpum.np.cpm.vo.StoPointVO;
import com.neulpum.np.cpm.vo.StoVO;

@Repository
public class CpmDailySheetDaoImpl implements CpmDailySheetDao{

	@Autowired
	private SqlSessionTemplate sqlSession;

	@Override
	public List<StoVO> selectStoList(DailySheetVO dailySheetVO) throws Exception {
		return sqlSession.selectList(namespace + "selectStoList", dailySheetVO);
	}

	@Override
	public List<StoPointVO> selectStoPointList(DailySheetVO dailySheetVO) throws Exception {
		return sqlSession.selectList(namespace + "selectStoPointList", dailySheetVO);
	}

	@Override
	public int insertStoPointData(StoPointVO stoPointVO) throws Exception {
		return sqlSession.insert(namespace + "insertStoPointData", stoPointVO);
	}
	
	@Override
	public int deleteStoPointData(StoPointVO stoPointVO) throws Exception {
		return sqlSession.delete(namespace + "deleteStoPointData", stoPointVO);
	}

	@Override
	public int updateStoStatus(StoVO stoVO) throws Exception {
		return sqlSession.update(namespace + "updateStoStatus", stoVO);
	}
	
	@Override
	public int updateStoRound(StoVO stoVO) throws Exception {
		return sqlSession.update(namespace + "updateStoRound", stoVO);
	}

	@Override
	public List<DailySheetVO> dailySheetChartDataListSelect(DailySheetVO dailySheetVO) throws Exception {
		return sqlSession.selectList(namespace + "dailySheetChartDataListSelect", dailySheetVO);
	}

	@Override
	public List<DailySheetVO> dailySheetChartStoListSelect(DailySheetVO dailySheetVO) throws Exception {
		return sqlSession.selectList(namespace + "dailySheetChartStoListSelect", dailySheetVO);
	}
	
	@Override
	public StoVO dailySheetStoRoundSelect(StoVO stoVO) throws Exception {
		return sqlSession.selectOne(namespace + "dailySheetStoRoundSelect", stoVO);
	}
	
}
