package com.neulpum.np.grp.service;

import java.util.List;
import java.util.Map;

import com.neulpum.np.grp.vo.GrpGraphVO;

public interface GrpService {

	public List<GrpGraphVO> selectDailyReactionData(GrpGraphVO grpGraphVO) throws Exception;
	
	public List<GrpGraphVO> selectCriterionByDomainData(GrpGraphVO grpGraphVO) throws Exception;
	
	public List<GrpGraphVO> selectWeeklyCompletionData(GrpGraphVO grpGraphVO) throws Exception;
	
	public Map<String, Object>  selectGrahpSelectBoxData(GrpGraphVO grpGraphVO) throws Exception;
}
