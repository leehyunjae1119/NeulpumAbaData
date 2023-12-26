package com.neulpum.np.cpm.vo;

import java.io.Serializable;

import org.springframework.stereotype.Component;

import lombok.Data;

@Component(value="programVO")
@Data
public class ProgramVO implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	private String target;
	private String targetTable;
	private String targetColumn;
	private int seq;
	private int oldSortOrder;
	private int newSortOrder;
	
	private int childrenSeq;
	private int domainSeq;
	private int ltoSeq;
	private int stoSeq;
	private String statusCd;
	
	private String domainStatusCd;
	private String ltoStatusCd;
	private String stoStatusCd;
}
