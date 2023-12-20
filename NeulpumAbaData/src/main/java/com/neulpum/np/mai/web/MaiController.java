package com.neulpum.np.mai.web;

import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.neulpum.np.common.service.CommonService;
import com.neulpum.np.common.utils.SessionManager;
import com.neulpum.np.lgn.vo.LgnVO;
import com.neulpum.np.mai.service.MaiService;
import com.neulpum.np.mai.vo.CalendarVO;
import com.neulpum.np.mai.vo.MaiVO;
import com.neulpum.np.mai.vo.SchedulerVO;
import com.neulpum.np.mng.vo.ChildrenVO;

@Controller
public class MaiController {

	@Inject
	MaiService maiService;
	
	@Inject
	CommonService commonService;
	
	@Inject
	SessionManager sessionManager;
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String index(HttpServletRequest request, Locale locale, Model model) {
		
		return "redirect:/mai/main";
	}
	
	@RequestMapping(value = "/mai/main", method = RequestMethod.GET)
	public String main(HttpServletRequest request, HttpServletResponse response, Locale locale, Model model) throws Exception {
		
		LgnVO lgnVO = (LgnVO)sessionManager.getSession(request);
		
		MaiVO paramVO = new MaiVO();
		paramVO.setMemberSeq(lgnVO.getMemberSeq());
		MaiVO memoData = maiService.selectMemberMemo(paramVO);
		
		ChildrenVO cparamVO = new ChildrenVO();
		if(request.getParameter("centerSeq") == null || StringUtils.isEmpty(request.getParameter("centerSeq"))) {
			cparamVO.setChildrenPositionCd(lgnVO.getMemberPositionCd());
		} else {
			cparamVO.setChildrenPositionCd(Integer.parseInt(request.getParameter("centerSeq")));
		}
		List<ChildrenVO> childrenList = commonService.selectChildrenList(cparamVO);
		
		
		model.addAttribute("memoData", memoData);
		model.addAttribute("childrenList", childrenList);
		
		return "/mai/main";
	}
	
	@ResponseBody
	@RequestMapping(value = "/mai/ajax.updateMemberMemo", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String updateMemberMemo(HttpServletRequest request, HttpServletResponse response, @RequestBody MaiVO maiVO, Model model) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		maiService.updateMemberMemo(maiVO);
		
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
	
	@ResponseBody
	@RequestMapping(value = "/mai/ajax.selectCalendarMonth", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String selectCalendarMonth(HttpServletRequest request, HttpServletResponse response, @RequestBody CalendarVO calendarVO, Model model) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		List<CalendarVO> resultList = maiService.selectCalendarMonth(calendarVO);
		
		resultMap.put("resultList", resultList);
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
	
	@ResponseBody
	@RequestMapping(value = "/mai/ajax.selectCalendarList", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String selectCalendarList(HttpServletRequest request, HttpServletResponse response, @RequestBody CalendarVO calendarVO, Model model) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		List<CalendarVO> resultList = maiService.selectCalendarList(calendarVO);
		
		resultMap.put("resultList", resultList);
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
	
	@ResponseBody
	@RequestMapping(value = "/mai/ajax.insertCalendarData", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String insertCalendarData(HttpServletRequest request, HttpServletResponse response, @RequestBody CalendarVO calendarVO, Model model) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		LgnVO lgnVO = (LgnVO)sessionManager.getSession(request);
		calendarVO.setCalendarRegMmrSeq(lgnVO.getMemberSeq());
		maiService.insertCalendarData(calendarVO);
		
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
	
	@ResponseBody
	@RequestMapping(value = "/mai/ajax.updateCalendarData", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String updateCalendarData(HttpServletRequest request, HttpServletResponse response, @RequestBody CalendarVO calendarVO, Model model) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		maiService.updateCalendarData(calendarVO);
		
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
	
	@ResponseBody
	@RequestMapping(value = "/mai/ajax.deleteCalendarData", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String deleteCalendarData(HttpServletRequest request, HttpServletResponse response, @RequestBody CalendarVO calendarVO, Model model) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		maiService.deleteCalendarData(calendarVO);
		
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
	
	@ResponseBody
	@RequestMapping(value = "/mai/ajax.selectSchedulerList", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String selectSchedulerList(HttpServletRequest request, HttpServletResponse response, @RequestBody SchedulerVO schedulerVO, Model model) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		List<SchedulerVO> resultList = maiService.selectSchedulerList(schedulerVO);
		
		resultMap.put("resultList", resultList);
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
	
	@ResponseBody
	@RequestMapping(value = "/mai/ajax.saveSchedulerData", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String saveSchedulerData(HttpServletRequest request, HttpServletResponse response, @RequestBody SchedulerVO schedulerVO, Model model) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		LgnVO lgnVO = (LgnVO)sessionManager.getSession(request);
		schedulerVO.setSchedulerRegMmrSeq(lgnVO.getMemberSeq());
		
		maiService.saveSchedulerData(schedulerVO);
		
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
}
