package com.neulpum.np.common.utils;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

public class testUtil {
	public static void main(String[] args) {
		LocalTime now = LocalTime.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HHmmss");
		String hms = now.format(formatter);
		
		System.out.println(hms);
	}

}
