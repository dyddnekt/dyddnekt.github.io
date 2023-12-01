package www.dream.bbs.movie.model;

import java.util.List;
import java.util.stream.Collectors;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.google.gson.annotations.SerializedName;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class TmdbReleaseDataVO {
	@SerializedName("results")
	private List<TmdbReleaseResultVO> results;

	public List<TmdbReleaseResultVO> getResults() {
	    if (results == null) {
	        return null;
	    }
	    return results.stream()
	            .filter(TmdbReleaseResultVO::isKorean)
	            .collect(Collectors.toList());
	}
}