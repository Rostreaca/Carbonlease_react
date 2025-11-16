import { useEffect, useState } from 'react';
import {
    AboutContent,
    AboutInner,
    AboutSection,
    CallToActionSection,
    GlobalStyles,
    HeroActions,
    HeroDescription,
    HeroSection,
    HeroTitle,
    ImageFallback,
    SectionTitle,
    StatsSection
} from './Home.styles';
import RegionStatsMap from './RegionStatsMap/RegionStatsMap';

const Home = () => {
    const [aboutImgError, setAboutImgError] = useState(false);

    useEffect(() => {
        try {
            document.body.classList.add('index-page');
        } catch (e) {}

        const AOS = window.AOS;
        if (AOS) {
            AOS.init({
                duration: 600,
                easing: 'ease-in-out',
                once: false,
                mirror: true,
            });
            AOS.refresh();
        }

        const counters = document.querySelectorAll('.stat-counter');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-end'), 10);
            const duration = 2000; // 2 seconds

            const animateCounter = () => {
                const startTime = Date.now();

                const updateCounter = () => {
                    const elapsed = Date.now() - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const current = Math.floor(progress * target);

                    counter.textContent = current.toLocaleString();

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    }
                };

                updateCounter();
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        counter.textContent = '0';
                        animateCounter();
                    }
                });
            }, {
                threshold: 0.3
            });

            observer.observe(counter);
        });

        return () => {
            try {
                document.body.classList.remove('index-page');
            } catch (e) {}
        };
    }, []);

    return (
        <GlobalStyles>
            {/* ===== Hero Section ===== */}
            <HeroSection id="hero">
                <div className="container">
                    <div className="row gy-4 ">
                        <div className="col-lg-4 order-2 order-lg-1 d-flex flex-column justify-content-center">
                            <HeroTitle>탄소중립, 함께 만들어가는 지속가능한 미래</HeroTitle>
                            <HeroDescription>
                                일상 속 친환경 실천을 공유하고 함께 성장하는 탄소중립 커뮤니티 플랫폼
                            </HeroDescription>
                            <HeroActions>
                                {/* <a href="#about" className="btn btn-success btn-lg">Get Started</a> */}
                                <a href="https://youtu.be/i43vcO-tH24?si=c7cZdJ4XWhnVD1PJ" className="btn btn-outline-secondary btn-lg d-flex align-items-center gap-2" target='blank'>
                                    <i className="bi bi-play-circle"></i>
                                    <span>Watch Video</span>
                                </a>
                            </HeroActions>

                            {/* <div className="hero-stats">
                                <div className="stat-item">
                                    <div className="stat-number">10+</div>
                                    <div className="stat-label">Years Experience</div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-number">500+</div>
                                    <div className="stat-label">Clients Served</div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-number">1000+</div>
                                    <div className="stat-label">Projects Complete</div>
                                </div>
                            </div> */}
                        </div>

                        <div className="col-lg-6 order-1 order-lg-2 hero-img">
                            <RegionStatsMap />
                        </div>
                    </div>
                </div>
            </HeroSection>

            {/* ===== Featured Services Section ===== */}
            {/* <FeaturedServicesSection id="featured-services">
                <div className="container" data-aos="fade-up" data-aos-delay="100">
                    <div className="row gy-4">
                        <div className="col-lg-4" data-aos="fade-up" data-aos-delay="100">
                            <div className="card h-100 border-0 shadow-sm">
                                <div className="card-body text-center">
                                    <div className="text-success mb-3" style={{fontSize: '2.5rem'}}>
                                        <i className="bi bi-activity"></i>
                                    </div>
                                    <h4 className="card-title">Service One</h4>
                                    <p className="card-text">High-quality web design and development services tailored to your needs</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4" data-aos="fade-up" data-aos-delay="200">
                            <div className="card h-100 border-0 shadow-sm">
                                <div className="card-body text-center">
                                    <div className="text-success mb-3" style={{fontSize: '2.5rem'}}>
                                        <i className="bi bi-bounding-box-circles"></i>
                                    </div>
                                    <h4 className="card-title">Service Two</h4>
                                    <p className="card-text">Comprehensive digital solutions for modern businesses</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4" data-aos="fade-up" data-aos-delay="300">
                            <div className="card h-100 border-0 shadow-sm">
                                <div className="card-body text-center">
                                    <div className="text-success mb-3" style={{fontSize: '2.5rem'}}>
                                        <i className="bi bi-calendar4-week"></i>
                                    </div>
                                    <h4 className="card-title">Service Three</h4>
                                    <p className="card-text">Expert support and maintenance for all your projects</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </FeaturedServicesSection> */}

            {/* ===== About Section ===== */}
            <AboutSection id="about">
                <SectionTitle className="container section-title">
                    {/* <span>소개</span> */}
                    <h2>Carbonlease란?</h2>
                    {/* <p>탄소중립 실천을 쉽고 재미있게, 함께하는 커뮤니티</p> */}
                </SectionTitle>

                <div className="container" data-aos="fade-up" data-aos-delay="200">
                    <AboutInner>
                        <div data-aos="fade-right" data-aos-delay="300">
                            
                            <ImageFallback>
                                    <img
                                    src="/src/assets/images/main/carbon_ca.png"
                                    className="img-fluid"
                                    alt="About"
                                    onError={() => setAboutImgError(true)}
                                />
                                </ImageFallback>
                        </div>

                        <AboutContent className="col-lg-6 content" data-aos="fade-left" data-aos-delay="300" data-aos-once="true">
                            <h3>왜 Carbonlease인가요?</h3>
                            <p>
                                카본리즈는 탄소를 절약해 더 나은 미래를 함께 ‘빌려주는’ 친환경 커뮤니티입니다.
                            </p>
                            <ul>
                                <li>
                                    <i className="bi bi-check-circle-fill" style={{marginRight: '8px'}}></i>
                                    <span>친환경 활동 인증으로 실천 경험 공유</span>
                                </li>
                                <li>
                                    <i className="bi bi-check-circle-fill" style={{marginRight: '8px'}}></i>
                                    <span>커뮤니티 게시판을 통한 정보 공유와 소통</span>
                                </li>
                                <li>
                                    <i className="bi bi-check-circle-fill" style={{marginRight: '8px'}}></i>
                                    <span>친환경 캠페인 참여 및 환경 보호 활동</span>
                                </li>
                            </ul>
                            <p>
                                함께 실천하고, 함께 성장하며, 지속가능한 미래를 만들어갑니다.
                            </p>
                        </AboutContent>
                    </AboutInner>
                </div>
            </AboutSection>

            {/* ===== Stats Section ===== */}
            <StatsSection id="stats">
                <div className="container" data-aos="fade-up" data-aos-delay="100">
                    <div className="row gy-4">
                        <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="200">
                            <div className="stats-item text-center">
                                <span className="stat-counter" data-end="2500">0</span>
                                <p>커뮤니티 회원</p>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="300">
                            <div className="stats-item text-center">
                                <span className="stat-counter" data-end="15000">0</span>
                                <p>인증 활동</p>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="400">
                            <div className="stats-item text-center">
                                <span className="stat-counter" data-end="8500">0</span>
                                <p>절감 CO₂ (kg)</p>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="500">
                            <div className="stats-item text-center">
                                <span className="stat-counter" data-end="120">0</span>
                                <p>진행 중 캠페인</p>
                            </div>
                        </div>
                    </div>
                </div>
            </StatsSection>

            {/* ===== Services Section ===== */}
            {/* <ServicesSection id="services" className="light-background">
                <SectionTitle className="container section-title" >
                    <h2>플랫폼 서비스</h2>
                    <p>탄소중립 실천을 위한 다양한 기능을 제공합니다</p>
                </SectionTitle>

                <div className="container" data-aos="fade-up" data-aos-delay="200">
                    <div className="row gy-4">
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                            <div key={item} className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={200 + (item * 100)}>
                                <div className="card h-100 border-0 shadow-sm">
                                    <div className="card-body">
                                        <div className="text-success mb-3" style={{fontSize: '2.5rem'}}>
                                            <i className={`bi bi-${['activity', 'broadcast', 'easel', 'bounding-box-circles', 'calendar4-week', 'chat-square-text'][item - 1]}`}></i>
                                        </div>
                                        <h5 className="card-title">Service {item}</h5>
                                        <p className="card-text">High-quality service description for service item {item}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </ServicesSection> */}

            {/* ===== Call To Action Section ===== */}
            <CallToActionSection id="call-to-action">
                <div className="container">
                    <div className="row justify-content-center" data-aos="zoom-in" data-aos-delay="200">
                        <div className="col-xl-10">
                            <div className="text-center">
                                <h3>지금 바로 시작하세요!</h3>
                                <p>
                                    탄소중립 실천을 함께하고, 친환경 커뮤니티에 참여해보세요.
                                </p>
                                <a className="btn btn-light btn-lg" href="#signup">
                                    회원가입하기
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </CallToActionSection>
        </GlobalStyles>
    );
};

export default Home;