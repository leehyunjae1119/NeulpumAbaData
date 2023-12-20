package com.neulpum.np.common.utils;

import org.apache.commons.lang3.StringEscapeUtils;

@SuppressWarnings("deprecation")
public class StringUtil {

	public static String escapeHtml(String str) {
		String excapeStr = StringEscapeUtils.escapeHtml4(str);
		return excapeStr;
	}
	
	public static String unescapeHtml(String str) {
		String unescapeStr = StringEscapeUtils.unescapeHtml4(str);
		return unescapeStr;
	}
}
