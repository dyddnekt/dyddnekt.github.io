import AppContext from 'context/AppContextProvider';
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { DisplayDate } from "toolbox/DisplayDate";
import { Fetch } from "toolbox/Fetch";

export default function MovieList() {
    const location = useLocation();
    let state = location.state;

    const { auth } = useContext(AppContext);
    const isManager = auth?.roles?.includes('manager');

    const postListUri = `http://localhost:8080/post/anonymous/listAll`;

    function renderSuccess(postList) {
        return <>
            <table style={{ margin: '20px' }}>
                <thead>
                    <tr>
                        <th>제목</th>
                        <th>&nbsp;&nbsp;조회수</th>
                        <th>&nbsp;&nbsp;작성일</th>
                    </tr>
                </thead>
                <tbody>
                    {postList?.map(post => (
                        <tr key={post.id}>
                            <td>{(!auth?.ageLimit && post.ageLimit < 3) || (post.ageLimit <= auth?.ageLimit) ?
                                <Link key={post.id} to={`/post`}
                                    state={{ id: post.id }}>
                                    {post.title}
                                </Link> : '연령 제한 콘텐츠'}
                            </td>
                            <td>&nbsp;&nbsp;{post.readCnt}</td>
                            <td>&nbsp;&nbsp;{DisplayDate(post.regDt, null)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    }

    return (
        <div>
            {isManager ?
                <Link
                    to="/post/managePost"
                    state={{ post: { boardVO: { id: state.boardId }, listAttachFile: [] } }}
                    style={{ margin: '5px' }}
                >글쓰기</Link> : ''}
            <Fetch uri={postListUri} renderSuccess={renderSuccess} />
        </div>
    );
}
