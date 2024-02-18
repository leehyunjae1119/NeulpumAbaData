package com.neulpum.np.common.web;

import java.util.HashMap;
import java.util.List;
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
import com.neulpum.np.common.utils.SessionManager;
import com.neulpum.np.common.vo.CenterVO;
import com.neulpum.np.lgn.vo.LgnVO;
import com.neulpum.np.mng.vo.ChdGroupVO;
import com.neulpum.np.mng.vo.ChildrenVO;
import com.neulpum.np.mng.vo.MemberVO;


@Controller
@RequestMapping(value = "/common")
public class CommonController {

	@Inject
	CommonService commonService;
	
	@Inject
	SessionManager sessionManager;
	
	@ResponseBody
	@RequestMapping(value = "/ajax.selectCenterLeader", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String loginAjax(HttpServletRequest request, HttpServletResponse response, Model model) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		List<LgnVO> lgnVoList = commonService.selectCenterLeader();
		resultMap.put("managerList", lgnVoList);
		
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
	
	@ResponseBody
	@RequestMapping(value = "/ajax.insertCenter", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String insertCenter(HttpServletRequest request, HttpServletResponse response, Model model, @RequestBody CenterVO centerVO) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		commonService.insertCenter(centerVO);
		
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
	
	@ResponseBody
	@RequestMapping(value = "/ajax.selectCenterList", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String selectCenterList(HttpServletRequest request, HttpServletResponse response, Model model, @RequestBody CenterVO centerVO) throws Exception {

		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		List<CenterVO> resultList = commonService.selectCenterList(centerVO);
		resultMap.put("centerList", resultList);
		
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
	
	@ResponseBody
	@RequestMapping(value = "/ajax.updateCenter", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String updateCenter(HttpServletRequest request, HttpServletResponse response, Model model, @RequestBody CenterVO centerVO) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		commonService.updateCenter(centerVO);
		
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
	
	@ResponseBody
	@RequestMapping(value = "/ajax.deleteCenter", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String deleteCenter(HttpServletRequest request, HttpServletResponse response, Model model, @RequestBody CenterVO centerVO) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		commonService.deleteCenter(centerVO);
		
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
	
	@ResponseBody
	@RequestMapping(value = "/ajax.selectChildrenGroupList", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String selectChildrenGroupList(HttpServletRequest request, HttpServletResponse response, Model model, @RequestBody ChdGroupVO chdGroupVO) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		List<ChdGroupVO> resultList = commonService.selectChildrenGroupList(chdGroupVO);
		resultMap.put("chdGroupList", resultList);
		
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
	
	@ResponseBody
	@RequestMapping(value = "/ajax.selectChildrenList", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String selectChildrenList(HttpServletRequest request, HttpServletResponse response, Model model, @RequestBody ChildrenVO childrenVO) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		List<ChildrenVO> resultList = commonService.selectChildrenList(childrenVO);
		resultMap.put("childrenList", resultList);
		
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
	
	@ResponseBody
	@RequestMapping(value = "/ajax.selectProfileInfo", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String selectChildrenList(HttpServletRequest request, HttpServletResponse response, Model model, @RequestBody MemberVO memberVO) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		MemberVO result = commonService.selectProfileInfo(memberVO);
		resultMap.put("result", result);
		
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
	
	@ResponseBody
	@RequestMapping(value = "/ajax.saveProfileInfo", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String saveProfileInfo(HttpServletRequest request, HttpServletResponse response, Model model, @RequestBody MemberVO memberVO) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		commonService.saveProfileInfo(memberVO);
		
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
	
	@ResponseBody
	@RequestMapping(value = "/ajax.updateAccessRecord", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String updateAccessRecord(HttpServletRequest request, HttpServletResponse response, Model model, @RequestBody MemberVO memberVO) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		LgnVO lgnVO = (LgnVO)sessionManager.getSession(request);
		memberVO.setMemberSeq(lgnVO.getMemberSeq());
		
		commonService.updateAccessRecord(memberVO);
		
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
	
}
