package com.neulpum.np.mai.service;

import java.util.List;

import com.neulpum.np.mai.vo.CalendarVO;
import com.neulpum.np.mai.vo.MaiVO;
import com.neulpum.np.mai.vo.SchedulerVO;

public interface MaiService {

	public MaiVO selectMemberMemo(MaiVO maiVO) throws Exception;
	
	public int updateMemberMemo(MaiVO maiVO) throws Exception;
	
	public List<CalendarVO> selectCalendarMonth(CalendarVO calendarVO) throws Exception;
	
	public List<CalendarVO> selectCalendarList(CalendarVO calendarVO) throws Exception;
	
	public int insertCalendarData(CalendarVO calendarVO) throws Exception;

	public int updateCalendarData(CalendarVO calendarVO) throws Exception;

	public int deleteCalendarData(CalendarVO calendarVO) throws Exception;
	
	public List<SchedulerVO> selectSchedulerList(SchedulerVO schedulerVO) throws Exception;

	public int saveSchedulerData(SchedulerVO schedulerVO) throws Exception;
}
