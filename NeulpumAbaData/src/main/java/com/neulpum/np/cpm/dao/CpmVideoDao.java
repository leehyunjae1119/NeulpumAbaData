package com.neulpum.np.cpm.dao;

import java.util.List;

import com.neulpum.np.cpm.vo.VideoVO;

public interface CpmVideoDao {
	
	String namespace = "com.neulpum.np.cpm.dao.CpmVideoDao.";
	
	public List<VideoVO> selectVideoList(VideoVO videoVO) throws Exception;
	
	public VideoVO selectVideoListCnt(VideoVO videoVO) throws Exception;
	
	public int insertVideoData(VideoVO videoVO) throws Exception;
	
	public int updateVideoData(VideoVO videoVO) throws Exception;
	
	public int deleteVideoData(VideoVO videoVO) throws Exception;

}
