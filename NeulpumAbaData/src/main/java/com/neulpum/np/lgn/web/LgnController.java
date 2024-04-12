package com.neulpum.np.lgn.web;

import java.util.HashMap;
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
import com.neulpum.np.lgn.service.LgnService;
import com.neulpum.np.lgn.vo.LgnVO;


@Controller
@RequestMapping(value = "/lgn", method = RequestMethod.GET)
public class LgnController {
	
	private final String MESSAGE_CODE_SUCCESS 		= "0";	//성공 
	private final String MESSAGE_CODE_AUTHWARN 		= "1";	//미승인
	private final String MESSAGE_CODE_PWDWARN 		= "2";	//비밀번호불일치
	private final String MESSAGE_CODE_FAIL 			= "3";	//실패
	private final String MESSAGE_CODE_DUPL 			= "4";	//중복

	@Inject
	LgnService lgnService;
	
	@Inject
	SessionManager sessionManager;
	
	@RequestMapping(value = "/sign", method = RequestMethod.GET)
	public String sign(HttpServletRequest request, Locale locale, Model model) {
		sessionManager.expires(request);
		return "/lgn/sign";
	}
	
	@ResponseBody
	@RequestMapping(value = "/ajax.signIn", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String loginAjax(HttpServletRequest request, HttpServletResponse response, @RequestBody LgnVO lgnVO, Model model) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		LgnVO result = lgnService.signIn(lgnVO);
		String messageCd = "";
		
		sessionManager.expires(request);
		
		if(result == null) {
			messageCd = MESSAGE_CODE_FAIL;
			
		} else {
			if(lgnVO.getMemberPw().equals(result.getMemberPw()) && "Y".equals(result.getMemberApprovalYn())) {
				messageCd = MESSAGE_CODE_SUCCESS;
				result.setMemberPw(null);
				
				if(lgnVO.getIsRememberMe() == 0) {
					sessionManager.setSESSION_COOKIE_MAXAGE(12*60*60);
				} else {
					sessionManager.setSESSION_COOKIE_MAXAGE(30*24*60*60);
				}
				sessionManager.createSession(result, response);
				
			} else if(lgnVO.getMemberPw().equals(result.getMemberPw()) && "N".equals(result.getMemberApprovalYn())) {
				messageCd = MESSAGE_CODE_AUTHWARN;
				
			} else {
				messageCd = MESSAGE_CODE_PWDWARN;
				
			}
		}
		
		resultMap.put("result", result);
		resultMap.put("messageCd", messageCd);
		json = objectMapper.writeValueAsString(resultMap);
		
		return json;
	}

	@ResponseBody
	@RequestMapping(value = "/ajax.signUp", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public String joinAjax(HttpServletRequest request, HttpServletResponse response, Model model, @RequestBody LgnVO lgnVO) throws Exception {
		
		String json = "";
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		String messageCd = "";
		
		boolean idChk = lgnService.isDuplicateId(lgnVO);
		if(idChk) {
			int res = lgnService.signUp(lgnVO);
			if(res > 0) {
				messageCd = MESSAGE_CODE_SUCCESS;
			} else {
				messageCd = MESSAGE_CODE_FAIL;
			}
		} else {
			messageCd = MESSAGE_CODE_DUPL;
		}
		
		resultMap.put("messageCd", messageCd);
		
		json = objectMapper.writeValueAsString(resultMap);
		
		return json;
	}
	
	@RequestMapping(value = "/signOut", method = RequestMethod.GET)
	public String signOut(HttpServletRequest request, HttpServletResponse response, Locale locale, Model model) {
		sessionManager.expires(request);
		return "/lgn/sign";
	}
}
