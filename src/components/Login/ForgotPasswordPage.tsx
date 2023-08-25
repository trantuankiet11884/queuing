import React, { useState } from "react";
import logoAlta from "./assets/logo";
import "./login.css";

import { Row, Col, Input, Form, Button, Space } from "antd";
import logoForgot from "./assets/forgot-pwd";
import { auth } from "../../firebase/config";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const handleResetPassword = async () => {
    try {
      await auth.sendPasswordResetEmail(email);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Row align={"middle"} style={{ minHeight: "100vh" }}>
      <Col span={10} className="centered-col">
        <Form layout="vertical">
          <Form.Item style={{ display: "flex", justifyContent: "center" }}>
            <div dangerouslySetInnerHTML={{ __html: logoAlta }}></div>
          </Form.Item>
          <Form.Item style={{ display: "flex", justifyContent: "center" }}>
            <p className="text-forgot">Đặt lại mật khẩu</p>
          </Form.Item>

          <Form.Item
            label="Vui lòng nhập lại email để đặt lại mật khẩu của bạn *"
            name="email"
          >
            <Input
              style={{ width: "400px", height: "44px" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>

          <Form.Item style={{ textAlign: "center" }}>
            <Space>
              <Button className="custom-btn-left" htmlType="submit">
                Hủy
              </Button>
              <Button
                className="custom-btn-right"
                type="primary"
                htmlType="submit"
                style={{ backgroundColor: "#ff9138" }}
                onClick={handleResetPassword}
              >
                Tiếp tục
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

export default ForgotPasswordPage;
