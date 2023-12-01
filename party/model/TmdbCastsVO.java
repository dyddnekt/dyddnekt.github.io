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
public class TmdbCastsVO implements Comparable<TmdbCastsVO> {
    	//GSON 방식 이름 변경해서 하는 것.
	@SerializedName("id")
	int id;
	String stringId;
	@SerializedName("gender")
	Integer gender;
	@SerializedName("known_for_department")
	String Department;
	@SerializedName("name")
	String name;
	@SerializedName("profile_path")
	String profilePath;
	@SerializedName("character")
	String character;
	@SerializedName("cast_id")
	Integer castId;
	
	@Override
	public int compareTo(TmdbCastsVO o) {
		return id - o.id;
	}
	
}