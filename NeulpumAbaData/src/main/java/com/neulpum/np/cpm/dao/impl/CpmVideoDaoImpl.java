package com.neulpum.np.cpm.dao.impl;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.neulpum.np.cpm.dao.CpmVideoDao;
import com.neulpum.np.cpm.vo.VideoVO;

@Repository
public class CpmVideoDaoImpl implements CpmVideoDao {
	
	@Autowired
	private SqlSessionTemplate sqlSession;
	
	@Override
	public List<VideoVO> selectVideoList(VideoVO videoVO) throws Exception {
		return sqlSession.selectList(namespace + "selectVideoList", videoVO);
	}

	@Override
	public VideoVO selectVideoListCnt(VideoVO videoVO) throws Exception {
		return sqlSession.selectOne(namespace + "selectVideoListCnt", videoVO);
	}

	@Override
	public int insertVideoData(VideoVO videoVO) throws Exception {
		return sqlSession.insert(namespace + "insertVideoData", videoVO);
	}

	@Override
	public int updateVideoData(VideoVO videoVO) throws Exception {
		return sqlSession.update(namespace + "updateVideoData", videoVO);
	}

	@Override
	public int deleteVideoData(VideoVO videoVO) throws Exception {
		return sqlSession.delete(namespace + "deleteVideoData", videoVO);
	}

}
