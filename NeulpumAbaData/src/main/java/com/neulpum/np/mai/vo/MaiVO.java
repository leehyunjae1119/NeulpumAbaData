package com.neulpum.np.mai.vo;

import java.io.Serializable;

import org.springframework.stereotype.Component;


import lombok.Data;

/**
 * 메인 대시보드 정보 VO
 */
@Component(value="maiVO")
@Data
public class MaiVO implements Serializable{

	private static final long serialVersionUID = 1L;

	private int memberSeq;
	private String boardDvCd;
	private String boardContents;
}
