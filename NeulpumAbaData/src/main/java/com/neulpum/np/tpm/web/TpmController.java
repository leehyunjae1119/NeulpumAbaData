package com.neulpum.np.tpm.web;

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

import com.neulpum.np.mng.vo.ChildrenVO;
import com.neulpum.np.tpm.service.TpmService;
import com.neulpum.np.tpm.vo.TmpDomainVO;
import com.neulpum.np.tpm.vo.TmpLtoVO;
import com.neulpum.np.tpm.vo.TmpStoVO;
import com.neulpum.np.tpm.vo.TmpVO;


@Controller
@RequestMapping(value = "/tpm")
public class TpmController {
	
	@Inject
	TpmService tpmService;

	@RequestMapping(value = "/programManagement", method = RequestMethod.GET)
	public String programManagement(HttpServletRequest request, HttpServletResponse response, Locale locale, Model model) throws Exception {
		
//		//센터 리스트 조회
//		CenterVO paramVO = new CenterVO();
//		List<CenterVO> centerList = commonService.selectCenterList(paramVO);
//		model.addAttribute("centerList", centerList);
		
		return "/tpm/programManagement";
	}
	
	@ResponseBody
	@RequestMapping(value = "/ajax.selectTmpDomain", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String selectTmpDomain(HttpServletRequest request, HttpServletResponse response, @RequestBody TmpDomainVO tmpDomainVO, Model model) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		List<TmpDomainVO> tmpDomainList = tpmService.selectTmpDomain(tmpDomainVO);
		resultMap.put("tmpDomainList", tmpDomainList);
		
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
	
	@ResponseBody
	@RequestMapping(value = "/ajax.selectTmpLto", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String selectTmpLto(HttpServletRequest request, HttpServletResponse response, @RequestBody TmpLtoVO tmpLtoVO, Model model) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		List<TmpLtoVO> tmpLtoList = tpmService.selectTmpLto(tmpLtoVO);
		resultMap.put("tmpLtoList", tmpLtoList);
		
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
	
	@ResponseBody
	@RequestMapping(value = "/ajax.selectTmpSto", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String selectTmpSto(HttpServletRequest request, HttpServletResponse response, @RequestBody TmpStoVO tmpStoVO, Model model) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		List<TmpStoVO> tmpStoList = tpmService.selectTmpSto(tmpStoVO);
		resultMap.put("tmpStoList", tmpStoList);
		
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
	
	@ResponseBody
	@RequestMapping(value = "/ajax.updateSortOrder", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String updateSortOrder(HttpServletRequest request, HttpServletResponse response, @RequestBody TmpVO tmpVO, Model model) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		tpmService.updateSortOrder(tmpVO);
		
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
	
	@ResponseBody
	@RequestMapping(value = "/ajax.deleteProgram", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String deleteProgram(HttpServletRequest request, HttpServletResponse response, @RequestBody TmpVO tmpVO, Model model) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		tpmService.deleteProgram(tmpVO);
		
		tpmService.reorderProgram(tmpVO);
		
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}

	@ResponseBody
	@RequestMapping(value = "/ajax.insertDomain", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String insertDomain(HttpServletRequest request, HttpServletResponse response, @RequestBody TmpDomainVO tmpDomainVO, Model model) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		tpmService.insertDomain(tmpDomainVO);
		
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
	
	@ResponseBody
	@RequestMapping(value = "/ajax.updateDomain", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String updateDomain(HttpServletRequest request, HttpServletResponse response, @RequestBody TmpDomainVO tmpDomainVO, Model model) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		tpmService.updateDomain(tmpDomainVO);
		
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
	
	@ResponseBody
	@RequestMapping(value = "/ajax.insertLto", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String insertLto(HttpServletRequest request, HttpServletResponse response, @RequestBody TmpLtoVO tmpLtoVo, Model model) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		tpmService.insertLto(tmpLtoVo);
		
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
	
	@ResponseBody
	@RequestMapping(value = "/ajax.updateLto", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String updateLto(HttpServletRequest request, HttpServletResponse response, @RequestBody TmpLtoVO tmpLtoVo, Model model) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		tpmService.updateLto(tmpLtoVo);
		
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
	
	@ResponseBody
	@RequestMapping(value = "/ajax.insertSto", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String insertSto(HttpServletRequest request, HttpServletResponse response, @RequestBody TmpStoVO tmpStoVO, Model model) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		tpmService.insertSto(tmpStoVO);
		
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
	
	@ResponseBody
	@RequestMapping(value = "/ajax.updateSto", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String updateSto(HttpServletRequest request, HttpServletResponse response, @RequestBody TmpStoVO tmpStoVO, Model model) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		tpmService.updateSto(tmpStoVO);
		
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
}
