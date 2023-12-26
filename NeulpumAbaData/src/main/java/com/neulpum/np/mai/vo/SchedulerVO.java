package com.neulpum.np.mai.vo;

import java.io.Serializable;

import org.springframework.stereotype.Component;

import lombok.Data;

/**
 * 스케줄러 정보 VO
 */
@Component(value="schedulerVO")
@Data
public class SchedulerVO implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private int schedulerSeq;
	private int childrenSeq;
	private String schedulerWeekCd;
	private String schedulerTimeCd;
	private int schedulerRegMmrSeq;
	private String schedulerRegDt;
	private String schedulerMemo;
	
	private int centerSeq;
	private String childrenName;
	private String childrenBookImg;
}
