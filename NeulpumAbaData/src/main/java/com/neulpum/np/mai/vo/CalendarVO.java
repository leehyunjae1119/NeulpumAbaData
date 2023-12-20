package com.neulpum.np.mai.vo;

import java.io.Serializable;

import org.springframework.stereotype.Component;

import lombok.Data;

/**
 * 캘린더 정보 VO
 */
@Component(value="calendarVO")
@Data
public class CalendarVO implements Serializable{
	
	private static final long serialVersionUID = 1L;

	private int calendarSeq;
	private String calendarDt;
	private String calendarContents;
	private String calendarColorCd;
	private int calendarRegMmrSeq;
	private String calendarRegDt;
	private int centerSeq;
	
	private int calendarCnt;
}
