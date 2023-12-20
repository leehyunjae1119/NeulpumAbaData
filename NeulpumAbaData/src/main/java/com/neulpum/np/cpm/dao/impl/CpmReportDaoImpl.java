package com.neulpum.np.cpm.dao.impl;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.neulpum.np.cpm.dao.CpmReportDao;
import com.neulpum.np.cpm.vo.ReportVO;

@Repository
public class CpmReportDaoImpl implements CpmReportDao {
	
	@Autowired
	private SqlSessionTemplate sqlSession;

	@Override
	public List<ReportVO> selectReportDataList(ReportVO reportVO) throws Exception {
		return sqlSession.selectList(namespace + "selectReportDataList", reportVO);
	}

	@Override
	public List<ReportVO> selectReportStoComplateChartData(ReportVO reportVO) throws Exception {
		return sqlSession.selectList(namespace + "selectReportStoComplateChartData", reportVO);
	}

	@Override
	public List<Map<String, Object>> selectReportLtoComplateChartData(ReportVO reportVO) throws Exception {
		return sqlSession.selectList(namespace + "selectReportLtoComplateChartData", reportVO);
	}

}
