import { Card, Avatar, Input, Row, Col, Form, Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import HeaderPage from "../Header/HeaderPage";
import { AccountType } from "../../interface";
const ProfilePage: React.FC = () => {
  const userAccountString = localStorage.getItem("userAccount");
  const userAccount: AccountType = userAccountString
    ? JSON.parse(userAccountString)
    : {}; // Chuyển đổi chuỗi JSON thành đối tượng
  const items = [{ label: "Thông tin cá nhân" }];
  return (
    <Layout>
      <Content className="content__global">
        <HeaderPage breadcrumbItems={items} />
        <div className="mx-5 w-[90%] mt-[5%]">
          <Card>
            <Row align={"middle"} gutter={20}>
              <Col>
                <div>
                  <Avatar size={200} src={userAccount?.imageUrl} />
                </div>
                <div className="flex justify-center my-3 text-[1.5rem]">
                  <b>{userAccount?.fullName}</b>
                </div>
              </Col>
              <Col>
                <Form layout="vertical">
                  <Form.Item label="Tên người dùng">
                    <Input
                      style={{ width: "300px" }}
                      disabled
                      value={userAccount?.fullName}
                    />
                  </Form.Item>
                  <Form.Item label="Số diện thoại">
                    <Input
                      style={{ width: "300px" }}
                      disabled
                      value={userAccount?.phoneNumber}
                    />
                  </Form.Item>
                  <Form.Item label="Email:">
                    <Input
                      style={{ width: "300px" }}
                      disabled
                      value={userAccount?.email}
                    />
                  </Form.Item>
                </Form>
              </Col>
              <Col>
                <Form layout="vertical">
                  <Form.Item label="Tên đăng nhập">
                    <Input
                      style={{ width: "300px" }}
                      disabled
                      value={userAccount?.userName}
                    />
                  </Form.Item>
                  <Form.Item label="Mật khẩu">
                    <Input
                      style={{ width: "300px" }}
                      disabled
                      value={userAccount?.password}
                    />
                  </Form.Item>
                  <Form.Item label="Vai trò:">
                    <Input
                      style={{ width: "300px" }}
                      disabled
                      value={userAccount?.role}
                    />
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </Card>
        </div>
      </Content>
    </Layout>
  );
};

export default ProfilePage;
