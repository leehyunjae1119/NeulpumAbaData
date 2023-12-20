package com.neulpum.np.mng.vo;

import java.io.Serializable;

import org.springframework.stereotype.Component;

import lombok.Data;

/**
 * 아동 그룹(반) 정보 VO
 */
@Component(value="chdGroupVO")
@Data
public class ChdGroupVO implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	private int groupSeq;			// 그룹 번호
	private String groupName;		// 그룹 이름
	private int groupPosiotionCd;	// 그룹 소속 코드

}
