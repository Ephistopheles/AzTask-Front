import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Space,
  Form,
  Input,
  Row,
  Col,
  DatePicker,
  Select,
  Divider,
  Typography,
  notification,
} from "antd";
import {
  AddTaskModalProps,
  TaskFormRules,
  OptionFormType,
} from "../../types/types";
import { getTasksEffort } from "../../api/ParamsService/ParamsService";

const rules: TaskFormRules = {
  title: [{ required: true, message: "El título es requerido" }],
  estimatedCompletionDate: [
    { required: true, message: "La fecha es requerida" },
  ],
  effort: [{ required: true, message: "El esfuerzo es requerido" }],
};

const AddTaskModal: React.FC<AddTaskModalProps> = ({
  visible,
  onOk,
  onCancel,
  form,
}) => {
  const [options, setOptions] = useState<OptionFormType[]>([]);

  const getTaskEffort = async () => {
    try {
      const { data } = await getTasksEffort();
      setOptions(data);
    } catch {
      notification.error({
        message: "Error",
        description: "Error al consultar datos, intente nuevamente",
        duration: 3,
        closeIcon: null,
      });
    }
  };

  useEffect(() => {
    getTaskEffort();
  }, []);

  return (
    <>
      <Modal
        title={
          <Typography.Title level={4} className="modal-title">
            Agregar nueva tarea
          </Typography.Title>
        }
        closable={false}
        open={visible}
        footer={
          <Space className="modal-footer">
            <Button onClick={onCancel}>Cancelar</Button>
            <Button type="primary" onClick={onOk}>
              Agregar
            </Button>
          </Space>
        }
      >
        <Divider />
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Fecha de finalización"
                name="estimatedCompletionDate"
                rules={rules["estimatedCompletionDate"]}
              >
                <DatePicker format="DD/MM/YYYY" className="modal-form-dp" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Titulo" name="title" rules={rules["title"]}>
                <Input placeholder="Titulo de la tarea" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Esfuerzo" name="effort" rules={rules["effort"]}>
                <Select
                  placeholder="Esfuerzo de la tarea"
                  allowClear
                  options={options}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Descripción" name="description">
                <Input.TextArea
                  placeholder="Descripción de la tarea"
                  maxLength={4000}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default AddTaskModal;
