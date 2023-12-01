import AppContext from 'context/AppContextProvider';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DisplayDate, MembershipDate } from 'toolbox/DisplayDate';
import { Fetch } from "toolbox/Fetch";

export default function RecentMovie() {
    const { auth } = useContext(AppContext);
    const listAllRecentMoviesUri = `http://localhost:8080/party/anonymous/listAllRecentMovies?userId=${auth.userId}`;

    const isPaid = MembershipDate(auth.membership) >= 0;

    return (
        <div>
            {isPaid ? '' : <h5 style={{ margin: '20px', color: 'red' }}>※멤버십 구독 중이 아닐 경우 시청 현황은 갱신되지 않습니다.</h5>}
            <table style={{ margin: '20px' }}>
                <thead>
                    <tr>
                        <th>제목</th>
                        <th>&nbsp;&nbsp;최종시청일</th>
                    </tr>
                </thead>
                <tbody>
                    <Fetch uri={listAllRecentMoviesUri} renderSuccess={RenderSuccess} />
                </tbody>
            </table>
        </div>
    );

    function RenderSuccess(movieList) {
        return <>
            {movieList?.map(movie => (
                <tr key={movie.movieId}>
                    <Link key={movie.id} to={`/post`}
                        state={{ id: movie.id }}>
                        {movie.movieTitle}
                    </Link>
                    <td>&nbsp;&nbsp;{DisplayDate(movie.regDt, movie.uptDt)}</td>
                </tr>
            ))}
        </>;
    }
}