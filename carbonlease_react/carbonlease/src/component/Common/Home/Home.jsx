import { useEffect } from 'react';
import AboutSection from './AboutSection/AboutSection';
import CallToActionSection from './CallToActionSection/CallToActionSection';
import HeroSection from './HeroSection/HeroSection';
import { GlobalStyles } from './Home.styles';

const Home = () => {
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

        return () => {
            try {
                document.body.classList.remove('index-page');
            } catch (e) {}
        };
    }, []);

    return (
        <GlobalStyles>
            <HeroSection />
                <AboutSection />
                {/* <StatsSection /> */}
            <CallToActionSection />
        </GlobalStyles>
    );
};

export default Home;
