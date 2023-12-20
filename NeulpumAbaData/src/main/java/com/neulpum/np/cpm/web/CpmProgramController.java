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

import com.neulpum.np.cpm.service.CpmProgramService;
import com.neulpum.np.cpm.vo.DomainVO;
import com.neulpum.np.cpm.vo.LtoVO;
import com.neulpum.np.cpm.vo.StoVO;
import com.neulpum.np.cpm.vo.ProgramVO;

@Controller
@RequestMapping(value = "/cpm")
public class CpmProgramController {
	
	@Inject
	CpmProgramService cpmProgramService;

	@RequestMapping(value = "/cpmProgram", method = RequestMethod.GET)
	public String cpmProgram(HttpServletRequest request, Locale locale, Model model) {
		String childrenSeq = (String) request.getParameter("childrenSeq");

		model.addAttribute("childrenSeq", childrenSeq);
		return "/cpm/cpmProgram";
	}

	@ResponseBody
	@RequestMapping(value = "/ajax.selectDomain", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String selectDomain(HttpServletRequest request, HttpServletResponse response, @RequestBody DomainVO domainVO, Model model) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		List<DomainVO> domainList = cpmProgramService.selectDomain(domainVO);
		resultMap.put("domainList", domainList);
		
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
	
	@ResponseBody
	@RequestMapping(value = "/ajax.selectLto", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String selectLto(HttpServletRequest request, HttpServletResponse response, @RequestBody LtoVO LtoVO, Model model) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		List<LtoVO> ltoList = cpmProgramService.selectLto(LtoVO);
		resultMap.put("ltoList", ltoList);
		
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
	
	@ResponseBody
	@RequestMapping(value = "/ajax.selectSto", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String selectSto(HttpServletRequest request, HttpServletResponse response, @RequestBody StoVO stoVO, Model model) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		List<StoVO> stoList = cpmProgramService.selectSto(stoVO);
		resultMap.put("stoList", stoList);
		
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
	
	@ResponseBody
	@RequestMapping(value = "/ajax.updateSortOrder", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String updateSortOrder(HttpServletRequest request, HttpServletResponse response, @RequestBody ProgramVO programVO, Model model) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		cpmProgramService.updateSortOrder(programVO);
		
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
	
	@ResponseBody
	@RequestMapping(value = "/ajax.deleteProgram", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String deleteProgram(HttpServletRequest request, HttpServletResponse response, @RequestBody ProgramVO programVO, Model model) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		cpmProgramService.deleteProgram(programVO);
		
		cpmProgramService.reorderProgram(programVO);
		
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}

	@ResponseBody
	@RequestMapping(value = "/ajax.insertDomain", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String insertDomain(HttpServletRequest request, HttpServletResponse response, @RequestBody DomainVO domainVO, Model model) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		cpmProgramService.insertDomain(domainVO);
		
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
	
	@ResponseBody
	@RequestMapping(value = "/ajax.updateDomain", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String updateDomain(HttpServletRequest request, HttpServletResponse response, @RequestBody DomainVO domainVO, Model model) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		cpmProgramService.updateDomain(domainVO);
		
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
	
	@ResponseBody
	@RequestMapping(value = "/ajax.insertLto", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String insertLto(HttpServletRequest request, HttpServletResponse response, @RequestBody LtoVO ltoVo, Model model) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		cpmProgramService.insertLto(ltoVo);
		
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
	
	@ResponseBody
	@RequestMapping(value = "/ajax.updateLto", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String updateLto(HttpServletRequest request, HttpServletResponse response, @RequestBody LtoVO ltoVo, Model model) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		cpmProgramService.updateLto(ltoVo);
		
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
	
	@ResponseBody
	@RequestMapping(value = "/ajax.insertSto", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String insertSto(HttpServletRequest request, HttpServletResponse response, @RequestBody StoVO stoVO, Model model) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		cpmProgramService.insertSto(stoVO);
		
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
	
	@ResponseBody
	@RequestMapping(value = "/ajax.updateSto", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String updateSto(HttpServletRequest request, HttpServletResponse response, @RequestBody StoVO stoVO, Model model) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		cpmProgramService.updateSto(stoVO);
		
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
	
	@ResponseBody
	@RequestMapping(value = "/ajax.updateStatusCd", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String updateStatusCd(HttpServletRequest request, HttpServletResponse response, @RequestBody ProgramVO programVO, Model model) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		ProgramVO result = cpmProgramService.updateStatusCd(programVO);
		resultMap.put("result", result);
		
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
	
	@ResponseBody
	@RequestMapping(value = "/ajax.selectTmpDomainSelectbox", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String selectTmpDomainSelectbox(HttpServletRequest request, HttpServletResponse response, @RequestBody DomainVO domainVO, Model model) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		List<DomainVO> resultList = cpmProgramService.selectTmpDomainSelectbox(domainVO);
		resultMap.put("tmpDomainList", resultList);
		
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
	
	@ResponseBody
	@RequestMapping(value = "/ajax.selectTmpLtoSelectbox", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String selectTmpLtoSelectbox(HttpServletRequest request, HttpServletResponse response, @RequestBody LtoVO ltoVO, Model model) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		List<LtoVO> resultList = cpmProgramService.selectTmpLtoSelectbox(ltoVO);
		resultMap.put("tmpLtoList", resultList);
		
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
	
	@ResponseBody
	@RequestMapping(value = "/ajax.selectTmpStoSelectbox", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String selectTmpStoSelectbox(HttpServletRequest request, HttpServletResponse response, @RequestBody StoVO stoVO, Model model) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		List<StoVO> resultList = cpmProgramService.selectTmpStoSelectbox(stoVO);
		resultMap.put("tmpStoList", resultList);
		
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
}
