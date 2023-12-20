package com.neulpum.np.cpm.dao;

import java.util.List;

import com.neulpum.np.cpm.vo.ComplateVO;

public interface CpmComplateDao {

	String namespace = "com.neulpum.np.cpm.dao.CpmComplateDao.";
	
	public List<ComplateVO> selectComplateList(ComplateVO complateVO) throws Exception;
	
	public ComplateVO selectComplateListCnt(ComplateVO complateVO) throws Exception;
}
