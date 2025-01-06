import React, { useState } from "react";
import { Col, Divider, Input, Layout, Row } from "antd";
import {
  HeaderComponent,
  SiderComponent,
  ContentComponent,
} from "../components/LayoutComponent/layoutcomponents";

const { Header, Sider, Content } = Layout;

const MainLayout: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  return (
    <>
      <Layout className="layout-style">
        <Sider className="sider-style" theme="light">
          <Row className="row-search-container" justify="center">
            <Col span={24}>
              <Input.Search className="col-search-input" placeholder="Buscar" />
            </Col>
          </Row>
          <Divider className="divider-search" />
        </Sider>
        <Layout>
          <Header>
            <HeaderComponent />
          </Header>
          <Content>
            <ContentComponent selectedItem={selectedItem} />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default MainLayout;
