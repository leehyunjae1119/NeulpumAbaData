package com.neulpum.np.tpm.service.impl;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.neulpum.np.tpm.dao.TpmDao;
import com.neulpum.np.tpm.service.TpmService;
import com.neulpum.np.tpm.vo.TmpDomainVO;
import com.neulpum.np.tpm.vo.TmpLtoVO;
import com.neulpum.np.tpm.vo.TmpStoVO;
import com.neulpum.np.tpm.vo.TmpVO;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class TpmServiceImpl implements TpmService {

	@Inject
	TpmDao tpmDao;

	@Override
	public List<TmpDomainVO> selectTmpDomain(TmpDomainVO tmpDomainVO) throws Exception {
		List<TmpDomainVO> resultList = tpmDao.selectTmpDomain(tmpDomainVO);
		return resultList;
	}
	
	@Override
	public List<TmpLtoVO> selectTmpLto(TmpLtoVO tmpLtoVO) throws Exception {
		List<TmpLtoVO> resultList = tpmDao.selectTmpLto(tmpLtoVO);
		return resultList;
	}
	
	@Override
	public List<TmpStoVO> selectTmpSto(TmpStoVO tmpStoVO) throws Exception {
		List<TmpStoVO> resultList = tpmDao.selectTmpSto(tmpStoVO);
		return resultList;
	}

	@Override
	public int updateSortOrder(TmpVO tmpVO) throws Exception {
		int result = 0;
		String targetTable = "";
		String targetColumn = "";
		
		if("dto".equals(tmpVO.getTarget())) {
			targetTable = "TB_TMP_DOMAIN";
			targetColumn = "domain";
		} else if("lto".equals(tmpVO.getTarget())) {
			targetTable = "TB_TMP_LTO";
			targetColumn = "lto";
		} else if("sto".equals(tmpVO.getTarget())) {
			targetTable = "TB_TMP_STO";
			targetColumn = "sto";
		}
		tmpVO.setTargetTable(targetTable);
		tmpVO.setTargetColumn(targetColumn);
		
		if(!"".equals(targetColumn) && !"".equals(targetTable)) {
			tpmDao.updateSortOrder(tmpVO);
		} else {
			throw new Exception();
		}
		
		return result;
	}
	
	@Override
	public int deleteProgram(TmpVO tmpVO) throws Exception {
		int result = 0;
		String targetTable = "";
		String targetColumn = "";
		
		if("dto".equals(tmpVO.getTarget())) {
			targetTable = "TB_TMP_DOMAIN";
			targetColumn = "domain";
			
		} else if("lto".equals(tmpVO.getTarget())) {
			targetTable = "TB_TMP_LTO";
			targetColumn = "lto";
			
		} else if("sto".equals(tmpVO.getTarget())) {
			targetTable = "TB_TMP_STO";
			targetColumn = "sto";
			
		}
		tmpVO.setTargetTable(targetTable);
		tmpVO.setTargetColumn(targetColumn);
		
		if(!"".equals(targetColumn) && !"".equals(targetTable)) {
			tpmDao.deleteProgram(tmpVO);
		} else {
			throw new Exception();
		}
		
		return result;
	}

	@Override
	public int reorderProgram(TmpVO tmpVO) throws Exception {
		
		if("dto".equals(tmpVO.getTarget())) {
			TmpDomainVO tmpDomainVO = new TmpDomainVO();
			tmpDomainVO.setCenterSeq(tmpVO.getCenterSeq());
			List<TmpDomainVO> tmpDtoList = selectTmpDomain(tmpDomainVO);
			
			int sortOrder = 0;
			for(TmpDomainVO vo : tmpDtoList) {
				
				sortOrder++;
				
				TmpVO paramVO = new TmpVO();
				paramVO.setTargetTable("TB_TMP_DOMAIN");
				paramVO.setTargetColumn("domain");
				paramVO.setSeq(vo.getDomainSeq());
				paramVO.setNewSortOrder(sortOrder);
				
				tpmDao.reorderSortOrder(paramVO);
			}
			
		} else if("lto".equals(tmpVO.getTarget())) {
			TmpLtoVO tmpLtoVO = new TmpLtoVO();
			tmpLtoVO.setDomainSeq(tmpVO.getDomainSeq());
			List<TmpLtoVO> tmpLtoList = selectTmpLto(tmpLtoVO);

			int sortOrder = 0;
			for(TmpLtoVO vo : tmpLtoList) {
				
				sortOrder++;
				
				TmpVO paramVO = new TmpVO();
				paramVO.setTargetTable("TB_TMP_LTO");
				paramVO.setTargetColumn("lto");
				paramVO.setSeq(vo.getLtoSeq());
				paramVO.setNewSortOrder(sortOrder);
				
				tpmDao.reorderSortOrder(paramVO);
			}
		} else if("sto".equals(tmpVO.getTarget())) {
			TmpStoVO tmpStoVO = new TmpStoVO();
			tmpStoVO.setLtoSeq(tmpVO.getLtoSeq());
			List<TmpStoVO> tmpStoList = selectTmpSto(tmpStoVO);

			int sortOrder = 0;
			for(TmpStoVO vo : tmpStoList) {
				
				sortOrder++;
				
				TmpVO paramVO = new TmpVO();
				paramVO.setTargetTable("TB_TMP_STO");
				paramVO.setTargetColumn("sto");
				paramVO.setSeq(vo.getStoSeq());
				paramVO.setNewSortOrder(sortOrder);
				
				tpmDao.reorderSortOrder(paramVO);
			}
		}
		
		return 0;
	}

	@Override
	public int insertDomain(TmpDomainVO tmpDomainVO) throws Exception {
		
		int result = 0;
		String[] domainNameArray = tmpDomainVO.getDomainName().split("\\|\\|");
		
		for(String domainName : domainNameArray) {
			TmpDomainVO paramVO = new TmpDomainVO();
			paramVO.setDomainName(domainName);
			paramVO.setDomainContents(tmpDomainVO.getDomainContents());
			paramVO.setCenterSeq(tmpDomainVO.getCenterSeq());
			
			result += tpmDao.insertDomain(paramVO);
		}
		return result;
	}

	@Override
	public int updateDomain(TmpDomainVO tmpDomainVO) throws Exception {
		int result = 0;
		result = tpmDao.updateDomain(tmpDomainVO);
		return result;
	}

	@Override
	public int insertLto(TmpLtoVO tmpLtoVO) throws Exception {
		int result = 0;
		String[] ltoNameArray = tmpLtoVO.getLtoName().split("\\|\\|");
		
		for(String ltoName : ltoNameArray) {
			TmpLtoVO paramVO = new TmpLtoVO();
			paramVO.setLtoName(ltoName);
			paramVO.setLtoContents(tmpLtoVO.getLtoContents());
			paramVO.setDomainSeq(tmpLtoVO.getDomainSeq());
			
			result += tpmDao.insertLto(paramVO);
		}
		return result;
	}

	@Override
	public int updateLto(TmpLtoVO tmpLtoVO) throws Exception {
		int result = 0;
		result = tpmDao.updateLto(tmpLtoVO);
		return result;
	}

	@Override
	public int insertSto(TmpStoVO tmpStoVO) throws Exception {
		int result = 0;
		String[] stoNameArray = tmpStoVO.getStoName().split("\\|\\|");
		
		for(String stoName : stoNameArray) {
			TmpStoVO paramVO = new TmpStoVO();
			paramVO.setStoName(stoName);
			paramVO.setStoContents(tmpStoVO.getStoContents());
			
			paramVO.setLtoSeq(tmpStoVO.getLtoSeq());
			paramVO.setStoTrialCnt(tmpStoVO.getStoTrialCnt());
			paramVO.setStoArrStdPst(tmpStoVO.getStoArrStdPst());
			paramVO.setStoUrgContents(tmpStoVO.getStoUrgContents());
			paramVO.setStoRnfcContents(tmpStoVO.getStoRnfcContents());
			
			result += tpmDao.insertSto(paramVO);
		}
		return result;
	}

	@Override
	public int updateSto(TmpStoVO tmpStoVO) throws Exception {
		int result = 0;
		result = tpmDao.updateSto(tmpStoVO);
		return result;
	}
}
