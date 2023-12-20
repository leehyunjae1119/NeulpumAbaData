package com.neulpum.np.cpm.web;

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
import com.neulpum.np.common.utils.SessionManager;
import com.neulpum.np.common.vo.PagingVO;
import com.neulpum.np.cpm.service.CpmCounselingService;
import com.neulpum.np.cpm.vo.CounselingVO;
import com.neulpum.np.lgn.vo.LgnVO;
import com.neulpum.np.mng.vo.MemberVO;

@Controller
@RequestMapping(value = "/cpm")
public class CpmCounselingController {
	
	@Inject
	CommonService commonService;
	
	@Inject
	CpmCounselingService cpmCounselingService;
	
	@Inject
	SessionManager sessionManager;

	@RequestMapping(value = "/cpmCounseling", method = RequestMethod.GET)
	public String cpmCounseling(HttpServletRequest request, Locale locale, Model model) throws Exception {
		String centerSeq = (String) request.getParameter("centerSeq");
		String childrenSeq = (String) request.getParameter("childrenSeq");
		
		MemberVO param = new MemberVO();
		param.setMemberPositionCd(centerSeq);
		List<MemberVO> authList = commonService.selectCenterMemberList(param);
		
		model.addAttribute("childrenSeq", childrenSeq);
		model.addAttribute("authList", authList);
		return "/cpm/cpmCounseling";
	}
	
	@ResponseBody
	@RequestMapping(value = "/ajax.selectCounselingList", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String selectCounselingList(HttpServletRequest request, HttpServletResponse response, @RequestBody CounselingVO counselingVO, Model model) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		List<CounselingVO> resultList = cpmCounselingService.selectCounselingList(counselingVO);
		CounselingVO result = cpmCounselingService.selectCounselingListCnt(counselingVO);
		
		// 페이징
		PagingVO pagingVO = PagingUtil.pagination(counselingVO.getPageNum(), result.getPageCnt());
		
		resultMap.put("resultList", resultList);
		resultMap.put("pagingVO", pagingVO);
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
	
	@ResponseBody
	@RequestMapping(value = "/ajax.insertCounselingData", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String insertCounselingData(HttpServletRequest request, HttpServletResponse response, @RequestBody CounselingVO counselingVO, Model model) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		LgnVO lgnVO = (LgnVO)sessionManager.getSession(request);
		counselingVO.setCounselingRegMmrSeq(lgnVO.getMemberSeq());
		
		cpmCounselingService.insertCounselingData(counselingVO);

		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
	
	@ResponseBody
	@RequestMapping(value = "/ajax.updateCounselingData", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String updateCounselingData(HttpServletRequest request, HttpServletResponse response, @RequestBody CounselingVO counselingVO, Model model) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		cpmCounselingService.updateCounselingData(counselingVO);
		
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
	
	@ResponseBody
	@RequestMapping(value = "/ajax.deleteCounselingData", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String deleteCounselingData(HttpServletRequest request, HttpServletResponse response, @RequestBody CounselingVO counselingVO, Model model) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		cpmCounselingService.deleteCounselingData(counselingVO);
		
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
}
