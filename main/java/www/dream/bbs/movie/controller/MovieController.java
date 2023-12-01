package www.dream.bbs.movie.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import www.dream.bbs.movie.model.TmdbGenreVO;
import www.dream.bbs.movie.model.TmdbMovieResultVO;
import www.dream.bbs.movie.service.GenreService;
import www.dream.bbs.movie.service.MovieService;

@RestController // Container에 담기도록 지정
@RequestMapping("/movie")
public class MovieController {
	@Autowired
	private MovieService movieService;

	@Autowired
	private GenreService genreService;

	// /movie/anonymous/listGenreInfo //Movie 장르 리스트를 호출하는 곳.
	@GetMapping("/anonymous/listGenreInfo")
	public ResponseEntity<List<TmdbGenreVO>> listGenreInfo() {
		return new ResponseEntity<>(genreService.listGenreInfo(), HttpStatus.OK);
	}

	// /movie/anonymous/listGenreMovie/28 //Movie 장르 리스트를 호출하는 곳.
	@GetMapping("/anonymous/listGenreMovie/{genre}")
	public ResponseEntity<List<TmdbMovieResultVO>> listGenreMovie(@PathVariable String genre) {
		return new ResponseEntity<>(movieService.listGenreMovie(genre), HttpStatus.OK);
	}

	// /movie/getMovie/937249 영화ID를 통해 해당 영화 상세정보 호출. //ID통한 검색기능(영화상세정보)
	@GetMapping("/getMovie/{id}")
	public ResponseEntity<TmdbMovieResultVO> findById(@PathVariable String id) {
		return new ResponseEntity<>(movieService.findById(id), HttpStatus.OK);
	}

	// /movie/search/"검색할단어" //검색기능
	@GetMapping("/search/{search}")
	public ResponseEntity<List<TmdbMovieResultVO>> search(@PathVariable String search) {
		List<TmdbMovieResultVO> result = movieService.search(search);
		return new ResponseEntity<>(result, HttpStatus.OK);
	}

	// 영화 이미지를 호출하는 기능. (React 통해 이미지 띄우기 위한 용도.)
	@GetMapping("/anonymous/listMoviePost/{id}")
	public ResponseEntity<TmdbMovieResultVO> listMoviePost(@PathVariable Integer id) {
		return new ResponseEntity<>(movieService.listMoviePost(id), HttpStatus.OK);
	}

}