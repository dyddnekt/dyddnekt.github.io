package www.dream.bbs.board.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.SortedSet;
import java.util.TreeSet;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ObjectUtils;

import www.dream.bbs.board.mapper.PostMapper;
import www.dream.bbs.board.model.PostVO;
import www.dream.bbs.board.model.ReplyVO;
import www.dream.bbs.fileattachment.model.dto.AttachFileDTO;
import www.dream.bbs.fileattachment.service.AttachFileService;
import www.dream.bbs.framework.model.DreamPair;
import www.dream.bbs.framework.model.PagingDTO;
import www.dream.bbs.framework.nlp.pos.service.NounExtractor;
import www.dream.bbs.framework.property.PropertyExtractor;
import www.dream.bbs.iis.model.TagRelId;
import www.dream.bbs.iis.model.TagRelVO;
import www.dream.bbs.iis.model.TagVO;
import www.dream.bbs.iis.service.TagService;

@Service // Container에 담기도록 지정
public class PostService {
	@Autowired
	private PostMapper postMapper;
	@Autowired
	private TagService tagService;
	@Autowired
	private AttachFileService attachFileService;

	/** 게시판의 모든 원글 조회 */
	public DreamPair<List<PostVO>, PagingDTO> listAllPost(String boardId, int page) {
		PagingDTO paging = new PagingDTO(page);
		List<PostVO> listResult = postMapper.listAllPost(boardId, paging);
		long dataCount = postMapper.getFoundRows();
		paging.buildPagination(dataCount);

		return new DreamPair(listResult, paging);
	}

	/** 게시판에서 검색 */
	public DreamPair<List<PostVO>, PagingDTO> search(String boardId, String search, int page) {
		String[] arrSearch = search.split(" ");
		PagingDTO paging = new PagingDTO(page);
		if (arrSearch.length == 0) {
			paging.buildPagination(0);
			return new DreamPair(new ArrayList<>(), paging);
		}
		List<PostVO> listResult = postMapper.searchByTfIdf(boardId, arrSearch, paging);
		long dataCount = postMapper.getFoundRows();
		System.out.println("dataCount : " + dataCount);
		paging.buildPagination(dataCount);

		return new DreamPair(listResult, paging);
	}

	/** 원글 상세, 첨부파일 목록, 댓글과 대댓글 등의 목록이 내부 변수에 채워짐 */
	public PostVO findById(String postId, String userId) {
		// postMapper.findById는 id의 primary key 특성으로 사전순서가 보장되어 있음
		List<ReplyVO> oneDimList = postMapper.findById(postId);
		if (oneDimList.isEmpty()) {
			return null;
		}
		PostVO ret = (PostVO) oneDimList.get(0);
		ret.incReadCnt();
		postMapper.incReadCnt(ret.getId());

		// attachFileService
		List<AttachFileDTO> attachFileList = attachFileService.getAttachFileList(ret);
		ret.setListAttachFile(attachFileList);

		Map<String, ReplyVO> map = new HashMap<>();
		for (ReplyVO reply : oneDimList) {
			map.put(reply.getId(), reply);

			ReplyVO parent = map.get(reply.extractParentId());
			String replyString = reply.getId().substring(4);

			// 원글이면 null이 됨
			if(userId.equals(replyString)) {
				parent.setMyReply(reply);
			} else if (parent != null) {
				parent.appendReply(reply);
			}
		}
		return ret;
	}

	/** 검색 페이지에서 영화(게시글)검색 */
	public List<PostVO> searchMovies(String genreList, String ageLimitList, String search) {
		String[] arrGenre = genreList.split(",");
		String[] arrAgeLimit = ageLimitList.split(",");

		if (search.equals("아무것도입력되지않았습니다")) {
			return postMapper.searchAllMovies(arrGenre, arrAgeLimit);
		}

		String[] arrSearch = search.split(" ");
		arrSearch = Arrays.stream(arrSearch).filter(item -> !item.equals("")).toArray(String[]::new);

		return postMapper.searchMovies(arrGenre, arrAgeLimit, arrSearch);
	}

