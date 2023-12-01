import axios from 'api/axios';
import Button from 'react-bootstrap/Button';
import { useContext, useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import AppContext from 'context/AppContextProvider';

const Register = () => {
    const { codeList } = useContext(AppContext);

    const [userName, setUserName] = useState('');
    const [userNick, setUserNick] = useState('');

    const [pwd, setPwd] = useState('');
    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState();

    const [userBirth, setUserBirth] = useState();
    const [userGender, setUserGender] = useState();

    const [listCP, setListCP] = useState(new Map());

    const [userEmail, setUserEmail] = useState();
    const [userDomain, setUserDomain] = useState();

    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setValidMatch(pwd ? pwd === matchPwd : false);
    }, [pwd, matchPwd])

    const checkCPValidity = (cpType, inValue) => {
        if (cpType.validationRe && !(new RegExp(cpType.validationRe).test(inValue))) {
            return;
        }

        listCP.set(cpType, inValue);
        setListCP(listCP);
        console.log(listCP);
    };

    const checkGender = (e) => {
        console.log("checkGender");
        console.log(e.target.value);
        setUserGender(e.target.value);
    };

    /*
        const locations = [
            { value: "Goyang", name: "고양" },
            { value: "Gwangju", name: "광주" },
            { value: "Daegu", name: "대구" },
            { value: "Daejeon", name: "대전" },
            { value: "Busan", name: "부산" },
            { value: "Seoul", name: "서울" },
            { value: "Seongnam", name: "성남" },
            { value: "Suwon", name: "수원" },
            { value: "Ansan", name: "안산" },
            { value: "Anyang", name: "안양" },
            { value: "Yongin", name: "용인" },
            { value: "Ulsan", name: "울산" },
            { value: "Incheon", name: "인천" },
            { value: "Jeonju", name: "전주" },
            { value: "Changwon", name: "창원" },
            { value: "Cheonan", name: "천안" },
            { value: "Cheongju", name: "청주" },
            { value: "Pohang", name: "포항" },
            { value: "etc", name: "그 외 국내" }
        ];
    */

    const onBlurNick = async (e) => {
        console.log("onBlurNick");
        try {
            const response = await axios.get(`/party/anonymous/checkNick?nick=${e.target.value}`);
            console.log(response?.data);
        } catch (err) {
            console.log('Error?');
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validMatch)
            return;

        if (userEmail && userDomain) {
            const email = userEmail + '@' + userDomain;
            listCP.set("이메일", email);
            setListCP(listCP);
            console.log(listCP);
        }

        let list = [];
        for (let [key, value] of listCP) {
            list.push({ cpType: key, cpVal: value });
        }
        console.log(list);
        console.log(JSON.stringify(list));

        const bodyData = {
            organization: { id: '0000' },
            name: userName,
            nick: userNick,
            pwd: pwd,
            birth: userBirth,
            gender: userGender,
            listContactPoint: list
        };

        console.log(bodyData)

        try {
            const response = await axios.post("/party/anonymous/createMember",
                JSON.stringify(bodyData),
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            console.log(response?.data);
            console.log(JSON.stringify(response))
            setSuccess(true);
            console.log("success");
            //clear state and controlled inputs
            //need value attrib on inputs for this
        } catch (err) {
            console.log('Registration Failed');
        }
    }

    const changeDomain = (domain) => {
        const domainInputEl = document.querySelector('#domain-txt');
        if (domain === "type") {
            domainInputEl.value = "";
            setUserDomain("");
            domainInputEl.disabled = false;
        } else {
            domainInputEl.value = domain;
            setUserDomain(domain);
            domainInputEl.disabled = true;
        }
    }

    return success ? (
        <section style={{ margin: '100px' }}>
            <h1>회원가입이 완료되었습니다!</h1>
            <h1>환영합니다. {userName}님!</h1>
            <p>
                <Link to='/'>메인화면으로</Link>
            </p>
        </section>
    ) : (
        <Form style={{ margin: '50px' }}>
            <font color="red">*필수입력</font>
            <Form.Group className="mb-3">
                <Form.Label htmlFor="userName">이름:</Form.Label>
                <Form.Control
                    type="text"
                    id="userName"
                    onChange={(e) => setUserName(e.target.value)}
                    required
                />
            </Form.Group>
            <font color="red">*필수입력</font>
            <Form.Group className="mb-3">
                <Form.Label htmlFor="userNick">아이디:</Form.Label>
                <Form.Control
                    type="text"
                    id="userNick"
                    onChange={(e) => setUserNick(e.target.value)}
                    onBlur={onBlurNick}
                    required
                />
            </Form.Group>
            <font color="red">*필수입력</font>
            <Form.Group className="mb-3">
                <Form.Label htmlFor="userPwd">비밀번호:</Form.Label>
                <Form.Control
                    type="password"
                    id="userPwd"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />
                <Form.Label htmlFor="userMatchPwd">비밀번호 확인:</Form.Label>
                <Form.Control
                    type="password"
                    id="userMatchPwd"
                    onChange={(e) => setMatchPwd(e.target.value)}
                    value={matchPwd}
                    required
                />
            </Form.Group>
            <font color="red">*필수입력</font>
            <Form.Group className="mb-3">
                <Form.Label htmlFor="userBirth">생년월일:</Form.Label>
                <Form.Control
                    type="date"
                    id="userBirth"
                    min="1900-01-01"
                    max={new Date().toISOString().substring(0, 10)}
                    onChange={(e) => setUserBirth(e.target.value)}
                    required
                />
            </Form.Group>
            <font color="red">*필수입력</font>
            <Form.Group className="mb-3">
                <Form.Label htmlFor="userSex">성별:</Form.Label>
                <div key={'inline-radio'} className="mb-3">
                    <Form.Check
                        inline
                        label="미지정"
                        name="userSex"
                        type='radio'
                        value={0}
                        onChange={checkGender}
                        id={'inline-radio-0'}
                    />
                    <Form.Check
                        inline
                        label="여성"
                        name="userSex"
                        type='radio'
                        value={1}
                        onChange={checkGender}
                        id={'inline-radio-1'}
                    />
                    <Form.Check
                        inline
                        label="남성"
                        name="userSex"
                        type='radio'
                        value={2}
                        onChange={checkGender}
                        id={'inline-radio-2'}
                    />
                    <Form.Check
                        inline
                        label="논바이너리"
                        name="userSex"
                        type='radio'
                        value={3}
                        onChange={checkGender}
                        id={'inline-radio-3'}
                    />
                </div>
            </Form.Group>
            <Form.Group className="mb-3" >
                {codeList.map((cpType) => (cpType.codeVal === "이메일" ? <><br />
                    <Form.Label htmlFor="userEmail">이메일:&nbsp;</Form.Label>
                    <input className="box"
                        type="text"
                        id="userEmail"
                        onChange={(e) => setUserEmail(e.target.value)}
                        required
                    />
                    @
                    <input className="box" id="domain-txt" type="text" onChange={(e) => setUserDomain(e.target.value)} required />
                    <select className="box" id="domain-list" onChange={(e) => changeDomain(e.target.value)}>
                        <option value="type">직접 입력</option>
                        <option value="naver.com">naver.com</option>
                        <option value="google.com">google.com</option>
                        <option value="hanmail.net">hanmail.net</option>
                        <option value="nate.com">nate.com</option>
                        <option value="kakao.com">kakao.com</option>
                    </select>
                </> : <>
                    <Form.Label htmlFor={cpType.codeVal}>{cpType.codeVal}:</Form.Label>
                    <Form.Control
                        type="text"
                        id={cpType.codeVal}
                        onChange={(e) => checkCPValidity(cpType.codeVal, e.target.value)}
                    />
                </>))}
            </Form.Group>
            <Button variant="primary" onClick={handleSubmit} style={{ float: 'right', margin: '10px' }}
                disabled={!validMatch || !userName || !userNick || !userBirth || !userGender || (userEmail && !userDomain) || (!userEmail && userDomain)}>
                입력완료
            </Button>

        </Form>
    )
}

export default Register;