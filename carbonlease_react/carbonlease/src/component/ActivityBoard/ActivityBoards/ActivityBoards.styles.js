import styled from "styled-components";

export const ListWrapper = styled.div`
  width: 900px;
  margin: 0 auto;
  padding: 20px 0;
  font-family: 'NanumSquare', sans-serif;
`;

export const BoardsRow = styled.div`
  display: grid;
  grid-template-columns: 60px 1fr 120px;
  padding: 20px 0;
  border-bottom: 1px solid #eaeaea;
  cursor: pointer;
`;

export const BoardNo = styled.div`
  font-size: 14px;
  color: #555;
  padding-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TextInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Title = styled.div`
  font-weight: 600;
  font-size: 17px;
`;

export const Content = styled.div`
  font-size: 14px;
  color: #444;
`;

export const ETC = styled.div`
  font-size: 12px;
  color: #888;
`;

export const Thumbnail = styled.div`
  width: 110px;
  height: 80px;
  background: #f5f5f5;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .no-image {
    font-size: 12px;
    color: #999;
  }
`;

export const ButtonAndSearch = styled.div`
  width: 920px;
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'NanumSquare', sans-serif;

  button {
    height: 45px;
    width: 105px;
    padding: 12px;
    border: none;
    border-radius: 8px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #2ecc71;
    color: #fff;

    &:hover {
      background: #27ae60;
    }
  }
`;

export const SearchBox = styled.div`
  display: flex;
  gap: 7px;
  align-items: center;

  input {
    width: 60%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 6px;

    &:focus {
      outline: none;
      border-color: #00a36f !important;
      box-shadow: 0 0 0 2px rgba(0,163,111,0.15) !important;
    }
  }

  select {
    border-radius: 10px !important;
    border: 1px solid #dcdcdc !important;
    padding: 10px;

    &:focus {
      outline: none;
      border-color: #00a36f !important;
      box-shadow: 0 0 0 2px rgba(0,163,111,0.15) !important;
    }
  }

  button {
    padding: 8px 12px;
    background: #2ecc71;
    border: none;
    color: #fff;
    border-radius: 6px;
    cursor: pointer;
  }
`;
