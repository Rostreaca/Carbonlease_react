import { CallToActionSectionWrapper } from './CallToActionSection.styled';

const CallToActionSection = () => {
    return (
        <CallToActionSectionWrapper id="call-to-action">
            <div className="container">
                <div className="row justify-content-center" data-aos="zoom-in" data-aos-delay="200">
                    <div className="col-xl-10">
                        <div className="text-center">
                            <h3>지금 바로 시작하세요!</h3>
                            <p>
                                탄소중립 실천을 함께하고, 친환경 커뮤니티에 참여해보세요.
                            </p>
                            <a className="btn btn-light btn-lg" href="/member/enrollForm">
                                회원가입하기
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </CallToActionSectionWrapper>
    );
};

export default CallToActionSection;
