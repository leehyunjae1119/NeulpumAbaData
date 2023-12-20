package com.neulpum.np.common.service;

import java.util.List;

import com.neulpum.np.common.vo.CenterVO;
import com.neulpum.np.lgn.vo.LgnVO;
import com.neulpum.np.mng.vo.ChdGroupVO;
import com.neulpum.np.mng.vo.ChildrenVO;
import com.neulpum.np.mng.vo.MemberVO;

public interface CommonService {

	// 센터장 리스트 조회 
	public List<LgnVO> selectCenterLeader() throws Exception;
	
	// 센터 등록 조회 
	public int insertCenter(CenterVO centerVO) throws Exception;
	
	// 센터 조회 조회 
	public List<CenterVO> selectCenterList(CenterVO centerVO) throws Exception;
	
	// 센터 등록 조회 
	public int updateCenter(CenterVO centerVO) throws Exception;
		
	// 센터 등록 조회 
	public int deleteCenter(CenterVO centerVO) throws Exception;
	
	// 아동 그룹 리스트 조회
	public List<ChdGroupVO> selectChildrenGroupList(ChdGroupVO chdGroupVO) throws Exception;
	
	// 아동 리스트 조회
	public List<ChildrenVO> selectChildrenList(ChildrenVO childrenVO) throws Exception;
	
	// 선생님 리스트 조회
	public List<MemberVO> selectCenterMemberList(MemberVO memberVO) throws Exception;
	
	// 프로필 정보 조회
	public MemberVO selectProfileInfo(MemberVO memberVO) throws Exception;
	
	// 센터 등록 조회 
	public int saveProfileInfo(MemberVO memberVO) throws Exception;
}
