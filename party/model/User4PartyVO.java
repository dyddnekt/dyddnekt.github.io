package www.dream.bbs.party.model;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;

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
public class User4PartyVO extends Person4PartyVO implements UserDetails {
	private OrganizationVO organization;

	@TargetProperty
	private String nick;
	// @JsonIgnore // pwd는 화면에 노출되는 대상이 아님!
	private String pwd;
	private Date birth; // 연령확인용 생년월일
	private Date membership; // 멤버쉽만료일. 지날경우 멤버쉽종료
	private int penalty; // 벌점
	
	//연락처 목록
	private List<ContactPointVO> listContactPoint = new ArrayList<>();
	private List<AccountabilityVO> listAccountability = new ArrayList<>();

	private List<User4PartyVO> listUser = new ArrayList<>();

	public User4PartyVO(String id, String name, String image, int gender, String department, String nick, String pwd, 
			Date birth, List<ContactPointVO> listContactPoint) {
		super(id, name, null, gender, null);
		this.nick = nick;
		this.pwd = pwd;
		this.birth = birth;
		this.listContactPoint = listContactPoint;
	}
	
	public void addCP(ContactPointVO cp) {
		listContactPoint.add(cp);
	}

	public void addAccountability(AccountabilityVO o) {
		listAccountability.add(o);
	}
	
	public void encodePwd(PasswordEncoder pwdEnc) {
		pwd = pwdEnc.encode(pwd);
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		/*
		List<SimpleGrantedAuthority> ret = new ArrayList<>();
		for (AccountabilityVO acc : listAccountability) {
			ret.add(acc.getAuthority());
		}
		return ret;
		 */
		return listAccountability.stream()	//하나씩 빨대로 뽑아 내어
				.map(AccountabilityVO::getAuthority)	//getAuthority 함수로 만든 결과로 map(변환하여)
				.collect(Collectors.toList());	//모을것이야
	}

	@Override
	public String getPassword() {
		return pwd;
	}

	@Override
	public String getUsername() {
		return nick;
	}

	public Date getBirth() {
		return birth;
	}

	public Date getMembership() {
		return membership;
	}

	@Override
	public boolean isAccountNonExpired() {
		return listAccountability.stream()
				.filter(AccountabilityVO::isAlive).count() > 0; 
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}
}
