import React from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { Result, Button } from "antd";

const NotFoundPage: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();

  const handleBackHome = () => navigate("/home");

  return (
    <>
      <Result
        status="404"
        title="404"
        subTitle="Lo sentimos, la página que has visitado no existe."
        extra={
          <Button type="primary" onClick={handleBackHome}>
            Ir al inicio
          </Button>
        }
      />
    </>
  );
};

export default NotFoundPage;
