import StarRating from 'StarDraw/StarRating';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

export default function UpdateReply({ auth, parent, onInputReplyContent, manageReply, handleDelete, myReply, starScore, setStarScore = f => f }) {
    /* 유저 이름이 없을시 예외사항 처리 */
    if (!auth.userNick) {
        return;
    }

    return (
        <Container>
            <Row>
                {/*별 그리기 및 별점 받아오기 */}
                <StarRating disabled={false} starScore={starScore} setStarScore={setStarScore} />
                <Col>작성자: {auth.userNick}</Col>
            </Row>
            <Row>
                <Col sm={10}>
                    <input placeholder='댓글'
                        defaultValue={myReply?.content}
                        style={{ height: "100%", width: "100%" }}
                        onInput={(e) => onInputReplyContent(e, parent.id)} />
                </Col>
                <Col>
                    <Button variant="primary" onClick={(e) => { manageReply(e, parent.id) }} >적용</Button>
                    <Button variant="danger" onClick={handleDelete} style={{ margin: '5px' }}>삭제</Button>
                </Col>
            </Row>
        </Container>
    )
}