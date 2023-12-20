package com.neulpum.np.cpm.service.impl;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.neulpum.np.cpm.dao.CpmVideoDao;
import com.neulpum.np.cpm.service.CpmVideoService;
import com.neulpum.np.cpm.vo.VideoVO;

@Service
public class CpmVideoServiceImpl implements CpmVideoService {

	@Inject
	CpmVideoDao cpmVideoDao;
	
	@Override
	public List<VideoVO> selectVideoList(VideoVO videoVO) throws Exception {
		List<VideoVO> resultList = cpmVideoDao.selectVideoList(videoVO);
		return resultList;
	}
	
	@Override
	public VideoVO selectVideoListCnt(VideoVO videoVO) throws Exception {
		VideoVO result = cpmVideoDao.selectVideoListCnt(videoVO);
		return result;
	}

	@Override
	public int insertVideoData(VideoVO videoVO) throws Exception {
		return cpmVideoDao.insertVideoData(videoVO);
	}

	@Override
	public int updateVideoData(VideoVO videoVO) throws Exception {
		return cpmVideoDao.updateVideoData(videoVO);
	}

	@Override
	public int deleteVideoData(VideoVO videoVO) throws Exception {
		return cpmVideoDao.deleteVideoData(videoVO);
	}
}
