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
public class TmdbReleaseResultVO {
    	//GSON 방식 이름 변경해서 하는 것.
		@SerializedName("iso_3166_1")
    	String country;
		
        public boolean isKorean() {
            return "KR".equals(country);
        }

    	@SerializedName("release_dates")
    	private List<TmdbReleaseDateVO> dates;

    	public List<TmdbReleaseDateVO> getDates() {
    		return dates;
    	}
        
}