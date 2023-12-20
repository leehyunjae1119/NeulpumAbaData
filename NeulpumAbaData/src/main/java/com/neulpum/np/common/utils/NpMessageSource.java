package com.neulpum.np.common.utils;

import java.util.Locale;

import org.springframework.context.MessageSource;
import org.springframework.context.NoSuchMessageException;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;

public class NpMessageSource extends ReloadableResourceBundleMessageSource implements MessageSource{

	private ReloadableResourceBundleMessageSource reloadableResourceBundleMessageSource;
	
	public void setReloadableResourceBundleMessageSource(ReloadableResourceBundleMessageSource reloadableResourceBundleMessageSource) {
		this.reloadableResourceBundleMessageSource = reloadableResourceBundleMessageSource;
	}
	
	public ReloadableResourceBundleMessageSource getReloadableResourceBundleMessageSource() {
		return reloadableResourceBundleMessageSource;
	}
	
	public String getMessage(String code) {
		String msg = null;
		
		try {
			msg = getReloadableResourceBundleMessageSource().getMessage(code, null, Locale.KOREA);
		} catch (NoSuchMessageException e) {
			msg = null;
		}
		
		return msg;
	}
	
	public String getMessage(String code, Object[] args) {
		String msg = null;
		
		try {
			msg = getReloadableResourceBundleMessageSource().getMessage(code, args, Locale.KOREA);
		} catch (NoSuchMessageException e) {
			msg = null;
		}
		
		return msg;
	}
}
