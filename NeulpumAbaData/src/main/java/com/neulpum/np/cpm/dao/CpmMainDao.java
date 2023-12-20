package com.neulpum.np.cpm.dao;

import java.util.List;

import com.neulpum.np.cpm.vo.CounselingVO;
import com.neulpum.np.cpm.vo.DomainVO;
import com.neulpum.np.cpm.vo.LtoVO;

public interface CpmMainDao {

	String namespace = "com.neulpum.np.cpm.dao.CpmMainDao.";
	
	public List<DomainVO> selectDomainList(DomainVO domainVO) throws Exception;
	
	public List<LtoVO> selectLtoList(DomainVO domainVO) throws Exception;
	
	public List<CounselingVO> selectCounseling(CounselingVO counselingVO) throws Exception;
	
	public List<DomainVO> selectStoComplateData(DomainVO domainVO) throws Exception;
}
