package com.neulpum.np.ntc.vo;

import org.springframework.stereotype.Component;

import com.neulpum.np.common.vo.PagingVO;

import lombok.Data;

/**
 * 공지사항 정보 VO
 */
@Component(value="noticeVO")
@Data
public class NoticeVO extends PagingVO{
	
	private static final long serialVersionUID = 1L;

	private int rownum;
	private int boardSeq;
	private String boardDvCd;
	private String boardTitle;
	private String boardContents;
	private int boardRegMmrSeq;
	private String boardRegDt;
	private String boardRegMmrName;
	private int centerSeq;
	
	private String searchField;
}
