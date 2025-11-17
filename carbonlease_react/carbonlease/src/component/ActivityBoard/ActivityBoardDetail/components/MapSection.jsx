import { useEffect } from "react";

const { VITE_KAKAO_MAP_API_KEY } = import.meta.env;

export default function MapSection() {

  useEffect(() => {
    if (!document.getElementById("kakao-map-script")) {
      const script = document.createElement("script");
      script.id = "kakao-map-script";
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${VITE_KAKAO_MAP_API_KEY}&autoload=false&libraries=services`;
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        window.kakao.maps.load(() => initMap());
      };
    } else {
      window.kakao.maps.load(() => initMap());
    }
  }, []);

  const initMap = () => {
    const container = document.getElementById("map");
    const centerAddrDiv = document.getElementById("centerAddr");
    if (!container || !centerAddrDiv) return;

    const options = {
      center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
      level: 1,
    };

    // 지도 생성
    const map = new window.kakao.maps.Map(container, options);

    // 주소 변환 객체
    const geocoder = new window.kakao.maps.services.Geocoder();

    // 마커 / 인포윈도우
    const marker = new window.kakao.maps.Marker();
    const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });

    // 중심좌표 주소 출력
    searchAddrFromCoords(map.getCenter(), displayCenterInfo);

    // 지도 클릭하면 해당 위치 주소검색 + 마커 표시
    window.kakao.maps.event.addListener(map, "click", function (mouseEvent) {
      searchDetailAddrFromCoords(mouseEvent.latLng, function (result, status) {
        if (status === window.kakao.maps.services.Status.OK) {
          const road = result[0].road_address?.address_name;
          const jibun = result[0].address.address_name;

          const content = `
            <div class="bAddr">
              <span class="title">법정동 주소정보</span>
              ${road ? `<div>도로명주소 : ${road}</div>` : ""}
              <div>지번 주소 : ${jibun}</div>
            </div>
          `;

          marker.setPosition(mouseEvent.latLng);
          marker.setMap(map);

          infowindow.setContent(content);
          infowindow.open(map, marker);
        }
      });
    });

    // 지도 이동 완료 시 중심주소 업데이트
    window.kakao.maps.event.addListener(map, "idle", function () {
      searchAddrFromCoords(map.getCenter(), displayCenterInfo);
    });

    // 좌표로 행정동 요청
    function searchAddrFromCoords(coords, callback) {
      geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
    }

    // 좌표로 법정동 상세 주소 요청
    function searchDetailAddrFromCoords(coords, callback) {
      geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    }

    // 지도 좌측 상단 텍스트 업데이트
    function displayCenterInfo(result, status) {
      if (status === window.kakao.maps.services.Status.OK) {
        for (let i = 0; i < result.length; i++) {
          if (result[i].region_type === "H") {
            centerAddrDiv.innerHTML = result[i].address_name;
            break;
          }
        }
      }
    }
  };

  return (
    <>
      <div
        id="map"
        style={{ width: "100%", height: "400px", borderRadius: "8px" }}
      ></div>
      <div
        id="centerAddr"
        style={{
          padding: "8px",
          fontSize: "14px",
          fontWeight: "bold",
          background: "#fff",
          width: "fit-content",
        }}
      >
        주소 불러오는 중...
      </div>
    </>
  );
}
