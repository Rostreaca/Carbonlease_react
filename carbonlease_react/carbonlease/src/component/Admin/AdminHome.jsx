import DoughnutChart from './Dashboard/DoughnutChart';
import RegionLineChart from './Dashboard/RegionLineChart';
import Top5RankingList from './Dashboard/Top5RankingList';
import {
    DashboardRow,
    DashboardSection,
    DashboardSubTitle,
    DashboardTitle,
    DashboardWideSection,
    DashboardWrapper
} from './Dashboard/dashboard.styled.js';

const AdminHome = () => {
    return (
        <DashboardWrapper>
            <DashboardTitle>Dashboard | 각종 이력을 간략히 확인할 수 있습니다.</DashboardTitle>
            <DoughnutChart />
            {/* 두 번째 행: 지역, 인기글 TOP5 */}
            <DashboardRow>
                <DashboardWideSection>
                    <DashboardSubTitle>지역별 커뮤니티 활동량</DashboardSubTitle>
                    <RegionLineChart />
                </DashboardWideSection>
                <DashboardSection>
                    <DashboardSubTitle>인기글 Top 5</DashboardSubTitle>
                    <Top5RankingList data={[]} />
                </DashboardSection>
            </DashboardRow>
        </DashboardWrapper>
    );
};

export default AdminHome;
