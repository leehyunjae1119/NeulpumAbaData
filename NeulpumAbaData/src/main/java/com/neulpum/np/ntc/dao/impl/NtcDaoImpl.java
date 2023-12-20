package com.neulpum.np.ntc.dao.impl;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.neulpum.np.ntc.vo.NoticeVO;
import com.neulpum.np.ntc.dao.NtcDao;

@Repository
public class NtcDaoImpl implements NtcDao {

	@Autowired
	private SqlSessionTemplate sqlSession;
	
	@Override
	public NoticeVO selectNoticeDetail(NoticeVO noticeVO) throws Exception {
		return sqlSession.selectOne(namespace + "selectNoticeDetail", noticeVO);
	}
	
	@Override
	public List<NoticeVO> selectNoticeList(NoticeVO noticeVO) throws Exception {
		return sqlSession.selectList(namespace + "selectNoticeList", noticeVO);
	}

	@Override
	public NoticeVO selectNoticeListCnt(NoticeVO noticeVO) throws Exception {
		return sqlSession.selectOne(namespace + "selectNoticeListCnt", noticeVO);
	}

	@Override
	public int insertNoticeData(NoticeVO noticeVO) throws Exception {
		int result = sqlSession.insert(namespace + "insertNoticeData", noticeVO);
		int boardSeq = 0;
		if(result > 0) {
			boardSeq = noticeVO.getBoardSeq();
			
		}
		return boardSeq;
	}

	@Override
	public int updateNoticeData(NoticeVO noticeVO) throws Exception {
		return sqlSession.update(namespace + "updateNoticeData", noticeVO);
	}

	@Override
	public int deleteNoticeData(NoticeVO noticeVO) throws Exception {
		return sqlSession.delete(namespace + "deleteNoticeData", noticeVO);
	}
}
