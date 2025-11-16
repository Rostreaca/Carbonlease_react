import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useState } from "react";

export default function SearchFilterDropdowns({ onSelectFilter}) {

  const [ selectedLabel, setSelectLabel ] = useState('제목');

  const handleSelect = (key, event) => {
    setSelectLabel(event.target.innerText);
    onSelectFilter(key);
  }

  return (
    <>
       <DropdownButton
        as={ButtonGroup}
        id="dropdown-search-filter"
        variant="success"
        title={<span style={{ display:"inline-block", width:"47px", textAlign:"center" }}>{selectedLabel}</span>}
        onSelect={handleSelect}
      >
            <Dropdown.Item eventKey="title">제목</Dropdown.Item>
            <Dropdown.Item eventKey="content">내용</Dropdown.Item>
            <Dropdown.Item eventKey="nickname">닉네임</Dropdown.Item>
          </DropdownButton>
      
    </>
  );

}