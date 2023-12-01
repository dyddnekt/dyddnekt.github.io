package www.dream.bbs.movie.model;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.google.gson.annotations.SerializedName;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@NoArgsConstructor
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class TmdbMovieResultVO implements Comparable<TmdbMovieResultVO> {
    	//GSON 방식 이름 변경해서 하는 것.
    	@SerializedName("backdrop_path")
    	String backdropPath;
    	@SerializedName("id")
    	int id;
    	@SerializedName("genreNames")
    	String genreNames;
    	@SerializedName("original_language")
    	String olLang;
    	@SerializedName("original_title")
    	String olTitle;
    	@SerializedName("overview")
    	String overview;
    	@SerializedName("popularity")
    	Double popularity;
    	@SerializedName("poster_path")
    	String postPath;
    	@SerializedName("title")
    	String title;
    	@SerializedName("vote_average")
    	Double voteAverage;
    	@SerializedName("vote_count")
    	Integer voteCount;

    	private TmdbMovieDetailVO details;
    	private TmdbReleaseDateVO releases;
    	
		@Override
		public int compareTo(TmdbMovieResultVO o) {
			return id - o.id;
		}
}