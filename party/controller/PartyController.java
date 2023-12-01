package www.dream.bbs.party.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import www.dream.bbs.party.model.OrganizationVO;
import www.dream.bbs.party.model.RecentMovieVO;
import www.dream.bbs.party.model.ReportVO;
import www.dream.bbs.party.model.User4PartyVO;
import www.dream.bbs.party.service.PartyService;

@RestController // Container에 담기도록 지정
@CrossOrigin
@RequestMapping("/party")
public class PartyController {
	@Autowired
	private PartyService partyService;

	// /party/anonymous/listAllMember?ownerId=0000
	@GetMapping("/anonymous/listAllMember")
	// @PreAuthorize("hasAnyRole('manager')")
	public ResponseEntity<List<User4PartyVO>> listAllMember(/* @RequestParam("ownerId") */ String ownerId) {
		return ResponseEntity.ok(partyService.listAllMember(ownerId));
	}

	// /user/anonymous/listReported
	@GetMapping("/anonymous/listReported")
	// @PreAuthorize("hasAnyRole('manager')")
	public ResponseEntity<List<ReportVO>> listReported() {
		return ResponseEntity.ok(partyService.listReported());
	}

	// /user/anonymous/listAllRecentMovies?userId={userId}
	@GetMapping("/anonymous/listAllRecentMovies")
	public ResponseEntity<List<RecentMovieVO>> listAllRecentMovies(String userId) {
		return ResponseEntity.ok(partyService.listAllRecentMovies(userId));
	}

	// /user/anonymous/listRecentMoviesGenre?userId={userId}
	@GetMapping("/anonymous/listRecentMoviesGenre")
	public ResponseEntity<List<String>> listRecentMoviesGenre(String userId) {
		return ResponseEntity.ok(partyService.listRecentMoviesGenre(userId));
	}

	@PostMapping("/createOrganization")
	public ResponseEntity<Integer> createOrganization(OrganizationVO organization) {
		return ResponseEntity.ok(partyService.createOrganization(organization));
	}

	@PostMapping("/createManager")
	public ResponseEntity<Integer> createManager(OrganizationVO organization, User4PartyVO person) {
		return ResponseEntity.ok(partyService.createManager(organization, person));
	}

	// /party/anonymous/checkNick?nick=hgghg
	@GetMapping("/anonymous/checkNick")
	public ResponseEntity<Boolean> checkNick(String nick) {
		return ResponseEntity.ok(partyService.checkNick(nick));
	}

	// /party/anonymous/createMember
	@PostMapping("/anonymous/createMember")
	public ResponseEntity<Integer> createMember(@RequestBody User4PartyVO person) {
		return ResponseEntity.ok(partyService.createMember(person));
	}

	// /user/anonymous/updateMembership
	@PostMapping("/anonymous/updateMembership")
	public ResponseEntity<Integer> updateMembership(@RequestBody User4PartyVO person) {
		return ResponseEntity.ok(partyService.updateMembership(person));
	}

	// /user/anonymous/updatePenalty
	@PostMapping("/anonymous/updatePenalty")
	public ResponseEntity<Integer> updatePenalty(@RequestBody User4PartyVO person) {
		return ResponseEntity.ok(partyService.updatePenalty(person));
	}

	// /user/anonymous/givePenalty?userId={userId}
	@GetMapping("/anonymous/givePenalty")
	public ResponseEntity<Integer> givePenalty(String userId) {
		return ResponseEntity.ok(partyService.givePenalty(userId));
	}

	// /user/anonymous/checkReport?movieId={movieId}&writerId={writerId}
	@GetMapping("/anonymous/checkReport")
	public ResponseEntity<Integer> checkReport(int movieId, String writerId) {
		return ResponseEntity.ok(partyService.checkReport(movieId, writerId));
	}

	// /user/anonymous/inactiveAccount?userId={userId}
	@GetMapping("/anonymous/inactiveAccount")
	public ResponseEntity<Integer> inactiveAccount(String userId) {
		return ResponseEntity.ok(partyService.inactiveAccount(userId));
	}

	// /user/anonymous/watchingMovie
	@PostMapping("/anonymous/watchingMovie")
	public ResponseEntity<Integer> watchingMovie(@RequestBody RecentMovieVO watching) {
		return ResponseEntity.ok(partyService.watchingMovie(watching));
	}
}
