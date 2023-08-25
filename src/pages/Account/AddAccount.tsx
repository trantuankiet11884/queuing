import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  message,
} from "antd";
import React, { useEffect } from "react";
import { Content } from "antd/es/layout/layout";
import HeaderPage from "../../components/Header/HeaderPage";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchDataRole } from "../../redux/slice/roleSlice";
import { Option } from "antd/es/mentions";
import { AccountType } from "../../interface";
import { addAccount } from "../../redux/slice/accountSlice";
import { useNavigate } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
import { auth } from "../../firebase/config";

const AddAccount = () => {
  const items = [
    { label: "Cài đặt hệ thống", link: "/accounts" },
    { label: "Quản lý tài khoản", link: "/accounts" },
    { label: "Thêm tài khoản" },
  ];
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [form] = useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Thêm tài khoản thành công !",
    });
  };
  const dataRole = useAppSelector((state) => state.roles.roles);
  useEffect(() => {
    dispatch(fetchDataRole());
  }, [dispatch]);

  const handleSubmit = async (account: AccountType) => {
    const newAccount = {
      ...account,
    };

    console.log(newAccount.role);

    try {
      await dispatch(addAccount(newAccount));
      await auth.createUserWithEmailAndPassword(newAccount.email, newAccount.password);

      navigate("/accounts");
      console.log(newAccount);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = () => {
    success();
    form.submit();
  };
  return (
    
      <Content className="content__global">
        {contextHolder}
        <HeaderPage breadcrumbItems={items} />
        <div className="mx-5">
          <div className="my-3">
            <b className="text-[1.5rem] text-[#FF7506]">Quản lý tài khoản</b>
          </div>
          <div>
            <Card className="h-[430px]">
              <Form form={form} onFinish={handleSubmit} layout="vertical">
                <div className="mb-5">
                  <b className="text-[1rem] text-[#FF7506]">
                    Thông tin tài khoản
                  </b>
                </div>
                <Row gutter={30}>
                  <Col span={12}>
                    <Form.Item name="fullName">
                      <div>
                        <b>Họ tên</b>
                        <Input />
                      </div>
                    </Form.Item>
                    <Form.Item name="phoneNumber">
                      <div>
                        <b>Số diện thoại</b>
                        <Input />
                      </div>
                    </Form.Item>
                    <Form.Item name="email">
                      <div>
                        <b>Email</b>
                        <Input type="email" required />
                      </div>
                    </Form.Item>
                    <Form.Item name="role" label={<b>Vai trò</b>}>
                      <Select>
                        {dataRole.map((role) => (
                          <Option key={role.id} value={role.roleName}>
                            {role.roleName}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <div>
                      <span>* Là trường thông tin bắt buộc</span>
                    </div>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="userName">
                      <div>
                        <b>Tên đăng nhập</b>
                        <Input />
                      </div>
                    </Form.Item>
                    <Form.Item name="password">
                      <div>
                        <b>Mật khẩu</b>
                        <Input.Password />
                      </div>
                    </Form.Item>
                    <Form.Item>
                      <div>
                        <b>Nhập lại mật khẩu</b>
                        <Input.Password />
                      </div>
                    </Form.Item>
                    <Form.Item name="status" label={<b>Tình trạng</b>}>
                      <Select>
                        <Option value="true">Đang hoạt động</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Card>
          </div>
          <div className="flex justify-center mt-5">
            <Space>
              <Button className="btn__cancel w-[8rem] h-[3rem]">Hủy bỏ</Button>
              <Button
                className="btn__addd w-[8rem] h-[3rem]"
                onClick={handleClick}
              >
                Thêm
              </Button>
            </Space>
          </div>
        </div>
      </Content>
  );
};

export default AddAccount;
