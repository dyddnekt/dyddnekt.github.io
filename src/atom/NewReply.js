import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

export default function NewReply({ auth, reply, replayOnReply, onInputReplyContent, mngReply, onInputStarScore}) {
    //별 눌렀을때 변화
    
    if (!auth.userNick)
        return;

    return (
        <Container>
            <Row>
                <Col>댓글 달기</Col>
            </Row>
            <input type="range"
            id="starScore"
            min="0" max="5"
            onChange={(e) => onInputStarScore(e.target.value)}
            size="10" />
            <Row>
                <Col sm={10}>
                    <input placeholder='댓글 달기'
                        value={replayOnReply.get(reply.id)}
                        style={{ height: "100%", width: "100%" }}
                        onInput={(e) => onInputReplyContent(e, reply.id)} />
                </Col>
                <Col sm><Button variant="primary" onClick={(e) => { mngReply(e, reply.id) }}>적용</Button></Col>
            </Row>
        </Container>
    );
}
