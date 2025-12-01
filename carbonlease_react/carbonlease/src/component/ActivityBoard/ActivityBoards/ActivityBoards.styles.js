import styled from "styled-components";

export const ListWrapper = styled.div`
  max-width: 900px;
  widtn: 100%;
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
  border-radius: 6px;

  transition:
    background-color 0.25s ease,
    box-shadow 0.25s ease,
    border-left 0.25s ease;

  &:hover {
    background-color: #f7fffa; 
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.06);
    border-left: 8px solid #b6f2d0;
  }
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
  white-space: normal;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
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

export const EmptyWrapper = styled.div`
  margin: 60px 0;
  width: auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const EmptyMessage = styled.div`
  font-size: 18px;
  padding: 15px;
  margin-bottom: 15px;
  color: #666;
`;

export const EmptySub = styled.div`
  font-size: 14px;
  margin-bottom: 50px;
  color: #999;
`;