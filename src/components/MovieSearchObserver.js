import axios from 'api/axios';
import { useEffect, useState } from 'react';

export default function MovieSearchObserver({ uri }) {
    const [page, setPage] = useState(1);

    const [movieList, setMovieList] = useState([]);

    const [lastIntersectingImage, setLastIntersectingImage] = useState(null);

    const getMovieListThenSet = async () => {
        console.log('fetching 함수 호출됨');
        try {
            console.log(uri + `${page}`);
            const { data } = await axios.get(uri + `${page}`);
            console.log("읽어온 게시글 목록", data.firstVal);
            setMovieList(movieList.concat(data.firstVal));
        } catch {
            console.error('fetching error');
        }
    };

    //observer 콜백함수
    const onIntersect = (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                //뷰포트에 마지막 이미지가 들어오고, page값에 1을 더하여 새 fetch 요청을 보내게됨 (useEffect의 dependency배열에 page가 있음)
                setPage((prev) => prev + 1);
                // 현재 타겟을 unobserve한다.
                observer.unobserve(entry.target);
            }
        });
    };

    useEffect(() => {
        console.log('page ? ', page);
        getMovieListThenSet();
    }, [page]);

    useEffect(() => {
        //observer 인스턴스를 생성한 후 구독
        let observer;
        if (lastIntersectingImage) {
            observer = new IntersectionObserver(onIntersect, { threshold: 0.5 });
            //observer 생성 시 observe할 target 요소는 불러온 이미지의 마지막아이템(randomImageList 배열의 마지막 아이템)으로 지정
            observer.observe(lastIntersectingImage);
        }
        return () => observer && observer.disconnect();
    }, [lastIntersectingImage]);

    return (
        <>
            {movieList?.map((movie, index) => {
                if (index === movieList.length - 1) {
                    return (
                        <p key={movie.id} ref={setLastIntersectingImage}>
                            <td>&nbsp;&nbsp;"{movie.title}"</td>
                            <td>&nbsp;&nbsp;&nbsp;&nbsp;장르: {movie.genreNames}</td>
                            <td>&nbsp;&nbsp;&nbsp;&nbsp;인기: {movie.popularity}</td>
                            <td>&nbsp;&nbsp;&nbsp;&nbsp;평점: {movie.voteAverage}</td>
                            <td>&nbsp;&nbsp;&nbsp;&nbsp;평가갯수: {movie.voteCount}</td>
                        </p>
                    );
                } else {
                    return (
                        <p key={movie.id}>
                        <td>&nbsp;&nbsp;"{movie.title}"</td>
                            <td>&nbsp;&nbsp;&nbsp;&nbsp;장르: {movie.genreNames}</td>
                            <td>&nbsp;&nbsp;&nbsp;&nbsp;인기: {movie.popularity}</td>
                            <td>&nbsp;&nbsp;&nbsp;&nbsp;평점: {movie.voteAverage}</td>
                            <td>&nbsp;&nbsp;&nbsp;&nbsp;평가갯수: {movie.voteCount}</td>
                        </p>
                    );
                }
            })}
        </>
    );
}