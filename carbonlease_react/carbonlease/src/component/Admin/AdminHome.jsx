import { useState, useCallback } from 'react';
import DoughnutChart from './Dashboard/DoughnutChart/DoughnutChart';
import Toast from '../Common/Toast/Toast';
import RegionLineChart from './Dashboard/RegionLineChart/RegionLineChart';
import Top5RankingList from './Dashboard/TopRankingList/Top5RankingList';
import {
    DashboardRow,
    DashboardSection,
    DashboardSubTitle,
    DashboardTitle,
    DashboardWideSection,
    DashboardWrapper
} from './Dashboard/dashboard.styled.js';

const AdminHome = () => {
    const [toastMessage, setToastMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastVariant, setToastVariant] = useState('success');

    const handleShowToast = useCallback((message, variant = 'success') => {
        setToastMessage(message);
        setToastVariant(variant);
        setShowToast(true);
    }, []);

    const handleCloseToast = useCallback(() => {
        setShowToast(false);
    }, []);

    return (
        <DashboardWrapper>
            <DashboardTitle>Dashboard | 각종 이력을 간략히 확인할 수 있습니다.</DashboardTitle>
            <DoughnutChart onShowToast={handleShowToast} />
            {/* 두 번째 행: 지역, 인기글 TOP5 */}
            <DashboardRow>
                <DashboardWideSection>
                    <DashboardSubTitle>지역별 커뮤니티 활동량</DashboardSubTitle>
                    <RegionLineChart onShowToast={handleShowToast} />
                </DashboardWideSection>
                <DashboardSection>
                    <DashboardSubTitle>인기글 Top 5</DashboardSubTitle>
                    <Top5RankingList data={[]} />
                </DashboardSection>
            </DashboardRow>
            <Toast
                message={toastMessage}
                isVisible={showToast}
                onClose={handleCloseToast}
                variant={toastVariant}
            />
        </DashboardWrapper>
    );
};

export default AdminHome;
