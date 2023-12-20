package com.neulpum.np.ntc.dao;

import java.util.List;

import com.neulpum.np.ntc.vo.NoticeVO;

public interface NtcDao {
	
	String namespace = "com.neulpum.np.ntc.dao.NtcDao.";
	
	public NoticeVO selectNoticeDetail(NoticeVO noticeVO) throws Exception;
	
	public List<NoticeVO> selectNoticeList(NoticeVO noticeVO) throws Exception;
	
	public NoticeVO selectNoticeListCnt(NoticeVO noticeVO) throws Exception;
	
	public int insertNoticeData(NoticeVO noticeVO) throws Exception;
	
	public int updateNoticeData(NoticeVO noticeVO) throws Exception;
	
	public int deleteNoticeData(NoticeVO noticeVO) throws Exception;
}
