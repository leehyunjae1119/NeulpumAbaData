package com.neulpum.np.dpm.web;

import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.neulpum.np.common.utils.SessionManager;
import com.neulpum.np.cpm.service.CpmCounselingService;
import com.neulpum.np.cpm.service.CpmDailySheetService;
import com.neulpum.np.cpm.vo.CounselingVO;
import com.neulpum.np.cpm.vo.DailySheetVO;

@Controller
@RequestMapping(value = "/dpm", method = RequestMethod.GET)
public class DpmController {
	
	@Inject
	CpmDailySheetService cpmDailySheetService;
	
	@Inject
	CpmCounselingService cpmCounselingService;
	
	@Inject
	SessionManager sessionManager;
	
	@RequestMapping(value = "/children", method = RequestMethod.GET)
	public String children(HttpServletRequest request, Locale locale, Model model) {
		return "/common/childrenSelect";
	}
	
	@RequestMapping(value = "/dailySheet", method = RequestMethod.GET)
	public String dailySheet(HttpServletRequest request, Locale locale, Model model) throws Exception {
		String childrenSeq = (String) request.getParameter("childrenSeq");
		
		// 데일리 시트 조회
		DailySheetVO paramVO = new DailySheetVO();
		paramVO.setChildrenSeq(Integer.parseInt(childrenSeq));
		
		List<Map<String, Object>> initData = cpmDailySheetService.selectDailySheetInit(paramVO);
		
		model.addAttribute("childrenSeq", childrenSeq);
		model.addAttribute("initData", initData);
		
		return "/dpm/dailySheet";
	}

}
