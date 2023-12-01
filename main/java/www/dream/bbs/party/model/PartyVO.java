package www.dream.bbs.party.model;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import www.dream.bbs.framework.model.MasterEntity;
import www.dream.bbs.framework.property.anno.TargetProperty;

@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class PartyVO extends MasterEntity {
	@TargetProperty
	private String name;
	@TargetProperty
	private String image;
	@TargetProperty
	private String department;

	public PartyVO(String id, String name, String image, String department) {
		super(id);
		this.name = name;
		this.image = image;
		this.department = department;
	}
}
