import React, { useState } from "react";

import { Row, Col, Form, Input, Space, Button } from "antd";
import logoForgot from "./forgot-pwd";
import logoAlta from "./logo";
import { auth } from "../../../firebase/config";
import { useNavigate } from "react-router-dom";

const ComfirmNewPassword: React.FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const handleConfirmNewPassword = async () => {
    const oobCode = new URLSearchParams(window.location.search).get(
      "oobCode"
    ) as string;
    console.log(oobCode);

    try {
      await auth.confirmPasswordReset(oobCode, password);
      navigate("/login"); // Đặt lại thành công, chuyển hướng đến trang đăng nhập
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Row align={"middle"} style={{ minHeight: "100vh" }}>
      <Col span={10} className="centered-col">
        <Form layout="vertical" onFinish={handleConfirmNewPassword}>
          <Form.Item style={{ display: "flex", justifyContent: "center" }}>
            <div dangerouslySetInnerHTML={{ __html: logoAlta }}></div>
          </Form.Item>
          <Form.Item style={{ display: "flex", justifyContent: "center" }}>
            <p className="text-forgot">Đặt lại mật khẩu mới</p>
          </Form.Item>

          <Form.Item label="Mật khẩu" name="password">
            <Input.Password
              style={{ width: "400px", height: "44px" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item label="Nhập lại mật khẩu" name="password">
            <Input.Password
              style={{ width: "400px", height: "44px" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item style={{ textAlign: "center" }}>
            <Space>
              <Button
                className="custom-btn-right"
                type="primary"
                htmlType="submit"
                style={{ backgroundColor: "#ff9138" }}
              >
                Xác nhận
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Col>
      <Col span={14}>
        <div dangerouslySetInnerHTML={{ __html: logoForgot }}></div>
      </Col>
    </Row>
  );
};

export default ComfirmNewPassword;
