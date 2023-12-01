import { useParams } from "react-router-dom";
import { Fetch } from "toolbox/Fetch";

export default function MemberList() {
    const { ownerId } = useParams();
    const listAllMemberUri = `/party/anonymous/listAllMember?ownerId=${ownerId}`;

    return (
        <div>
            <table style={{ margin: '20px' }}>
                <thead>
                    <tr>
                        <th>닉네임</th>
                        <th>이름</th>
                        <th>성별</th>
                    </tr>
                </thead>
                <tbody>
                    <Fetch uri={listAllMemberUri} renderSuccess={RenderSuccess} />
                </tbody>
            </table>
        </div>
    );
}

function RenderSuccess(memberList) {
    return memberList.map(member => (
        <>
            <tr key={member.id}>
                <td>{member.nick}</td>
                <td>{member.name}</td>
                <td>{member.sex ? '여성' : '남성'}</td>
            </tr>
            {member.listContactPoint.map(cp => (
                <tr key={member.id + cp.cpType}>
                    <td></td>
                    <td>[{cp.cpType}:</td>
                    <td>{cp.cpVal}]</td>
                </tr>
            ))}
        </>
    ));
}
