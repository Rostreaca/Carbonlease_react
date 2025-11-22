const TextInputSection = ({title, setTitle, content, setContent}) => {

  return (
    <>
        <label><strong>제목</strong></label>
        <input 
          type="text" 
          placeholder="제목을 입력해주세요."
          value={title}
          maxLength={100}
          onChange={(e) => setTitle(e.target.value)} 
        />
        <hr />


        <label><strong>내용</strong></label>
        <textarea 
          placeholder="내용을 입력해주세요." 
          value={content}
          maxLength={1000}
          onChange={(e) => setContent(e.target.value)}
        />

        <hr />
    </>
  )
}

export default TextInputSection;