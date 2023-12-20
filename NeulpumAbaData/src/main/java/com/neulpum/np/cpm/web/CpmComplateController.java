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

import com.neulpum.np.common.utils.PagingUtil;
import com.neulpum.np.common.vo.PagingVO;
import com.neulpum.np.cpm.service.CpmComplateService;
import com.neulpum.np.cpm.service.CpmMainService;
import com.neulpum.np.cpm.vo.ComplateVO;

@Controller
@RequestMapping(value = "/cpm")
public class CpmComplateController {
	
	@Inject
	CpmComplateService cpmComplateService; 
	
	@Inject
	CpmMainService cpmMainService; 

	@RequestMapping(value = "/cpmComplate", method = RequestMethod.GET)
	public String cpmComplate(HttpServletRequest request, Locale locale, Model model) throws Exception{
		String childrenSeq = (String) request.getParameter("childrenSeq");
		
		ComplateVO complateVO = new ComplateVO();
		complateVO.setChildrenSeq(Integer.parseInt(childrenSeq));
		List<ComplateVO> domainList = cpmComplateService.selectDomainList(complateVO);
		
		model.addAttribute("domainList", domainList);
		model.addAttribute("childrenSeq", childrenSeq);
		
		return "/cpm/cpmComplate";
	}
	
	@ResponseBody
	@RequestMapping(value = "/ajax.selectComplateList", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String selectComplateList(HttpServletRequest request, HttpServletResponse response, @RequestBody ComplateVO complateVO, Model model) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		List<ComplateVO> resultList = cpmComplateService.selectComplateList(complateVO);
		ComplateVO result = cpmComplateService.selectComplateListCnt(complateVO);
		
		// 페이징
		PagingVO pagingVO = PagingUtil.pagination(complateVO.getPageNum(), result.getPageCnt());
		
		resultMap.put("resultList", resultList);
		resultMap.put("pagingVO", pagingVO);
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
}
