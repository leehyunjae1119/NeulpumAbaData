package com.neulpum.np.cpm.service.impl;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.neulpum.np.cpm.dao.CpmCounselingDao;
import com.neulpum.np.cpm.service.CpmCounselingService;
import com.neulpum.np.cpm.vo.CounselingVO;

@Service
public class CpmCounselingServiceImpl implements CpmCounselingService {
	
	@Inject
	CpmCounselingDao cpmCounselingDao;

	@Override
	public List<CounselingVO> selectCounselingList(CounselingVO counselingVO) throws Exception {
		List<CounselingVO> resultList = cpmCounselingDao.selectCounselingList(counselingVO);
		return resultList;
	}
	
	@Override
	public CounselingVO selectCounselingListCnt(CounselingVO counselingVO) throws Exception {
		CounselingVO result = cpmCounselingDao.selectCounselingListCnt(counselingVO);
		return result;
	}

	@Override
	public int insertCounselingData(CounselingVO counselingVO) throws Exception {
		return cpmCounselingDao.insertCounselingData(counselingVO);
	}

	@Override
	public int updateCounselingData(CounselingVO counselingVO) throws Exception {
		return cpmCounselingDao.updateCounselingData(counselingVO);
	}

	@Override
	public int deleteCounselingData(CounselingVO counselingVO) throws Exception {
		return cpmCounselingDao.deleteCounselingData(counselingVO);
	}

}
