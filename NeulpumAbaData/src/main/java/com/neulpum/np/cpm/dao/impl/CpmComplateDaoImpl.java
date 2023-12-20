package com.neulpum.np.cpm.dao.impl;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.neulpum.np.cpm.dao.CpmComplateDao;
import com.neulpum.np.cpm.vo.ComplateVO;

@Repository
public class CpmComplateDaoImpl implements CpmComplateDao {
	
	@Autowired
	private SqlSessionTemplate sqlSession;

	@Override
	public List<ComplateVO> selectComplateList(ComplateVO complateVO) throws Exception {
		return sqlSession.selectList(namespace + "selectComplateList", complateVO);
	}

	@Override
	public ComplateVO selectComplateListCnt(ComplateVO complateVO) throws Exception {
		return sqlSession.selectOne(namespace + "selectComplateListCnt", complateVO);
	}

}
