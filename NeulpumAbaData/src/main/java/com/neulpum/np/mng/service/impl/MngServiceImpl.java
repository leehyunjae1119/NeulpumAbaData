package com.neulpum.np.mng.service.impl;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.neulpum.np.cpm.vo.DomainVO;
import com.neulpum.np.cpm.vo.LtoVO;
import com.neulpum.np.mng.dao.MngDao;
import com.neulpum.np.mng.service.MngService;
import com.neulpum.np.mng.vo.ChdGroupVO;
import com.neulpum.np.mng.vo.ChildrenVO;
import com.neulpum.np.mng.vo.MemberVO;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class MngServiceImpl implements MngService {
	
	@Inject
	MngDao mngDao;
	
	public int updateMember(MemberVO memberVO) throws Exception {
		int result = mngDao.updateMember(memberVO);
		return result;
	}
	
	public int updateChildren(ChildrenVO childrenVO) throws Exception {
		
		boolean isInsertMode = false;
		if(childrenVO.getChildrenSeq() == 0) {
			isInsertMode = true;
		}
		
		// 그룹코드 세팅 - 그룹이름 입력시에만 세팅
		ChdGroupVO paramChdGroupVO = new ChdGroupVO();
		paramChdGroupVO.setGroupName(childrenVO.getGroupName());
		paramChdGroupVO.setGroupPosiotionCd(childrenVO.getChildrenPositionCd());
		ChdGroupVO chdGroupVO = mngDao.selectChdGroup(paramChdGroupVO);
		
		if(chdGroupVO == null && !"".equals(childrenVO.getGroupName())) {
			mngDao.insertChdGroup(paramChdGroupVO);
			chdGroupVO = mngDao.selectChdGroup(paramChdGroupVO);
		}
		
		if(!"".equals(childrenVO.getGroupName())) {
			childrenVO.setChildrenGroupCd(chdGroupVO.getGroupSeq());
		}
		if(childrenVO.getChildrenBookImg() == null || "".equals(childrenVO.getChildrenBookImg())) {
			childrenVO.setChildrenBookImg(getRandomImg());
		}
		
		// 아동 정보 업데이트
		int result = mngDao.updateChildren(childrenVO);
		
		if(isInsertMode) {
			//영역, 장기목표 자동 저장
			autoInsertProgram(result);
		}
		
		return result;
	}
	
	private int autoInsertProgram(int childrenSeq) throws Exception {
		int result = 0;
		
		DomainVO dtoParam = new DomainVO();
		dtoParam.setChildrenSeq(childrenSeq);
		List<DomainVO> dtoResult = mngDao.autoInsertDomain(dtoParam);
		
		for(DomainVO dtoVO : dtoResult) {
			
			LtoVO ltoParam = new LtoVO();
			ltoParam.setDomainSeq(dtoVO.getDomainSeq());
			ltoParam.setDomainTmpSeq(dtoVO.getDomainTmpSeq());
			
			mngDao.autoInsertLto(ltoParam);
		}
		
		return result;
	}

	@Override
	public List<MemberVO> selectMemberList(MemberVO memberVO) throws Exception {
		int startNum = 0;
		startNum = (memberVO.getPageNum() - 1) * 10;
		memberVO.setStartNum(startNum);
		
		List<MemberVO> resultList = mngDao.selectMemberList(memberVO);
		return resultList;
	}

	@Override
	public MemberVO selectMemberListCnt(MemberVO memberVO) throws Exception {
		MemberVO result = mngDao.selectMemberListCnt(memberVO);
		return result;
	}

	@Override
	public MemberVO selectMemberDetail(MemberVO memberVO) throws Exception {
		MemberVO result = mngDao.selectMemberDetail(memberVO);
		return result;
	}

	@Override
	public List<ChildrenVO> selectChildrenList(ChildrenVO childrenVO) throws Exception {
		int startNum = 0;
		startNum = (childrenVO.getPageNum() - 1) * 10;
		childrenVO.setStartNum(startNum);
		
		List<ChildrenVO> resultList = mngDao.selectChildrenList(childrenVO);
		return resultList;
	}

	@Override
	public ChildrenVO selectChildrenListCnt(ChildrenVO childrenVO) throws Exception {
		ChildrenVO result = mngDao.selectChildrenListCnt(childrenVO);
		return result;
	}

	@Override
	public ChildrenVO selectChildrenDetail(ChildrenVO childrenVO) throws Exception {
		ChildrenVO result = mngDao.selectChildrenDetail(childrenVO);
		return result;
	}

	@Override
	public int resetMemberPw(MemberVO memberVO) throws Exception {
		int result = mngDao.resetMemberPw(memberVO);
		return result;
	}

	
	private String getRandomImg() {
		String bookImg = "";
		int randomValue = (int)(Math.random() * 10);
		
		if(randomValue != 0) {
			randomValue = 4;
		}
		
		bookImg = "book_" + randomValue;
		
		return bookImg;
	}
}
