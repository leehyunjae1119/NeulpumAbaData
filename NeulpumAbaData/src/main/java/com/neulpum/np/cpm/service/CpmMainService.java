package com.neulpum.np.cpm.service;

import java.util.List;
import java.util.Map;

import com.neulpum.np.cpm.vo.CounselingVO;
import com.neulpum.np.cpm.vo.DomainVO;

public interface CpmMainService {

	public Map<String, Object> selectCurriculum(DomainVO domainVO) throws Exception;
	
	public List<CounselingVO> selectCounseling(CounselingVO counselingVO) throws Exception;
	
	public List<DomainVO> selectStoComplateData(DomainVO domainVO) throws Exception;
}
