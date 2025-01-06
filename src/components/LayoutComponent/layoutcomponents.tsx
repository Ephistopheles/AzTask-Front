import React, { useState } from "react";
import { List, AutoComplete, Input, Row, Col } from "antd";

interface SiderProps {
  onSelect: (item: string) => void;
}

interface ContentProps {
  selectedItem: string | null;
}

export const HeaderComponent: React.FC = () => {
  return <div style={{ color: "white" }}>App Header</div>;
};

export const SiderComponent: React.FC<SiderProps> = ({ onSelect }) => {
  const [options, setOptions] = useState<{ value: string }[]>([]);

  const listTask = [
    { id: "1", name: "name 1" },
    { id: "2", name: "name 2" },
    { id: "3", name: "name 3" },
  ];

  const fruits: Array<string> = [
    "Manzana",
    "Banana",
    "Cereza",
    "Durazno",
    "Pera",
    "Uva",
    "Mango",
    "Mandarina",
  ];

  const handleSearch = (value: string) => {
    const filteredOptions = fruits
      .filter((item) => item.toLowerCase().includes(value.toLowerCase()))
      .map((item) => ({ value: item }));
    setOptions(filteredOptions);
  };

  return (
    <>
      <Row gutter={16}>
        <Col span={24}>
          <AutoComplete
            style={{ width: "100%" }}
            options={options}
            onSearch={handleSearch}
          >
            <Input.Search size="large" placeholder="input here" />
          </AutoComplete>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <List
            itemLayout="horizontal"
            dataSource={listTask}
            renderItem={(item) => (
              <List.Item
                onClick={() => onSelect(item.id)}
                style={{ cursor: "pointer" }}
              >
                <List.Item.Meta title={item.name} />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </>
  );
};

export const ContentComponent: React.FC<ContentProps> = ({ selectedItem }) => {
  return (
    <div>
      {selectedItem ? (
        <h2>Selected: {selectedItem}</h2>
      ) : (
        <h2>Please select an item from the Sider</h2>
      )}
    </div>
  );
};
