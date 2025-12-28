import { useEffect, useRef } from 'react';
import CountUp from 'react-countup';
import {
    BannerImage,
    BannerOverlay,
    BannerWrapper,
    CompanyLogo,
    CompanyName,
    DecoImageLeft,
    DecoImageRight,
    EventTitle,
    Participants,
    ParticipantsLabel,
    ParticipantsNumber,
    ParticipateButton,
} from './EventBanner.styled';

const EventBanner = ({ event, onParticipate, submitting }) => {
    const imageUrl = event?.imageUrl || '/src/assets/images/main/link1.png';

    const prevCountRef = useRef(0);
    const current = event?.currentParticipants ?? 0;

    // 이전 값 갱신 (렌더 후)
    useEffect(() => {
        prevCountRef.current = current;
    }, [current]);

    const prev = prevCountRef.current;

    return (
        <BannerWrapper>
        <DecoImageLeft src="/src/assets/images/main/visual_pop01.png" alt="" />
        <DecoImageRight src="/src/assets/images/main/visual_pop02.png" alt="" />

        <BannerImage
            style={{ backgroundImage: `url(${imageUrl})` }}
            aria-label={event?.eventTitle || '이벤트 배너'}
        />

        <BannerOverlay>
            <CompanyName>
            <CompanyLogo src="/src/assets/images/main/korea.png" alt="회사 로고" />
            {event?.companyName}
            </CompanyName>

            <EventTitle>{event?.eventTitle}</EventTitle>

            <Participants>
            <ParticipantsLabel>참여자:</ParticipantsLabel>

            <ParticipantsNumber>
                <CountUp
                start={prev}
                end={current}
                duration={0.5}
                separator=","
                preserveValue
                />
            </ParticipantsNumber>

            <ParticipantsLabel>/</ParticipantsLabel>

            <ParticipantsNumber>
                {event?.maxParticipants?.toLocaleString()}
            </ParticipantsNumber>

            <ParticipantsLabel>
                ({event?.participationRate}%)
            </ParticipantsLabel>
            </Participants>

            <ParticipateButton
            onClick={onParticipate}
            disabled={!event || submitting}
            >
            참여하기
            </ParticipateButton>
        </BannerOverlay>
        </BannerWrapper>
    );
};

export default EventBanner;
