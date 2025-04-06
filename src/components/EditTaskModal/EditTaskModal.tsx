import React, { useEffect, useState } from "react";
import { EditTaskModalProps, OptionFormType } from "../../types/types";
import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Modal,
  notification,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import { getTasksEffort } from "../../api/ParamsService/ParamsService";

const EditTaskModal: React.FC<EditTaskModalProps> = ({
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
            Editar tarea
          </Typography.Title>
        }
        open={visible}
        onCancel={onCancel}
        footer={
          <Space className="modal-footer">
            <Button onClick={onCancel}>Cancelar</Button>
            <Button type="primary" onClick={onOk}>
              Editar
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
              >
                <DatePicker format="DD/MM/YYYY" className="modal-form-dp" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Titulo" name="title">
                <Input placeholder="Titulo de la tarea" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Esfuerzo" name="effort">
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

export default EditTaskModal;
