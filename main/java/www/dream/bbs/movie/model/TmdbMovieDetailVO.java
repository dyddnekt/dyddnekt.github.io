package www.dream.bbs.movie.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.google.gson.annotations.SerializedName;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class TmdbMovieDetailVO {
	//GSON 방식 이름 변경해서 하는 것.
	@SerializedName("budget")
	Long budget;
	
	@SerializedName("genres")
	private List<TmdbMovieGenreVO> genres;
	
	@SerializedName("imdb_id")
	String imdbId;
	@SerializedName("revenue")
	Double revenue;
	@SerializedName("runtime")
	Integer runtime;
	@SerializedName("status")
	String status;
	@SerializedName("tagline")
	String tagline;
	
	public void setGenre(String genress) {
	}
}