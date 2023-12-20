package com.neulpum.np.cpm.service.impl;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.neulpum.np.cpm.dao.CpmProgramDao;
import com.neulpum.np.cpm.service.CpmProgramService;
import com.neulpum.np.cpm.vo.DomainVO;
import com.neulpum.np.cpm.vo.LtoVO;
import com.neulpum.np.cpm.vo.ProgramVO;
import com.neulpum.np.cpm.vo.StoVO;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class CpmProgramServiceImpl implements CpmProgramService {

	@Inject
	CpmProgramDao cpmProgramDao;

	@Override
	public List<DomainVO> selectDomain(DomainVO DomainVO) throws Exception {
		List<DomainVO> resultList = cpmProgramDao.selectDomain(DomainVO);
		return resultList;
	}
	
	@Override
	public List<LtoVO> selectLto(LtoVO LtoVO) throws Exception {
		List<LtoVO> resultList = cpmProgramDao.selectLto(LtoVO);
		return resultList;
	}
	
	@Override
	public List<StoVO> selectSto(StoVO StoVO) throws Exception {
		List<StoVO> resultList = cpmProgramDao.selectSto(StoVO);
		return resultList;
	}

	@Override
	public int updateSortOrder(ProgramVO programVO) throws Exception {
		int result = 0;
		String targetTable = "";
		String targetColumn = "";
		
		if("dto".equals(programVO.getTarget())) {
			targetTable = "TB_DOMAIN";
			targetColumn = "domain";
		} else if("lto".equals(programVO.getTarget())) {
			targetTable = "TB_LTO";
			targetColumn = "lto";
		} else if("sto".equals(programVO.getTarget())) {
			targetTable = "TB_STO";
			targetColumn = "sto";
		}
		programVO.setTargetTable(targetTable);
		programVO.setTargetColumn(targetColumn);
		
		if(!"".equals(targetColumn) && !"".equals(targetTable)) {
			cpmProgramDao.updateSortOrder(programVO);
		} else {
			throw new Exception();
		}
		
		return result;
	}
	
	@Override
	public int deleteProgram(ProgramVO programVO) throws Exception {
		int result = 0;
		String targetTable = "";
		String targetColumn = "";
		
		if("dto".equals(programVO.getTarget())) {
			targetTable = "TB_DOMAIN";
			targetColumn = "domain";
			
		} else if("lto".equals(programVO.getTarget())) {
			targetTable = "TB_LTO";
			targetColumn = "lto";
			
		} else if("sto".equals(programVO.getTarget())) {
			targetTable = "TB_STO";
			targetColumn = "sto";
			
		}
		programVO.setTargetTable(targetTable);
		programVO.setTargetColumn(targetColumn);
		
		if(!"".equals(targetColumn) && !"".equals(targetTable)) {
			cpmProgramDao.deleteProgram(programVO);
		} else {
			throw new Exception();
		}
		
		return result;
	}

	@Override
	public int reorderProgram(ProgramVO programVO) throws Exception {
		
		if("dto".equals(programVO.getTarget())) {
			DomainVO DomainVO = new DomainVO();
			List<DomainVO> DtoList = selectDomain(DomainVO);
			
			int sortOrder = 0;
			for(DomainVO vo : DtoList) {
				
				sortOrder++;
				
				ProgramVO paramVO = new ProgramVO();
				paramVO.setTargetTable("TB_DOMAIN");
				paramVO.setTargetColumn("domain");
				paramVO.setSeq(vo.getDomainSeq());
				paramVO.setNewSortOrder(sortOrder);
				
				cpmProgramDao.reorderSortOrder(paramVO);
			}
			
		} else if("lto".equals(programVO.getTarget())) {
			LtoVO LtoVO = new LtoVO();
			LtoVO.setDomainSeq(programVO.getDomainSeq());
			List<LtoVO> LtoList = selectLto(LtoVO);

			int sortOrder = 0;
			for(LtoVO vo : LtoList) {
				
				sortOrder++;
				
				ProgramVO paramVO = new ProgramVO();
				paramVO.setTargetTable("TB_LTO");
				paramVO.setTargetColumn("lto");
				paramVO.setSeq(vo.getLtoSeq());
				paramVO.setNewSortOrder(sortOrder);
				
				cpmProgramDao.reorderSortOrder(paramVO);
			}
		} else if("sto".equals(programVO.getTarget())) {
			StoVO StoVO = new StoVO();
			StoVO.setLtoSeq(programVO.getLtoSeq());
			List<StoVO> StoList = selectSto(StoVO);

			int sortOrder = 0;
			for(StoVO vo : StoList) {
				
				sortOrder++;
				
				ProgramVO paramVO = new ProgramVO();
				paramVO.setTargetTable("TB_STO");
				paramVO.setTargetColumn("sto");
				paramVO.setSeq(vo.getStoSeq());
				paramVO.setNewSortOrder(sortOrder);
				
				cpmProgramDao.reorderSortOrder(paramVO);
			}
		}
		
		return 0;
	}

	@Override
	public int insertDomain(DomainVO DomainVO) throws Exception {
		
		int result = 0;
		String[] domainNameArray = DomainVO.getDomainName().split("\\|\\|");
		String[] domainTmpSeqArray = DomainVO.getDomainTmpSeqList().split("\\|\\|");
		
		int index = 0;
		for(String domainName : domainNameArray) {
			DomainVO paramVO = new DomainVO();
			paramVO.setChildrenSeq(DomainVO.getChildrenSeq());
			paramVO.setDomainName(domainName);
			paramVO.setDomainContents(DomainVO.getDomainContents());
			paramVO.setDomainTmpSeq(Integer.parseInt(domainTmpSeqArray[index]));
			
			result += cpmProgramDao.insertDomain(paramVO);
			index++;
		}
		return result;
	}

	@Override
	public int updateDomain(DomainVO DomainVO) throws Exception {
		int result = 0;
		result = cpmProgramDao.updateDomain(DomainVO);
		return result;
	}

	@Override
	public int insertLto(LtoVO LtoVO) throws Exception {
		int result = 0;
		String[] ltoNameArray = LtoVO.getLtoName().split("\\|\\|");
		String[] ltoTmpSeqArray = LtoVO.getLtoTmpSeqList().split("\\|\\|");
		
		int index = 0;
		for(String ltoName : ltoNameArray) {
			LtoVO paramVO = new LtoVO();
			paramVO.setLtoName(ltoName);
			paramVO.setLtoContents(LtoVO.getLtoContents());
			paramVO.setDomainSeq(LtoVO.getDomainSeq());
			paramVO.setLtoTmpSeq(Integer.parseInt(ltoTmpSeqArray[index]));
			
			result += cpmProgramDao.insertLto(paramVO);
			index++;
		}
		return result;
	}

	@Override
	public int updateLto(LtoVO LtoVO) throws Exception {
		int result = 0;
		result = cpmProgramDao.updateLto(LtoVO);
		return result;
	}

	@Override
	public int insertSto(StoVO StoVO) throws Exception {
		int result = 0;
		result = cpmProgramDao.insertSto(StoVO);
		return result;
	}

	@Override
	public int updateSto(StoVO StoVO) throws Exception {
		int result = 0;
		result = cpmProgramDao.updateSto(StoVO);
		return result;
	}
	
	@Override
	public ProgramVO updateStatusCd(ProgramVO programVO) throws Exception {
		ProgramVO resultVO = new ProgramVO();
		
		int result = 0;
		String targetTable = "";
		String targetColumn = "";
		int seq = 0;
		
		if("dto".equals(programVO.getTarget())) {
			targetTable = "TB_DOMAIN";
			targetColumn = "domain";
			seq = programVO.getDomainSeq();
		} else if("lto".equals(programVO.getTarget())) {
			targetTable = "TB_LTO";
			targetColumn = "lto";
			seq = programVO.getLtoSeq();
		} else if("sto".equals(programVO.getTarget())) {
			targetTable = "TB_STO";
			targetColumn = "sto";
			seq = programVO.getStoSeq();
		}
		programVO.setTargetTable(targetTable);
		programVO.setTargetColumn(targetColumn);
		programVO.setSeq(seq);
		
		if(!"".equals(targetColumn) && !"".equals(targetTable)) {
			result = cpmProgramDao.updateStatusCd(programVO);
			resultVO = cpmProgramDao.selectProgramStatusCd(programVO);
		} else {
			throw new Exception();
		}
		return resultVO;
	}
	
	@Override
	public List<DomainVO> selectTmpDomainSelectbox(DomainVO DomainVO) throws Exception {
		List<DomainVO> resultList = cpmProgramDao.selectTmpDomainSelectbox(DomainVO);
		return resultList;
	}
	
	@Override
	public List<LtoVO> selectTmpLtoSelectbox(LtoVO LtoVO) throws Exception {
		List<LtoVO> resultList = cpmProgramDao.selectTmpLtoSelectbox(LtoVO);
		return resultList;
	}
	
	@Override
	public List<StoVO> selectTmpStoSelectbox(StoVO StoVO) throws Exception {
		List<StoVO> resultList = cpmProgramDao.selectTmpStoSelectbox(StoVO);
		return resultList;
	}
}
