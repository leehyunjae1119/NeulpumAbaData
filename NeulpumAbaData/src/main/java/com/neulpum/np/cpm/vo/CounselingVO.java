package com.neulpum.np.cpm.vo;

import org.springframework.stereotype.Component;

import com.neulpum.np.common.vo.PagingVO;

import lombok.Data;

/**
 * 상담일지 정보 VO
 */
@Component(value="counselingVO")
@Data
public class CounselingVO extends PagingVO{ 
	
	private static final long serialVersionUID = 1L;

	private int rownum;                     
	private int counselingSeq;                      // 상담일지 번호
	private int childrenSeq;                        // 아동 번호
	private String counselingContents;              // 상담일지 내용
	private int counselingRegMmrSeq;                // 상담일지 등록 회원 번호
	private String counselingRegDt;                 // 상담일지 등록 일시
	
	private String startDate;
	private String endDate;
	private String memberName;
}
