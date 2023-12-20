package com.neulpum.np.cpm.service;

import java.util.List;

import com.neulpum.np.cpm.vo.CounselingVO;

public interface CpmCounselingService {

	// 상담일지 리스트 조회
	public List<CounselingVO> selectCounselingList(CounselingVO counselingVO) throws Exception;
	
	// 상담일지 리스트 갯수 조회
	public CounselingVO selectCounselingListCnt(CounselingVO counselingVO) throws Exception;
	
	// 상담일지 삽입
	public int insertCounselingData(CounselingVO counselingVO) throws Exception;
	
	// 상담일지 수정
	public int updateCounselingData(CounselingVO counselingVO) throws Exception;
	
	// 상담일지 삭제
	public int deleteCounselingData(CounselingVO counselingVO) throws Exception;
}
