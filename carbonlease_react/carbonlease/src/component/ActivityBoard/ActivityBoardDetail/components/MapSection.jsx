import { useEffect, useState } from "react";
const { VITE_KAKAO_MAP_API_KEY } = import.meta.env;

export default function MapPicker({ lat, lng, onChange }) {
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!document.getElementById("kakao-map-sdk")) {
      const script = document.createElement("script");
      script.id = "kakao-map-sdk";
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${VITE_KAKAO_MAP_API_KEY}&autoload=false&libraries=services`;
      script.onload = () => window.kakao.maps.load(() => setMapLoaded(true));
      document.head.appendChild(script);
    } else {
      window.kakao.maps.load(() => setMapLoaded(true));
    }
  }, []);

  useEffect(() => {
    if (!mapLoaded) return;
    if (!window.kakao) return;

    const container = document.getElementById("mapPicker");
    if (!container) return;

    const options = {
      center: new window.kakao.maps.LatLng(lat, lng),
      level: 3,
    };

    const map = new window.kakao.maps.Map(container, options);
    const geocoder = new window.kakao.maps.services.Geocoder();

    const marker = new window.kakao.maps.Marker({
      position: map.getCenter(),
      draggable: true,
    });
    marker.setMap(map);

    // 클릭해서 위치 이동
    window.kakao.maps.event.addListener(map, "click", function (mouseEvent) {
      const latlng = mouseEvent.latLng;
      marker.setPosition(latlng);
      updateAddress(latlng);
    });

    // 드래그 끝났을 때 주소 적용
    window.kakao.maps.event.addListener(marker, "dragend", function () {
      const latlng = marker.getPosition();
      updateAddress(latlng);
    });

    function updateAddress(latlng) {
      geocoder.coord2Address(latlng.getLng(), latlng.getLat(), (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const road = result[0].road_address?.address_name || "";
          const jibun = result[0].address.address_name || "";
          const address = road || jibun;
          onChange({
            lat: latlng.getLat(),
            lng: latlng.getLng(),
            address,
          });
        }
      });
    }
  }, [mapLoaded]);

  return (
    <>
      <div id="mapPicker" style={{ width: "100%", height: "360px", borderRadius: "10px" }} />
    </>
  );
}
