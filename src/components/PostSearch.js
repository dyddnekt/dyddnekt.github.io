import AppContext from "context/AppContextProvider";
import { useContext, useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Fetch } from "toolbox/Fetch";
import { findFavoriteGenre, genreData, listAgeLimit } from "toolbox/MovieInfo";

export default function PostSearch() {
    const [search, setSearch] = useState({});

    const { auth } = useContext(AppContext);

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

    const listRecentMoviesGenreUri = `http://localhost:8080/user/anonymous/listRecentMoviesGenre?userId=${auth.userId}`;
    const [chosenGenre, setChosenGenre] = useState([]);
    const [contentGenre, setContentGenre] = useState(chosenGenre);
    const [isFavorGenre, setIsFavorGenre] = useState(false);
    let favorList = [];

    const [ageLimit, setAgeLimit] = useState([]);

    const [sortList, setSortList] = useState("readCnt");

    function buildUrl() {
        let genreList = [];
        let ageLimitList = [];
        let text = '아무것도입력되지않았습니다';
        if (search.genreList && search.genreList.length !== 0) {
            genreList = search.genreList;
        } else {
            genreList = listGenre;
        }
        if (search.ageLimitList && search.ageLimitList.length !== 0) {
            ageLimitList = search.ageLimitList;
        } else {
            for (let i = 0; i < listAgeLimit.length; i++) {
                ageLimitList.push(i);
            }
        }
        if (search.text && search.text.length !== 0) {
            text = search.text;
        }
        return `http://localhost:8080/post/anonymous/searchMovies/"${genreList}"/"${ageLimitList}"/${text}`;
    }
    const [postListUri, setPostListUri] = useState(buildUrl());

    useEffect(() => {
        setPostListUri(buildUrl());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search])

    const txtSearch = useRef();

    function checkGenre(e, isFavor) {
        if (isFavor === true) {
            setIsFavorGenre(!isFavorGenre);
        }
        else {
            if (chosenGenre?.includes(e))
                setChosenGenre(chosenGenre.filter((a) => a !== e));
            else
                setChosenGenre([e, ...chosenGenre]);
        }
    };

    useEffect(() => {
        if (isFavorGenre)
            setContentGenre(favorList);
        else
            setContentGenre(chosenGenre);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFavorGenre, chosenGenre])

    function checkAgeLimit(e) {
        const age = Number(e);
        if (ageLimit?.includes(age))
            setAgeLimit(ageLimit.filter((a) => a !== age));
        else
            setAgeLimit([age, ...ageLimit]);
    };

    const onSearch = (e) => {
        e.preventDefault();
        let searchTxt = txtSearch.current.value;
        if (searchTxt.trim().length === 0) {
            searchTxt = '아무것도입력되지않았습니다';
        }
        setSearch({ text: searchTxt.trim(), genreList: contentGenre, ageLimitList: ageLimit });
    }

    function FavoriteGenre(favor) {
        favorList = findFavoriteGenre(listGenre, favor);
        return <>{favorList.length === 0 ? "회원으로서 영화를 시청하면 추천장르를 선택하실 수 있습니다." :
            "현재 추천장르는 " + favorList + "입니다."}
            <br /><br />{favorList.length === 0 ? <Form.Check
                inline
                label={"추천장르"}
                name="movieGenre"
                type="checkbox"
                value="favorate"
                onChange={(e) => checkGenre(e.target.value, true)}
                id={`inline-checkbox-movieGenre-0`}
                disabled
            /> : <Form.Check
                inline
                label={"추천장르"}
                name="movieGenre"
                type="checkbox"
                value="favorate"
                onChange={(e) => checkGenre(e.target.value, true)}
                id={`inline-checkbox-movieGenre-0`}
            />}
        </>
    }

    const sorting = (a, b) => {
        if (sortList === "starScore")
            return b.starScore - a.starScore;
        else if (sortList === "title")
            return a.title.toLowerCase() < b.title.toLowerCase() ? -1 :
                a?.title.toLowerCase() > b?.title.toLowerCase() ? 1 : 0;
        else
            return b.readCnt - a.readCnt;
    }

    function renderSuccess(result) {
        try {
            return <>{result.length === 0 ? "일치하는 영화가 존재하지 않습니다." :
                <table style={{ margin: '20px' }}>
                    <thead>
                        <tr>
                            <th>제목</th>
                            <th>&nbsp;&nbsp;&nbsp;&nbsp;장르</th>
                            <th>&nbsp;&nbsp;&nbsp;&nbsp;시청연령</th>
                            <th>&nbsp;&nbsp;&nbsp;&nbsp;조회수</th>
                            <th>&nbsp;&nbsp;&nbsp;&nbsp;평균별점</th>
                        </tr>
                    </thead>
                    <tbody>
                        {result?.sort(sorting).map(movie => (
                            <tr key={movie.id}>
                                <td>
                                    {
                                        listAgeLimit[movie.ageLimit].limit < 18 || auth.ageLimit >= movie.ageLimit ?
                                            <Link key={movie.id} to={`/post`} state={{ id: movie.id }}>
                                                {movie.title}
                                            </Link> :
                                            movie.title
                                    }
                                </td>
                                <td>&nbsp;&nbsp;&nbsp;&nbsp;{movie.genre}</td>
                                <td>&nbsp;&nbsp;&nbsp;&nbsp;{listAgeLimit[movie.ageLimit].name}</td>
                                <td>&nbsp;&nbsp;&nbsp;&nbsp;{movie.readCnt}</td>
                                <td>&nbsp;&nbsp;&nbsp;&nbsp;{movie.starScore}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
            </>
        } catch (e) {
            console.log(e);
            return <>
                <th style={{ color: 'red' }}>
                    ERROR! 오류가 발생했습니다!<br />
                    계속 검색하고 싶으시다면 페이지를 이동한 후 다시 시도해주세요.
                </th>
            </>
        }
    }

    return <Form>
        <h5>영화검색</h5>

        <div key={`inline-checkbox-movieGenre`} className="mb-3">
            <Fetch uri={listRecentMoviesGenreUri} renderSuccess={FavoriteGenre} />
            {listGenre.map((genreName, index) => (isFavorGenre ?
                <Form.Check
                    inline
                    label={genreName}
                    name="movieGenre"
                    type="checkbox"
                    value={genreName}
                    onChange={(e) => checkGenre(e.target.value, false)}
                    id={`inline-checkbox-movieGenre-${index + 1}`}
                    disabled
                /> :
                <Form.Check
                    inline
                    label={genreName}
                    name="movieGenre"
                    type="checkbox"
                    value={genreName}
                    onChange={(e) => checkGenre(e.target.value, false)}
                    id={`inline-checkbox-movieGenre-${index + 1}`}
                />
            ))}
        </div>

        <div key={`inline-checkbox-AgeLimit`} className="mb-3">
            {listAgeLimit.map((age, index) => ((age.limit < 18 || auth.ageLimit >= index) ?
                <Form.Check
                    inline
                    label={age.name}
                    name="movieAgeLimit"
                    type="checkbox"
                    value={index}
                    onChange={(e) => checkAgeLimit(e.target.value)}
                    id={`inline-checkboxmovie-AgeLimit-${index + 1}`}
                /> :
                <Form.Check
                    inline
                    label={age.name}
                    name="movieAgeLimit"
                    type="checkbox"
                    value={index}
                    id={`inline-checkboxmovie-AgeLimit-${index + 1}`}
                    disabled
                />
            ))}
        </div>

        <input placeholder="검색어를 입력하세요" ref={txtSearch}></input>
        <button key={"btnSearch"} onClick={onSearch}>검색</button>
        <th style={{ color: 'red' }}>※특수문자를 입력할 경우 오류가 발생할 수 있습니다.</th>
        <Form.Group className="mb-3" style={{ float: 'right', margin: '10px' }}>
            <Form.Label htmlFor="userAddress">정렬기준 :&nbsp;</Form.Label>
            <select className="mb-2" id="sort-list" onChange={(e) => setSortList(e.target.value)}>
                <option value="readCnt">조회수</option>
                <option value="starScore">평균별점</option>
                <option value="title">제목</option>
            </select>
        </Form.Group>
        <hr />

        <Fetch uri={postListUri} renderSuccess={renderSuccess} />
    </Form >
}