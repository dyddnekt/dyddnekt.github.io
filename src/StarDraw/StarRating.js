import { FaStar } from "react-icons/fa";

/* 별찍기 */

export default function StarRating({ style = {}, totalStars = 5, disabled = true, starScore, setStarScore = f => f }) {
  const createArray = (len) => [...Array(len)];
  const Star = ({ selected = false, onSelect = f => f }) => (
    <FaStar color={selected ? "red" : "grey"} onClick={onSelect} />
  );

  /* 별점 선택 온오프 기능 */
  const ChoseStar = (disabled) => {
    if (disabled == true) {
      return <div float="left" style={{ padding: "5px", ...style }}>
        {createArray(totalStars).map((n, i) => (
          <Star key={i} id="#callback-btn"
            selected={starScore > i}
          />
        ))}
      </div>
    } else if (disabled == false) {
      return <div style={{ padding: "5px", ...style }}>
        {createArray(totalStars).map((n, i) => (
          <Star key={i} id="#callback-btn"
            selected={starScore > i}
            onSelect={() => setStarScore(i + 1)}
          />
        ))}
      </div>
    }
  }

  return (<>
    {ChoseStar(disabled)}
  </>
  )
}
