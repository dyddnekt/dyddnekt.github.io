import ThumbnailList from 'atom/ThumbnailList';
import AppContext from 'context/AppContextProvider';
import { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DisplayDate, MembershipDate } from 'toolbox/DisplayDate';
import { Fetch } from 'toolbox/Fetch';
import axios from "api/axios";
import { useInterval } from 'hooks/useInterval';
import PostShowMovieDetail from 'components/post/PostShowMovieDetail';
import MyEval from './MyEval';
import OtherEvalList from './OtherEvalList';

export default function PostDetail() {
    const location = useLocation();
    const { auth } = useContext(AppContext);

    const state = location.state;
    // state={{ id: post.id, boardId: state.boardId, page: curPage, search: textSearch.current?.value, postListWithPaging }}>

    const [title, setTitle] = useState()

    const userId = auth.userId;
    const postId = state.id;

    const postUri = `http://localhost:8080/post/anonymous/getPost/${postId}/${userId}`;
    const interval = 5000; // 5초마다 함수 실행

    const isPaid = MembershipDate(auth.membership) >= 0;

    useInterval(async () => {
        if (!isPaid) {
            return;
        }
        const bodyData = { userId: userId, movieId: postId, movieTitle: title, viewTime: interval };
        try {
            await axios.post("/user/anonymous/watchingMovie",
                JSON.stringify(bodyData),
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            console.log("RecentMovie Update Success");
        } catch (err) {
            console.log('RecentMovie Update Failed');
        }
    }, interval);

    return <>
        <Link to={'/movie-list'} style={{ margin: '5px' }}>영화목록</Link>&nbsp;&nbsp;&nbsp;&nbsp;
        {userId ? <Link to={'/movie-list'} style={{ margin: '5px' }}>최근시청목록</Link> : ''}
        <Fetch uri={postUri} renderSuccess={RenderSuccess} />
    </>;

    function RenderSuccess(post) {
        return <>
            {PostShowMovieDetail(post.movieDTO?.id)}
            {setTitle(post.title)}
            <br />
            {isPaid ? <ThumbnailList imgDtoList={post.listAttachFile} /> : <th style={{ color: 'blue' }}>영화를 관람하시려면 멤버십 구독이 필요합니다.</th>}

            <h3>제목 : {title}</h3>
            <p>줄거리 : {post.content}</p>

            조회수 : <span>{post.readCnt}</span>
            &nbsp;&nbsp;&nbsp;&nbsp;개봉일 : <span>{DisplayDate(post.regDt, null)}</span>
            &nbsp;&nbsp;&nbsp;&nbsp;{(post.writer ? post.writer.nick === auth.userNick : false) ?
                <Link
                    to="/post/managePost"
                    state={{ post, state }}
                >수정</Link> : ""
            }
            <br />
            <MyEval />
            <OtherEvalList />
        </>;
    }
}