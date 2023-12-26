package com.neulpum.np.tpm.vo;

import java.io.Serializable;

import org.springframework.stereotype.Component;

import lombok.Data;

@Component(value="tmpVO")
@Data
public class TmpVO implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	private String target;
	private String targetTable;
	private String targetColumn;
	private int seq;
	private int oldSortOrder;
	private int newSortOrder;
	
	private int domainSeq;
	private int ltoSeq;
	private int stoSeq;
	private int centerSeq;
	
}
