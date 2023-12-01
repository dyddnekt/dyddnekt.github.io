package www.dream.bbs.framework.model;

public class PagingDTO {
	private static final int LIMIT = 10;
	private static final int BTN_CNT = 10;
	private int page;
	private long offset;

	private int lastPage;
	private int startPage;
	private boolean prev;
	private boolean next;

	public PagingDTO(int page) {
		this.page = page;
		offset = (this.page - 1) * LIMIT;
	}

	public static int getLimit() {
		return LIMIT;
	}

	public long getOffset() {
		return offset;
	}

	public int getLastPage() {
		return lastPage;
	}

	public int getStartPage() {
		return startPage;
	}

	public boolean isPrev() {
		return prev;
	}

	public boolean isNext() {
		return next;
	}

	// BTN_CNT 덩치 만큼만 보여주는. 정수형 화면 구성
	// page:1 => dataCount : 234 ::: 1, 2, 3, ..., 10, >>
	// page:21 => dataCount : 234 ::: <<, 21, 22, 23, 24
	// page:12 => dataCount : 234 ::: <<, 11, 12, 13, ..., 20, >>

	// 실수형 화면 구성. 현재 쪽 기준으로 앞 뒤 맞추기. 중앙 배치 (채용됨)
	// page:7 => dataCount : 234 ::: <<, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, >>
	// page:21 => dataCount : 234 ::: <<, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24
	// page:12 => dataCount : 234 ::: <<, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, >>
	public void buildPagination(long dataCount) {
		// 전체 쪽수
		int totalPageCount = (int) Math.ceil((float) dataCount / LIMIT);
		// 전체 쪽수의 최소값
		totalPageCount = totalPageCount < 1 ? 1 : totalPageCount;
		// 마지막 쪽 번호의 기본값 산출
		lastPage = page + BTN_CNT / 2;
		// 뒤에 표현할 개수 모자를 경우 늘림
		if (lastPage < BTN_CNT)
			lastPage = BTN_CNT;
		// 가상적인 마지막이 실제 마지막보다 클 경우 조정
		if (lastPage > totalPageCount)
			lastPage = totalPageCount;
		startPage = lastPage - BTN_CNT + 1;
		if (startPage < 1)
			startPage = 1;
		prev = startPage > 1;
		next = lastPage < totalPageCount;
	}
}
