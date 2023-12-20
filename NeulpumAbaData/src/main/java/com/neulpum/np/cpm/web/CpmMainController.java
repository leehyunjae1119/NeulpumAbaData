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
import com.neulpum.np.cpm.vo.CounselingVO;
import com.neulpum.np.cpm.vo.DomainVO;
import com.neulpum.np.tpm.vo.TmpStoVO;

@Controller
@RequestMapping(value = "/cpm")
public class CpmMainController {
	
	@Inject
	CpmMainService cpmMainService;

	@RequestMapping(value = "/cpmMain", method = RequestMethod.GET)
	public String cpmMain(HttpServletRequest request, Locale locale, Model model) throws Exception {
		String childrenSeq = (String) request.getParameter("childrenSeq");
		
		// 커리큘럼 데이터 조회
		DomainVO paramVO1 = new DomainVO();
		paramVO1.setChildrenSeq(Integer.parseInt(childrenSeq));
		Map<String, Object> curriculumData = cpmMainService.selectCurriculum(paramVO1);
		
		// STO 준거도달 그래프 데이터 조회
		// > 비동기 처리
		
		// 상담일지 조회
		CounselingVO paramVO3 = new CounselingVO();
		paramVO3.setChildrenSeq(Integer.parseInt(childrenSeq));
		List<CounselingVO> counselingData = cpmMainService.selectCounseling(paramVO3);
		
		model.addAttribute("curriculumData", curriculumData);
		model.addAttribute("counselingData", counselingData);
		
		return "/cpm/cpmMain";
	}
	
	@ResponseBody
	@RequestMapping(value = "/ajax.selectStoComplateData", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String selectStoComplateData(HttpServletRequest request, HttpServletResponse response, @RequestBody DomainVO domainVO, Model model) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		List<DomainVO> stoComplateData = cpmMainService.selectStoComplateData(domainVO);
		
		resultMap.put("stoComplateData", stoComplateData);
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
}
