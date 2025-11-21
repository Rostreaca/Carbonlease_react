import { useEffect } from "react";

export default function AddressSearchInput({ value, onChange }) {

  useEffect(() => {
    if (window.kakao && window.kakao.maps) return; // 중복 방지

    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_API_KEY}&libraries=services`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      console.log("Kakao Map SDK Loaded");
    };
  }, []);

  const handleSearch = () => {
    if (!window.daum || !window.daum.Postcode) {
      alert("주소 검색 라이브러리가 로드되지 않았습니다.");
      return;
    }

    new window.daum.Postcode({
      oncomplete: function (data) {
        const address = data.address;

        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.addressSearch(address, (result, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const lat = result[0].y;
            const lng = result[0].x;

            console.log("주소 선택됨:", address, lat, lng);
            onChange(address, lat, lng);
          } else {
            alert("좌표 조회 실패");
            onChange(address, null, null);
          }
        });
      }
    }).open();
  };

  return (
    <div style={{ display:'flex', gap:'8px' }}>
      <input
        type="text"
        value={value}
        placeholder="주소를 검색해주세요."
        readOnly
        className="form-control"
      />
      <button 
        type="button" 
        className="btn btn-outline-secondary" 
        onClick={handleSearch}
      >
        검색
      </button>
    </div>
  );
}
