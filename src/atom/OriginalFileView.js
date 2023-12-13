import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'api/axios';

export default function OriginalFileView({ imgUrl, afdto }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const [originalFileUrl, setOriginalFileUrl] = useState(false);

    const buildUri = (blob) => {
        const originalFile = new File([blob.data], afdto.originalFilePureName, { type: afdto.contentType });
        setOriginalFileUrl((window.URL || window.webkitURL).createObjectURL(originalFile));
        setShow(true);
    }

    const getOriginalFile = () => {
        axios.post(`/attach/anonymous/getOriginalFile`, afdto,
            {
                headers: { "Content-Type": "application/json" },
                responseType: "blob"
            })
            .then(buildUri)
            .catch(err => { console.log("getOriginalFile error", err); });
    }

    return <>
        <img src={imgUrl} onClick={(e) => { getOriginalFile() }} style={{ width: '50px' }} alt='crashed' />
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{afdto.originalFilePureName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        {afdto.contentType === "image" ? <img src={originalFileUrl} alt='crashed' width="480" /> :
                            afdto.contentType === "video" ? <video src={originalFileUrl} alt='crashed' width="480" controls autoPlay /> : null}
                    </Form.Group>
                </Form>
            </Modal.Body>
        </Modal>
    </>
}