package www.dream.bbs.movie.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import www.dream.bbs.movie.mapper.GenreMapper;
import www.dream.bbs.movie.model.TmdbGenreVO;

@Service
public class GenreService {
	
	@Autowired
	private GenreMapper genreMapper;
	
	//DB에 저장된 tmdb 장르 정보를 가져온다.
	public List<TmdbGenreVO> listGenreInfo(){
		return genreMapper.listGenreInfo();
	}
	
}
