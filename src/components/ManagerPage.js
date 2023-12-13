import axios from 'api/axios';
import { MembershipDate, Birthday } from "toolbox/DisplayDate";
import { Fetch } from "toolbox/Fetch";
import Button from 'react-bootstrap/Button';

export default function ManagerPage() {
    const listAllMemberUri = `/party/anonymous/listAllMember`;
    const listReportedUri = `/party/anonymous/listReported`;

    return (
        <div>
            <table style={{ margin: '20px' }}>
                <thead>
                    <tr>
                        <th>이름</th>
                        <th>&nbsp;&nbsp;닉네임</th>
                        <th>&nbsp;&nbsp;생일</th>
                        <th>&nbsp;&nbsp;성별</th>
                        <th>&nbsp;&nbsp;멤버십 만료일</th>
                        <th>&nbsp;&nbsp;벌점</th>
                    </tr>
                </thead>
                <tbody>
                    <Fetch uri={listAllMemberUri} renderSuccess={ListMember} />
                </tbody>
            </table>
            <table style={{ margin: '20px' }}>
                <thead>
                    <tr>
                        <th>신고된 댓글</th>
                        <th>&nbsp;&nbsp;신고된 횟수</th>
                    </tr>
                </thead>
                <tbody>
                    <Fetch uri={listReportedUri} renderSuccess={ListReport} />
                </tbody>
            </table>
        </div>
    );
}

const controlPenalty = async (e, userId, point, isGiving) => {
    e.preventDefault();
    const bodyData = {
        id: userId, penalty: point = (isGiving ? (point < 5 ? point + 1 : 5) : (point > 0 ? point - 1 : 0))
    };
    try {
        await axios.post(`/party/anonymous/updatePenalty`, bodyData);
        return console.log(bodyData.penalty);
    } catch (err) {
        console.log('Error?');
    }
}

const checkReport = async (e, report, givePenalty) => {
    e.preventDefault();
    try {
        if (givePenalty) {
            await axios.get(`/party/anonymous/givePenalty?userId=${report.reportedId}`);
        }
        await axios.get(`/party/anonymous/checkReport?replyId=${report.replyId}`);
    } catch (err) {
        console.log('Error?');
    }
}

function ListMember(memberList) {
    return memberList.map(member => (
        <>
            <tr key={member.id}>
                <td>{member.name}</td>
                <td>&nbsp;&nbsp;{member.nick}</td>
                <td>&nbsp;&nbsp;{Birthday(member.birth)}</td>
                <td>&nbsp;&nbsp;{member.gender == 1 ? '여성' : member.gender == 2 ? '남성' : member.gender == 3 ? '논바이너리' : '미등록'}</td>
                <td>&nbsp;&nbsp;{MembershipDate(member.membership) < 0 ? '미구독 상태'
                    : MembershipDate(member.membership) === 0 ? '내일' : MembershipDate(member.membership) + 1 + '일 후'}</td>
                <td>&nbsp;&nbsp;{member.penalty >= 5 ? '댓글 영구 금지' : member.penalty + '점'}</td>
                <Button variant="outline-danger" onClick={e => controlPenalty(e, member.id, member.penalty, true)}>벌점 부여</Button>&nbsp;
                <Button variant="outline-info" onClick={e => controlPenalty(e, member.id, member.penalty, false)}>벌점 취소</Button>&nbsp;
                <Button variant="outline-warning" onClick={e => controlPenalty(e, member.id, 0, false)}>벌점 초기화</Button>
            </tr>
        </>
    ));
}

function ListReport(reportList) {
    return reportList.map(report => (
        <>
            <tr key={report.movieId + report.writerId}>
                <td>{report.content}</td>
                <td>&nbsp;&nbsp;{report.cnt}</td>
                <Button variant="outline-danger" onClick={e => checkReport(e, report, true)}>신고 수리</Button>&nbsp;
                <Button variant="outline-info" onClick={e => checkReport(e, report, false)}>수리 거부</Button>
            </tr>
        </>
    ));
}
