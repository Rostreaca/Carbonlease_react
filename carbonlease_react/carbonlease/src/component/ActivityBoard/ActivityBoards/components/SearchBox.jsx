import { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";

const SearchBox = ({ filter, onSearch }) => {

  const [ keyword, setKeyword ] = useState('');

  const handleSearch = () => {
    onSearch(keyword);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <InputGroup style={{ width: "320px"}}>
      <Form.Control
        type="text"
        placeholder={`검색어를 입력하세요.`}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button variant="outline-success" onClick={() => onSearch(keyword)}>
        검색
      </Button>
    </InputGroup>
  );
};

export default SearchBox;