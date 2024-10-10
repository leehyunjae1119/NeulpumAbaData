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

import com.neulpum.np.common.utils.SessionManager;
import com.neulpum.np.cpm.service.CpmDailySheetService;
import com.neulpum.np.cpm.vo.DailySheetVO;
import com.neulpum.np.cpm.vo.StoPointVO;
import com.neulpum.np.cpm.vo.StoVO;
import com.neulpum.np.lgn.vo.LgnVO;

@Controller
@RequestMapping(value = "/cpm")
public class CpmDailySheetController {
	
	@Inject
	CpmDailySheetService cpmDailySheetService;
	
	@Inject
	SessionManager sessionManager;

	@RequestMapping(value = "/cpmDailySheet", method = RequestMethod.GET)
	public String cpmDailySheet(HttpServletRequest request, Locale locale, Model model) throws Exception {
		String childrenSeq = (String) request.getParameter("childrenSeq");
		
		DailySheetVO paramVO = new DailySheetVO();
		paramVO.setChildrenSeq(Integer.parseInt(childrenSeq));
		
		List<Map<String, Object>> initData = cpmDailySheetService.selectDailySheetInit(paramVO);
		
		model.addAttribute("childrenSeq", childrenSeq);
		model.addAttribute("initData", initData);
		
		return "/cpm/cpmDailySheet";
	}
	
	@ResponseBody
	@RequestMapping(value = "/ajax.insertStoPointData", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String insertStoPointData(HttpServletRequest request, HttpServletResponse response, @RequestBody StoPointVO stoPointVO, Model model) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		LgnVO lgnVO = (LgnVO)sessionManager.getSession(request);
		stoPointVO.setPointRegMmrSeq(lgnVO.getMemberSeq());
		
		cpmDailySheetService.insertStoPointData(stoPointVO);
		
		StoVO stoVO = new StoVO();
		stoVO.setStoSeq(stoPointVO.getStoSeq());
		String stoStatusCd = cpmDailySheetService.selectStoStatusCd(stoVO);
		
		resultMap.put("stoStatusCd", stoStatusCd);
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
	
	@ResponseBody
	@RequestMapping(value = "/ajax.deleteStoPointData", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String deleteStoPointData(HttpServletRequest request, HttpServletResponse response, @RequestBody StoPointVO stoPointVO, Model model) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		cpmDailySheetService.deleteStoPointData(stoPointVO);
		
		StoVO stoVO = new StoVO();
		stoVO.setStoSeq(stoPointVO.getStoSeq());
		String stoStatusCd = cpmDailySheetService.selectStoStatusCd(stoVO);
		
		resultMap.put("stoStatusCd", stoStatusCd);
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
	
	@ResponseBody
	@RequestMapping(value = "/ajax.updateStoStatus", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String updateStoStatus(HttpServletRequest request, HttpServletResponse response, @RequestBody StoVO stoVO, Model model) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		cpmDailySheetService.updateStoStatus(stoVO);
		
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
	
	@ResponseBody
	@RequestMapping(value = "/ajax.ltoChartDataSelect", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String ltoChartDataSelect(HttpServletRequest request, HttpServletResponse response, @RequestBody DailySheetVO dailySheetVO, Model model) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		List<List<DailySheetVO>> resultList = cpmDailySheetService.ltoChartDataSelect(dailySheetVO);
		
		resultMap.put("dataList", resultList);
		
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
	
	@ResponseBody
	@RequestMapping(value = "/ajax.updateStoRound", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String updateStoRound(HttpServletRequest request, HttpServletResponse response, @RequestBody StoVO stoVO, Model model) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		int result = cpmDailySheetService.updateStoRound(stoVO);
		
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
}
