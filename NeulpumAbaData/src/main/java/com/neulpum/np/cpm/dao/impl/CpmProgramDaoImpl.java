package com.neulpum.np.cpm.dao.impl;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.neulpum.np.cpm.dao.CpmProgramDao;
import com.neulpum.np.cpm.vo.DomainVO;
import com.neulpum.np.cpm.vo.LtoVO;
import com.neulpum.np.cpm.vo.StoVO;
import com.neulpum.np.cpm.vo.ProgramVO;

@Repository
public class CpmProgramDaoImpl implements CpmProgramDao {

	@Autowired
	private SqlSessionTemplate sqlSession;

	@Override
	public List<DomainVO> selectDomain(DomainVO domainVO) throws Exception {
		List<DomainVO> resultList = sqlSession.selectList(namespace + "selectDomain", domainVO);
		return resultList;
	}
	
	@Override
	public List<LtoVO> selectLto(LtoVO ltoVO) throws Exception {
		List<LtoVO> resultList = sqlSession.selectList(namespace + "selectLto", ltoVO);
		return resultList;
	}
	
	@Override
	public List<StoVO> selectSto(StoVO stoVO) throws Exception {
		List<StoVO> resultList = sqlSession.selectList(namespace + "selectSto", stoVO);
		return resultList;
	}

	@Override
	public int updateSortOrder(ProgramVO programVO) throws Exception {
		int step1 = sqlSession.update(namespace + "updateSortOrder_step1", programVO);
		int step2 = sqlSession.update(namespace + "updateSortOrder_step2", programVO);
		return step1 + step2;
	}
	
	@Override
	public int deleteProgram(ProgramVO programVO) throws Exception {
		int result = sqlSession.delete(namespace + "deleteProgram", programVO);
		return result;
	}
	
	@Override
	public int reorderSortOrder(ProgramVO programVO) throws Exception {
		int result = sqlSession.update(namespace + "updateSortOrder_step1", programVO);
		return result;
	}

	@Override
	public int insertDomain(DomainVO domainVO) throws Exception {
		int result = sqlSession.insert(namespace + "insertDomain", domainVO);
		return result;
	}

	@Override
	public int updateDomain(DomainVO domainVO) throws Exception {
		int result = sqlSession.update(namespace + "updateDomain", domainVO);
		return result;
	}

	@Override
	public int insertLto(LtoVO ltoVO) throws Exception {
		int result = sqlSession.insert(namespace + "insertLto", ltoVO);
		return result;
	}

	@Override
	public int updateLto(LtoVO ltoVO) throws Exception {
		int result = sqlSession.update(namespace + "updateLto", ltoVO);
		return result;
	}

	@Override
	public int insertSto(StoVO stoVO) throws Exception {
		int result = sqlSession.insert(namespace + "insertSto", stoVO);
		return result;
	}

	@Override
	public int updateSto(StoVO stoVO) throws Exception {
		int result = sqlSession.update(namespace + "updateSto", stoVO);
		return result;
	}
	
	@Override
	public int updateStatusCd(ProgramVO programVO) throws Exception {
		int result = sqlSession.update(namespace + "updateStatusCd", programVO);
		return result;
	}

	@Override
	public ProgramVO selectProgramStatusCd(ProgramVO programVO) throws Exception {
		ProgramVO result = sqlSession.selectOne(namespace + "selectProgramStatusCd", programVO);
		return result;
	}

	@Override
	public List<DomainVO> selectTmpDomainSelectbox(DomainVO domainVO) throws Exception {
		List<DomainVO> resultList = sqlSession.selectList(namespace + "selectTmpDomainSelectbox", domainVO);
		return resultList;
	}
	
	@Override
	public List<LtoVO> selectTmpLtoSelectbox(LtoVO ltoVO) throws Exception {
		List<LtoVO> resultList = sqlSession.selectList(namespace + "selectTmpLtoSelectbox", ltoVO);
		return resultList;
	}
	
	@Override
	public List<StoVO> selectTmpStoSelectbox(StoVO stoVO) throws Exception {
		List<StoVO> resultList = sqlSession.selectList(namespace + "selectTmpStoSelectbox", stoVO);
		return resultList;
	}
}
