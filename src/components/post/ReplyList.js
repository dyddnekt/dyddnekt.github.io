import StarRating from "StarDraw/StarRating";
import axios from "api/axios";
import CreateReply from "atom/CreateReply";
import UpdateReply from "atom/UpdateReply";
import AppContext from "context/AppContextProvider";
import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { DisplayDate } from 'toolbox/DisplayDate';

export default function ReplyList({ parent }) {
    const { auth } = useContext(AppContext);
    const penalty = auth?.penalty;
    const [justCreatedReplyList, setJustCreatedReplyList] = useState([]);
    const [openAddReply] = useState(new Map());//댓글달기 창 여는용
    const [openUpdateReply] = useState(new Map());//댓글수정 창 여는용
    const [replyOnReply] = useState(new Map());//댓글 내용
    const myReply = parent.myReply;
    const [starScore, setStarScore] = useState(myReply === null ? 5 : myReply.starScore);//댓글별점
    const [renderCount, setRenderCount] = useState(0);//조회수
    const [changeSwich, setChangeSwich] = useState(true);

    //input 컨텐츠 값 받는 역할
    function onInputReplyContent(e, replyId) {
        const content = e.target.value;
        replyOnReply.set(replyId, content);//포스트 아이디
        setRenderCount(renderCount + 1);
    }
    console.log(parent)
    //새로고침 기능
    function swicheed() { window.location.reload(); }

    //set 은 데이터를 순서 없이 저장하는 기능
    function markShowAddReply(e, replyId) {
        openAddReply.set(replyId, 1); //openAddReply 댓글 추가창을 열게 설정하는 기능
        setRenderCount(renderCount + 1);//조회수 증가
    }

    //댓글 수정창 열기
    function markShowChangeReply(e, replyId) {
        openUpdateReply.set(replyId, 1);
        setChangeSwich(!changeSwich)
        setRenderCount(renderCount + 1);//조회수 증가
    }

    const manageReply = async (e, parentId) => {
        // 목적: 재조회 방지, 성능
        // parent 객체의 댓글 목록 ul을 찾아서 동적으로 강제적으로 넣기
        e.preventDefault();
        if (replyOnReply.get(parentId) == null || replyOnReply.get(parentId).length === 0)
            return;
        const score = parseFloat(starScore)
        const bodyData = {
            firstVal: { id: parentId },
            secondVal: { content: replyOnReply.get(parentId), id: parent.id + auth.userId, writerId: auth.userId, starScore: score }
        };
        console.log(JSON.stringify(bodyData));

        try {
            const response = await axios.post(
                "/post/manageReply",
                bodyData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        "x-auth-token": `Bearer ${auth.accessToken}`
                    }
                }
            );
            const reply = response.data;
            setJustCreatedReplyList([...justCreatedReplyList, reply]);
            replyOnReply.set(parentId, '');
            swicheed();
            setChangeSwich(!changeSwich)
            setRenderCount(renderCount + 1);
            postStarScoreAxios(parentId);
            console.log("reply success");
        } catch (err) {
            console.log("fail reply");
        }
    }

    const postStarScoreAxios = async (postId) => {
        try {
            await axios.get(`/post/postUpdateStarScore?id=${postId}`);
        } catch (err) {
            console.log('postStarScore Failed');
        }
    }

    /* 삭제 버튼 기능 */
    const handleDelete = async (e, replyId) => {
        e.preventDefault();
        try {
            await axios.delete(`/post/${parent.id + auth.userId}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        "x-auth-token": `Bearer ${auth.accessToken}`
                    }
                });
            postStarScoreAxios(replyId);
            swicheed();
        } catch (err) {
            console.log("Delete failed... ", err);
        }
    }

    function appendJustCreatedReply(newReply, parent) {
        if (!parent.listReply.includes(newReply))
            parent.listReply = [...parent.listReply, newReply];
    }

    /*댓글 등록 체크 */
    function ReplyCheck(replyCheck = true) {
        if (auth !== "") {
            return replyCheck === true ? <Button variant='primary' onClick={(e) => { markShowAddReply(e, parent.id) }} >댓글</Button>
                : <Button variant='primary' onClick={(e) => { markShowChangeReply(e, parent.id) }}>수정</Button>
        } else {
            return ""
        }
    }

    function replyToggle() {
        return changeSwich === true ? myReply === null ? ReplyCheck(true) : <ul>
            <li key={myReply.id}>
                <StarRating totalStars={myReply.starScore} disabled={true} starScore={starScore} setStarScore={setStarScore} />
                <p>작성자: <span>{myReply.writer ? myReply.writer.nick : ""}&nbsp;&nbsp;&nbsp;&nbsp; </span>
                    <span>
                        {DisplayDate(myReply.regDt, myReply.uptDt)}
                    </span>
                </p>
                <p>
                    <span>댓글 :{myReply.content} {myReply != null ? ReplyCheck(false) : ""}   </span>
                </p>
            </li>
        </ul>
            : openUpdateReply.has(parent.id) ?
                <UpdateReply auth={auth} parent={parent} starScore={starScore} setStarScore={setStarScore}
                    onInputReplyContent={onInputReplyContent} manageReply={manageReply} handleDelete={handleDelete}
                    myReply={myReply} /> : ""
    }

    // 댓글 출력 
    function replyRender() {
        return <ul>
            {parent.listReply?.map((reply) => {
                return <li key={reply.id}>
                    <StarRating totalStars={reply.starScore} disabled={true} starScore={reply.starScore} setStarScore={setStarScore} />
                    <p>작성자: <span>{reply.writer ? reply.writer.nick : ""}
                        <span>
                            &nbsp;&nbsp;&nbsp;&nbsp;작성일: {DisplayDate(reply.regDt, reply.uptDt)}</span>
                    </span>
                    </p>
                    <p>
                        <span>댓글 :{reply.content}
                        </span>
                    </p>
                </li>
            })}
        </ul>
    }

    justCreatedReplyList.forEach((newReply) => { appendJustCreatedReply(newReply, parent) });

    return <>
        {/* 초회 댓글인지 확인 */}
        {auth.userNick ? penalty >= 5 ? <th style={{ color: 'red' }}>
            지나친 경고 누적으로 인해 댓글 작성 권한이 박탈된 상태입니다.</th> : "" : ""}

        {/* 로그인 했는지 체크 여부로 댓글창 띄우기 */}
        {openAddReply.has(parent.id) ?
            <CreateReply auth={auth} parent={parent} replyOnReply={replyOnReply} starScore={starScore} setStarScore={setStarScore}
                onInputReplyContent={onInputReplyContent} manageReply={manageReply} /> : ""}
        {replyToggle()}
        {replyRender()}
    </>
}
