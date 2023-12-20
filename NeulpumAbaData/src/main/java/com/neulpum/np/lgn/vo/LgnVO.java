package com.neulpum.np.lgn.vo;

import java.io.Serializable;

import org.springframework.stereotype.Component;

import lombok.Data;

/**
 * 회원 정보 VO
 */
@Component(value="lgnVO")
@Data
public class LgnVO implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	private int memberSeq;             //회원 번호   
	private String memberId;           //회원 아이디  
	private String memberPw;           //회원 비밀번호 
	private String memberName;         //회원 이름   
	private String memberEmail;        //회원 이메일  
	private String memberCp;           //회원 연락처  
	private String memberAuthCd;       //회원 권한 코드
	private int memberPositionCd;      //회원 소속 코드
	private String memberApprovalYn;   //회원 승인 여부
	private String memberRegDt;        //회원 등록 일시
	
	private String messageCd;
	private int choiceCenterSeq; 	   //선택한 센터 번호
	
	private int isRememberMe;
}









