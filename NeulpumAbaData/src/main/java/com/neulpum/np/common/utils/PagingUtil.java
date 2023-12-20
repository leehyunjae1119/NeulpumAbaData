package com.neulpum.np.common.utils;

import com.neulpum.np.common.vo.PagingVO;

public class PagingUtil {
	
	private static final int MAX_CNT = 10;
	
	// 페이징 정보 세팅
	public static PagingVO pagination(int pageNum, int pageCnt) {
		
		int startPage = 0;
		int endPage = 0;
		int prevPage = 0;
		int nextPage = 0;
		
		startPage = (pageNum / MAX_CNT) * MAX_CNT + 1;
		
		endPage = ( ( (pageNum / MAX_CNT) + 1 ) *  MAX_CNT ) > pageCnt ? pageCnt : ( (pageNum / MAX_CNT) + 1 ) *  MAX_CNT;
		
		prevPage = (startPage - 1) < 0 ? 0 : startPage - 1;
		
		nextPage = (endPage + 1) > pageCnt ? 0 : endPage + 1;

		PagingVO PagingVO = new PagingVO();
		
		PagingVO.setPageNum(pageNum);
		PagingVO.setPageCnt(pageCnt);
		PagingVO.setStartPage(startPage);
		PagingVO.setEndPage(endPage);
		PagingVO.setPrevPage(prevPage);
		PagingVO.setNextPage(nextPage);
		
		return PagingVO;
	}
	

}
