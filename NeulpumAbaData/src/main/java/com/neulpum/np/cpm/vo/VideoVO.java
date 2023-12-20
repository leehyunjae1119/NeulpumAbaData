package com.neulpum.np.cpm.vo;

import org.springframework.stereotype.Component;

import com.neulpum.np.common.vo.PagingVO;

import lombok.Data;

/**
 * 영상 정보 VO
 */
@Component(value="videoVO")
@Data
public class VideoVO extends PagingVO{

	private static final long serialVersionUID = 1L;

	private int videoSeq;
	private int childrenSeq;
	private String videoContents;
	private String videoUrl;
	private String videoRegDt;
}
