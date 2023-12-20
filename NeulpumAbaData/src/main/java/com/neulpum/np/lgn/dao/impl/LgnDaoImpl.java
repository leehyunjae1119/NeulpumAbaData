package com.neulpum.np.lgn.dao.impl;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.neulpum.np.lgn.dao.LgnDao;
import com.neulpum.np.lgn.vo.LgnVO;

@Repository
public class LgnDaoImpl implements LgnDao {

	@Autowired
	private SqlSessionTemplate sqlSession;

	@Override
	public LgnVO signIn(LgnVO lgnVO) throws Exception {

		LgnVO result = sqlSession.selectOne(namespace + "signIn", lgnVO);
		
		return result;
	}

	@Override
	public int signUp(LgnVO lgnVO) throws Exception {
		
		int res = sqlSession.insert(namespace + "signUp", lgnVO);
		
		return res;
	}
}
