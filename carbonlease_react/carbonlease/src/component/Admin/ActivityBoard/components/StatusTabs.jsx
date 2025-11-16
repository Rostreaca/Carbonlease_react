import { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

function StatusTabs({ onTabChange }) {
  const [key, setKey] = useState("hidden");

  const handleSelect = (k) => {
    setKey(k);
    onTabChange && onTabChange(k);
  };

  return (
    <Tabs activeKey={key} onSelect={handleSelect} className="mb-3">
      <Tab eventKey="hidden" title="숨김처리된 글" />
      <Tab eventKey="active" title="게시중인 글" />
    </Tabs>
  );
}

export default StatusTabs;
