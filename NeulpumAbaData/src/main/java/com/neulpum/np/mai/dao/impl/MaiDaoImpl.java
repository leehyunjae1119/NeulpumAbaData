package com.neulpum.np.mai.dao.impl;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.neulpum.np.mai.dao.MaiDao;
import com.neulpum.np.mai.vo.CalendarVO;
import com.neulpum.np.mai.vo.MaiVO;
import com.neulpum.np.mai.vo.SchedulerVO;

@Repository
public class MaiDaoImpl implements MaiDao{

	@Autowired
	private SqlSessionTemplate sqlSession;

	@Override
	public MaiVO selectMemberMemo(MaiVO maiVO) throws Exception {
		return sqlSession.selectOne(namespace + "selectMemberMemo", maiVO);
	}

	@Override
	public int insertMemberMemo(MaiVO maiVO) throws Exception {
		return sqlSession.insert(namespace + "insertMemberMemo", maiVO);
	}
	
	@Override
	public int updateMemberMemo(MaiVO maiVO) throws Exception {
		return sqlSession.update(namespace + "updateMemberMemo", maiVO);
	}

	@Override
	public List<CalendarVO> selectCalendarMonth(CalendarVO calendarVO) throws Exception {
		return sqlSession.selectList(namespace + "selectCalendarMonth", calendarVO);
	}

	@Override
	public List<CalendarVO> selectCalendarList(CalendarVO calendarVO) throws Exception {
		return sqlSession.selectList(namespace + "selectCalendarList", calendarVO);
	}

	@Override
	public int insertCalendarData(CalendarVO calendarVO) throws Exception {
		return sqlSession.insert(namespace + "insertCalendarData", calendarVO);
	}

	@Override
	public int updateCalendarData(CalendarVO calendarVO) throws Exception {
		return sqlSession.update(namespace + "updateCalendarData", calendarVO);
	}

	@Override
	public int deleteCalendarData(CalendarVO calendarVO) throws Exception {
		return sqlSession.delete(namespace + "deleteCalendarData", calendarVO);
	}

	@Override
	public List<SchedulerVO> selectSchedulerList(SchedulerVO schedulerVO) throws Exception {
		return sqlSession.selectList(namespace + "selectSchedulerList", schedulerVO);
	}

	@Override
	public int insertSchedulerData(SchedulerVO schedulerVO) throws Exception {
		return sqlSession.insert(namespace + "insertSchedulerData", schedulerVO);
	}

	@Override
	public int deleteSchedulerData(SchedulerVO schedulerVO) throws Exception {
		return sqlSession.delete(namespace + "deleteSchedulerData", schedulerVO);
	}
}
