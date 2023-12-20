package com.neulpum.np.mai.dao;

import java.util.List;

import com.neulpum.np.mai.vo.CalendarVO;
import com.neulpum.np.mai.vo.MaiVO;
import com.neulpum.np.mai.vo.SchedulerVO;

public interface MaiDao {
	
	String namespace = "com.neulpum.np.mai.dao.MaiDao.";

	public MaiVO selectMemberMemo(MaiVO maiVO) throws Exception;
	
	public int insertMemberMemo(MaiVO maiVO) throws Exception;
	
	public int updateMemberMemo(MaiVO maiVO) throws Exception;
	
	public List<CalendarVO> selectCalendarMonth(CalendarVO calendarVO) throws Exception;
	
	public List<CalendarVO> selectCalendarList(CalendarVO calendarVO) throws Exception;
	
	public int insertCalendarData(CalendarVO calendarVO) throws Exception;

	public int updateCalendarData(CalendarVO calendarVO) throws Exception;

	public int deleteCalendarData(CalendarVO calendarVO) throws Exception;
	
	public List<SchedulerVO> selectSchedulerList(SchedulerVO schedulerVO) throws Exception;
	
	public int insertSchedulerData(SchedulerVO schedulerVO) throws Exception;

	public int deleteSchedulerData(SchedulerVO schedulerVO) throws Exception;
}
