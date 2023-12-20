package com.neulpum.np.common.vo;

import java.io.Serializable;

import org.springframework.stereotype.Component;

import lombok.Data;

/**
 * 센터 정보 VO
 */
@Component(value="centerVO")
@Data
public class CenterVO implements Serializable {

	private static final long serialVersionUID = 1L;

	private int centerSeq;			//센터 번호
	private String centerName;		//센터 이름
	private int centerManager;		//센터장 번
	private String centerImage;		//센터 이미지
	
	private String memberName;		//센터장 이름
	private int memberCnt;			//선생님 수
	private int childrenCnt;		//아동 수
}
