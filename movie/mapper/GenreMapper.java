package www.dream.bbs.movie.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import www.dream.bbs.movie.model.TmdbGenreVO;

@Mapper	// Container에 담기도록 지정
public interface GenreMapper {

	//마리아DB 내에 장르 정보를 가져와, 외부 API에 넣어 정보를 가져오기 위한 것.
	public List<TmdbGenreVO> listGenreInfo();
}
