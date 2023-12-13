package www.dream.bbs.party.model;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import www.dream.bbs.framework.property.anno.TargetProperty;

@SuperBuilder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class Person4PartyVO extends PartyVO {
	@TargetProperty
	private int gender;

	public Person4PartyVO(String id, String name, String image, int gender, String department) {
		super(id, name, image, department);
		this.gender = gender;
	}
}
