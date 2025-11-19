import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
    0% {
        background-position: -1000px 0;
    }
    100% {
        background-position: 1000px 0;
    }
`;

export const SkeletonCard = styled.div`
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

export const SkeletonImage = styled.div`
    width: 100%;
    height: 200px;
    background: linear-gradient(
        90deg,
        #f0f0f0 0px,
        #f8f8f8 40px,
        #f0f0f0 80px
    );
    background-size: 1000px 100%;
    animation: ${shimmer} 2s infinite linear;
`;

export const SkeletonContent = styled.div`
    padding: 20px;
`;

export const SkeletonCategory = styled.div`
    width: 80px;
    height: 24px;
    background: linear-gradient(
        90deg,
        #f0f0f0 0px,
        #f8f8f8 40px,
        #f0f0f0 80px
    );
    background-size: 1000px 100%;
    animation: ${shimmer} 2s infinite linear;
    border-radius: 20px;
    margin-bottom: 12px;
`;

export const SkeletonTitle = styled.div`
    width: 100%;
    height: 20px;
    background: linear-gradient(
        90deg,
        #f0f0f0 0px,
        #f8f8f8 40px,
        #f0f0f0 80px
    );
    background-size: 1000px 100%;
    animation: ${shimmer} 2s infinite linear;
    border-radius: 4px;
    margin-bottom: 10px;
`;

export const SkeletonDescription = styled.div`
    width: 100%;
    height: 14px;
    background: linear-gradient(
        90deg,
        #f0f0f0 0px,
        #f8f8f8 40px,
        #f0f0f0 80px
    );
    background-size: 1000px 100%;
    animation: ${shimmer} 2s infinite linear;
    border-radius: 4px;
    margin-bottom: 8px;

    &:last-of-type {
        width: 80%;
        margin-bottom: 16px;
    }
`;

export const SkeletonInfo = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 16px;
    border-top: 1px solid #f0f0f0;
`;

export const SkeletonInfoItem = styled.div`
    width: 100px;
    height: 14px;
    background: linear-gradient(
        90deg,
        #f0f0f0 0px,
        #f8f8f8 40px,
        #f0f0f0 80px
    );
    background-size: 1000px 100%;
    animation: ${shimmer} 2s infinite linear;
    border-radius: 4px;
`;
