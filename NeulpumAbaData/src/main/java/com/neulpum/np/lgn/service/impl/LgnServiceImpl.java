package com.neulpum.np.lgn.service.impl;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.neulpum.np.lgn.dao.LgnDao;
import com.neulpum.np.lgn.service.LgnService;
import com.neulpum.np.lgn.vo.LgnVO;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class LgnServiceImpl implements LgnService {

	@Inject
	LgnDao lgnDao;

	@Override
	public LgnVO signIn(LgnVO lgnVO) throws Exception {
		LgnVO result = lgnDao.signIn(lgnVO);
		return result;
	}

	@Override
	public boolean isDuplicateId(LgnVO lgnVO) throws Exception {
		LgnVO result = lgnDao.signIn(lgnVO);
		if(result == null) {
			return true;
		}
		return false;
	}

	@Override
	public int signUp(LgnVO lgnVO) throws Exception {
		int result = lgnDao.signUp(lgnVO);
		return result;
	}
	
}
