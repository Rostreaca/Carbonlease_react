import { useEffect, useState } from 'react';
import { NoticeSlider, Topbar } from "../Header.styled";

const TopbarNotice = () => {
    const notices = [
        { id: 1, text: " 신규 회원 가입 이벤트 진행 중입니다!", link: "#event1" },
        { id: 2, text: " 친환경 캠페인 참여로 탄소 절감에 동참하세요", link: "#campaign" },
        { id: 3, text: " 2024년 12월 정기 점검 안내 (12/15 02:00~06:00)", link: "#maintenance" },
        { id: 4, text: " 이달의 우수 실천자 시상식 안내", link: "#awards" }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % notices.length);
        }, 3000); // 3초마다 전환

        return () => clearInterval(interval);
    }, [notices.length]);

    return(
        <>
            <Topbar className="topbar d-flex align-items-center dark-background">
                <div className="container d-flex justify-content-center justify-content-md-between">
                    <div className="contact-info d-flex align-items-center" style={{width: '100%', justifyContent: 'center'}}>
                        <i className="bi bi-megaphone d-flex align-items-center" style={{marginRight: '10px'}}></i>
                        <NoticeSlider>
                            {notices.map((notice, index) => (
                                <div
                                    key={notice.id}
                                    className={`notice-item ${index === currentIndex ? 'active' : ''}`}
                                >
                                    <a href={notice.link}>{notice.text}</a>
                                </div>
                            ))}
                        </NoticeSlider>
                    </div>
                </div>
            </Topbar>
        </>
    )

}

export default TopbarNotice;