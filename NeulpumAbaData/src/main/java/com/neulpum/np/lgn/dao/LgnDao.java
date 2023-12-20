package com.neulpum.np.lgn.dao;

import com.neulpum.np.lgn.vo.LgnVO;

public interface LgnDao {

	String namespace = "com.neulpum.np.lgn.dao.LgnDao.";
	
	public LgnVO signIn(LgnVO lgnVO) throws Exception;

	public int signUp(LgnVO lgnVO) throws Exception;
	
}
