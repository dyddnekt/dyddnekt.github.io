import AppContext from "context/AppContextProvider";
import { useContext, useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Fetch } from "toolbox/Fetch";
import { findFavoriteGenre, genreData } from "toolbox/MovieInfo";

export default function MovieSearch() {
    const [search, setSearch] = useState({});
    const [page, setPage] = useState(1);

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
        return `http://localhost:8080/movie/anonymous/searchMovies/"${genreList}"/${text}/${sortList}/${page}`;
    }
    const [movieListUri, setMovieListUri] = useState(``);

    useEffect(() => {
        setMovieListUri(buildUrl());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, sortList, page])

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
        setPage(1);
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

    const displayPagination = (paging) => {
        const pagingBar = [];
        if (paging.prev)
            pagingBar.push(<Button variant="outline-dark" key={paging.startPage - 1} onClick={(e) => setPage(paging.startPage - 1)}>&lt;</Button>);
        for (let i = paging.startPage; i <= paging.lastPage; i++) {
            pagingBar.push(<Button variant="outline-dark" key={i} onClick={(e) => setPage(i)}>{i}</Button>);
        }
        if (paging.next)
            pagingBar.push(<Button variant="outline-dark" key={paging.lastPage + 1} onClick={(e) => setPage(paging.lastPage + 1)}>&gt;</Button>);
        return pagingBar;
    }

    const [isLoading, setIsLoading] = useState(true);
    const movieList = async () => {
        setIsLoading(true); // api 호출 전에 true로 변경하여 로딩화면 띄우기
        try {
            const response = await fetch(movieListUri);
            const result = await response.json();
            setIsLoading(false); // api 호출 완료 됐을 때 false로 변경하려 로딩화면 숨김처리
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

    useEffect(() => {
        movieList();
    }, [movieListUri]);

    function renderSuccess(result) {
        const movieList = result.firstVal;
        const pagination = result?.secondVal;
        try {
            return <>{isLoading ? <div>&nbsp;&nbsp;&nbsp;&nbsp;Now Loading...</div> : movieList.length === 0
                ? <>
                    검색결과 일치하는 영화가 존재하지 않습니다.
                </> : <table style={{ margin: '20px' }}>
                    <thead>
                        <tr>
                            <th>제목</th>
                            <th>&nbsp;&nbsp;&nbsp;&nbsp;장르</th>
                            <th>&nbsp;&nbsp;&nbsp;&nbsp;인기</th>
                            <th>&nbsp;&nbsp;&nbsp;&nbsp;평점</th>
                            <th>&nbsp;&nbsp;&nbsp;&nbsp;평가갯수</th>
                        </tr>
                    </thead>
                    <tbody>
                        {movieList?.map(movie => (
                            <tr key={movie.id}>
                                <td>{movie.title}</td>
                                <td>&nbsp;&nbsp;&nbsp;&nbsp;{movie.genreNames}</td>
                                <td>&nbsp;&nbsp;&nbsp;&nbsp;{movie.popularity}</td>
                                <td>&nbsp;&nbsp;&nbsp;&nbsp;{movie.voteAverage}</td>
                                <td>&nbsp;&nbsp;&nbsp;&nbsp;{movie.voteCount}</td>
                            </tr>
                        ))}
                        <br /><br />현재 페이지 : {page}
                    </tbody>
                    {pagination ? displayPagination(pagination) : ''}
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
        <Fetch uri={movieListUri} renderSuccess={renderSuccess} />
    </Form >
}