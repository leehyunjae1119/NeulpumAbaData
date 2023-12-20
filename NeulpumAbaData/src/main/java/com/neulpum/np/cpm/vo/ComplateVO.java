package com.neulpum.np.cpm.vo;

import org.springframework.stereotype.Component;

import com.neulpum.np.common.vo.PagingVO;

import lombok.Data;

/**
 * 완료목록 정보 VO
 */
@Component(value="complateVO")
@Data
public class ComplateVO extends PagingVO{

	private static final long serialVersionUID = 1L;

	private int rownum;
	private String domainName;
	private String ltoName;
	private String stoName;
	private String stoStatusCd;
	private String stoStatusChDt;
	
	private int domainSeq;
	private String startDate;
	private String endDate;
	private int childrenSeq;
	
}
