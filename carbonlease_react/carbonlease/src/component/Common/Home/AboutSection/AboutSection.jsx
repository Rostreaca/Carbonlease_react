import { useEffect, useRef, useState } from 'react';
import { AboutCol, AboutColTitle, AboutInner, AboutSectionWrapper } from './AboutSection.styled';
import NoticeList from './NoticeList';
import ThisMonthCampaign from './ThisMonthCampaign';

const AboutSection = () => {
    const sectionRef = useRef(null);
    const [aboutImgError, setAboutImgError] = useState(false);

    useEffect(() => {
        const AOS = window.AOS;
        if (AOS) {
            AOS.init({
                duration: 600,
                easing: 'ease-in-out',
                once: true, // 한 번만 애니메이션 실행
                mirror: false,
                offset: 300 // 트리거 위치를 더 아래로 내려서 스크롤 진입 시에만 동작
            });
        }
    }, []);

    return (
        <AboutSectionWrapper
            id="about"
            ref={sectionRef}
            data-aos="fade-up"
            data-aos-delay="200"
            style={{ padding: 0 }}
        >
            <div className="container">
                <AboutInner>
                    <AboutCol>
                        <AboutColTitle color="#00a34a">이달의 캠페인</AboutColTitle>
                        <ThisMonthCampaign />
                    </AboutCol>
                    <AboutCol>
                        <AboutColTitle color="#1976d2">공지사항</AboutColTitle>
                        <NoticeList />
                    </AboutCol>
                </AboutInner>
            </div>
        </AboutSectionWrapper>
    );
};

export default AboutSection;
