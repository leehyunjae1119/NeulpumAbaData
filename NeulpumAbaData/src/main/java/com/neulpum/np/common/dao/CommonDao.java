package com.neulpum.np.common.dao;

import java.util.List;

import com.neulpum.np.common.vo.CenterVO;
import com.neulpum.np.lgn.vo.LgnVO;
import com.neulpum.np.mng.vo.ChdGroupVO;
import com.neulpum.np.mng.vo.ChildrenVO;
import com.neulpum.np.mng.vo.MemberVO;

public interface CommonDao {

	String namespace = "com.neulpum.np.common.dao.CommonDao.";
	
	public List<LgnVO> selectCenterLeader() throws Exception;
	
	public int insertCenter(CenterVO centerVO) throws Exception;
	
	public List<CenterVO> selectCenterList(CenterVO centerVO) throws Exception;
	
	public int updateCenter(CenterVO centerVO) throws Exception;
	
	public int deleteCenter(CenterVO centerVO) throws Exception;

	public List<ChdGroupVO> selectChildrenGroupList(ChdGroupVO chdGroupVO) throws Exception;
	
	public List<ChildrenVO> selectChildrenList(ChildrenVO childrenVO) throws Exception;
	
	public List<MemberVO> selectCenterMemberList(MemberVO memberVO) throws Exception;
	
	public MemberVO selectProfileInfo(MemberVO memberVO) throws Exception;
	
	public int saveProfileInfo(MemberVO memberVO) throws Exception;
	
	public MemberVO selectAccessRecord(MemberVO memberVO) throws Exception;
	
	public int updateAccessRecord(MemberVO memberVO) throws Exception;
}
