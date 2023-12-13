package www.dream.bbs.party.model;
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.google.gson.annotations.SerializedName;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@NoArgsConstructor
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class TmdbCompanyVO implements Comparable<TmdbCompanyVO>{
		
    	//GSON 방식 이름 변경해서 하는 것.
    	@SerializedName("id")
    	int id;
		String stringId;
    	@SerializedName("logo_path")
    	String logoPath;
    	@SerializedName("name")
    	String name;
    	@SerializedName("origin_country")
    	String country;
    	
		@Override
		public int compareTo(TmdbCompanyVO o) {
			return id - o.id;
		}
}