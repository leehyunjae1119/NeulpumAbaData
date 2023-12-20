package com.neulpum.np.grp.web;

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

import com.neulpum.np.common.utils.SessionManager;
import com.neulpum.np.grp.service.GrpService;
import com.neulpum.np.grp.vo.GrpGraphVO;

@Controller
@RequestMapping(value = "/grp")
public class GrpController {
	
	@Inject
	GrpService grpSerivce;
	
	@Inject
	SessionManager sessionManager;

	@RequestMapping(value = "/graph", method = RequestMethod.GET)
	public String graph(HttpServletRequest request, Locale locale, Model model) {
		return "/grp/graph";
	}
	
	@ResponseBody
	@RequestMapping(value = "/ajax.selectDailyReactionData", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String selectDailyReactionData(HttpServletRequest request, HttpServletResponse response, @RequestBody GrpGraphVO grpGraphVO, Model model) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		List<GrpGraphVO> dataList = grpSerivce.selectDailyReactionData(grpGraphVO);
		
		resultMap.put("dataList", dataList);
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
	
	@ResponseBody
	@RequestMapping(value = "/ajax.selectCriterionByDomainData", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String selectCriterionByDomainData(HttpServletRequest request, HttpServletResponse response, @RequestBody GrpGraphVO grpGraphVO, Model model) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();

		List<GrpGraphVO> dataList = grpSerivce.selectCriterionByDomainData(grpGraphVO);
		
		resultMap.put("dataList", dataList);
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
	
	@ResponseBody
	@RequestMapping(value = "/ajax.selectWeeklyCompletionData", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String selectWeeklyCompletionData(HttpServletRequest request, HttpServletResponse response, @RequestBody GrpGraphVO grpGraphVO, Model model) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();

		List<GrpGraphVO> dataList = grpSerivce.selectWeeklyCompletionData(grpGraphVO);
		
		resultMap.put("dataList", dataList);
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
	
	@ResponseBody
	@RequestMapping(value = "/ajax.selectGrahpSelectBoxData", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String selectGrahpSelectBoxData(HttpServletRequest request, HttpServletResponse response, @RequestBody GrpGraphVO grpGraphVO, Model model) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		Map<String, Object> dataList = grpSerivce.selectGrahpSelectBoxData(grpGraphVO);
		
		resultMap.put("dataList", dataList);
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
}
