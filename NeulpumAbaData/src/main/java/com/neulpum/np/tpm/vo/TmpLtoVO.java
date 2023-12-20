package com.neulpum.np.tpm.vo;

import java.io.Serializable;

import org.springframework.stereotype.Component;

import lombok.Data;

/**
 * 템플릿 장기목표 정보 VO
 */
@Component(value="tmpLtoVO")
@Data
public class TmpLtoVO implements Serializable{

	private static final long serialVersionUID = 1L;

	private int ltoSeq;				// 장기목표 번호
	private int domainSeq;				// 영역 번호
	private int ltoSortOrder;			// 장기목표 정렬 순서
	private String ltoName;			// 장기목표 이름
	private String ltoContents;		// 장기목표 내용

	private int newSortOrder;
	private int oldSortOrder;
}
