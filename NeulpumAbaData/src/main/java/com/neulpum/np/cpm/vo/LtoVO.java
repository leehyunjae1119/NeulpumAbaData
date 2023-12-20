package com.neulpum.np.cpm.vo;

import java.io.Serializable;

import org.springframework.stereotype.Component;

import lombok.Data;

/**
 * 장기목표 정보 VO
 */
@Component(value="ltoVO")
@Data
public class LtoVO implements Serializable{

	private static final long serialVersionUID = 1L;

	private int ltoSeq;					// 장기목표 번호
	private int domainSeq;				// 영역 번호
	private int ltoSortOrder;			// 장기목표 정렬 순서
	private String ltoName;				// 장기목표 이름
	private String ltoContents;			// 장기목표 내용
	private String ltoStatusCd;			// 장기목표 상태 코드
	private String ltoRegDt;			// 장기목표 등록 일시
	private String ltoStatusChDt;		// 장기목표 상태 변경 일시
	private int ltoTmpSeq;				// 장기목표 템플릿 번호
	
	private String ltoTmpSeqList;
	private int domainTmpSeq;
}
