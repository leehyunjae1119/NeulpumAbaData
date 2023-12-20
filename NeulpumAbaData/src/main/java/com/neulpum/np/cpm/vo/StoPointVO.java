package com.neulpum.np.cpm.vo;

import java.io.Serializable;

import org.springframework.stereotype.Component;

import lombok.Data;

/**
 * 단기목표 포인트 정보 VO
 */
@Component(value="stoPointVO")
@Data
public class StoPointVO implements Serializable{

	private static final long serialVersionUID = 1L;

	private int pointSeq;                     // 포인트 번호
	private int stoSeq;                       // 단기목표 번호
	private String pointRpnCd;                // 포인트 반응 코드
	private int pointRegMmrSeq;               // 포인트 등록 회원 번호
	private String pointRegDt;                // 포인트 등록 일시
	private int pointRound;
}
