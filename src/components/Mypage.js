import axios from 'api/axios';
import AppContext from 'context/AppContextProvider';
import { useContext, useEffect, useState } from "react";
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { MembershipDate } from 'toolbox/DisplayDate';
import { findFavoriteGenre, genreData, listAgeLimit } from 'toolbox/MovieInfo';
import { Fetch } from "toolbox/Fetch";

export default function Mypage() {
    const { auth, setAuth } = useContext(AppContext);

    const listRecentMoviesGenreUri = `http://localhost:8080/party/anonymous/listRecentMoviesGenre?userId=${auth.userId}`;

    const accessToken = auth.accessToken;
    const userId = auth.userId;
    const userName = auth.userName;
    const userNick = auth.userNick;
    const roles = auth.roles;
    const membership = new Date(auth.membership);
    const ageLimit = auth.ageLimit;
    const penalty = auth.penalty;

    const isPaid = MembershipDate(membership) >= 0;

    const today = new Date().getDate();
    const membershipDay = membership.getDate();

    const [showInactive, setShowInactive] = useState(false);
    const handleCloseInactive = () => setShowInactive(false);
    const handleShowInactive = () => setShowInactive(true);

    const [listGenre, setListGenre] = useState([]);
    useEffect(() => {
        const promise = genreData();
        const getData = () => {
          promise.then((genre) => {
            setListGenre(genre);
          });
        };
        getData();
      }, []);

    const updateMembership = async (e, date) => {
        e.preventDefault();
        const bodyData = {
            id: auth.userId, membership: new Date(date)
        };
        try {
            await axios.post(`/party/anonymous/updateMembership`, bodyData);
        } catch (err) {
            console.log('Error?');
        }
        setAuth({ accessToken, userId, userName, userNick, roles, membership: bodyData.membership, ageLimit, penalty });
    }

    const inactiveAccount = async (e, userId) => {
        e.preventDefault();
        try {
            await axios.get(`/party/anonymous/inactiveAccount?userId=${userId}`);
        } catch (err) {
            console.log('Error?');
        }
        sessionStorage.removeItem("asd");
        window.location.replace("/");
    }

    function membershipLeft() {
        return isPaid ? (
            <>
                {MembershipDate(membership) === 0 ? '내일 자정' : MembershipDate(membership) + 1 + '일 후'}에 멤버십 구독이 종료됩니다.<br />
                <Button variant='danger' onClick={(e) => { updateMembership(e, '1900-01-01') }}>멤버십 취소 및 환불</Button>
            </>
        ) : (
            <>현재 멤버십 구독 중이 아닙니다.</>
        );
    }

    return (roles?.includes('manager') ?
        <>
            아래 버튼을 통해 관리자 페이지로 이동할 수 있습니다.<br />
            <Link key='whatever' to='/manager-only' style={{ margin: '5px' }}>관리자 페이지로</Link><br /><br />
            <Button variant='outline-success' onClick={(e) => { updateMembership(e, '2999-12-31') }}>디버깅용 멤버십 구독 버튼</Button>
            &nbsp;<Button variant='outline-danger' onClick={(e) => { updateMembership(e, '1900-01-01') }}>디버깅용 멤버십 취소 버튼</Button>
        </>
        : <>
            현재 {listAgeLimit[ageLimit]?.name} 영화까지 관람하실 수 있습니다.<br /><br />
            {membershipLeft()}<br />
            <Button variant='success'
                onClick={(e) => { updateMembership(e, MembershipDate(membership) < 0 ? new Date().setDate(today + 1) : membership.setDate(membershipDay + 1)) }}>
                하루 멤버십{isPaid ? ' 연장' : ' 구독'}
            </Button><br /><br />
            <Fetch uri={listRecentMoviesGenreUri} renderSuccess={RenderSuccess} /><br /><br />
            <Button variant='dark' onClick={handleShowInactive} style={{ float: 'right', margin: '10px' }}>회원탈퇴</Button>

            <Modal show={showInactive} onHide={handleCloseInactive}>
                <Modal.Header closeButton>
                    <Modal.Title>정말로 회원탈퇴하시겠습니까?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    '예'를 누르시면 즉시 회원탈퇴 절차가 진행됩니다.<br />
                    <th style={{ color: 'red' }}>멤버십 취소 절차를 거치지 않을 경우 환불이 불가능하므로</th>
                    반드시 멤버십 취소 후 진행해주세요.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={(e) => inactiveAccount(e, userId)}>
                        예
                    </Button>
                    <Button variant="info" onClick={handleCloseInactive}>
                        아니오
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );

    function RenderSuccess(favor) {
        const favorList = findFavoriteGenre(listGenre, favor);
        return favorList.length === 0 ? "영화를 시청할수록 당신의 정확한 취향을 확인하실 수 있습니다." :
            "당신의 취향 장르는 " + favorList + "입니다.";
    }
}
