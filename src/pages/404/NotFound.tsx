import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex items-center justify-center flex-col h-[100vh]">
        <span>404 NotFound</span>
        <Button onClick={() => navigate("/login")}>Go to login page</Button>
      </div>
    </>
  );
};

export default NotFound;
