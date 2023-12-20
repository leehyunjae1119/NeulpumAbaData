package com.neulpum.np.cpm.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.neulpum.np.common.utils.StringUtil;
import com.neulpum.np.cpm.dao.CpmMainDao;
import com.neulpum.np.cpm.service.CpmMainService;
import com.neulpum.np.cpm.vo.CounselingVO;
import com.neulpum.np.cpm.vo.DomainVO;
import com.neulpum.np.cpm.vo.LtoVO;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class CpmMainServiceImpl implements CpmMainService {

	@Inject
	CpmMainDao cpmMainDao;

	@Override
	public Map<String, Object> selectCurriculum(DomainVO domainVO) throws Exception {
		
		Map<String, Object> resultMap  = new HashMap<String, Object>();
		
		List<DomainVO> domainList = cpmMainDao.selectDomainList(domainVO);
		List<LtoVO> ltoList = cpmMainDao.selectLtoList(domainVO);
		
		resultMap.put("domainList", domainList);
		resultMap.put("ltoList", ltoList);
		
		return resultMap;
	}

	@Override
	public List<CounselingVO> selectCounseling(CounselingVO counselingVO) throws Exception {
		List<CounselingVO> resultList = cpmMainDao.selectCounseling(counselingVO);
		for(CounselingVO vo : resultList) {
			vo.setCounselingContents(StringUtil.escapeHtml(vo.getCounselingContents()));
		}
		return resultList;
	}

	@Override
	public List<DomainVO> selectStoComplateData(DomainVO domainVO) throws Exception {
		List<DomainVO> resultList = cpmMainDao.selectStoComplateData(domainVO);
		return resultList;
	}
	
	
}
