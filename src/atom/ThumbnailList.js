import { AxiosPost } from 'toolbox/Fetch';
import OriginalFileView from './OriginalFileView';

export default function ThumbnailList({ imgDtoList }) {
    const thumbnailRequestTarget = ["video", "image"];

    function renderImg(afdto, blob) {
        const thumbFile = new File([blob.data], "image");
        const imgUrl = (window.URL || window.webkitURL).createObjectURL(thumbFile);
        return <OriginalFileView imgUrl={imgUrl} afdto={afdto} />
    }

    return <>
        {imgDtoList?.map(afdto => {
            if (thumbnailRequestTarget.includes(afdto.contentType)) {
                return <AxiosPost uri={`/attach/anonymous/displayThumbnail`} body={afdto} renderSuccess={renderImg} />
            } else if (afdto.contentType === "audio") {
                const imgUrl = process.env.PUBLIC_URL + "/images/audioIcon.png";
                return <img src={imgUrl} style={{ width: '50px' }} alt='crashed' />;
            } else {
                const imgUrl = process.env.PUBLIC_URL + "/images/documentIcon.png";
                return <img src={imgUrl} style={{ width: '50px' }} alt='crashed' />;
            }
        })}
    </>
}
