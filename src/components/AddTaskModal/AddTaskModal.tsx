import React from "react";
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
} from "antd";
import { AddTaskModalProps, TaskFormRules } from "../../types/types";

const options = [
  { value: "BJ", label: "Bajo" },
  { value: "MD", label: "Medio" },
  { value: "AT", label: "Alto" },
];

const rules: TaskFormRules = {
  titleTask: [{ required: true, message: "El título es requerido" }],
  dateEndTask: [{ required: true, message: "La fecha es requerida" }],
  Effort: [{ required: true, message: "El esfuerzo es requerido" }],
};

const AddTaskModal: React.FC<AddTaskModalProps> = ({
  visible,
  onOk,
  onCancel,
  form,
}) => {
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
        <Form form={form} layout="vertical" initialValues={{ Effort: "BJ" }}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Fecha de finalización"
                name="dateEndTask"
                rules={rules["dateEndTask"]}
              >
                <DatePicker format="DD/MM/YYYY" className="modal-form-dp" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Titulo"
                name="titleTask"
                rules={rules["titleTask"]}
              >
                <Input placeholder="Titulo de la tarea" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Esfuerzo" name="Effort" rules={rules["Effort"]}>
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
              <Form.Item label="Descripción" name="descripTask">
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
