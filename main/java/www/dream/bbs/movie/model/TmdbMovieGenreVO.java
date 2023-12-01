package www.dream.bbs.movie.model;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.google.gson.annotations.SerializedName;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class TmdbMovieGenreVO {
	//GSON 방식 이름 변경해서 하는 것.
	@SerializedName("id")
	int id;
	@SerializedName("name")
	String name;

}