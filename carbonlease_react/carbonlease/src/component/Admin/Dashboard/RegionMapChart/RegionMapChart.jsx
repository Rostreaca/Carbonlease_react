import React, { useEffect, useState } from 'react';
import { getUsersRegionActivityStats } from '../../../../api/dashboard/adminDashBoard';
import { MapContainer, TileLayer, Popup, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MapChartContainer } from './RegionMapChart.styled';

// 지도 위에 지역별 totalCount를 표시하는 차트/마커 컴포넌트 (Leaflet 버전)
const RegionMapChart = ({ onShowToast }) => {
    const [regionStats, setRegionStats] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUsersRegionActivityStats()
            .then((result) => {
                setRegionStats(result.data);
            })
            .catch((error) => {
                onShowToast(
                    error?.response?.data?.["error-message"] || '지역별 데이터 조회 실패',
                    'error'
                );
            })
            .finally(() => {
                setLoading(false);
            });
    }, [onShowToast]);

    if (loading) return <div>지도 데이터를 불러오는 중...</div>;

    // 대한민국 중심 좌표
    const center = [35.9078, 127.7669];

    return (
        <MapChartContainer>
            <MapContainer center={center} zoom={6.4} style={{ width: '100%', height: '100%', objectFit: 'contain' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {regionStats.map(region => (
                    <CircleMarker
                        key={region.regionNo}
                        center={[region.latitude, region.longitude]}
                        radius={6 + region.totalCount * 1.5} // totalCount에 따라 크기 조절
                        fillColor="rgba(0,163,74,0.7)"
                        color="#008040"
                        weight={2}
                        fillOpacity={0.7}
                    >
                        <Popup>
                            <div style={{ textAlign: 'center' }}>
                                <b>{region.regionName}</b><br />
                                총 활동: {region.totalCount}
                            </div>
                        </Popup>
                    </CircleMarker>
                ))}
            </MapContainer>
        </MapChartContainer>
    );
};

export default RegionMapChart;