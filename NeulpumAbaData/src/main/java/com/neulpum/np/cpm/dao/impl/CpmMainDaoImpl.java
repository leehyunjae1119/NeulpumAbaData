package com.neulpum.np.cpm.dao.impl;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.neulpum.np.cpm.dao.CpmMainDao;
import com.neulpum.np.cpm.vo.CounselingVO;
import com.neulpum.np.cpm.vo.DomainVO;
import com.neulpum.np.cpm.vo.LtoVO;

@Repository
public class CpmMainDaoImpl implements CpmMainDao {

	@Autowired
	private SqlSessionTemplate sqlSession;

	@Override
	public List<DomainVO> selectDomainList(DomainVO domainVO) throws Exception {
		return sqlSession.selectList(namespace + "selectDomainList", domainVO);
	}

	@Override
	public List<LtoVO> selectLtoList(DomainVO domainVO) throws Exception {
		return sqlSession.selectList(namespace + "selectLtoList", domainVO);
	}

	@Override
	public List<CounselingVO> selectCounseling(CounselingVO counselingVO) throws Exception {
		return sqlSession.selectList(namespace + "selectCounseling", counselingVO);
	}

	@Override
	public List<DomainVO> selectStoComplateData(DomainVO domainVO) throws Exception {
		return sqlSession.selectList(namespace + "selectStoComplateData", domainVO);
	}
	
	
}
