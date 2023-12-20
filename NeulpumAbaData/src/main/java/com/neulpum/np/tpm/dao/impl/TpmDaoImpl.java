package com.neulpum.np.tpm.dao.impl;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.neulpum.np.tpm.dao.TpmDao;
import com.neulpum.np.tpm.vo.TmpDomainVO;
import com.neulpum.np.tpm.vo.TmpLtoVO;
import com.neulpum.np.tpm.vo.TmpStoVO;
import com.neulpum.np.tpm.vo.TmpVO;

@Repository
public class TpmDaoImpl implements TpmDao {

	@Autowired
	private SqlSessionTemplate sqlSession;

	@Override
	public List<TmpDomainVO> selectTmpDomain(TmpDomainVO tmpDomainVO) throws Exception {
		List<TmpDomainVO> resultList = sqlSession.selectList(namespace + "selectTmpDomain", tmpDomainVO);
		return resultList;
	}
	
	@Override
	public List<TmpLtoVO> selectTmpLto(TmpLtoVO tmpLtoVO) throws Exception {
		List<TmpLtoVO> resultList = sqlSession.selectList(namespace + "selectTmpLto", tmpLtoVO);
		return resultList;
	}
	
	@Override
	public List<TmpStoVO> selectTmpSto(TmpStoVO tmpStoVO) throws Exception {
		List<TmpStoVO> resultList = sqlSession.selectList(namespace + "selectTmpSto", tmpStoVO);
		return resultList;
	}

	@Override
	public int updateSortOrder(TmpVO tmpVO) throws Exception {
		int step1 = sqlSession.update(namespace + "updateSortOrder_step1", tmpVO);
		int step2 = sqlSession.update(namespace + "updateSortOrder_step2", tmpVO);
		return step1 + step2;
	}
	
	@Override
	public int deleteProgram(TmpVO tmpVO) throws Exception {
		int result = sqlSession.delete(namespace + "deleteProgram", tmpVO);
		return result;
	}
	
	@Override
	public int reorderSortOrder(TmpVO tmpVO) throws Exception {
		int result = sqlSession.update(namespace + "updateSortOrder_step1", tmpVO);
		return result;
	}

	@Override
	public int insertDomain(TmpDomainVO tmpDomainVO) throws Exception {
		int result = sqlSession.insert(namespace + "insertDomain", tmpDomainVO);
		return result;
	}

	@Override
	public int updateDomain(TmpDomainVO tmpDomainVO) throws Exception {
		int result = sqlSession.update(namespace + "updateDomain", tmpDomainVO);
		return result;
	}

	@Override
	public int insertLto(TmpLtoVO tmpLtoVO) throws Exception {
		int result = sqlSession.insert(namespace + "insertLto", tmpLtoVO);
		return result;
	}

	@Override
	public int updateLto(TmpLtoVO tmpLtoVO) throws Exception {
		int result = sqlSession.update(namespace + "updateLto", tmpLtoVO);
		return result;
	}

	@Override
	public int insertSto(TmpStoVO tmpStoVO) throws Exception {
		int result = sqlSession.insert(namespace + "insertSto", tmpStoVO);
		return result;
	}

	@Override
	public int updateSto(TmpStoVO tmpStoVO) throws Exception {
		int result = sqlSession.update(namespace + "updateSto", tmpStoVO);
		return result;
	}
}
