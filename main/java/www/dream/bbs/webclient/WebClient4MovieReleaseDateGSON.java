package www.dream.bbs.webclient;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.google.gson.Gson;

import www.dream.bbs.movie.model.TmdbMovieResultVO;
import www.dream.bbs.movie.model.TmdbReleaseDataVO;
import www.dream.bbs.movie.model.TmdbReleaseDateVO;
import www.dream.bbs.movie.model.TmdbReleaseResultVO;

@Service
@PropertySource("classpath:application.properties")
public class WebClient4MovieReleaseDateGSON {

	@Value("${tmdb-admin-key}")
	private String api_key;

	public void loadRelease(TmdbMovieResultVO movieVo) {
		Integer movieId = movieVo.getId();

		// themoviedb.org에서 / 영화 등급 및 송출 타입 등 나머지 세부 정보 받는 곳.
		// https://api.themoviedb.org/3/movie/{id//299,054}/?api_key=2a98cbe1fa65b5daaabc0522192e19f3
		WebClient webClient = WebClient.builder().baseUrl("https://api.themoviedb.org")
				.defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE).build();

		/**
		 * 여기서 부터는 출시일 및 등급정보 받는 곳.
		 */
		String uri = "/3/movie/" + movieId + "/release_dates?api_key=" + api_key;
		String resultDetail = webClient.get().uri(uri).retrieve().bodyToMono(String.class).block();

		Gson gson = new Gson();
		TmdbReleaseDataVO release = gson.fromJson(resultDetail, TmdbReleaseDataVO.class);
		for (TmdbReleaseResultVO releaseResultVO : release.getResults()) {
			for (TmdbReleaseDateVO dates : releaseResultVO.getDates()) {
				movieVo.setReleases(dates);
			}
		}
	}

}