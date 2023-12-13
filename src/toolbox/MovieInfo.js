import axios from "api/axios";

export async function genreData() { // db에서 장르 종류 받아오기. 
    let listGenreName = [];
    const res = await axios.get('/movie/anonymous/listGenreInfo');
    const genreList = res.data;
    for (let i = 0; i < genreList.length; i++) {
        listGenreName = [...listGenreName, genreList[i].name];
    }
    return listGenreName;
}

// genreData를 export할 경우 이 부분을 그곳에 추가할 것. (여기서는 사용불가. 이유는 아직 파악 안됨. 이 이상의 해결책이 있을경우 수정바람.)
/*
    const [listGenre, setListGenre] = useState([]);
    useEffect(() => {
        const promise = genreData();
        const getListData = () => {
          promise.then((genre) => {
            setListOfGenre(genre);
          });
        };
        getListData();
      }, []);
*/

export const listAgeLimit = [ // limit(제한 연령)가 작은 순서대로 넣어주세요
    { name: '전체 관람가', limit: 0 },
    { name: '12세 관람가', limit: 12 },
    { name: '15세 관람가', limit: 15 },
    { name: '청소년 관람불가', limit: 18 }
    // , { name: '제한상영가', limit: 150 }
];

export const findAgeLimit = (userAge, index) => {
    if (userAge >= listAgeLimit[index].limit) {
        if (index === listAgeLimit.length - 1) {
            return index;
        } else {
            return findAgeLimit(userAge, index + 1)
        }
    } else {
        return index - 1;
    }
}

export const findFavoriteGenre = (listGenre, favor) => {
    let most = []; // 가장 많이 본 장르(여러개 존재할 경우 전부 집어넣습니다)
    if (favor.length === 0) {
        return most;
    } else {
        let genreCount = [0];
        genreCount.length = listGenre.length;
        genreCount.fill(0);
        for (let i = 0; i < listGenre.length; i++) {
            favor?.map(genre => (
                genre?.includes(listGenre[i]) ? genreCount[i]++ : null
            ));
        }
        let biggest = 0;
        for (let i = 0; i < listGenre.length; i++) {
            if (genreCount[i] > biggest) {
                most = [listGenre[i]];
                biggest = genreCount[i];
            }
            else if (genreCount[i] === biggest) {
                most.push(listGenre[i]);
            }
        }
        return most;
    }
}