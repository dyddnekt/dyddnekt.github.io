import { useEffect, useRef } from "react";

export default function InfList() {
    const target = useRef(null);
    let count = 0;

    useEffect(() => {
        observer.observe(target.current);
    }, []);

    const options = {
        threshold: 1.0,
    };

    const callback = () => {
        count++;
        target.current.innerText += `${count}번 관측되었습니다\n`;
    };

    const observer = new IntersectionObserver(callback, options);

    return (
        <>
            <div style={{ height: "300vh", backgroundColor: "green" }} />
            <div style={{ height: "100px", backgroundColor: "red" }} ref={target} />
        </>
    );
}