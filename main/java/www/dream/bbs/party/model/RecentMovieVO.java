package www.dream.bbs.party.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class RecentMovieVO {
	private String userId;
	private String movieId;
	private String movieTitle;
	private int movieRuntime;
	private int viewTime;
	private Date regDt;
	private Date uptDt;

	private List<RecentMovieVO> listRecentMovie = new ArrayList<>();

	public RecentMovieVO(String userId, String movieId, String movieTitle, int movieRuntime, int viewTime, Date regDt, Date uptDt) {
		this.userId = userId;
		this.movieId = movieId;
		this.movieTitle = movieTitle;
		this.movieRuntime = movieRuntime;
		this.viewTime = viewTime;
		this.regDt = regDt;
		this.uptDt = uptDt;
	}
}
