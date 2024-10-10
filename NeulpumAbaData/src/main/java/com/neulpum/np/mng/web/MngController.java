package com.neulpum.np.mng.web;

import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.neulpum.np.common.service.CommonService;
import com.neulpum.np.common.utils.PagingUtil;
import com.neulpum.np.common.vo.CenterVO;
import com.neulpum.np.common.vo.PagingVO;
import com.neulpum.np.lgn.service.LgnService;
import com.neulpum.np.lgn.vo.LgnVO;
import com.neulpum.np.mng.service.MngService;
import com.neulpum.np.mng.vo.ChildrenVO;
import com.neulpum.np.mng.vo.MemberVO;

import lombok.extern.slf4j.Slf4j;


@Controller
@RequestMapping(value = "/mng", method = RequestMethod.GET)
public class MngController {
	
	private final String MESSAGE_CODE_SUCCESS 		= "0";	//성공 
	private final String MESSAGE_CODE_DUPL 			= "4";	//중복
	
	@Inject
	MngService mngService;
	
	@Inject
	CommonService commonService;
	
	@Inject
	LgnService lgnService;
	
	@RequestMapping(value = "/management", method = RequestMethod.GET)
	public String management(HttpServletRequest request, HttpServletResponse response, Locale locale, Model model) throws Exception {
		
		//센터 리스트 조회
		CenterVO paramVO = new CenterVO();
		List<CenterVO> centerList = commonService.selectCenterList(paramVO);
		model.addAttribute("centerList", centerList);
		
		return "/mng/management";
	}
	
	@ResponseBody
	@RequestMapping(value = "/ajax.updateMember", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String updateMember(HttpServletRequest request, HttpServletResponse response, @RequestBody MemberVO memberVO, Model model) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		LgnVO lgnParam = new LgnVO();
		lgnParam.setMemberId(memberVO.getMemberId());
		
		LgnVO lgnVO = lgnService.signIn(lgnParam);
		
		String messageCd = "";
		if(lgnVO != null && memberVO.getMemberSeq() == 0) {
			messageCd = MESSAGE_CODE_DUPL;
		} else {
			int result = mngService.updateMember(memberVO);
			messageCd = MESSAGE_CODE_SUCCESS;
		}
		
		resultMap.put("messageCd", messageCd);
		
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
	
	@ResponseBody
	@RequestMapping(value = "/ajax.updateChildren", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String updateChildren(HttpServletRequest request, HttpServletResponse response, @RequestBody ChildrenVO childrenVO, Model model) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		int result = mngService.updateChildren(childrenVO);
		
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}

	@ResponseBody
	@RequestMapping(value = "/ajax.selectMemberList", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String selectMemberList(HttpServletRequest request, HttpServletResponse response, @RequestBody MemberVO memberVO, Model model) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		// 선생님 리스트 조회
		List<MemberVO> resultList = mngService.selectMemberList(memberVO);
		// 조회 리스트 총 갯수 조회
		MemberVO result = mngService.selectMemberListCnt(memberVO);
		// 페이징
		PagingVO pagingVO = PagingUtil.pagination(memberVO.getPageNum(), result.getPageCnt());
		
		resultMap.put("dataList", resultList);
		resultMap.put("pagingVO", pagingVO);
		
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}

	@ResponseBody
	@RequestMapping(value = "/ajax.selectMemberDetail", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String selectMemberDetail(HttpServletRequest request, HttpServletResponse response, @RequestBody MemberVO memberVO, Model model) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		MemberVO result = mngService.selectMemberDetail(memberVO);
		resultMap.put("infoData", result);	
		
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}

	@ResponseBody
	@RequestMapping(value = "/ajax.selectChildrenList", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String selectChildrenList(HttpServletRequest request, HttpServletResponse response, @RequestBody ChildrenVO childrenVO, Model model) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		// 아동 리스트 조회
		List<ChildrenVO> resultList = mngService.selectChildrenList(childrenVO);
		// 조회 리스트 총 갯수 조회
		ChildrenVO result = mngService.selectChildrenListCnt(childrenVO);
		// 페이징
		PagingVO pagingVO = PagingUtil.pagination(childrenVO.getPageNum(), result.getPageCnt());
		
		resultMap.put("dataList", resultList);
		resultMap.put("pagingVO", pagingVO);
		
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}

	@ResponseBody
	@RequestMapping(value = "/ajax.selectChildrenDetail", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String selectChildrenDetail(HttpServletRequest request, HttpServletResponse response, @RequestBody ChildrenVO childrenVO, Model model) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		ChildrenVO result = mngService.selectChildrenDetail(childrenVO);
		resultMap.put("infoData", result);
		
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
	
	@ResponseBody
	@RequestMapping(value = "/ajax.resetMemberPw", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String resetMemberPw(HttpServletRequest request, HttpServletResponse response, @RequestBody MemberVO memberVO, Model model) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		int result = mngService.resetMemberPw(memberVO);
		
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
	

	@ResponseBody
	@RequestMapping(value = "/ajax.deleteMember", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String deleteMember(HttpServletRequest request, HttpServletResponse response, @RequestBody MemberVO memberVO, Model model) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();

		int result = mngService.deleteMember(memberVO);
		
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
	
	@ResponseBody
	@RequestMapping(value = "/ajax.deleteChildren", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String deleteChildren(HttpServletRequest request, HttpServletResponse response, @RequestBody ChildrenVO childrenVO, Model model) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		int result = mngService.deleteChildren(childrenVO);
		
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
}