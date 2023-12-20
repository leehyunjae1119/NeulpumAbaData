package com.neulpum.np.grp.dao.impl;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.neulpum.np.grp.dao.GrpDao;
import com.neulpum.np.grp.vo.GrpGraphVO;

@Repository
public class GrpDaoImpl implements GrpDao {

	@Autowired
	private SqlSessionTemplate sqlSession;
	
	@Override
	public List<GrpGraphVO> selectDailyReactionData(GrpGraphVO grpGraphVO) throws Exception {
		return sqlSession.selectList(namespace + "selectDailyReactionData", grpGraphVO);
	}

	@Override
	public List<GrpGraphVO> selectCriterionByDomainData(GrpGraphVO grpGraphVO) throws Exception {
		return sqlSession.selectList(namespace + "selectCriterionByDomainData", grpGraphVO);
	}

	@Override
	public List<GrpGraphVO> selectWeeklyCompletionData(GrpGraphVO grpGraphVO) throws Exception {
		return sqlSession.selectList(namespace + "selectWeeklyCompletionData", grpGraphVO);
	}

	@Override
	public List<GrpGraphVO> selectGrpMemberList(GrpGraphVO grpGraphVO) throws Exception {
		return sqlSession.selectList(namespace + "selectGrpMemberList", grpGraphVO);
	}

	@Override
	public List<GrpGraphVO> selectGrpChildrenList(GrpGraphVO grpGraphVO) throws Exception {
		return sqlSession.selectList(namespace + "selectGrpChildrenList", grpGraphVO);
	}

	@Override
	public List<GrpGraphVO> selectGrpGroupList(GrpGraphVO grpGraphVO) throws Exception {
		return sqlSession.selectList(namespace + "selectGrpGroupList", grpGraphVO);
	}

	@Override
	public List<GrpGraphVO> selectGrpCenterList(GrpGraphVO grpGraphVO) throws Exception {
		return sqlSession.selectList(namespace + "selectGrpCenterList", grpGraphVO);
	}

}
