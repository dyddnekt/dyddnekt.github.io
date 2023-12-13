package www.dream.bbs.party.model;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import www.dream.bbs.framework.model.MasterEntity;

@Setter
@Getter
@NoArgsConstructor
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class AccountabilityVO extends MasterEntity {
	private String accountType;
	private String ownerId;	//주인으로서
	private String responseId;	//대상으로서
	private boolean alive;
	
	public AccountabilityVO(String accountType, String ownerId, String responsId) {
		this.accountType = accountType;
		this.ownerId = ownerId;
		this.responseId = responsId;
	}
	
	public SimpleGrantedAuthority getAuthority() {
		return new SimpleGrantedAuthority(accountType);
	}
}
