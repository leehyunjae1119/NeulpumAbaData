package com.neulpum.np.tpm.vo;

import java.io.Serializable;

import org.springframework.stereotype.Component;

import lombok.Data;

/**
 * 템플릿 단기목표 정보 VO
 */
@Component(value="tmpStoVO")
@Data
public class TmpStoVO implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private int stoSeq;					// 단기목표 번호
	private int ltoSeq;					// 장기목표 번호
	private int stoSortOrder;				// 장기목표 정렬 순서
	private String stoName;				// 단기목표 이름
	private String stoContents;			// 단기목표 내용
	private int stoTrialCnt;				// 단기목표 시도 수
	private int stoArrStdPst;			// 단기목표 준거도달 기준
	private String stoUrgContents;		// 단기목표 촉구 내용
	private String stoRnfcContents;		// 단기목표 강화 내용
	private String stoMemoContents;		// 단기목표 메모 내용

	private int newSortOrder;
	private int oldSortOrder;

}
