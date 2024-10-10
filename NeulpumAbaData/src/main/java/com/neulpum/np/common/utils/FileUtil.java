package com.neulpum.np.common.utils;

import java.io.File;
import java.io.IOException;
import java.util.Iterator;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

public class FileUtil {
	
	private static final String EXT_SEPARATOR = ".";

	private MultipartHttpServletRequest request = null;
	private String uploadPath = null;
	private String[] allowExts = null;
	
	public FileUtil(MultipartHttpServletRequest request, String uploadPath, String[] allowExts) {
		this.request = request;
		this.uploadPath = uploadPath;
		this.allowExts = allowExts;
	}
	
	public boolean upload() throws Exception {
		boolean isUpload = false;
		
		for(Iterator<String> it = request.getFileNames(); it.hasNext();) {
			MultipartFile mFile = request.getFile(it.next());
			
			if(mFile.getOriginalFilename() == null || "".equals(mFile.getOriginalFilename())) {
				//다중파일인 경우 처리문제로 인한 예외처리
				continue;
			}
			
			System.out.println("====" + mFile.getName() + "====");
			
			String orignalFileName = mFile.getOriginalFilename();
			
			// 인가된 파일 확장자인지 확인.
			if(!checkFileExtension(orignalFileName)) {
				throw new Exception("승인되지 않은 파일확장자");
			}
			
			String fileName = mFile.getName();
			String fileExt = getFileExtension(orignalFileName);
			String filePath = this.uploadPath;
			String fileFullPath = filePath + fileName + EXT_SEPARATOR + fileExt;
			
			try {
				//경로 확인 및 생성
				File checkFolder = new File(filePath);
				if(!checkFolder.exists()) {
					checkFolder.mkdirs();
				}
				
				File saveFile = new File(fileFullPath);
				System.out.println("=== upload file name : " + fileName + EXT_SEPARATOR + fileExt);
				System.out.println("=== upload file path : " + filePath);
				
				mFile.transferTo(saveFile);
				
			} catch (IOException ie) {
				// TODO: handle exception
				throw new Exception("파입 업로드 오류");
			}
		}
		System.out.println("=== FILE UPLOAD SUCCESS ===");
		return isUpload;
	}
	
	// 허용 확장자 검수
	public boolean checkFileExtension(String fileName) {
		String fileExt = getFileExtension(fileName);
		
		for(String allow : this.allowExts) {
			if(allow.trim().toLowerCase().equals(fileExt.toLowerCase())) 
				return true;
		}
		
		return false;
	}

	// 파일 확장자 추출
	public String getFileExtension(String fileName) {
		String fileExt = "";
		
		try {
			fileExt = fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length());
		} catch (Exception e) {
			// TODO: handle exception
		}
		
		return fileExt;
	}
	
	// 파일 or 경로 존재 여부
	public static boolean checkFileExists(String filePath) {
		boolean isExists = false;
		File file = new File(filePath);
		if(file.exists()) {
			isExists = true;
		}
		return isExists;
	}
}
