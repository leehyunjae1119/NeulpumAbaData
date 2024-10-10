package com.neulpum.np.mng.dao;

import java.util.List;

import com.neulpum.np.cpm.vo.DomainVO;
import com.neulpum.np.cpm.vo.LtoVO;
import com.neulpum.np.mng.vo.ChdGroupVO;
import com.neulpum.np.mng.vo.ChildrenVO;
import com.neulpum.np.mng.vo.MemberVO;

public interface MngDao {
	
	String namespace = "com.neulpum.np.mng.dao.MngDao.";
	
	// 선생님 정보 저장 및 수정
	public int updateMember(MemberVO memberVO) throws Exception;
	
	// 아동 정보 저장 및 수정
	public int updateChildren(ChildrenVO childrenVO) throws Exception;
	public List<DomainVO> autoInsertDomain(DomainVO domainVO) throws Exception;
	public int autoInsertLto(LtoVO ltoVO) throws Exception;
	
	// 아동 그룹(반) 조회
	public ChdGroupVO selectChdGroup(ChdGroupVO chdGroupVO) throws Exception;
	// 아동 그룹(반) 삽입
	public int insertChdGroup(ChdGroupVO chdGroupVO) throws Exception;

	// 선생님 리스트 조회
	public List<MemberVO> selectMemberList(MemberVO memberVO) throws Exception;
	// 선생님 리스트 조회
	public MemberVO selectMemberListCnt(MemberVO memberVO) throws Exception;
	// 선생님 상세 조회
	public MemberVO selectMemberDetail(MemberVO memberVO) throws Exception;
	
	// 아동 리스트 조회
	public List<ChildrenVO> selectChildrenList(ChildrenVO childrenVO) throws Exception;
	// 아동 리스트 조회
	public ChildrenVO selectChildrenListCnt(ChildrenVO childrenVO) throws Exception;
	// 아동 상세 조회
	public ChildrenVO selectChildrenDetail(ChildrenVO childrenVO) throws Exception;
	
	// 회원 패스워드 초기화
	public int resetMemberPw(MemberVO memberVO) throws Exception;
	
	// 선생님 정보 삭제
	public int deleteMember(MemberVO memberVO) throws Exception;
	
	// 아동 정보 삭제
	public int deleteChildren(ChildrenVO childrenVO) throws Exception;
}
