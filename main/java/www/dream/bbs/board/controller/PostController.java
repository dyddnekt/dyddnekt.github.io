package www.dream.bbs.board.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import www.dream.bbs.board.model.PostVO;
import www.dream.bbs.board.model.ReplyVO;
import www.dream.bbs.board.service.PostService;
import www.dream.bbs.framework.exception.BusinessException;
import www.dream.bbs.framework.model.DreamPair;
import www.dream.bbs.framework.model.PagingDTO;
import www.dream.bbs.framework.nlp.pos.service.NounExtractor;
import www.dream.bbs.party.model.User4PartyVO;

@RestController // Container에 담기도록 지정
@RequestMapping("/post")
// @CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "Requestor-Type", exposedHeaders = "x-auth-token")
public class PostController {
	@Autowired
	private PostService postService;

	public PostController(PostService postService) {
		this.postService = postService;
	}

	// /post/anonymous/listAll/000p
	@GetMapping("/anonymous/listAll/{boardId}/{page}")
	public ResponseEntity<DreamPair<List<PostVO>, PagingDTO>> listAllPost(@PathVariable String boardId,
			@PathVariable int page) {
		DreamPair<List<PostVO>, PagingDTO> result = postService.listAllPost(boardId, page);
		return new ResponseEntity<>(result, HttpStatus.OK);
	}

	// /post/anonymous/search/000p/사랑/1
	@GetMapping("/anonymous/search/{boardId}/{search}/{page}")
	public ResponseEntity<DreamPair<List<PostVO>, PagingDTO>> search(@PathVariable String boardId,
			@PathVariable String search, @PathVariable int page) {
		DreamPair<List<PostVO>, PagingDTO> result = postService.search(boardId, search, page);
		return new ResponseEntity<>(result, HttpStatus.OK);
	}

	// /post/anonymous/getPost/p001/0001
	@GetMapping("/anonymous/getPost/{postId}/{userId}")
	public ResponseEntity<PostVO> findById(@PathVariable String postId, @PathVariable String userId) {
		return new ResponseEntity<>(postService.findById(postId, userId), HttpStatus.OK);
	}

	// /post/extractTag?docs=잠자리채집&docs=데이터분석
	// 유일한 단어 집합
	@GetMapping("/extractTag")
	public ResponseEntity<Set<String>> extractTag(String[] docs) {
		Set<String> ret = new HashSet<>();
		for (String doc : docs) {
			ret.addAll(NounExtractor.extractNoun(doc));
		}
		return new ResponseEntity<>(ret, HttpStatus.OK);
	}

	// /post/anonymous/searchMovies/{genreList}/{ageLimitList}/{text}
	@GetMapping("/anonymous/searchMovies/{genreList}/{ageLimitList}/{text}")
	public ResponseEntity<List<PostVO>> searchMovies(@PathVariable String genreList, 
			@PathVariable String ageLimitList, @PathVariable String text) {
		String listGenre = genreList.substring(1, genreList.length() - 1);
		String listAgeLimit = ageLimitList.substring(1, ageLimitList.length() - 1);
		return new ResponseEntity<>(postService.searchMovies(listGenre, listAgeLimit, text), HttpStatus.OK);
	}

	// /post/managePost
	@PostMapping("/managePost")
	@PreAuthorize("hasAnyRole('member','manager')")
	public ResponseEntity<Integer> managePost(@AuthenticationPrincipal User4PartyVO user,
			@RequestBody PostVO post) throws BusinessException {
		return new ResponseEntity<>(postService.managePost(post), HttpStatus.OK);
	}

	// /post/manageReply
	@PostMapping("/manageReply")
	public ResponseEntity<ReplyVO> manageReply(@RequestBody DreamPair<ReplyVO, ReplyVO> reply) {
		ReplyVO parent = reply.getFirstVal();
		ReplyVO newReply = reply.getSecondVal();
		return new ResponseEntity<>(postService.manageReply(parent, newReply), HttpStatus.OK);
	}

	@GetMapping("/postUpdateStarScore")
	public ResponseEntity<Integer> postUpdateStarScore(String id) {
		return new ResponseEntity<>(postService.postUpdateStarScore(id), HttpStatus.OK);
	}

	// /post/{id}
	@DeleteMapping("/{id}")
	public ResponseEntity<Integer> deleteReply(@PathVariable String id) {
		return new ResponseEntity<>(postService.deleteReply(id), HttpStatus.OK);
	}
}
