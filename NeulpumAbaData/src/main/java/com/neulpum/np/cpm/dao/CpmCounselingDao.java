package com.neulpum.np.cpm.dao;

import java.util.List;

import com.neulpum.np.cpm.vo.CounselingVO;

public interface CpmCounselingDao {
	
	String namespace = "com.neulpum.np.cpm.dao.CpmCounselingDao.";
	
	public List<CounselingVO> selectCounselingList(CounselingVO counselingVO) throws Exception;
	
	public CounselingVO selectCounselingListCnt(CounselingVO counselingVO) throws Exception;
	
	public int insertCounselingData(CounselingVO counselingVO) throws Exception;
	
	public int updateCounselingData(CounselingVO counselingVO) throws Exception;
	
	public int deleteCounselingData(CounselingVO counselingVO) throws Exception;

}
