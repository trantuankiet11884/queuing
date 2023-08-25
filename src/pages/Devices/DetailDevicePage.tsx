import { Content } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import HeaderPage from "../../components/Header/HeaderPage";
import { Card, Col, Form, Row } from "antd";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { Device } from "../../interface";

const DetailDevicePage = () => {
  const breadcrumbItem = [
    { label: "Thiết bị", link: "/devices" },
    { label: "Danh sách thiết bị", link: "/devices" },
    { label: "Chi tiết thiết bị" },
  ];

  const { id } = useParams<{ id: string }>();
  const [device, setDevice] = useState<Device | null>(null);
  const devices = useAppSelector((state) => state.devices.devices);
  useEffect(() => {
    const deviceDetails = devices.find((device) => device.id === id);
    setDevice(deviceDetails || null);
  }, [id, devices]);

  const formatServiceUse = (serviceUse: string[] | string | undefined) => {
    if (Array.isArray(serviceUse)) {
      return serviceUse.map((service, index) => (
        <span key={index}>{service.trim() + ", "}</span>
      ));
    } else if (typeof serviceUse === "string") {
      const services = serviceUse.split(",").map((service) => service.trim());
      return services.map((service, index) => (
        <span key={index}>{service.trim()}</span>
      ));
    }
    return null;
  };
  return (
    <Content className="min-h-screen">
      <HeaderPage breadcrumbItems={breadcrumbItem} />
      <div className="flex">
        <div className="w-[900px] mx-5">
          <div className="my-3">
            <b className="text-[1.5rem] text-[#ff7e16]">Quản lý thiết bị</b>
          </div>
          <Card>
            <div className="mb-3">
              <b className="text-[1rem] text-[#ff7e16]">Thông tin thiết bị</b>
            </div>
            <Row gutter={24}>
              <Col span={12}>
                <Form layout="horizontal">
                  <Form.Item label={<b>Mã thiết bị</b>}>
                    {device?.deviceCode}
                  </Form.Item>
                  <Form.Item label={<b>Tên thiết bị</b>}>
                    {device?.deviceName}
                  </Form.Item>
                  <Form.Item label={<b>Địa chỉ IP</b>}>
                    {device?.ipAddress}
                  </Form.Item>
                </Form>
              </Col>
              <Col span={12}>
                <Form layout="horizontal">
                  <Form.Item label={<b>Loại thiết bị</b>}>
                    {device?.deviceType}
                  </Form.Item>
                  <Form.Item label={<b>Tên đăng nhập</b>}>
                    {device?.userName}
                  </Form.Item>
                  <Form.Item label={<b>Mật khẩu</b>}>
                    {device?.password}
                  </Form.Item>
                </Form>
              </Col>
            </Row>
            <Row>
              <Form layout="vertical">
                <Form.Item label={<b>Dịch vụ sử dụng:</b>}>
                  {formatServiceUse(device?.serviceUse)}
                </Form.Item>
              </Form>
            </Row>
          </Card>
        </div>
        {/* <div className="mt-[60.5px]">
          <Button className="btn__add">
            <PlusOutlined />
            <span>Cập nhật thiết bị</span>
          </Button>
        </div> */}
      </div>
    </Content>
  );
};

export default DetailDevicePage;
