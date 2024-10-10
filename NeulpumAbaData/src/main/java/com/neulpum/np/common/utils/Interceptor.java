package com.neulpum.np.common.utils;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Enumeration;

import javax.inject.Inject;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.neulpum.np.lgn.vo.LgnVO;

public class Interceptor implements HandlerInterceptor {

	@Inject
	NpMessageSource nms;
	
	@Inject
	SessionManager sessionManager;
	
	// URL
	private static final String LGN_URL = "/lgn/sign"; 
	
	// Package
	private static final String LGN_PACKAGE = "/lgn"; 
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		
		LocalTime now = LocalTime.now();
		DateTimeFormatter hmsFormatter = DateTimeFormatter.ofPattern("HHmmss");
		String hms = now.format(hmsFormatter);
		
		String requestUrl = request.getRequestURL().toString();
		
		String scheme = request.getScheme();
		String serverName = request.getServerName();
		String serverPort = Integer.toString(request.getServerPort());
		String requestUri = request.getRequestURI();
		String realDomain = scheme + "://" + serverName;
		String header = request.getHeader("x-requested-with");
		
		LgnVO lgnVO = (LgnVO)sessionManager.getSession(request);		
		
		if(!"XMLHttpRequest".equals(header)) {
			System.out.println("## requestTime : " + now);
			System.out.println("## requestUrl : realDomain[ "+realDomain+" ]\t serverPort[ "+serverPort+" ]\t requestUri[ "+requestUri+" ]");
			if(lgnVO != null) {
				System.out.println("## requestUser : userId[ "+lgnVO.getMemberId()+" ]\t userName[ "+lgnVO.getMemberName()+" ]\t userSeq[ "+lgnVO.getMemberSeq()+" ]\t userAuth[ "+lgnVO.getMemberAuthCd()+" ]\t");
			}
		}

		String npResourceVersion = nms.getMessage("np.resource.version");
		request.setAttribute("RESC_VERSION", npResourceVersion);
		
		// [S] 로고 파일 URL 매칭
		String full_logo_url = "";
		String mini_logo_url = "";
		String report_logo_url = "";
		
		if(!StringUtils.isEmpty(request.getParameter("centerSeq"))) {
			String centerSeq = (String)request.getParameter("centerSeq");
			full_logo_url = "/upload/" + centerSeq + "/full_logo.png?version=" + hms;
			mini_logo_url = "/upload/" + centerSeq + "/mini_logo.png?version=" + hms;
			report_logo_url = "/upload/" + centerSeq + "/report_logo.png?version=" + hms;
		} else {
			full_logo_url = "../image/full_logo.png?version=" + hms;
			mini_logo_url = "../image/mini_logo.png?version=" + hms;
			report_logo_url = "../image/report_logo.png?version=" + hms;
		}
		request.setAttribute("FULL_LOGO_URL", full_logo_url);
		request.setAttribute("MINI_LOGO_URL", mini_logo_url);
		request.setAttribute("REPORT_LOGO_URL", report_logo_url);
		// [E] 로고 파일 URL 매칭
		
		// 로그인 경로 제외
		if (requestUrl.contains(LGN_PACKAGE)) {
			return true;
		}
		
		//세션이 존재하지 않음으로 로그인 페이지로 이동
		SessionManager sessionManager = new SessionManager();
		if(sessionManager.getSession(request) == null) {
			response.sendRedirect(request.getContextPath() + LGN_URL);
			return false;
		}
		
		return true;
	}
	
	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
	}

	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
	}

}
