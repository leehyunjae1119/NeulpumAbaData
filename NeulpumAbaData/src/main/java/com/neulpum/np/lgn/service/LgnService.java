package com.neulpum.np.lgn.service;

import com.neulpum.np.lgn.vo.LgnVO;

public interface LgnService {
	
	// 로그인
	public LgnVO signIn(LgnVO lgnVO) throws Exception;

	// 아이디 중복 체크
	public boolean isDuplicateId(LgnVO lgnVO) throws Exception;

	// 회원가입
	public int signUp(LgnVO lgnVO) throws Exception;
	
}
