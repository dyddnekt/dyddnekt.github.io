import AppContext from "context/AppContextProvider";
import { useContext, useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { Fetch } from "toolbox/Fetch";
import { findFavoriteGenre, genreData } from "toolbox/MovieInfo";
import MovieSearchObserver from "./MovieSearchObserver";

export default function MovieSearch() {
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

    const listRecentMoviesGenreUri = `http://localhost:8080/party/anonymous/listRecentMoviesGenre?userId=${auth.userId}`;
    const [chosenGenre, setChosenGenre] = useState([]);
    const [contentGenre, setContentGenre] = useState(chosenGenre);
    const [isFavorGenre, setIsFavorGenre] = useState(false);
    let favorList = [];

    const [sortList, setSortList] = useState("popularity");

    function buildUrl() {
        let genreList = [0];
        let text = '아무것도입력되지않았습니다';
        if (search.genreList && search.genreList.length !== 0) {
            genreList = search.genreList;
        }
        if (search.text && search.text.length !== 0) {
            text = search.text;
        }
        return `http://localhost:8080/movie/anonymous/searchMovies/"${genreList}"/${text}/${sortList}/`;
    }
    const [movieListUri, setMovieListUri] = useState(``);

    useEffect(() => {
        setMovieListUri(buildUrl());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, sortList])

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

    const onSearch = (e) => {
        e.preventDefault();
        let searchTxt = txtSearch.current.value;
        if (searchTxt.trim().length === 0) {
            searchTxt = '아무것도입력되지않았습니다';
        }
        setSearch({ text: searchTxt.trim(), genreList: contentGenre });
    }

    function FavoriteGenre(favor) {
        favorList = findFavoriteGenre(listGenre, favor);
        return <>{favorList.length === 0 ? "회원으로서 영화를 시청하면 추천장르를 선택하실 수 있습니다." :
            "현재 추천장르는 " + favorList + "입니다."}
            <br />{favorList.length === 0 ? <Form.Check
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

        <input placeholder="검색어를 입력하세요" ref={txtSearch}></input>
        <button key={"btnSearch"} onClick={onSearch}>검색</button>
        <th style={{ color: 'red' }}>※특수문자를 입력할 경우 오류가 발생할 수 있습니다.</th>
        <Form.Group className="mb-3" style={{ float: 'right', margin: '10px' }}>
            <Form.Label htmlFor="userAddress">정렬기준 :&nbsp;</Form.Label>
            <select className="mb-2" id="sort-list" onChange={(e) => setSortList(e.target.value)}>
                <option value="popularity">인기</option>
                <option value="vote_average">평점</option>
                <option value="vote_count">평가갯수</option>
                <option value="title">제목</option>
            </select>
        </Form.Group>
        <hr />
        <MovieSearchObserver uri={movieListUri} />
    </Form >
}