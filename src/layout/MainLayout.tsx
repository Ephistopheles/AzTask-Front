import React, { useEffect, useState } from "react";
import {
  AutoComplete,
  Button,
  Col,
  Form,
  Input,
  Layout,
  List,
  notification,
  Row,
  Spin,
  Tooltip,
  Typography,
} from "antd";
import {
  HomeOutlined,
  QuestionCircleOutlined,
  UserOutlined,
  EllipsisOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import logo from "../assets/img/logo.png";
import {
  CreateTaskPayload,
  TaskFormValues,
  UpdateTaskPayload,
} from "../types/types";
import { Task } from "../types/Models/Task";
import AddTaskModal from "../components/AddTaskModal/AddTaskModal";
import {
  createTask,
  getTasks,
  updateTask,
} from "../api/TaskService/TaskService";
import EditTaskModal from "../components/EditTaskModal/EditTaskModal";
import dayjs from "dayjs";

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

const MainLayout: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [dataListItem, setDataListItem] = useState<Task | undefined>(undefined);
  const [listTask, setListTask] = useState<Task[]>([]);
  const [options, setOptions] = useState<{ value: string }[]>([]);
  const [visibleAddTask, setVisibleAddTask] = useState<boolean>(false);
  const [visibleEditTask, setVisibleEditTask] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm<TaskFormValues>();

  const handleSearch = (value: string) => {
    const filteredOptions = fruits
      .filter((item) => item.toLowerCase().includes(value.toLowerCase()))
      .map((item) => ({ value: item }));
    setOptions(filteredOptions);
  };

  const handleOnClickOptions = (
    e: React.MouseEvent<HTMLButtonElement>,
    item: Task
  ) => {
    e.stopPropagation();
    setDataListItem(item);
    form.setFieldsValue({
      ...item,
      estimatedCompletionDate: dayjs(item.estimatedCompletionDate),
    });
    setVisibleEditTask(true);
  };

  const handleOkModalAddTask: () => void = async () => {
    try {
      const values = await form.validateFields();
      const { data, message } = await createTask({
        ...values,
        status: "INC",
        personId: 1,
      } as CreateTaskPayload);
      notification.success({
        message: message,
        description: `La tarea fue creada con el id: ${data?.id}`,
        duration: 3,
        closeIcon: null,
      });
      getListTask();
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Error al crear la tarea, intente nuevamente",
        duration: 3,
        closeIcon: null,
      });
    } finally {
      form.resetFields();
      setVisibleAddTask(false);
    }
  };

  const handleCancelModalAddTask: () => void = () => {
    form.resetFields();
    setVisibleAddTask(false);
  };

  const handleOkModalEditTask: () => void = async () => {
    try {
      const values = await form.validateFields();
      const { data, message } = await updateTask({
        ...values,
        status: dataListItem?.status,
        id: dataListItem?.id,
        personId: 1,
      } as UpdateTaskPayload);
      notification.success({
        message: message,
        description: `La tarea con el id: ${data?.id} fue actualizada exitosamente`,
        duration: 3,
        closeIcon: null,
      });
      getListTask();
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Error al actualizar la tarea, intente nuevamente",
        duration: 3,
        closeIcon: null,
      });
    } finally {
      form.resetFields();
      setDataListItem(undefined);
      setVisibleEditTask(false);
    }
  };

  const handleCancelModalEditTask: () => void = () => {
    form.resetFields();
    setDataListItem(undefined);
    setVisibleEditTask(false);
  };

  const getListTask = async () => {
    setLoading(true);
    try {
      const { data } = await getTasks(1);
      setListTask(data);
    } catch {
      setLoading(false);
      notification.error({
        message: "Error",
        description:
          "Hubo un error al consultar las tareas, intente nuevamente",
        duration: 3,
        closeIcon: null,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getListTask();
  }, []);

  return (
    <>
      <Spin spinning={loading}>
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
                      onClick={() => setSelectedItem(item.title)}
                    >
                      <Tooltip
                        title={item.title}
                        overlayInnerStyle={{
                          padding: "2px 6px",
                          fontSize: "12px",
                          lineHeight: "1.2",
                          maxWidth: "max-content",
                        }}
                      >
                        <Typography.Text className="col-list-text">
                          {item.title}
                        </Typography.Text>
                      </Tooltip>
                      <Button
                        className="col-button-render"
                        type="link"
                        icon={<EllipsisOutlined />}
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                          handleOnClickOptions(e, item)
                        }
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
                  onClick={() => setVisibleAddTask(true)}
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
      </Spin>
      <AddTaskModal
        visible={visibleAddTask}
        onOk={handleOkModalAddTask}
        onCancel={handleCancelModalAddTask}
        form={form}
      />
      <EditTaskModal
        visible={visibleEditTask}
        onOk={handleOkModalEditTask}
        onCancel={handleCancelModalEditTask}
        form={form}
      />
    </>
  );
};

export default MainLayout;
