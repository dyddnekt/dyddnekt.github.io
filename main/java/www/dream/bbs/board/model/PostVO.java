package www.dream.bbs.board.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import www.dream.bbs.fileattachment.model.MappedTableDef;
import www.dream.bbs.fileattachment.model.dto.AttachFileDTO;
import www.dream.bbs.framework.property.anno.TargetProperty;
import www.dream.bbs.movie.model.TmdbMovieResultVO;

@Getter
@Setter
@NoArgsConstructor
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class PostVO extends ReplyVO implements MappedTableDef {
	public String getMappedTableName() {
		return "T_reply";
	}

	private BoardVO boardVO;
	private TmdbMovieResultVO movieVO;
	@TargetProperty
	private String title;
	private String genre;
	private String ageLimit;
	private int readCnt;

	/** DTO로 활용되는 속성 추가적 정의부분. */
	private List<String> listTag;

	private List<AttachFileDTO> listAttachFile;

	public void incReadCnt() {
		readCnt++;
	}
}