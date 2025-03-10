import React, { useState } from "react";
import {
  AutoComplete,
  Button,
  Col,
  Form,
  Input,
  Layout,
  List,
  Row,
} from "antd";
import {
  HomeOutlined,
  QuestionCircleOutlined,
  UserOutlined,
  EllipsisOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import logo from "../assets/img/logo.png";
import { TaskFormValues } from "../types/types";
import AddTaskModal from "../components/AddTaskModal/AddTaskModal";

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
  { id: "4", name: "name 4" },
  { id: "5", name: "name 5" },
];

const MainLayout: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [options, setOptions] = useState<{ value: string }[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [form] = Form.useForm<TaskFormValues>();

  const handleSearch = (value: string) => {
    const filteredOptions = fruits
      .filter((item) => item.toLowerCase().includes(value.toLowerCase()))
      .map((item) => ({ value: item }));
    setOptions(filteredOptions);
  };

  const handleOnClickOptions = (e: React.MouseEvent<HTMLButtonElement>) =>
    e.stopPropagation();

  const handleShowModal: () => void = () => setIsModalVisible(true);

  const handleOkModal: () => void = async () => {
    try {
      const values = await form.validateFields();
      console.log("Form Values:", values);
      form.resetFields();
      setIsModalVisible(false);
    } catch (error) {
      console.error("Errores de validación:", error);
    }
  };

  const handleCancelModal: () => void = () => {
    form.resetFields();
    setIsModalVisible(false);
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
          <Row className="row-list-container">
            <Col span={24}>
              <List
                itemLayout="horizontal"
                dataSource={listTask}
                split={false}
                renderItem={(item) => (
                  <List.Item
                    className="col-list-render"
                    onClick={() => setSelectedItem(item.name)}
                  >
                    <span className="col-list-text">{item.name}</span>
                    <Button
                      className="col-button-render"
                      type="link"
                      icon={<EllipsisOutlined />}
                      onClick={handleOnClickOptions}
                    />
                  </List.Item>
                )}
              />
            </Col>
          </Row>
          <Row className="row-button-container">
            <Col span={24}>
              <Button
                icon={<PlusOutlined />}
                className="col-button-task"
                type="primary"
                shape="circle"
                onClick={handleShowModal}
              />
            </Col>
          </Row>
        </Sider>
        <Layout>
          <Header className="header-style">
            <Row className="row-header-container">
              <Col>
                <img
                  className="col-img"
                  src={logo}
                  alt="Icono"
                  onClick={() => setSelectedItem(null)}
                />
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
          <Content className="content-style">
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
      <AddTaskModal
        visible={isModalVisible}
        onOk={handleOkModal}
        onCancel={handleCancelModal}
        form={form}
      />
    </>
  );
};

export default MainLayout;
