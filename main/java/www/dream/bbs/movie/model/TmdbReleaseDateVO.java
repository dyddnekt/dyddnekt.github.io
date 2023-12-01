package www.dream.bbs.movie.model;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.google.gson.annotations.SerializedName;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class TmdbReleaseDateVO {
	//GSON 방식 이름 변경해서 하는 것.
	@SerializedName("certification")
	String certification;
	@SerializedName("release_date")
	Date releaseDate;
}