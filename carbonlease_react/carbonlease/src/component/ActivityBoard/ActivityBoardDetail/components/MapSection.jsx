import { useEffect, useState } from "react";
import { MapArea } from "../ActivityBoardDetail.styles";

const { VITE_KAKAO_MAP_API_KEY } = import.meta.env;

const MapSection = ({ lat = 37.566826, lng = 126.9786567 }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Kakao SDK 로드
    if (!document.getElementById("kakao-map-sdk")) {
      const script = document.createElement("script");
      script.id = "kakao-map-sdk";
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${VITE_KAKAO_MAP_API_KEY}&autoload=false`;
      script.onload = () => window.kakao.maps.load(() => setLoaded(true));
      document.head.appendChild(script);
    } else {
      window.kakao.maps.load(() => setLoaded(true));
    }
  }, []);

  useEffect(() => {
    if (!loaded) return;
    if (!window.kakao) return;

    const container = document.getElementById("detailMap");
    if (!container) return;

    const map = new window.kakao.maps.Map(container, {
      center: new window.kakao.maps.LatLng(lat, lng),
      level: 3,
    });

    const marker = new window.kakao.maps.Marker({
      map,
      position: new window.kakao.maps.LatLng(lat, lng),
    });
  }, [loaded, lat, lng]);

  return (
    <MapArea id="detailMap" />
  );
};

export default MapSection;
