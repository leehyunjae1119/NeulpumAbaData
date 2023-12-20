package com.neulpum.np.cpm.vo;

import java.io.Serializable;

import org.springframework.stereotype.Component;

import lombok.Data;

/**
 * 단기목표 정보 VO
 */
@Component(value="stoVO")
@Data
public class StoVO implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private int stoSeq;                         // 단기목표 번호
	private int ltoSeq;                         // 장기목표 번호
    private int stoSortOrder;                   // 장기목표 정렬 순서
    private String stoName;                     // 단기목표 이름
    private String stoContents;                 // 단기목표 내용
    private int stoTrialCnt;                    // 단기목표 시도 수
    private int stoArrStdPst;                   // 단기목표 준거도달 기준
    private String stoUrgContents;              // 단기목표 촉구 내용
    private String stoRnfcContents;             // 단기목표 강화 내용
    private String stoMemoContents;             // 단기목표 메모 내용
    private String stoStatusCd;                 // 단기목표 상태 코드
    private String stoRegDt;                    // 단기목표 등록 일시
    private String stoStatusChDt;               // 단기목표 상태 변경 일시
    private int stoTmpSeq;                      // 단기목표 템플릿 번호
    private int stoRound;

    private String domainName;
    private String ltoName;
    private String stoTmpSeqList;
}
