package www.dream.bbs.framework.model;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class CodeVO {
	private String codeType;
	private String codeVal;
	private String validationRe;
	
	/**
	 * 사용자로부터 정보가 만들어질 때 사용
	 */
	public CodeVO(String codeType, String codeVal, String validationRe) {
		this.codeType = codeType;
		this.codeVal = codeVal;
		this.validationRe = validationRe;
	}

	@Override
	public String toString() {
		return "CodeVO [codeType=" + codeType + ", codeVal=" + codeVal + ", validationRe=" + validationRe + "]";
	}
}
