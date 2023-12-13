import { useContext, useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { findAgeLimit } from 'toolbox/MovieInfo';

import AppContext from 'context/AppContextProvider';

export default function LoginModal() {
    const { auth, setAuth } = useContext(AppContext);
    let userNickRef = useRef();

    const [userNick, setUserNick] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const [error, setError] = useState(false);

    const [showLogin, setShowLogin] = useState(false);
    const handleCloseLogin = () => setShowLogin(false);
    const handleShowLogin = () => setShowLogin(true);

    /* 맨 처음 뜰 때만... 사용자 ID 받는 곳에 focus 준다.
    useEffect(() => {
      userRef.current.focus();
    }, [])
    */

    // user, pwd 변화 시 ErrMsg clearing
    useEffect(() => {
        setErrMsg('');
    }, [userNick, pwd])

    /*
      async await에 대한... error 처리는 보류중
    */
    async function signIn() {
        const jsonData = await fetch(`http://localhost:8080/sign-api/sign-in`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: userNick, password: pwd }),
        }).then(res => res.json());
        if (!jsonData.success)
            throw new Error(JSON.stringify(jsonData));
        return jsonData;
    }

    async function handleSubmit() {
        var signInResult;
        try {
            signInResult = await signIn();
            console.log("login success");

            const accessToken = signInResult.token;
            const userId = signInResult.userId;
            const userName = signInResult.userName;
            const userNick = signInResult.userNick;
            const roles = signInResult.roles;
            const membership = signInResult.membership;
            const penalty = signInResult.penalty;

            const birth = new Date(signInResult.birth);
            const today = new Date();
            const birthString = birth.getFullYear().toString() + (birth.getMonth() + 10).toString() + (birth.getDate() + 10).toString();
            const todayString = today.getFullYear().toString() + (today.getMonth() + 10).toString() + (today.getDate() + 10).toString();

            const userAge = Math.floor((Number(todayString) - Number(birthString)) / 10000);

            const ageLimit = findAgeLimit(userAge, 0);

            setAuth({ accessToken, userId, userName, userNick, roles, membership, ageLimit, penalty });
            window.sessionStorage.setItem("asd", JSON.stringify({ accessToken, userId, userName, userNick, roles, membership, ageLimit, penalty }));
            setUserNick('');
            setPwd('');
            setShowLogin(false);
        } catch (error) {
            console.log("fail");
            console.log(error.message);
            setError(true);
            setErrMsg('Login Failed');
            setAuth({});
            setShowLogin(true);
        }
    }

    const handleLogout = (e) => {
        e.preventDefault();
        setAuth({});
        setShowLogin(false);
        sessionStorage.removeItem("asd");
        window.location.replace("/");
    };

    function setFocusOnUser() {
        ReactDOM.findDOMNode(userNickRef).focus();
    }

    return (
        auth?.userNick ? (
            <>
                <Button variant="danger" onClick={handleLogout} style={{ float: 'right', margin: '10px' }}>
                    로그아웃
                </Button>
                <Link to='/mypage' style={{ float: 'right', margin: '10px' }}>MyPage</Link>
                <Link to='/recent-movie' style={{ float: 'right', margin: '10px' }}>최근에 본 영상</Link>
            </>
        ) : (
            <>
                <Button variant="primary" onClick={handleShowLogin} style={{ float: 'right', margin: '10px' }}>
                    로그인
                </Button>
                <Link to='/sign-up' style={{ float: 'right', margin: '10px' }}>회원가입</Link>

                <Modal show={showLogin} onHide={handleCloseLogin} onShow={setFocusOnUser}>
                    <Modal.Header closeButton>
                        {error ? <Form.Label>{errMsg}</Form.Label> : ''}
                        <Modal.Title>Sign In</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label htmlFor="userNick">아이디:</Form.Label>
                                <Form.Control
                                    ref={c => (userNickRef = c)}
                                    type="text"
                                    id="userNick"
                                    autoComplete="off"
                                    onChange={(e) => setUserNick(e.target.value)}
                                    value={userNick}
                                    required
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlTextarea1"
                            >
                                <Form.Label htmlFor="password">비밀번호:</Form.Label>
                                <Form.Control
                                    ref={userNickRef}
                                    type="password"
                                    id="password"
                                    onChange={(e) => setPwd(e.target.value)}
                                    value={pwd}
                                    required
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleSubmit}>
                            로그인
                        </Button>
                        <Button variant="secondary" onClick={handleCloseLogin}>
                            취소
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    );
}