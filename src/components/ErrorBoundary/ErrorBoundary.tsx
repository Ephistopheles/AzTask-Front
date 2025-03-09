import React, { useState } from "react";
import {
  ErrorBoundary as ReactErrorBoundary,
  FallbackProps,
} from "react-error-boundary";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { Result, Button } from "antd";

const EmptyFallback: React.FC<FallbackProps> = () => null;

const ErrorBoundary: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [error, setError] = useState<Error | null>(null);
  const navigate: NavigateFunction = useNavigate();

  const resetError: () => void = () => {
    setError(null);
    navigate("/home");
  };

  const handleError = (error: Error) => {
    setError(error);
  };

  if (error) {
    return (
      <Result
        status="500"
        title="Algo salió mal"
        subTitle={error.message || "Ha ocurrido un error inesperado."}
        extra={
          <Button type="primary" onClick={resetError}>
            Regresar al inicio
          </Button>
        }
      />
    );
  }

  return (
    <ReactErrorBoundary FallbackComponent={EmptyFallback} onError={handleError}>
      {children}
    </ReactErrorBoundary>
  );
};

export default ErrorBoundary;
