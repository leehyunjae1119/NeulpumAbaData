package com.neulpum.np.mng.vo;

import org.springframework.stereotype.Component;

import com.neulpum.np.common.vo.PagingVO;

import lombok.Data;


/**
 * 아동 정보 VO
 */
@Component(value="childrenVO")
@Data
public class ChildrenVO extends PagingVO {
	
	private static final long serialVersionUID = 1L;
	
	private int rownum;           			//번호            
	private int childrenSeq;           		//아동 번호            
	private String childrenName;          	//아동 이름            
	private String childrenBirth;         	//아동 생년월일          
	private String childrenDiagnosis;     	//아동 진단명           
	private String childrenMemo;          	//아동 메모            
	private int childrenPositionCd;   		//아동 소속 코드         
	private int childrenGroupCd;      		//아동 그룹 코드         
	private String childrenActiveYn;     	//아동 활성화 여부        
	private String childrenProgStDt;    	//아동 프로그램 시작 일시    
	private String childrenProgEdDt;    	//아동 프로그램 종료 일시    
	private String childrenParents;       	//아동 부모님     
	private String childrenBookImg;       	//아동 책 이미지     
	
	private String centerName;				//아동 소속 이름
	private String groupName;      			//아동 그룹 이름 
	
	private String chdGroupSeqArray;		//아동 그룹 번호 묶음

}
