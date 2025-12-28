
import boyImg from '../../../assets/images/main/boy.png';
import cloudImg from '../../../assets/images/main/cloud1.png';
import earthImg from '../../../assets/images/main/earth.png';
import girlImg from '../../../assets/images/main/girl.png';
import leafImg from '../../../assets/images/main/green.png';
import { AboutList, AboutWrapper, CenterContent, CharacterImg, DecoImg, Desc, EarthImg, MainTitle, SubTitle, YearBadge } from './About.styled';

const About = () => (
  <AboutWrapper>
    <DecoImg src={leafImg} alt="leaf" style={{top: 60, left: '22%', width: 70, transform: 'rotate(-12deg)'}} />
    <DecoImg src={leafImg} alt="leaf" style={{top: 80, right: '20%', width: 60, transform: 'rotate(18deg)'}} />
    <DecoImg src={cloudImg} alt="cloud" style={{left: '13%', bottom: 180, width: 90}} />
    <DecoImg src={cloudImg} alt="cloud" style={{right: '13%', bottom: 180, width: 90}} />
    <EarthImg src={earthImg} alt="earth" />
    <CharacterImg src={boyImg} alt="boy" className="boy" />
    <CharacterImg src={girlImg} alt="girl" className="girl" />
        <CenterContent>
            <YearBadge>2025</YearBadge>
            <MainTitle>Carbonlease란?</MainTitle>
            <Desc>카본리즈는 탄소를 절약해 더 나은 미래를 함께 '빌려주는' 친환경 커뮤니티입니다.</Desc>
            <SubTitle>우리는 이렇게 실천합니다</SubTitle>
            <AboutList>
                <li>친환경 활동 인증으로 실천 경험 공유</li>
                <li>커뮤니티 게시판을 통한 정보 공유와 소통</li>
                <li>친환경 캠페인 참여 및 환경 보호 활동</li>
            </AboutList>
            <Desc style={{color: '#333', fontWeight:"600"}}>함께 실천하고, 함께 성장하며, 지속가능한 미래를 만들어갑니다.</Desc>
        </CenterContent>
  </AboutWrapper>
);

export default About;
