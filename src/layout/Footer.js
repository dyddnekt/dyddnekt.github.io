import AppContext from 'context/AppContextProvider';
import { useContext } from "react";
import { MembershipDate } from 'toolbox/DisplayDate';
import { listAgeLimit } from 'toolbox/MovieInfo';

export default function Footer() {
    const { auth } = useContext(AppContext);

    const userName = auth?.userName;
    const ageLimit = auth?.ageLimit;
    const penalty = auth?.penalty;

    return (userName ?
        <footer>
            <hr />
            <h4>{userName}님 환영합니다!</h4>
            현재 멤버십 구독 중{MembershipDate(auth.membership) < 0 ? '이 아니' : '이'}며,<br />
            {MembershipDate(auth.membership) < 0 ? '멤버십 구독 시 ' : ''}
            {listAgeLimit[ageLimit].name} 영화까지 시청 가능합니다.<br />
            {penalty > 0 ? penalty >= 5 ? <th style={{ color: 'red' }}>지나친 경고 누적으로 인해 댓글 작성 권한이 박탈되었습니다.</th>
                : '총 ' + penalty + '회의 경고를 받았습니다.\n5회 이상 누적시 댓글 작성 권한이 박탈될 수 있으므로 건전한 댓글을 작성해 주세요.' : ''}<br /><br />
        </footer>
        : <footer>
            <hr />
            현재 로그인 상태가 아닙니다.
        </footer>
    );
}