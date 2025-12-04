import styled from "styled-components";

export const BoardItemWrapper = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr 140px;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #e4e4e4;
`;

export const BoardNo = styled.div`
  font-weight: 600;
  color: #666;
`;

export const BoardInfo = styled.div`
  .title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 6px;
  }
  .content {
    font-size: 14px;
    color: #555;
    margin-bottom: 6px;
  }
  .meta {
    font-size: 12px;
    color: #888;
  }
`;

export const Thumbnail = styled.div`
  width: 120px;
  height: 90px;
  border-radius: 6px;
  overflow: hidden;
  background: #f2f2f2;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .no-image {
    color: #aaa;
    font-size: 12px;
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
    height: 45px;
    width: 105px;
    padding: 12px;
    border: none;
    border-radius: 10px;
    font-size: 17px;          
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);

    background: #81f1b0ff;
    color: #fff;

    transition: 0.2s ease;
  }

  button:hover {
    background: #34d399;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.18);
    transform: translateY(-1px);
  }
`;