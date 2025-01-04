import React, { useState } from "react";
import { Layout } from "antd";
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
      <Layout style={{ minHeight: "100vh" }}>
        <Sider>
          <SiderComponent onSelect={setSelectedItem} />
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
