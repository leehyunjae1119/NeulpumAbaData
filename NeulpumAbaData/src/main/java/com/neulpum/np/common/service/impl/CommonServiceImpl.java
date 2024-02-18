package com.neulpum.np.common.service.impl;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.neulpum.np.common.dao.CommonDao;
import com.neulpum.np.common.service.CommonService;
import com.neulpum.np.common.vo.CenterVO;
import com.neulpum.np.lgn.vo.LgnVO;
import com.neulpum.np.mng.vo.ChdGroupVO;
import com.neulpum.np.mng.vo.ChildrenVO;
import com.neulpum.np.mng.vo.MemberVO;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class CommonServiceImpl implements CommonService {
	
	@Inject
	CommonDao commonDao;

	@Override
	public List<LgnVO> selectCenterLeader() throws Exception {
		List<LgnVO> resultList = commonDao.selectCenterLeader();
		return resultList;
	}

	@Override
	public int insertCenter(CenterVO centerVO) throws Exception {
		int result = commonDao.insertCenter(centerVO);
		return result;
	}

	@Override
	public List<CenterVO> selectCenterList(CenterVO centerVO) throws Exception {
		List<CenterVO> resultList = commonDao.selectCenterList(centerVO);
		return resultList;
	}

	@Override
	public int updateCenter(CenterVO centerVO) throws Exception {
		int result = commonDao.updateCenter(centerVO);
		return result;
	}

	@Override
	public int deleteCenter(CenterVO centerVO) throws Exception {
		int result = commonDao.deleteCenter(centerVO);
		return result;
	}

	@Override
	public List<ChdGroupVO> selectChildrenGroupList(ChdGroupVO chdGroupVO) throws Exception {
		List<ChdGroupVO> resultList = commonDao.selectChildrenGroupList(chdGroupVO);
		return resultList;
	}

	@Override
	public List<ChildrenVO> selectChildrenList(ChildrenVO childrenVO) throws Exception {
		List<ChildrenVO> resultList = commonDao.selectChildrenList(childrenVO);
		return resultList;
	}

	@Override
	public List<MemberVO> selectCenterMemberList(MemberVO memberVO) throws Exception {
		List<MemberVO> resultList = commonDao.selectCenterMemberList(memberVO);
		return resultList;
	}

	@Override
	public MemberVO selectProfileInfo(MemberVO memberVO) throws Exception {
		MemberVO result = commonDao.selectProfileInfo(memberVO);
		return result;
	}
	
	@Override
	public int saveProfileInfo(MemberVO memberVO) throws Exception {
		int result = commonDao.saveProfileInfo(memberVO);
		return result;
	}
	
	@Override
	public MemberVO selectAccessRecord(MemberVO memberVO) throws Exception {
		MemberVO result = commonDao.selectAccessRecord(memberVO);
		return result;
	}
	
	@Override
	public int updateAccessRecord(MemberVO memberVO) throws Exception {
		int result = commonDao.updateAccessRecord(memberVO);
		return result;
	}

}
