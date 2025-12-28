import { useContext, useEffect, useRef, useState } from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../../../../styles/thismonth-swiper-nav.css';
import '../../../../styles/thismonth-swiper-pagination.css';
import CampaignListItem from '../../../Campaign/Campaigns/components/CampaignListItem';
import useCampaignList from '../../../Campaign/Campaigns/useCampaignList';
import { AuthContext } from '../../../Context/AuthContext';

const CustomNavButton = ({ direction, onClick, className }) => (
    <button
        className={className}
        onClick={onClick}
        aria-label={direction === 'prev' ? '이전' : '다음'}
        type="button"
    >
    <span style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
        {direction === 'prev' ? (
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#6c757d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="14.5 8.5 10.5 12 14.5 15.5"/>
            </svg>
        ) : (
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#6c757d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9.5 8.5 13.5 12 9.5 15.5"/>
            </svg>
        )}
    </span>
  </button>
);

const ThisMonthCampaign = () => {
    const [thisMonthCampaigns, setThisMonthCampaigns] = useState([]);
    const { campaigns, loading } = useCampaignList();
    const { auth } = useContext(AuthContext);
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    useEffect(() => {
        const now = new Date();
        const filtered = campaigns.filter(c => {
        const start = new Date(c.startDate);
        const end = new Date(c.endDate);
        return start <= now && now <= end;
        });
        setThisMonthCampaigns(filtered);
    }, [campaigns]);

    if (loading) return <div>로딩중...</div>;
    if (!thisMonthCampaigns.length) return <div>이번달 캠페인이 없습니다.</div>;

    return (
        <div style={{position:'relative', boxShadow:'0 2px 8px rgba(0, 0, 0, 0.08)', background:'#fff', borderRadius:'14px', minHeight:320}}>
            <CustomNavButton direction="prev" onClick={() => prevRef.current && prevRef.current.click()} className="custom-swiper-nav custom-swiper-nav-prev" />
            <CustomNavButton direction="next" onClick={() => nextRef.current && nextRef.current.click()} className="custom-swiper-nav custom-swiper-nav-next" />
            <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
            pagination={{ clickable: true }}
            style={{ minHeight: 320 }}
            onInit={swiper => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
            }}
            >
            <div ref={prevRef} style={{display:'none'}} />
            <div ref={nextRef} style={{display:'none'}} />
            {thisMonthCampaigns.map(campaign => (
                <SwiperSlide key={campaign.campaignNo}>
                <CampaignListItem campaign={campaign} auth={auth} showLikeButton={false} />
                </SwiperSlide>
            ))}
        </Swiper>
      </div>
    );
};

export default ThisMonthCampaign;
