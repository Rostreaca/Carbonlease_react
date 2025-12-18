
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
    ParticipateButton
} from './EventBanner.styled';

const EventBanner = ({ event, onParticipate }) => {
    const imageUrl = event?.imageUrl || '/src/assets/images/main/asd.png';
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
                        <CompanyLogo
                            src="/src/assets/images/main/korea.png"
                            alt="회사 로고"
                        />
                    {event?.companyName}
                </CompanyName>
                <EventTitle>{event?.eventTitle}</EventTitle>
                <Participants>
                    <ParticipantsLabel>참여자:</ParticipantsLabel>
                    <ParticipantsNumber>
                        <CountUp
                            end={event?.currentParticipants || 0}
                            duration={0.8}
                            separator="," 
                        />
                    </ParticipantsNumber>
                    <ParticipantsLabel>/</ParticipantsLabel>
                    <ParticipantsNumber>
                        <CountUp
                            end={event?.maxParticipants || 0}
                            duration={0.8}
                            separator="," 
                        />
                    </ParticipantsNumber>
                    <ParticipantsLabel>
                        ({event?.participationRate}%)
                    </ParticipantsLabel>
                </Participants>
                <ParticipateButton
                    onClick={() => event && onParticipate()}
                    disabled={!event}
                >
                    참여하기
                </ParticipateButton>
            </BannerOverlay>
        </BannerWrapper>
    );
};

export default EventBanner;