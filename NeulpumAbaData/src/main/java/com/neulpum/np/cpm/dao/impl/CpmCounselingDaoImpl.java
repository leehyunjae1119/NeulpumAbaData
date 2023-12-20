package com.neulpum.np.cpm.dao.impl;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.neulpum.np.cpm.dao.CpmCounselingDao;
import com.neulpum.np.cpm.vo.CounselingVO;

@Repository
public class CpmCounselingDaoImpl implements CpmCounselingDao {
	
	@Autowired
	private SqlSessionTemplate sqlSession;

	@Override
	public List<CounselingVO> selectCounselingList(CounselingVO counselingVO) throws Exception {
		return sqlSession.selectList(namespace + "selectCounselingList", counselingVO);
	}

	@Override
	public CounselingVO selectCounselingListCnt(CounselingVO counselingVO) throws Exception {
		return sqlSession.selectOne(namespace + "selectCounselingListCnt", counselingVO);
	}

	@Override
	public int insertCounselingData(CounselingVO counselingVO) throws Exception {
		return sqlSession.insert(namespace + "insertCounselingData", counselingVO);
	}

	@Override
	public int updateCounselingData(CounselingVO counselingVO) throws Exception {
		return sqlSession.update(namespace + "updateCounselingData", counselingVO);
	}

	@Override
	public int deleteCounselingData(CounselingVO counselingVO) throws Exception {
		return sqlSession.delete(namespace + "deleteCounselingData", counselingVO);
	}

}
