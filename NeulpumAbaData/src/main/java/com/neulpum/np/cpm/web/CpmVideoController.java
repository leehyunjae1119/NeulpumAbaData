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
import com.neulpum.np.cpm.service.CpmVideoService;
import com.neulpum.np.cpm.vo.VideoVO;

@Controller
@RequestMapping(value = "/cpm")
public class CpmVideoController {
	
	@Inject
	CpmVideoService cpmVideoService;

	@RequestMapping(value = "/cpmVideo", method = RequestMethod.GET)
	public String cpmVideo(HttpServletRequest request, Locale locale, Model model) {
		String childrenSeq = (String) request.getParameter("childrenSeq");

		model.addAttribute("childrenSeq", childrenSeq);
		return "/cpm/cpmVideo";
	}
	
	@ResponseBody
	@RequestMapping(value = "/ajax.selectVideoList", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String selectVideoList(HttpServletRequest request, HttpServletResponse response, @RequestBody VideoVO videoVO, Model model) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		List<VideoVO> resultList = cpmVideoService.selectVideoList(videoVO);
		VideoVO result = cpmVideoService.selectVideoListCnt(videoVO);
		
		// 페이징
		PagingVO pagingVO = PagingUtil.pagination(videoVO.getPageNum(), result.getPageCnt());
		
		resultMap.put("resultList", resultList);
		resultMap.put("pagingVO", pagingVO);
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
	
	@ResponseBody
	@RequestMapping(value = "/ajax.insertVideoData", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String insertVideoData(HttpServletRequest request, HttpServletResponse response, @RequestBody VideoVO videoVO, Model model) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		cpmVideoService.insertVideoData(videoVO);

		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
	
	@ResponseBody
	@RequestMapping(value = "/ajax.updateVideoData", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String updateVideoData(HttpServletRequest request, HttpServletResponse response, @RequestBody VideoVO videoVO, Model model) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		cpmVideoService.updateVideoData(videoVO);
		
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
	
	@ResponseBody
	@RequestMapping(value = "/ajax.deleteVideoData", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String deleteVideoData(HttpServletRequest request, HttpServletResponse response, @RequestBody VideoVO videoVO, Model model) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		cpmVideoService.deleteVideoData(videoVO);
		
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
}
