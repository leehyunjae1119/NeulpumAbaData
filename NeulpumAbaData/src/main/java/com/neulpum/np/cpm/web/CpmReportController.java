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

import com.neulpum.np.cpm.service.CpmMainService;
import com.neulpum.np.cpm.service.CpmProgramService;
import com.neulpum.np.cpm.service.CpmReportService;
import com.neulpum.np.cpm.vo.DomainVO;
import com.neulpum.np.cpm.vo.ReportVO;
import com.neulpum.np.cpm.vo.StoPointVO;
import com.neulpum.np.lgn.vo.LgnVO;

@Controller
@RequestMapping(value = "/cpm")
public class CpmReportController {
	
	@Inject
	CpmMainService cpmMainService;
	
	@Inject
	CpmReportService cpmReportService;
	
	@Inject
	CpmProgramService cpmProgramService;

	@RequestMapping(value = "/cpmReport", method = RequestMethod.GET)
	public String cpmReport(HttpServletRequest request, Locale locale, Model model) {
		String childrenSeq = (String) request.getParameter("childrenSeq");
		
		model.addAttribute("childrenSeq", childrenSeq);
		return "/cpm/cpmReport";
	}
	
	@ResponseBody
	@RequestMapping(value = "/ajax.selectReportDataList", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String selectReportDataList(HttpServletRequest request, HttpServletResponse response, @RequestBody ReportVO reportVO, Model model) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		// 영역리스트 조회
		DomainVO paramVO1 = new DomainVO();
		paramVO1.setChildrenSeq(reportVO.getChildrenSeq());
		Map<String, Object> curriculumData = cpmMainService.selectCurriculum(paramVO1);
		
		//보고서 내용 조회
		List<ReportVO> reportData = cpmReportService.selectReportDataList(reportVO);
		
		resultMap.put("curriculumData", curriculumData);
		resultMap.put("reportData", reportData);
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
	
	@ResponseBody
	@RequestMapping(value = "/ajax.selectReportStoComplateChartData", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String selectReportStoComplateChartData(HttpServletRequest request, HttpServletResponse response, @RequestBody ReportVO reportVO, Model model) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		List<ReportVO> chartData = cpmReportService.selectReportStoComplateChartData(reportVO);
		
		resultMap.put("stoComplateChartData", chartData);
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
	
	@ResponseBody
	@RequestMapping(value = "/ajax.selectReportLtoComplateChartData", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String selectReportLtoComplateChartData(HttpServletRequest request, HttpServletResponse response, @RequestBody ReportVO reportVO, Model model) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		List<Map<String, Object>> chartData = cpmReportService.selectReportLtoComplateChartData(reportVO);
		
		DomainVO paramDomain = new DomainVO();
		paramDomain.setChildrenSeq(reportVO.getChildrenSeq());
		List<DomainVO> domainList = cpmProgramService.selectDomain(paramDomain);
		
		resultMap.put("ltoComplateChartData", chartData);
		resultMap.put("ltoComplateDomainList", domainList);
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
}
