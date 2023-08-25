import { Content } from "antd/es/layout/layout";
import React, { useEffect } from "react";
import HeaderPage from "../../components/Header/HeaderPage";
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
import "./add.css";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { AccountType, Device, LogEntry } from "../../interface";
import { addDevice, updateDevice } from "../../redux/slice/deviceSlice";
import { fetchData } from "../../redux/slice/serviceSlice";
import { Option } from "antd/es/mentions";
import { useForm } from "antd/es/form/Form";
import { addLog, saveLogToFirestore } from "../../redux/slice/accountSlice";
import moment from "moment";

const AddDevicePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isUpdate = !!id;
  const selectedDevice = useAppSelector((state) =>
    state.devices.devices.find((device) => device.id === id)
  );
  const serviceData = useAppSelector((state) => state.services.services);
  const userAccountString = localStorage.getItem("userAccount");
  const userAccount: AccountType = userAccountString
    ? JSON.parse(userAccountString)
    : {};
  const breadcrumbItems = [
    { label: "Thiết bị", link: "/devices" },
    { label: "Danh sách thiết bị", link: "/devices" },
    { label: isUpdate ? "Cập nhật thiết bị" : "Thêm thiết bị" },
  ];
  const dispatch = useAppDispatch();
  const [form] = useForm();
  const navigate = useNavigate();
  const selectedDeviceId: string | undefined = selectedDevice?.id!;
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: isUpdate
        ? "Cập nhật thiết bị thành công !"
        : "Thêm tài khoản thành công !",
    });
  };

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const handleSubmit = async (devices: Device) => {
    const status = Math.random() < 0.5;
    const connection = Math.random() < 0.5;
    console.log("random: " + status);

    const newDevice: Device = {
      ...devices,
      activeStatus: status,
      connectionStatus: connection,
    };

    try {
      if (isUpdate && selectedDeviceId) {
        // Ensure that the selected device's ID is set in the newDevice object
        newDevice.id = selectedDeviceId;
        await dispatch(updateDevice(newDevice));
      } else {
        await dispatch(addDevice(newDevice));
      }

      const activity = isUpdate
        ? `Cập nhật thiết bị ${devices.deviceName}`
        : `Thêm mới thiết bị ${devices.deviceName}`;
      const timestamp = moment().format("DD/MM/YYYY HH:mm:ss");
      const userName = userAccount?.userName ?? "Unknow";
      const logEntry: LogEntry = {
        timestamp,
        activity,
        userName: userName,
        ipUsage: devices.ipAddress,
      };
      dispatch(addLog(logEntry));
      dispatch(saveLogToFirestore(logEntry));
    } catch (err) {
      console.log(err);
    }
    form.resetFields();
    navigate("/devices");
  };

  const handleClick = () => {
    success();
    form.submit();
  };

  return (
    <Content className="content__global">
      {contextHolder}
      <HeaderPage breadcrumbItems={breadcrumbItems} />
      <div className="mx-5">
        <div className="my-3">
          <b className="text-[1.5rem] text-[#ff7e16]">Quản lý thiết bị</b>
        </div>
        <Card>
          <div>
            <div className="mb-3">
              <b className="text-[1rem] text-[#ff7e16]">Thông tin thiết bị</b>
            </div>
            <Form layout="vertical" onFinish={handleSubmit} form={form}>
              <Row justify={"space-between"}>
                <Col>
                  <Form.Item
                    label="Mã thiết bị: *"
                    name="deviceCode"
                    initialValue={selectedDevice?.deviceCode}
                  >
                    <Input placeholder="Nhập mã thiết bị" />
                  </Form.Item>

                  <Form.Item
                    label="Tên thiết bị: *"
                    name="deviceName"
                    initialValue={selectedDevice?.deviceName}
                  >
                    <Input
                      style={{ width: "400px" }}
                      placeholder="Nhập tên thiết bị"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Địa chỉ IP: *"
                    name="ipAddress"
                    initialValue={selectedDevice?.ipAddress}
                  >
                    <Input
                      style={{ width: "400px" }}
                      placeholder="Nhập địa chỉ IP"
                    />
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item
                    label="Loại thiết bị: *"
                    name="deviceType"
                    initialValue={selectedDevice?.deviceType}
                  >
                    <Select
                      style={{ width: "400px" }}
                      placeholder="Chọn loại thiết bị"
                    >
                      <Select.Option value="kyout">Kyoot</Select.Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    label="Tên đăng nhập: *"
                    name="userName"
                    initialValue={selectedDevice?.userName}
                  >
                    <Input
                      style={{ width: "400px" }}
                      placeholder="Nhập tên đăng nhập"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Mật khẩu: *"
                    name="password"
                    initialValue={selectedDevice?.password}
                  >
                    <Input
                      style={{ width: "400px" }}
                      placeholder="Nhập mật khẩu"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row justify={"space-around"}>
                <Form.Item
                  label="Dịch vụ sử dụng: *"
                  name="serviceUse"
                  initialValue={selectedDevice?.serviceUse}
                >
                  <Select
                    mode="multiple"
                    allowClear
                    style={{ width: "900px" }}
                    placeholder="Nhập dịch vụ sử dụng"
                    className="select__add"
                  >
                    {serviceData.map((item) => (
                      <Option key={item.id} value={item.serviceName}>
                        {item.serviceName}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Row>
              <span>* là trường thông tin bắt buộc</span>
            </Form>
          </div>
        </Card>
      </div>
      <Row justify={"center"} style={{ marginTop: "15px" }}>
        <Space>
          <Button className="btn__cancel" onClick={() => navigate(-1)}>
            Hủy bỏ
          </Button>
          <Button className="btn__addd" onClick={handleClick}>
            {isUpdate ? "Cập nhật" : "Thêm thiết bị"}
          </Button>
        </Space>
      </Row>
    </Content>
  );
};

export default AddDevicePage;
