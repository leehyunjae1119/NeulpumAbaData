package com.neulpum.np.mai.service.impl;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.neulpum.np.mai.dao.MaiDao;
import com.neulpum.np.mai.service.MaiService;
import com.neulpum.np.mai.vo.CalendarVO;
import com.neulpum.np.mai.vo.MaiVO;
import com.neulpum.np.mai.vo.SchedulerVO;

@Service
public class MainServiceImpl implements MaiService {

	@Inject
	MaiDao maiDao;

	@Override
	public MaiVO selectMemberMemo(MaiVO maiVO) throws Exception {
		MaiVO result = maiDao.selectMemberMemo(maiVO);
		
		if(result == null) {
			maiDao.insertMemberMemo(maiVO);
			result = new MaiVO();
			result.setBoardContents("");
		}
		
		return result;
	}

	@Override
	public int updateMemberMemo(MaiVO maiVO) throws Exception {
		return maiDao.updateMemberMemo(maiVO);
	}

	@Override
	public List<CalendarVO> selectCalendarMonth(CalendarVO calendarVO) throws Exception {
		List<CalendarVO> resultList = maiDao.selectCalendarMonth(calendarVO);
		return resultList;
	}

	@Override
	public List<CalendarVO> selectCalendarList(CalendarVO calendarVO) throws Exception {
		List<CalendarVO> resultList = maiDao.selectCalendarList(calendarVO);
		return resultList;
	}

	@Override
	public int insertCalendarData(CalendarVO calendarVO) throws Exception {
		return maiDao.insertCalendarData(calendarVO);
	}

	@Override
	public int updateCalendarData(CalendarVO calendarVO) throws Exception {
		return maiDao.updateCalendarData(calendarVO);
	}

	@Override
	public int deleteCalendarData(CalendarVO calendarVO) throws Exception {
		return maiDao.deleteCalendarData(calendarVO);
	}

	@Override
	public List<SchedulerVO> selectSchedulerList(SchedulerVO schedulerVO) throws Exception {
		List<SchedulerVO> resultList = maiDao.selectSchedulerList(schedulerVO);
		return resultList;
	}

	@Override
	public int saveSchedulerData(SchedulerVO schedulerVO) throws Exception {
		
		int result = 0;
		
		String[] weekCdArray = schedulerVO.getSchedulerWeekCd().split(",");
		String[] timeCdArray = schedulerVO.getSchedulerTimeCd().split(",");
		
		maiDao.deleteSchedulerData(schedulerVO);
		
		int index = 0;
		for(String weekCd : weekCdArray) {
			SchedulerVO paramVO = new SchedulerVO();
			paramVO.setChildrenSeq(schedulerVO.getChildrenSeq());
			paramVO.setSchedulerWeekCd(weekCd);
			paramVO.setSchedulerTimeCd(timeCdArray[index]);
			paramVO.setSchedulerRegMmrSeq(schedulerVO.getSchedulerRegMmrSeq());
		
			result += maiDao.insertSchedulerData(paramVO);
			index++;
		}
		
		return result;
	}
	
}
