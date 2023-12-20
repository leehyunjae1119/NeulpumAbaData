package com.neulpum.np.cpm.service;

import java.util.List;

import com.neulpum.np.cpm.vo.VideoVO;

public interface CpmVideoService {

	public List<VideoVO> selectVideoList(VideoVO videoVO) throws Exception;
	
	public VideoVO selectVideoListCnt(VideoVO videoVO) throws Exception;
	
	public int insertVideoData(VideoVO videoVO) throws Exception;
	
	public int updateVideoData(VideoVO videoVO) throws Exception;
	
	public int deleteVideoData(VideoVO videoVO) throws Exception;
}
