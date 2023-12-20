package com.neulpum.np.common.utils;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

public class Interceptor implements HandlerInterceptor {

	@Inject
	NpMessageSource nms;
	
	// URL
	private static final String LGN_URL = "/lgn/sign"; 
	
	// Package
	private static final String LGN_PACKAGE = "/lgn"; 
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		
		String npResourceVersion = nms.getMessage("np.resource.version");
		request.setAttribute("RESC_VERSION", npResourceVersion);
		
		String requestUrl = request.getRequestURL().toString();
		
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
