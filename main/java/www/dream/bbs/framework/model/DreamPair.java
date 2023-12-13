package www.dream.bbs.framework.model;

//@NoArgsConstructor
//@Setter
public class DreamPair<F, S> {
	private F firstVal;
	private S secondVal;

	public DreamPair(F firstVal, S secondVal) {
		this.firstVal = firstVal;
		this.secondVal = secondVal;
	}

	public F getFirstVal() {
		return firstVal;
	}

	public S getSecondVal() {
		return secondVal;
	}

	@Override
	public String toString() {
		return "DreamPair [firstVal=" + firstVal + ", secondVal=" + secondVal + "]";
	}
}
