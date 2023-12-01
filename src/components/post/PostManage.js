import axios from "api/axios";
import Button from 'react-bootstrap/Button';
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import AppContext from 'context/AppContextProvider';
import AttachedFileList from "atom/AttachedFileList";
import ThumbnailList from "atom/ThumbnailList";
import { genreData, listAgeLimit } from "toolbox/MovieInfo";

export default function PostManage() {
    const location = useLocation();
    // 신규작성 시 post.boardVO.id 활용, 수정 시 모든 정보 활용
    const state = location.state?.state;
    const post = location.state?.post;

    const { auth } = useContext(AppContext);
    const navigate = useNavigate();

    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);
    const [listAttach, setListAttach] = useState(post.listAttachFile);
    const [movieId, setMovieId] = useState(post.movieDTO?.id);
    const [contentGenre, setContentGenre] = useState(post.genre);
    const [ageLimit, setAgeLimit] = useState(post.ageLimit);

    const [hasAllContents, setHasAllContents] = useState();
    useEffect(() => {
        setHasAllContents(title?.trim() ? content?.trim() ? movieId ? contentGenre?.trim() ? ageLimit : false : false : false : false);
    }, [title, content, movieId, contentGenre, ageLimit])

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

    function checkGenre(e) {
        let files = '';
        const query = 'input[name="checkGenre"]:checked';
        const selectedEls = document.querySelectorAll(query);

        // 선택된 목록에서 value 찾기
        selectedEls.forEach((el) => {
            files += el.value + ' ';
        });
        setContentGenre(files)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!hasAllContents)
            return;

        const writer = { id: auth.userId, name: auth.userName, nick: auth.userNick };
        const bodyData = {
            id: post.id, writer: writer,
            boardVO: { id: post.boardVO.id }, movieVO: { id: movieId },
            title: title.trim(), content: content.trim(),
            genre: contentGenre, ageLimit: ageLimit, listAttachFile: listAttach
        };

        try {
            await axios.post(
                "/post/managePost",
                bodyData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        "x-auth-token": `Bearer ${auth.accessToken}`
                    }
                }
            );
            console.log("post success");
            if (!post.id) {
                // 글쓰기
                const ttt = { boardId: post.boardVO.id, page: 1, search: "" }
                navigate(`/board`, { state: ttt });
            } else {
                // 수정
                navigate(`/board`, { state: state });
            }

            //clear state and controlled inputs
            //need value attrib on inputs for this
        } catch (err) {
            console.log("fail... " + err);
        }
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            await axios.delete(`/post/${post.id}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        "x-auth-token": `Bearer ${auth.accessToken}`
                    }
                });
        } catch (err) {
            console.log("Delete failed... ", err);
        } finally {
            navigate(`/board`, { state: state });
        }
    }

    return <Form>
        <h3>영상 등록</h3>
        <hr />
        <Form.Group className="mb-3" >
            <Form.Label >제목</Form.Label>
            <Form.Control
                type="text"
                value={title}
                id="title"
                onChange={(e) => setTitle(e.target.value)}
                required
            />
        </Form.Group>
        <Form.Group className="mb-3" >
            <Form.Label >영화ID</Form.Label>
            <Form.Control
                type="text"
                value={movieId}
                id="movieId"
                onChange={(e) => setMovieId(e.target.value)}
                required
            />
        </Form.Group>

        <div key={`inline-checkbox`} className="mb-3">
            {listGenre.map((genre, index) => (
                <Form.Check
                    inline
                    label={genre}
                    name="checkGenre"
                    type="checkbox"
                    value={genre}
                    onChange={checkGenre}
                    id={`inline-checkbox-${index + 1}`}
                    checked={contentGenre?.includes(genre)}
                />
            ))}
        </div>

        {listAgeLimit.map((age, index) => (
            <Form.Check
                inline
                label={age.name}
                name="userAge"
                type="radio"
                value={index}
                onChange={(e) => setAgeLimit(e.target.value)}
                id={`inline-radio-${index + 1}`}
                checked={ageLimit == index}
            />
        ))}

        <ThumbnailList imgDtoList={listAttach} />
        <AttachedFileList writer={auth} listAttach={listAttach} setListAttach={setListAttach} />

        <Form.Group className="mb-3" >
            <Form.Label >줄거리</Form.Label>
            <Form.Control
                as="textarea"
                value={content}
                rows="5"
                id="content"
                onChange={(e) => setContent(e.target.value)}
                required
            />
        </Form.Group>
        <Button variant="danger" onClick={handleDelete} style={{ float: 'right', margin: '10px' }}
            disabled={!post.id}>
            삭제
        </Button>
        <Button variant="primary" onClick={handleSubmit} style={{ float: 'right', margin: '10px' }}
            disabled={!hasAllContents}>
            등록
        </Button>
    </Form>
}
