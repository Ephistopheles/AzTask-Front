import React, { useState } from "react";
import { AutoComplete, Col, Divider, Input, Layout, List, Row } from "antd";
import {
  HomeOutlined,
  QuestionCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

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

const listTask = [
  { id: "1", name: "name 1" },
  { id: "2", name: "name 2" },
  { id: "3", name: "name 3" },
];

const MainLayout: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [options, setOptions] = useState<{ value: string }[]>([]);

  const handleSearch = (value: string) => {
    const filteredOptions = fruits
      .filter((item) => item.toLowerCase().includes(value.toLowerCase()))
      .map((item) => ({ value: item }));
    setOptions(filteredOptions);
  };

  return (
    <>
      <Layout className="layout-style">
        <Sider className="sider-style" theme="light">
          <Row className="row-search-container" justify="center">
            <Col span={24}>
              <AutoComplete
                className="col-search-autocomplete"
                options={options}
                onSearch={handleSearch}
              >
                <Input.Search placeholder="Buscar" />
              </AutoComplete>
            </Col>
          </Row>
          <Divider className="divider-search" />
          <Row className="row-list-container">
            <Col span={24}>
              <List
                itemLayout="horizontal"
                dataSource={listTask}
                renderItem={(item) => (
                  <List.Item
                    onClick={() => setSelectedItem(item.name)}
                    style={{ cursor: "pointer" }}
                  >
                    {item.name}
                  </List.Item>
                )}
              />
            </Col>
          </Row>
        </Sider>
        <Layout>
          <Header
            style={{
              background: "#000",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 16px",
            }}
          >
            <Row
              justify="space-between"
              align="middle"
              style={{ width: "100%" }}
            >
              <Col>
                <HomeOutlined style={{ color: "white", fontSize: "20px" }} />
              </Col>
              <Col>
                <Row gutter={[16, 0]} align="middle">
                  <Col>
                    <HomeOutlined
                      style={{ color: "white", fontSize: "20px" }}
                    />
                  </Col>
                  <Col>
                    <QuestionCircleOutlined
                      style={{ color: "white", fontSize: "20px" }}
                    />
                  </Col>
                  <Col>
                    <UserOutlined
                      style={{ color: "white", fontSize: "20px" }}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Header>
          <Content
            style={{
              padding: "16px",
              background: "#fff",
              minHeight: "calc(100vh - 64px)",
            }}
          >
            <Row gutter={16}>
              <Col span={24}>
                {selectedItem ? (
                  <h2>Selected: {selectedItem}</h2>
                ) : (
                  <h2>Please select an item from the Sider</h2>
                )}
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default MainLayout;
