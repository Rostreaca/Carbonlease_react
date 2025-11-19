export default function AddressSearchInput({ value, onChange }) {

  const handleSearch = () => {
    new window.daum.Postcode({
      oncomplete: (data) => {
        const address = data.address;
        
        // 카카오 지도 Geocoder 사용
        const geocoder = new window.kakao.maps.services.Geocoder();

        geocoder.addressSearch(address, (result, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const lat = result[0].y;
            const lng = result[0].x;

            // 부모로 주소 + 좌표 전달
            onChange(address, lat, lng);
          } else {
            alert("주소 좌표 조회 실패했습니다.");
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
