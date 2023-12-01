package www.dream.bbs.board.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import www.dream.bbs.board.model.BoardVO;
import www.dream.bbs.board.service.BoardService;

@Controller		// Container에 담기도록 지정
@RequestMapping("/bb")
public class BoardController {
	@Autowired
	private BoardService boardService;

	// /bb/anonymous/listAll
	@GetMapping("/anonymous/listAll")
	public ResponseEntity<List<BoardVO>> listAll() {
		List<BoardVO> list = boardService.listAll();
		return new ResponseEntity<>(list, HttpStatus.OK);
	}

	// /bb/anonymous/000p
	@GetMapping("/anonymous/{id}")
	public ResponseEntity<BoardVO> findById(@PathVariable String id) {
		BoardVO board = boardService.findById(id);
		return ResponseEntity.ok(board);
	}
}
