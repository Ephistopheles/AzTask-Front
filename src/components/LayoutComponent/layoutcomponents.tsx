import React from "react";
import { List } from "antd";

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
  const listTask = [
    { id: "1", name: "name 1" },
    { id: "2", name: "name 2" },
    { id: "3", name: "name 3" },
  ];

  return (
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
