package com.neulpum.np.cpm.dao;

import java.util.List;

import com.neulpum.np.cpm.vo.DomainVO;
import com.neulpum.np.cpm.vo.LtoVO;
import com.neulpum.np.cpm.vo.StoVO;
import com.neulpum.np.cpm.vo.ProgramVO;

public interface CpmProgramDao {
	
	String namespace = "com.neulpum.np.cpm.dao.cpmProgramDao.";

	public List<DomainVO> selectDomain(DomainVO domainVO) throws Exception;
	
	public List<LtoVO> selectLto(LtoVO ltoVO) throws Exception;
	
	public List<StoVO> selectSto(StoVO stoVO) throws Exception;
	
	public int updateSortOrder(ProgramVO programVO) throws Exception;
	
	public int deleteProgram(ProgramVO programVO) throws Exception;
	
	public int reorderSortOrder(ProgramVO programVO) throws Exception;
	
	public int insertDomain(DomainVO domainVO) throws Exception;
	
	public int updateDomain(DomainVO domainVO) throws Exception;
	
	public int insertLto(LtoVO ltoVO) throws Exception;
	
	public int updateLto(LtoVO ltoVO) throws Exception;
	
	public int insertSto(StoVO stoVO) throws Exception;
	
	public int updateSto(StoVO stoVO) throws Exception;
	
	public int updateStatusCd(ProgramVO programVO) throws Exception;
	
	public ProgramVO selectProgramStatusCd(ProgramVO programVO) throws Exception;
	
	public List<DomainVO> selectTmpDomainSelectbox(DomainVO domainVO) throws Exception;
	
	public List<LtoVO> selectTmpLtoSelectbox(LtoVO ltoVO) throws Exception;
	
	public List<StoVO> selectTmpStoSelectbox(StoVO stoVO) throws Exception;
}
