import React, { useEffect } from "react";

import { Layout, Typography, Card, Progress, Row, Col, Badge } from "antd";
import "./dashboard.css";
import DashboardContent from "./pages/DashboardContent";
import AvatarPage from "../Avatar/Avatar";
import { DesktopOutlined } from "@ant-design/icons";
import { useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;
const { Text } = Typography;

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const deviceData = useAppSelector((state) => state.devices.devices);
  const device = deviceData.map((item) => item.id).length;
  const deviceActive = deviceData.filter((item) => item.activeStatus === true);
  const deviceUnActive = deviceData.filter(
    (item) => item.activeStatus === false
  );

  const serviceData = useAppSelector((state) => state.services.services);
  const service = serviceData.map((item) => item.id).length;

  const serviceActive = serviceData.filter(
    (item) => item.activeStatus === true
  );
  const serviceUnActive = serviceData.filter(
    (item) => item.activeStatus === false
  );
  const numberData = useAppSelector((state) => state.numbers.numbers);
  const number = numberData.map((item) => item.id).length;
  const numberUsage = numberData.filter((item) => item.status === "Đã sử dụng");
  const numberWait = numberData.filter((item) => item.status === "Đang chờ");
  const numberPass = numberData.filter((item) => item.status === "Bỏ qua");
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <Row>
        <Col span={15}>
          <Content className="content__global">
            <DashboardContent />
          </Content>
        </Col>
        <Col className="bg-white" span={9}>
          <div>
            <AvatarPage />
            <div className="px-3 py-2">
              <Text className="txt__overview">Tổng quan</Text>
            </div>
            <div
              className="mx-5 mb-5 cursor-pointer"
              onClick={() => navigate("/devices")}
            >
              <Card>
                <div className="flex">
                  <Progress
                    type="circle"
                    percent={parseFloat(
                      ((deviceActive.length / device) * 100).toFixed(1)
                    )}
                    size={50}
                    strokeColor={"#FF7506"}
                  />

                  <div className="flex flex-col justify-center mx-2">
                    <b className="text-[20px]">{device}</b>
                    <span className="text-[orange]">
                      <DesktopOutlined /> Thiết bị
                    </span>
                  </div>
                  <div className="flex flex-col justify-center mx-2">
                    <div>
                      <Badge color="yellow" />
                      <span className="mx-2">Đang hoạt động</span>
                      <b>{deviceActive.length}</b>
                    </div>
                    <div>
                      <Badge color="red" />
                      <span className="mx-2">Ngưng hoạt động</span>
                      <b>{deviceUnActive.length}</b>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            <div
              className="mx-5 mb-5 cursor-pointer"
              onClick={() => navigate("/services")}
            >
              <Card>
                <div className="flex">
                  <Progress
                    type="circle"
                    percent={Number(
                      ((serviceActive.length / service) * 100).toFixed(1)
                    )}
                    size={50}
                    strokeColor={"#FF7506"}
                  />
                  <div className="flex flex-col justify-center mx-2">
                    <b className="text-[20px]">{service}</b>
                    <span className="text-[blue]">
                      <DesktopOutlined /> Dịch vụ
                    </span>
                  </div>
                  <div className="flex flex-col justify-center mx-2">
                    <div>
                      <Badge color="yellow" />
                      <span className="mx-2">Đang hoạt động</span>
                      <b>{serviceActive.length}</b>
                    </div>
                    <div>
                      <Badge color="red" />
                      <span className="mx-2">Ngưng hoạt động</span>
                      <b>{serviceUnActive.length}</b>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            <div
              className="mx-5 mb-5 cursor-pointer"
              onClick={() => navigate("/numbers")}
            >
              <Card>
                <div className="flex">
                  <Progress
                    type="circle"
                    percent={Number(
                      ((numberUsage.length / number) * 100).toFixed(1)
                    )}
                    size={50}
                    strokeColor={"#FF7506"}
                  />
                  <div className="flex flex-col justify-center mx-2">
                    <b className="text-[20px]">{number}</b>
                    <span className="text-[green]">
                      <DesktopOutlined /> Cấp số
                    </span>
                  </div>
                  <div className="flex flex-col justify-center mx-2">
                    <div>
                      <Badge color="green" />
                      <span className="mx-2">Đã sử dụng</span>
                      <b>{numberUsage.length}</b>
                    </div>
                    <div>
                      <Badge color="blue" />
                      <span className="mx-2">Đang chờ</span>
                      <b>{numberWait.length}</b>
                    </div>
                    <div>
                      <Badge color="red" />
                      <span className="mx-2">Bỏ qua</span>
                      <b>{numberPass.length}</b>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default DashboardPage;
