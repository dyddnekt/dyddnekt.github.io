package www.dream.bbs.movie.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import www.dream.bbs.movie.model.TmdbMovieDetailVO;
import www.dream.bbs.movie.model.TmdbMovieResultVO;

@Mapper	// Container에 담기도록 지정
public interface MovieMapper {
	
	public String changeId(int id);

	//영화 ID를 통해 영화 상세 정보를 호출
	public TmdbMovieResultVO findById(String id);
	
	//영화 리스트를 저장, 리스트 내에 영화ID 확인 후 중복 시 패스시키는 부분
	public int saveMovie(List<TmdbMovieResultVO> movieLists);
	//영화 ListID를 찾는다.
	public boolean findByListId(int id);

	//영화ID 검색기능
	public List<TmdbMovieResultVO> searchBymovieId(@Param("arrSearch") String[] arrSearch);

	//DB에 장르ID부분을 저장(별도로 추가한 부분) // 영화 내 장르이름을 검색해 중복 검사 하므로, MovieDTO도 필요함
	public int addGenre(List<TmdbMovieResultVO> listE);

	//영화 장르를 통해 해당 장르 리스트를 호출하는 기능.
	public List<TmdbMovieResultVO> listGenreMovie(String genre);
	
	//영화 정보를 저장할때, 받은 리스트에 Id값에 Integer 값들만 있는지 확인하는 기능.
	public List<Integer> findExistings(List<Integer> listIdIntegers);
	
	// 영화 id를 통해 영화 이미지를 꺼내는 기능.
	public TmdbMovieResultVO listMoviePost(Integer id);
	
}

