package com.neulpum.np.cpm.web;

import java.util.Locale;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping(value = "/cpm")
public class CpmGraphController {

	@RequestMapping(value = "/cpmGraph", method = RequestMethod.GET)
	public String cpmGraph(HttpServletRequest request, Locale locale, Model model) {
		String childrenSeq = (String) request.getParameter("childrenSeq");

		model.addAttribute("cpmReport", childrenSeq);
		return "/grp/graph";
	}
}
