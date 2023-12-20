package com.neulpum.np.grp.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.neulpum.np.grp.dao.GrpDao;
import com.neulpum.np.grp.service.GrpService;
import com.neulpum.np.grp.vo.GrpGraphVO;

@Service
public class GrpServiceImpl implements GrpService {

	@Inject
	GrpDao grpDao;

	@Override
	public List<GrpGraphVO> selectDailyReactionData(GrpGraphVO grpGraphVO) throws Exception {
		List<GrpGraphVO> resultList = grpDao.selectDailyReactionData(grpGraphVO);
		return resultList;
	}

	@Override
	public List<GrpGraphVO> selectCriterionByDomainData(GrpGraphVO grpGraphVO) throws Exception {
		List<GrpGraphVO> resultList = grpDao.selectCriterionByDomainData(grpGraphVO);
		return resultList;
	}

	@Override
	public List<GrpGraphVO> selectWeeklyCompletionData(GrpGraphVO grpGraphVO) throws Exception {
		List<GrpGraphVO> resultList = grpDao.selectWeeklyCompletionData(grpGraphVO);
		return resultList;
	}

	@Override
	public Map<String, Object>  selectGrahpSelectBoxData(GrpGraphVO grpGraphVO) throws Exception {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		List<GrpGraphVO> memberList = grpDao.selectGrpMemberList(grpGraphVO);
		List<GrpGraphVO> childrenList = grpDao.selectGrpChildrenList(grpGraphVO);
		List<GrpGraphVO> groupList = grpDao.selectGrpGroupList(grpGraphVO);
		List<GrpGraphVO> centerList = grpDao.selectGrpCenterList(grpGraphVO);
		
		resultMap.put("memberList", memberList);
		resultMap.put("childrenList", childrenList);
		resultMap.put("groupList", groupList);
		resultMap.put("centerList", centerList);
		
		return resultMap;
	}
	
	
}
