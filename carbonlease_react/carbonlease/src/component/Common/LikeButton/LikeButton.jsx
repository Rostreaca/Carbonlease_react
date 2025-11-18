import LikeButton from './LikeButton.styled';


const LikeButtonComponent = ({ $liked, onClick, disabled, children, className }) => (
    <LikeButton
        $liked={$liked}
        onClick={onClick}
        disabled={disabled}
        aria-label="좋아요"
        className={className}
    >
        {children}
    </LikeButton>
);

export default LikeButtonComponent;
