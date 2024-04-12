package com.neulpum.np.common.dao.impl;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.neulpum.np.common.dao.CommonDao;
import com.neulpum.np.common.vo.CenterVO;
import com.neulpum.np.lgn.vo.LgnVO;
import com.neulpum.np.mng.vo.ChdGroupVO;
import com.neulpum.np.mng.vo.ChildrenVO;
import com.neulpum.np.mng.vo.MemberVO;

@Repository
public class CommonDaoImpl implements CommonDao {

	@Autowired
	private SqlSessionTemplate sqlSession;
	
	@Override
	public List<LgnVO> selectCenterLeader() throws Exception {
		List<LgnVO> resultList = sqlSession.selectList(namespace + "selectCenterLeader");
		return resultList;
	}

	@Override
	public int insertCenter(CenterVO centerVO) throws Exception {
		int result = sqlSession.insert(namespace + "insertCenter", centerVO);
		if(result > 0) {
			result = centerVO.getCenterSeq();
		}
		return result;
	}

	@Override
	public List<CenterVO> selectCenterList(CenterVO centerVO) throws Exception {
		List<CenterVO> resultList = sqlSession.selectList(namespace + "selectCenterList", centerVO);
		return resultList;
	}
	
	@Override
	public int updateCenter(CenterVO centerVO) throws Exception {
		int result = sqlSession.update(namespace + "updateCenter", centerVO);
		return result;
	}

	@Override
	public int deleteCenter(CenterVO centerVO) throws Exception {
		int result = sqlSession.delete(namespace + "deleteCenter", centerVO);
		return result;
	}

	@Override
	public List<ChdGroupVO> selectChildrenGroupList(ChdGroupVO chdGroupVO) throws Exception {
		List<ChdGroupVO> resultList = sqlSession.selectList(namespace + "selectChildrenGroupList", chdGroupVO);
		return resultList;
	}

	@Override
	public List<ChildrenVO> selectChildrenList(ChildrenVO childrenVO) throws Exception {
		List<ChildrenVO> resultList = sqlSession.selectList(namespace + "selectChildrenList", childrenVO);
		return resultList;
	}

	@Override
	public List<MemberVO> selectCenterMemberList(MemberVO memberVO) throws Exception {
		List<MemberVO> resultList = sqlSession.selectList(namespace + "selectCenterMemberList", memberVO);
		return resultList;
	}
	
	@Override
	public MemberVO selectProfileInfo(MemberVO memberVO) throws Exception {
		MemberVO result = sqlSession.selectOne(namespace + "selectProfileInfo", memberVO);
		return result;
	}

	@Override
	public int saveProfileInfo(MemberVO memberVO) throws Exception {
		int result = sqlSession.update(namespace + "saveProfileInfo", memberVO);
		return result;
	}
	
	@Override
	public MemberVO selectAccessRecord(MemberVO memberVO) throws Exception {
		MemberVO result = sqlSession.selectOne(namespace + "selectAccessRecord", memberVO);
		return result;
	}
	
	@Override
	public int updateAccessRecord(MemberVO memberVO) throws Exception {
		int result = sqlSession.insert(namespace + "updateAccessRecord", memberVO);
		return result;
	}

	@Override
	public int updateMemberPositionCd(CenterVO centerVO) throws Exception {
		int result = sqlSession.insert(namespace + "updateMemberPositionCd", centerVO);
		return result;
	}
	
	@Override
	public int updateCenterManager(CenterVO centerVO) throws Exception {
		int result = sqlSession.insert(namespace + "updateCenterManager", centerVO);
		return result;
	}

}
