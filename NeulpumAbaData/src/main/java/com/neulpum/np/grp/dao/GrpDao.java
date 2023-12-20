package com.neulpum.np.grp.dao;

import java.util.List;

import com.neulpum.np.grp.vo.GrpGraphVO;

public interface GrpDao {
	
	String namespace = "com.neulpum.np.grp.dao.GrpDao.";
	
	public List<GrpGraphVO> selectDailyReactionData(GrpGraphVO grpGraphVO) throws Exception;
	
	public List<GrpGraphVO> selectCriterionByDomainData(GrpGraphVO grpGraphVO) throws Exception;
	
	public List<GrpGraphVO> selectWeeklyCompletionData(GrpGraphVO grpGraphVO) throws Exception;
	
	public List<GrpGraphVO> selectGrpMemberList(GrpGraphVO grpGraphVO) throws Exception;
	
	public List<GrpGraphVO> selectGrpChildrenList(GrpGraphVO grpGraphVO) throws Exception;
	
	public List<GrpGraphVO> selectGrpGroupList(GrpGraphVO grpGraphVO) throws Exception;
	
	public List<GrpGraphVO> selectGrpCenterList(GrpGraphVO grpGraphVO) throws Exception;

}
