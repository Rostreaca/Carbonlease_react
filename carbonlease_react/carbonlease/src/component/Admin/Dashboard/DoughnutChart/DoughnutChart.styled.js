import styled from 'styled-components';

export const ChartWrap = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 24px;
`;

export const ChartCard = styled.div`
	width: 200px;
	height: 270px;
	background: #fff;
	border-radius: 5px;
	box-shadow: 0 2px 8px rgba(0,0,0,0.04);
	padding: 12px;
	display: flex;
	flex-direction: column;
	position: relative;
`;

export const ChartTitle = styled.h3`
	font-size: 0.8rem;
	color: #222;
	font-weight: 600;
`;

export const ChartInner = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	height: 100%;
`;

export const LegendRow = styled.div`
	display: flex;
	justify-content: flex-end;
	width: 100%;
	margin-top: 8px;
`;

export const LegendItem = styled.div`
	display: flex;
	align-items: center;
	margin-left: 6px;
	&:first-child {
		margin-left: 0;
	}
`;

export const LegendColor = styled.span`
	width: 10px;
	height: 10px;
	border-radius: 50%;
	display: inline-block;
	margin-right: 4px;
`;

export const LegendLabel = styled.span`
	font-size: 10px;
	color: #555;
`;
