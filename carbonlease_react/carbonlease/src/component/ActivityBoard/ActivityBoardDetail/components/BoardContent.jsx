
export default function BoardContent({ content }) {
    return (
        <div className="post-content" style={{ whiteSpace: 'pre-line' }}>
            {content}
        </div>
    )
};