package com.neulpum.np.cpm.service;

import java.util.List;

import com.neulpum.np.cpm.vo.ComplateVO;

public interface CpmComplateService {
	
	// 영역 리스트 조회
	public List<ComplateVO> selectDomainList(ComplateVO complateVO) throws Exception;
	
	// 완료목록 리스트 조회
	public List<ComplateVO> selectComplateList(ComplateVO complateVO) throws Exception;
	
	// 완료목록 갯수 조
	public ComplateVO selectComplateListCnt(ComplateVO complateVO) throws Exception;
}
