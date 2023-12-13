package www.dream.bbs.webclient;

import java.util.Set;
import java.util.TreeSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.google.gson.Gson;

import www.dream.bbs.party.model.TmdbCastsVO;
import www.dream.bbs.party.model.TmdbCreditsVO;
import www.dream.bbs.party.service.PartyService;

@Service
@PropertySource("classpath:application.properties")
public class WebClient4CreditGSON {

	@Value("${tmdb-admin-key}")
	private String api_key;

	@Autowired
	private PartyService partyService;

	Set<TmdbCastsVO> creditSet = new TreeSet<>();

	// 영화 출연진 정보를 받는 곳.
	public void loadCredit(Integer movieId) {

		// https://api.themoviedb.org/3/person/1?api_key=a158e2a9424bc69fec449dcaeb82aba8
		WebClient webClient = WebClient.builder().baseUrl("https://api.themoviedb.org")
				.defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
				.codecs(configurer -> configurer.defaultCodecs().maxInMemorySize(-1)).build();

		/**
		 * 여기서 부터는 제작진 정보 받는 곳.
		 * 
		 */
		String resultCredits = webClient.get().uri("/3/movie/" + movieId + "/credits?api_key=" + api_key).retrieve()
				.bodyToMono(String.class).block();

		Gson gson = new Gson();
		TmdbCreditsVO credits = gson.fromJson(resultCredits, TmdbCreditsVO.class);
		for (TmdbCastsVO castVo : credits.getCasts()) {
			Integer id = castVo.getId();
			String stringId = partyService.changeId(id);
			castVo.setStringId(stringId);
			creditSet.add(castVo);
		}
		partyService.saveCredits(creditSet);
	}
}