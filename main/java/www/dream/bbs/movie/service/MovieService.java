package www.dream.bbs.movie.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import www.dream.bbs.board.mapper.PostMapper;
import www.dream.bbs.framework.model.DreamPair;
import www.dream.bbs.framework.model.PagingDTO;
import www.dream.bbs.movie.mapper.MovieMapper;
import www.dream.bbs.movie.model.TmdbMovieResultVO;

@Service
public class MovieService {

	@Autowired
	private PostMapper postMapper;

	@Autowired
	private MovieMapper movieMapper;

	public String changeId(int id) {
		return movieMapper.changeId(id);
	}

	public DreamPair<List<TmdbMovieResultVO>, PagingDTO> searchMovies(String genreList, String text, String sortList, int page) {
		String[] listGenre = genreList.substring(1, genreList.length() -1).split(",");
		PagingDTO paging = new PagingDTO(page);
		List<TmdbMovieResultVO> listResult = new ArrayList<>();

		if (text.equals("아무것도입력되지않았습니다")) {
			if (listGenre[0].equals("0")) {
				listResult = movieMapper.findAllMovies(sortList, paging);
			} else {
				listResult = movieMapper.findGenreMovies(listGenre, sortList, paging);
			}
		} else {
			String[] listText = text.split(" ");
			if (listGenre[0].equals("0")) {
				listResult = movieMapper.findNamedMovies(listText, sortList, paging);
			} else {
				listResult = movieMapper.findSearchMovies(listGenre, listText, sortList, paging);
			}
		}

		long dataCount = postMapper.getFoundRows();
		paging.buildPagination(dataCount);
		return new DreamPair(listResult, paging);
	}

	// 인기 영화리스트 중복 안돼게 받는거. // 장르도 중복되면 안돼므로 여기서 같이 중복검사.
	public int saveMovie(Set<TmdbMovieResultVO> listMovie) {
		List<Integer> listIdIntegers = listMovie.stream().map(obj -> obj.getId()).collect(Collectors.toList());
		List<Integer> listExistingsIntegers = movieMapper.findExistings(listIdIntegers);
		List<TmdbMovieResultVO> listE = listMovie.stream().filter(obj -> listExistingsIntegers.contains(obj.getId()))
				.collect(Collectors.toList());
		if (!listE.isEmpty()) {
		movieMapper.addGenre(listE);
		}
		List<TmdbMovieResultVO> listNew = listMovie.stream().filter(obj -> !listE.contains(obj)).collect(Collectors.toList());
		if (listNew.isEmpty()) {
			return 0;
		}
		return movieMapper.saveMovie(listNew);
	}

	// 인기 영화리스트 중복 안돼게 받는거. // 장르도 중복되면 안돼므로 여기서 같이 중복검사.
	/**
	 * public int saveMovie(List<MovieDTO> movieLists) { int id = ((MovieDTO)
	 * movieLists).getId(); boolean isNew = movieMapper.findByListId(id); if (isNew)
	 * return movieMapper.saveMovie(movieLists); else { return
	 * movieMapper.addGenre(movieLists); } }
	 */

	/** 게시글 등록할때 영화타이틀 검색 */
	
	// 영화 장르로 검색해서 해당 장르 리스트를 호출하는 기능(React로 넘김)
	public List<TmdbMovieResultVO> listGenreMovie(String genre) {
		List<TmdbMovieResultVO> movieList = movieMapper.listGenreMovie(genre);
		return movieList;
	}
	
	// 영화 ID를 통해 영화 상세 정보를 가져오는것.
	public TmdbMovieResultVO findById(String id) {
		return movieMapper.findById(id);
	}
	
	// 영화 타이틀 서치 기능.
	public List<TmdbMovieResultVO> search(String search) {
		String[] arrSearch = search.split(" ");
		List<TmdbMovieResultVO> listResult = movieMapper.searchBymovieId(arrSearch);
		return listResult;
	}
	// 영화 id를 통해 영화 이미지를 꺼내는 기능.
	public TmdbMovieResultVO listMoviePost(Integer id) {
		return movieMapper.listMoviePost(id);
	}

}
