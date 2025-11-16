import { useState } from 'react';
import Form from 'react-bootstrap/Form';

function CheckBox({ items = []}){
    const [checkedList, setCheckedList] = useState([]);

    const handleCheckAll = (checked) => {
      setCheckedList(checked ? items : []);
    };

    const handleCheck = (checked, item) => {
      setCheckedList((prev) => 
        checked ? [...prev, item] : prev.filter((i) => i !== item)
      );
    };

    return(
      <>
        <Form.Check type="checkbox" label="전체 선택" checked={checkedList.length === items.length} onChange={(e) => handleCheckAll(e.target.checked)} />

        {items.map((item, index) => ( <Form.Check key={index} type="checkbox" label={item} checked={checkedList.includes(item)} onChange={(e) => handleCheck(e.target.checked, item)} /> ))}
      </>
    );
}

export default CheckBox;