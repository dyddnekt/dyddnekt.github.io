const listDiv = [//{ div: 1000 * 60 * 60 * 24 * 365, postfix: '년 전' },
//{ div: 1000 * 60 * 60 * 24 * 365 / 12, postfix: '개월 전' },
{ div: 1000 * 60 * 60 * 24, postfix: '일 전' },
{ div: 1000 * 60 * 60, postfix: '시간 전' },
{ div: 1000 * 60, postfix: '분 전' },
{ div: 1000, postfix: '초 전' }
];

export const DisplayDate = (regDate, upDate) => {
    const theDay = new Date(upDate ? upDate : regDate);
    const now = new Date();
    const diffMilli = now.getTime() - theDay.getTime();
    if (diffMilli < 7 * listDiv[0].div) {
        return displayingDate(diffMilli, 0);
    } else {
        const year = new Date(theDay).getFullYear();
        const month = new Date(theDay).getMonth() + 1;
        const date = new Date(theDay).getDate();
        return year + '년 ' + month + '월 ' + date + '일'
    }
}

export const MembershipDate = (endDate) => {
    const now = new Date();
    const diffMilli = new Date(endDate).getTime() - now.getTime();
    const howLong = Math.floor(diffMilli / listDiv[0].div);
    return howLong;
}

export const Birthday = (birth) => {
    const year = new Date(birth).getFullYear();
    const month = new Date(birth).getMonth() + 1;
    const date = new Date(birth).getDate();
    return year + '년 ' + month + '월 ' + date + '일'
}

const displayingDate = (diff, idx) => {
    const howLong = Math.floor(diff / listDiv[idx].div);
    if (howLong < 1 && idx < listDiv.length - 1) {
        return displayingDate(diff, idx + 1);
    }
    return howLong + listDiv[idx].postfix;
}