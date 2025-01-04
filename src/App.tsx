import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ConfigProvider } from "antd";
import esES from "antd/es/locale/es_ES";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import MainLayout from "./layout/mainlayout";
import "./App.css";

const App: React.FC = () => {
  return (
    <>
      <ConfigProvider locale={esES}>
        <BrowserRouter>
          <ErrorBoundary>
            <Routes>
              <Route path="/*" element={<Navigate to={"/home"} />} />
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<MainLayout />} />
            </Routes>
          </ErrorBoundary>
        </BrowserRouter>
      </ConfigProvider>
    </>
  );
};

export default App;
