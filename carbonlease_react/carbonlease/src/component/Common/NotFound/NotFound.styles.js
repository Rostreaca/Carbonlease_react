import styled from "styled-components";

export const EmptyWrapper = styled.div`
  width: 100%;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const EmptyCard = styled.div`
  min-width: 800px;
  height: 550px;
  padding: 40px 32px 32px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
  text-align: center;
`;

export const EmptyImage = styled.img`
  width: 300px;
  height: 300px;
  object-fit: contain;
  margin-bottom: 5px;
  filter: drop-shadow(0 10px 6px rgba(0, 0, 0, 0.15));
`;

export const EmptyTitle = styled.h2`
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 18px;
`;

export const EmptyText = styled.p`
  font-size: 18px;
  color: #777;
  margin-bottom: 30px;
`;

export const BackButton = styled.button`
  padding: 11px 24px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;

  background: #22c55e;
  color: #fff;
  box-shadow: 0 6px 18px rgba(34, 197, 94, 0.35);
  transition: all 0.18s ease;

  &:hover {
    background: #16a34a;
    transform: translateY(-1px);
    box-shadow: 0 10px 24px rgba(34, 197, 94, 0.45);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 4px 10px rgba(34, 197, 94, 0.25);
  }
`;
