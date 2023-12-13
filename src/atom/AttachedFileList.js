import axios from 'api/axios';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import AttachFile from './AttachFile';

export default function AttachedFileList({ writer, listAttach, setListAttach }) {
    // 검사 장치
    const [contentFilter, setContentFilter] = useState([]);
    // 지금까지 선택한 파일 기억 장치. upload 용도
    const [uploadTargets, setUploadTargets] = useState([]);

    // 파일 선택 완료 시점 처리
    function onFileSelect(fileAndHeaders) {
        let files = [], headers = [];
        fileAndHeaders.forEach(({ file, header }) => {
            if (!contentFilter.includes(header) && !headers.includes(header)) {
                files.push(file);
                headers.push(header);
            }
        });
        if (files.length > 0) {
            setContentFilter([...contentFilter, ...headers]);
            setUploadTargets([...uploadTargets, ...files]);
        }
    }

    // 지정된 file들을 axios로 server로 올리기하면... thumbnail로 첨부파일들을 목록으로 보여준다.
    const handleAttach = async (e) => {
        e.preventDefault();
        if (uploadTargets.length === 0)
            return;
        const formData = new FormData();
        // 동일 key에 여러개 할당 가능
        Array.from(uploadTargets).forEach((file) => {
            formData.append("attachFiles", file);
        });

        axios.post('/attach/upload_multi', formData, {
            headers: {
                "Content-Type": `multipart/form-data`,
                "x-auth-token": `Bearer ${writer.accessToken}`
            }
        }).then(res => {
            const listDto = res.data;
            setListAttach([...listAttach, ...listDto]);
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            setUploadTargets([]);
        });
        // setTimeout(() => { setImgSrc([...imgSrc, ...collection]); }, 100);
        console.log("handleAttach Done");
    };

    return <Form.Group className="mb-3">
        <Form.Label>첨부파일:&nbsp;</Form.Label>
        <AttachFile onFileSelect={onFileSelect} />
        <Button variant="success" onClick={handleAttach} style={{ margin: '10px' }}>
            첨부
        </Button>
    </Form.Group>
}