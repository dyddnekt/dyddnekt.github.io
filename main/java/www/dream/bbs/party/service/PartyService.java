package www.dream.bbs.party.service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import www.dream.bbs.party.mapper.PartyMapper;
import www.dream.bbs.party.model.AccountabilityVO;
import www.dream.bbs.party.model.OrganizationVO;
import www.dream.bbs.party.model.RecentMovieVO;
import www.dream.bbs.party.model.ReportVO;
import www.dream.bbs.party.model.TmdbCastsVO;
import www.dream.bbs.party.model.TmdbCompanyVO;
import www.dream.bbs.party.model.User4PartyVO;

@Service
public class PartyService implements UserDetailsService {
	@Autowired
	private PartyMapper partyMapper;

	@Autowired
	private PasswordEncoder pwdEnc;

	public List<User4PartyVO> listAllMember(String ownerId) {
		return partyMapper.listAllMember(ownerId);
	}

	public List<ReportVO> listReported() {
		return partyMapper.listReported();
	}

	public List<RecentMovieVO> listAllRecentMovies(String userId) {
		return partyMapper.listAllRecentMovies(userId);
	}

	public List<String> listRecentMoviesGenre(String userId) {
		return partyMapper.listRecentMoviesGenre(userId);
	}

	public int createOrganization(OrganizationVO organization) {
		return partyMapper.createOrganization(organization);
	}

	public int createManager(OrganizationVO organization, User4PartyVO person) {
		person.encodePwd(pwdEnc);
		int cnt = partyMapper.createPerson(person);

		partyMapper.createAccountability(new AccountabilityVO("manager", organization.getId(), person.getId()));
		partyMapper.createAccountability(new AccountabilityVO("member", organization.getId(), person.getId()));
		return cnt;
	}

	/** 회원 가입 */
	public int createMember(User4PartyVO person) {
		person.encodePwd(pwdEnc);
		int cnt = partyMapper.createPerson(person);

		partyMapper
				.createAccountability(new AccountabilityVO("member", person.getOrganization().getId(), person.getId()));
		return cnt;
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		return partyMapper.findByNick(username);
	}

	public boolean checkNick(String nick) {
		return partyMapper.isValidNick(nick);
	}

	public int updateMembership(User4PartyVO user) {
		partyMapper.updateMembership(user);
		return 0;
	}

	public int updatePenalty(User4PartyVO user) {
		int point = partyMapper.updatePenalty(user);
		return point;
	}

	public int givePenalty(String userId) {
		int point = partyMapper.givePenalty(userId);
		return point;
	}

	public int checkReport(int movieId, String writerId) {
		partyMapper.checkReport(movieId, writerId);
		return 0;
	}

	public int inactiveAccount(String userId) {
		partyMapper.inactiveAccount(userId);
		return 0;
	}

	public int watchingMovie(RecentMovieVO watching) {
		boolean isNew = partyMapper.findRecentMovie(watching);
		if (isNew) {
			partyMapper.createRecentMovie(watching);
		} else {
			partyMapper.updateRecentMovie(watching);
		}
		return 0;
	}

	/**
	 * 사람과 영화 관계 (movie m : m 구조로 party에 들어가는 제작진과 제작사 정보)
	 */

	public String changeId(int id) {
		return partyMapper.changeId(id);
	}

	// Party 쿼리에 들어가는 영화 제작사 정보.
	public int saveCompany(Set<TmdbCompanyVO> listCompany) {
		List<String> listIdString = listCompany.stream().map(obj -> obj.getStringId()).distinct()
				.collect(Collectors.toList());
		List<String> listExisting = partyMapper.findExistings(listIdString, "producer");
		List<TmdbCompanyVO> listNew = listCompany.stream().filter(obj -> !listExisting.contains(obj.getStringId()))
				.collect(Collectors.toList());
		if (listNew.isEmpty()) {
			return 0;
		}
		return partyMapper.saveCompany(listNew);
	}

	// Party 쿼리에 들어가는 영화 관계자들 정보.
	public int saveCredits(Set<TmdbCastsVO> listCredits) {
		List<String> listIdString = listCredits.stream().map(obj -> obj.getStringId()).collect(Collectors.toList());
		List<String> listExisting = partyMapper.findExistings(listIdString, "casts");
		List<TmdbCastsVO> listNew = listCredits.stream().filter(obj -> !listExisting.contains(obj.getStringId()))
				.collect(Collectors.toList());
		if (listNew.isEmpty()) {
			return 0;
		}
		return partyMapper.saveCredits(listNew);
	}

	// save배우(movieId, 목록<영화관련자VO>)
	/*
	 * 영화관련자VO 중에 관리되고있던 배우면? new: duplicated:
	 */
}
