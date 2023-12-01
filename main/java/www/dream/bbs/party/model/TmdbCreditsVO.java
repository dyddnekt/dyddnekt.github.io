package www.dream.bbs.party.model;
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
public class TmdbCreditsVO {
    	//GSON 방식 이름 변경해서 하는 것.
	@SerializedName("id")
	private int movieid;
	
	@SerializedName("cast")
	private List<TmdbCastsVO> casts;

	public List<TmdbCastsVO> getCasts() {
		return casts;
	}
	
	@SerializedName("production_companies")
	private List<TmdbCompanyVO> companies;
	
	public List<TmdbCompanyVO> getCompanies() {
		return companies;
	}
}