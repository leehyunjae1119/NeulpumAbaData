package com.neulpum.np.ntc.service.impl;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.neulpum.np.ntc.dao.NtcDao;
import com.neulpum.np.ntc.vo.NoticeVO;
import com.neulpum.np.ntc.service.NtcService;

@Service
public class NtcServiceImpl implements NtcService {

	@Inject
	NtcDao ntcDao;
	
	@Override
	public NoticeVO selectNoticeDetail(NoticeVO noticeVO) throws Exception {
		NoticeVO result = ntcDao.selectNoticeDetail(noticeVO);
		return result;
	}
	
	@Override
	public List<NoticeVO> selectNoticeList(NoticeVO noticeVO) throws Exception {
		List<NoticeVO> resultList = ntcDao.selectNoticeList(noticeVO);
		return resultList;
	}
	
	@Override
	public NoticeVO selectNoticeListCnt(NoticeVO noticeVO) throws Exception {
		NoticeVO result = ntcDao.selectNoticeListCnt(noticeVO);
		return result;
	}

	@Override
	public int insertNoticeData(NoticeVO noticeVO) throws Exception {
		return ntcDao.insertNoticeData(noticeVO);
	}

	@Override
	public int updateNoticeData(NoticeVO noticeVO) throws Exception {
		return ntcDao.updateNoticeData(noticeVO);
	}

	@Override
	public int deleteNoticeData(NoticeVO noticeVO) throws Exception {
		return ntcDao.deleteNoticeData(noticeVO);
	}
}
