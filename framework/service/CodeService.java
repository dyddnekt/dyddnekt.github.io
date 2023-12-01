package www.dream.bbs.framework.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import www.dream.bbs.framework.mapper.CodeMapper;
import www.dream.bbs.framework.model.CodeVO;

@Service // Container에 담기도록 지정
public class CodeService {
	@Autowired
	private CodeMapper codeMapper;

	public List<CodeVO> listAll() {
		return codeMapper.listAll();
	}
}
