package com.neulpum.np.tpm.vo;

import java.io.Serializable;

import org.springframework.stereotype.Component;


import lombok.Data;

/**
 * 템플릿 영역 정보 VO
 */
@Component(value="tmpDomainVO")
@Data
public class TmpDomainVO implements Serializable {
	
	private static final long serialVersionUID = 1L;

	private int domainSeq;				// 영역 번호     
	private int domainSortOrder;		// 영역 정렬 순서
	private String domainName;				// 영역 이름     
	private String domainContents;			// 영역 내용     
	private int centerSeq;
	
	private int newSortOrder;
	private int oldSortOrder;
}
