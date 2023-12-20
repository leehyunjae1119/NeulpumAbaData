package com.neulpum.np.cpm.vo;

import java.io.Serializable;
import java.util.List;

import org.springframework.stereotype.Component;

import lombok.Data;

/**
 * 리포트 정보 VO
 */
@Component(value="reportVO")
@Data
public class ReportVO implements Serializable{
	
	private static final long serialVersionUID = 1L;

	private int domainSeq;
	private String domainName;
	private int ltoSeq;
	private String ltoName;
	private int stoSeq;
	private String stoName;
	private String stoStatusCd;
	private String stoStatusChDt;
	
	private int stoIngCnt;
	private int stoCmpCnt;
	
	private int childrenSeq;
	private String reportStartDt;
	private String reportEndDt;
	private int dateCnt;
	
	private List<String> dateList;
}
