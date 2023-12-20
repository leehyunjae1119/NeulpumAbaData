package com.neulpum.np.cpm.vo;

import java.io.Serializable;

import org.springframework.stereotype.Component;

import lombok.Data;

/**
 * 데일리시트 VO
 */
@Component(value="dailySheetVO")
@Data
public class DailySheetVO implements Serializable{ 
	
	private static final long serialVersionUID = 1L;
	
	private int childrenSeq;
	private int stoSeq;
	private String stoName;
	private String stoStatusCd;
	private String pointDt;
	private int stoTrialCnt;
	private int stoArrStdPst;
	private int reaRatio;
	private int urgRatio;
	private int reaCnt;
	private int urgCnt;
	private int faiCnt;
	private int pointRegMmrSeq;
	private String memberName;
	private int ltoSeq;
	
	private String ltoChartDataSelect;
}
