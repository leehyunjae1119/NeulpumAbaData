package com.neulpum.np.ntc.web;

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
import com.neulpum.np.common.utils.SessionManager;
import com.neulpum.np.common.vo.PagingVO;
import com.neulpum.np.lgn.vo.LgnVO;
import com.neulpum.np.ntc.vo.NoticeVO;
import com.neulpum.np.ntc.service.NtcService;

@Controller
@RequestMapping(value = "/ntc")
public class NtcController {

	@Inject
	NtcService ntcService;
	
	@Inject
	SessionManager sessionManager;
	
	@RequestMapping(value = "/notice", method = RequestMethod.GET)
	public String cpmNotice(HttpServletRequest request, Locale locale, Model model) {
		return "/ntc/notice";
	}

	@ResponseBody
	@RequestMapping(value = "/ajax.selectNoticeList", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String selectNoticeList(HttpServletRequest request, HttpServletResponse response, @RequestBody NoticeVO noticeVO, Model model) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		List<NoticeVO> resultList = ntcService.selectNoticeList(noticeVO);
		NoticeVO result = ntcService.selectNoticeListCnt(noticeVO);
		
		// 페이징
		PagingVO pagingVO = PagingUtil.pagination(noticeVO.getPageNum(), result.getPageCnt());
		
		resultMap.put("resultList", resultList);
		resultMap.put("pagingVO", pagingVO);
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
	
	@ResponseBody
	@RequestMapping(value = "/ajax.selectNoticeDetail", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String selectNoticeDetail(HttpServletRequest request, HttpServletResponse response, @RequestBody NoticeVO noticeVO, Model model) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		NoticeVO result = ntcService.selectNoticeDetail(noticeVO);
		
		resultMap.put("result", result);
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
	
	@ResponseBody
	@RequestMapping(value = "/ajax.insertNoticeData", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String insertNoticeData(HttpServletRequest request, HttpServletResponse response, @RequestBody NoticeVO noticeVO, Model model) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		LgnVO lgnVO = (LgnVO)sessionManager.getSession(request);
		noticeVO.setBoardRegMmrSeq(lgnVO.getMemberSeq());
		
		int boardSeq = ntcService.insertNoticeData(noticeVO);

		resultMap.put("boardSeq", boardSeq);
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
	
	@ResponseBody
	@RequestMapping(value = "/ajax.updateNoticeData", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String updateNoticeData(HttpServletRequest request, HttpServletResponse response, @RequestBody NoticeVO noticeVO, Model model) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		ntcService.updateNoticeData(noticeVO);
		
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
	
	@ResponseBody
	@RequestMapping(value = "/ajax.deleteNoticeData", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String deleteNoticeData(HttpServletRequest request, HttpServletResponse response, @RequestBody NoticeVO noticeVO, Model model) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		ntcService.deleteNoticeData(noticeVO);
		
		json = objectMapper.writeValueAsString(resultMap);
		return json;
	}
}
