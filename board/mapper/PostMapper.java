package www.dream.bbs.board.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import www.dream.bbs.board.model.PostVO;
import www.dream.bbs.board.model.ReplyVO;
import www.dream.bbs.framework.model.PagingDTO;

@Mapper // Container에 담기도록 지정
public interface PostMapper {
	// LRCUD 순서로 함수들을 배치하여 빠르게 따라갈(추적성) 수 있도록 합니다.
	public long getFoundRows();
	public List<PostVO> listAllPost(@Param("boardId") String boardId, @Param("paging") PagingDTO paging);
	public List<PostVO> searchByTfIdf(@Param("boardId") String boardId, 
			@Param("arrSearch") String[] arrSearch, @Param("paging") PagingDTO paging);

	public List<ReplyVO> findById(String id);
	public void incReadCnt(String id);
	public boolean findReplyId(String id);

	// 검색어 없이 검색할 때 사용
	public List<PostVO> searchAllMovies(String[] genreList, String[] ageLimitList);
	// 검색어를 포함해 검색할 때 사용
	public List<PostVO> searchMovies(String[] genreList, String[] ageLimitList, String[] arrSearch);

	/* affected row counts */
	public int createPost(PostVO post);
	public int createReply(@Param("parent") ReplyVO parent, @Param("reply") ReplyVO reply);

	public int updatePost(PostVO post);
	public int updateReply(ReplyVO reply);
	public int postUpdateStarScore(String id);

	public int deleteReply(String id);
}
