package com.neulpum.np.cpm.vo;

import java.io.Serializable;

import org.springframework.stereotype.Component;

import lombok.Data;

/**
 * 영역 정보 VO
 */
@Component(value="domainVO")
@Data
public class DomainVO implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private int domainSeq;				// 영역 번호
	private int childrenSeq;			// 	아동 번호
	private int domainSortOrder;		// 	영역 정렬 순서
	private String domainName;			// 	영역 이름
	private String domainContents;		// 	영역 내용
	private String domainStatusCd;		// 	영역 상태 코드
	private String domainRegDt;			// 	영역 등록 일시
	private String domainStatusChDt;	// 	영역 상태 변경 일시
	private int domainTmpSeq;			// 	영역 템플릿 번호
	private int centerSeq;
	
	private int stoComplateCnt;
	private String domainTmpSeqList;
}
