package com.neulpum.np.mng.dao.impl;

import java.util.ArrayList;
import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.neulpum.np.cpm.vo.DomainVO;
import com.neulpum.np.cpm.vo.LtoVO;
import com.neulpum.np.mng.dao.MngDao;
import com.neulpum.np.mng.vo.ChdGroupVO;
import com.neulpum.np.mng.vo.ChildrenVO;
import com.neulpum.np.mng.vo.MemberVO;

@Repository
public class MngDaoImpl implements MngDao {
	
	@Autowired
	private SqlSessionTemplate sqlSession;

	@Override
	public int updateMember(MemberVO memberVO) throws Exception {
		int result = sqlSession.insert(namespace + "updateMember", memberVO);
		return result;
	}

	@Override
	public int updateChildren(ChildrenVO childrenVO) throws Exception {
		int result = sqlSession.insert(namespace + "updateChildren", childrenVO);
		if(result > 0) {
			result = childrenVO.getChildrenSeq();
		}
		return result;
	}

	@Override
	public List<DomainVO> autoInsertDomain(DomainVO domainVO) throws Exception {
		List<DomainVO> resultList = new ArrayList<DomainVO>();
		int insertResult = sqlSession.insert(namespace + "autoInsertDomain", domainVO);
		resultList = sqlSession.selectList(namespace + "selectDomainList", domainVO);
		return resultList;
	}

	@Override
	public int autoInsertLto(LtoVO ltoVO) throws Exception {
		int result = sqlSession.insert(namespace + "autoInsertLto", ltoVO);
		return result;
	}

	@Override
	public ChdGroupVO selectChdGroup(ChdGroupVO chdGroupVO) throws Exception {
		ChdGroupVO result = sqlSession.selectOne(namespace + "selectChdGroup", chdGroupVO);
		return result;
	}

	@Override
	public int insertChdGroup(ChdGroupVO chdGroupVO) throws Exception {
		int result = sqlSession.insert(namespace + "insertChdGroup", chdGroupVO);
		return result;
	}

	@Override
	public List<MemberVO> selectMemberList(MemberVO memberVO) throws Exception {
		List<MemberVO> resultList = sqlSession.selectList(namespace + "selectMemberList", memberVO);
		return resultList;
	}

	@Override
	public MemberVO selectMemberListCnt(MemberVO memberVO) throws Exception {
		MemberVO result = sqlSession.selectOne(namespace + "selectMemberListCnt", memberVO);
		return result;
	}

	@Override
	public MemberVO selectMemberDetail(MemberVO memberVO) throws Exception {
		MemberVO result = sqlSession.selectOne(namespace + "selectMemberDetail", memberVO);
		return result;
	}

	@Override
	public List<ChildrenVO> selectChildrenList(ChildrenVO childrenVO) throws Exception {
		List<ChildrenVO> resultList = sqlSession.selectList(namespace + "selectChildrenList", childrenVO);
		return resultList;
	}

	@Override
	public ChildrenVO selectChildrenListCnt(ChildrenVO childrenVO) throws Exception {
		ChildrenVO result = sqlSession.selectOne(namespace + "selectChildrenListCnt", childrenVO);
		return result;
	}

	@Override
	public ChildrenVO selectChildrenDetail(ChildrenVO childrenVO) throws Exception {
		ChildrenVO result = sqlSession.selectOne(namespace + "selectChildrenDetail", childrenVO);
		return result;
	}

	@Override
	public int resetMemberPw(MemberVO memberVO) throws Exception {
		int result = sqlSession.update(namespace + "resetMemberPw", memberVO);
		return result;
	}
	
}
