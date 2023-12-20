package com.neulpum.np.tpm.service;

import java.util.List;

import com.neulpum.np.tpm.vo.TmpDomainVO;
import com.neulpum.np.tpm.vo.TmpLtoVO;
import com.neulpum.np.tpm.vo.TmpStoVO;
import com.neulpum.np.tpm.vo.TmpVO;

public interface TpmService {

	public List<TmpDomainVO> selectTmpDomain(TmpDomainVO tmpDomainVO) throws Exception;
	
	public List<TmpLtoVO> selectTmpLto(TmpLtoVO tmpLtoVO) throws Exception;
	
	public List<TmpStoVO> selectTmpSto(TmpStoVO tmpStoVO) throws Exception;
	
	public int updateSortOrder(TmpVO tmpVO) throws Exception;
	
	public int deleteProgram(TmpVO tmpVO) throws Exception;
	
	public int reorderProgram(TmpVO tmpVO) throws Exception;
	
	public int insertDomain(TmpDomainVO tmpDomainVO) throws Exception;
	
	public int updateDomain(TmpDomainVO tmpDomainVO) throws Exception;
	
	public int insertLto(TmpLtoVO tmpLtoVO) throws Exception;
	
	public int updateLto(TmpLtoVO tmpLtoVO) throws Exception;
	
	public int insertSto(TmpStoVO tmpStoVO) throws Exception;
	
	public int updateSto(TmpStoVO tmpStoVO) throws Exception;
}
