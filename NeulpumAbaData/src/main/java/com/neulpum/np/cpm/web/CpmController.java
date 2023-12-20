package com.neulpum.np.cpm.web;

import java.util.Locale;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping(value = "/cpm")
public class CpmController {

	@RequestMapping(value = "/children", method = RequestMethod.GET)
	public String children(HttpServletRequest request, Locale locale, Model model) {
		return "/common/childrenSelect";
	}
	
}
