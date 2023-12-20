package com.neulpum.np.grp.vo;

import java.io.Serializable;

import org.springframework.stereotype.Component;
import lombok.Data;

/**
 * 그래프 정보 VO
 */
@Component(value="grpGraphVO")
@Data
public class GrpGraphVO implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	private int memberSeq;
	private int childrenSeq;
	private int groupSeq;
	private int centerSeq;
	private String startDate;
	private String endDate;
	
	private String dtm;
	private int domainSeq;
	private String domainName;
	private int totCnt;
	private int cmpCnt;
	private int urgCnt;
	private int faiCnt;
	
	private String weekStart;
	private String weekEnd;
	private String weekSeq;
	private int rununit;
	private int arrCnt;
	private int criterion;
	
	private String memberName;
	private String groupName;
	private String childrenName;
	private String centerName;
	private int childrenGroupCd;
}