	/* affected row counts */
	/**
	 * 게시판에 원글 등록 신규 tag면 등록 모든 tag와 TF 등재 및 tag의 df 수정
	 */
	@Transactional
	public int managePost(PostVO post) {
		// post.id가 있으면 수정, 없으면 신규.
		if (ObjectUtils.isEmpty(post.getId())) {
			// 해당 게시판에 게시글 건수(post_cnt) 또한 올려줘야함.
			int cnt = postMapper.createPost(post);
			attachFileService.createAttachFiles(post);
			return cnt;
		} else { /** 원글 수정 */
			// 게시물과 단어 사이의 기존 관계 삭제
			attachFileService.deleteAttachFiles(post);

			int cnt = postMapper.updatePost(post);
			attachFileService.createAttachFiles(post);
			return cnt;
		}
	}

	/** 댓글 달기, parent의 id의 연결된 id 만들기 */
	public ReplyVO manageReply(ReplyVO parent, ReplyVO reply) {
		// reply.id가 있으면 수정, 없으면 신규
		//nullSafeEquals 주어진 객체가 동일한지 확인하고 true둘 다인 경우 null또는 false하나만인 경우 반환합니다 null
		boolean isIn = postMapper.findReplyId(reply.getId());
		if(isIn) {
			//댓글 아이디와 원글+본인 아이디의 조합으로 만들어진 이름과 동일할 경우 수정
			int cnt = postMapper.updateReply(reply);
			reply.setCurDate();
			return reply;
		} else {
			//댓글 신규등록
			int cnt = postMapper.createReply(parent, reply);
			reply.setCurDate();
			return reply;
		}
	}

	public int postUpdateStarScore(String id) {
		return postMapper.postUpdateStarScore(id);
	}

	/** id like로 지우기 */
	public int deleteReply(String id) {
		return postMapper.deleteReply(id);
	}

	private Map<String, Integer> buildTF(PostVO post) {
		// 대상이되는 문자열 추출
		List<String> docs = PropertyExtractor.extractProperty(post);

		List<String> listNoun = new ArrayList<>();
		for (String doc : docs) {
			if (doc == null)
				continue;
			// 대상이되는 문자열속의 명사 추출
			doc = doc.trim();
			if (!doc.isEmpty())
				listNoun.addAll(NounExtractor.extractNoun(doc));
		}

		// 게시글 수정 처리는 미루어 둘 것임
		Map<String, Integer> mapWordCnt = new HashMap<>();

		for (String noun : listNoun) {
			if (mapWordCnt.containsKey(noun)) {
				mapWordCnt.put(noun, mapWordCnt.get(noun) + 1);
			} else {
				mapWordCnt.put(noun, 1);
			}
		}
		return mapWordCnt;
	}

	@Transactional
	private void createTagRelation(PostVO post) {
		Map<String, Integer> mapTF = buildTF(post);

		// 기존 단어 찾음. 기존 단어의 df는 이 문서에서 나온 단어 출현 횟수를 올려주어야 함.
		List<TagVO> listExistingTags = tagService.findByWord(mapTF.keySet());

		// 새 단어 목록 찾기. 성능을 고려한 개발. 따라서 정렬을 도입함
		SortedSet<String> 기존단어목록 = new TreeSet(
				listExistingTags.stream().map(tagVO -> tagVO.getWord()).collect(Collectors.toList()));
		List<String> listNewWords = mapTF.keySet().stream().filter(word -> !기존단어목록.contains(word))
				.collect(Collectors.toList());
		List<TagVO> listNewTags = listNewWords.stream()
				.map(newWord -> new TagVO(tagService.getId("s_tag"), newWord, "")).collect(Collectors.toList());
		tagService.saveAllTag(listNewTags);

		// 게시물과 단어 사이의 관계 만들기
		List<TagRelVO> list = listExistingTags.stream().map(
				tagVO -> new TagRelVO(new TagRelId("T_reply", post.getId(), tagVO.getId()), mapTF.get(tagVO.getWord())))
				.collect(Collectors.toList());
		for (TagVO tagVO : listNewTags) {
			TagRelId id = new TagRelId("T_reply", post.getId(), tagVO.getId());
			list.add(new TagRelVO(id, mapTF.get(tagVO.getWord())));
		}
		tagService.saveAllTagRel(list);
	}
}
