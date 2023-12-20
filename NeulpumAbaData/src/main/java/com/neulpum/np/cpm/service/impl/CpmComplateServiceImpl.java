package com.neulpum.np.cpm.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.neulpum.np.cpm.dao.CpmComplateDao;
import com.neulpum.np.cpm.dao.CpmMainDao;
import com.neulpum.np.cpm.service.CpmComplateService;
import com.neulpum.np.cpm.vo.ComplateVO;
import com.neulpum.np.cpm.vo.DomainVO;

@Service
public class CpmComplateServiceImpl implements CpmComplateService {
	
	@Inject
	CpmComplateDao cpmComplateDao;
	
	@Inject
	CpmMainDao cpmMainDao;
	
	@Override
	public List<ComplateVO> selectDomainList(ComplateVO complateVO) throws Exception {
		
		List<ComplateVO> returnVO = new ArrayList<ComplateVO>();
		DomainVO domainVO = new DomainVO();
		domainVO.setChildrenSeq(complateVO.getChildrenSeq());
		
		List<DomainVO> resultList = cpmMainDao.selectDomainList(domainVO);
		
		for(DomainVO vo : resultList) {
			ComplateVO tmpVO = new ComplateVO();
			tmpVO.setDomainSeq(vo.getDomainSeq());
			tmpVO.setDomainName(vo.getDomainName());
			
			returnVO.add(tmpVO);
		}
		
		return returnVO;
	}

	@Override
	public List<ComplateVO> selectComplateList(ComplateVO complateVO) throws Exception {
		List<ComplateVO> resultList = cpmComplateDao.selectComplateList(complateVO);
		return resultList;
	}

	@Override
	public ComplateVO selectComplateListCnt(ComplateVO complateVO) throws Exception {
		ComplateVO result = cpmComplateDao.selectComplateListCnt(complateVO);
		return result;
	}

}
