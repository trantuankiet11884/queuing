import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Space,
  message,
} from "antd";
import React from "react";
import { Content } from "antd/es/layout/layout";
import HeaderPage from "../../components/Header/HeaderPage";
import TextArea from "antd/es/input/TextArea";
import { useForm } from "antd/es/form/Form";
import { AccountType, LogEntry, ServiceType } from "../../interface";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addService, updateService } from "../../redux/slice/serviceSlice";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { addLog, saveLogToFirestore } from "../../redux/slice/accountSlice";

const AddService = () => {
  const [form] = useForm();
  const { id } = useParams<{ id: string }>();

  const isUpdate = !!id;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const selectedService = useAppSelector((state) =>
    state.services.services.find((service) => service.id === id)
  );
  const userAccountString = localStorage.getItem("userAccount");
  const userAccount: AccountType = userAccountString
    ? JSON.parse(userAccountString)
    : {};
  const serviceId: string | undefined = selectedService?.id!;
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: isUpdate
        ? "Cập nhật dịch vụ thành công !"
        : "Thêm dịch vụ thành công !",
    });
  };

  const handleSubmit = async (service: ServiceType) => {
    const status = Math.random() < 0.5;
    const newService = {
      ...service,
      activeStatus: status,
    };
    try {
      if (isUpdate) {
        newService.id = serviceId;
        await dispatch(updateService(newService));
      } else {
        await dispatch(addService(newService));
      }
      const activity = isUpdate
        ? `Cập nhật dịch vụ ${service.serviceName}`
        : `Thêm mới dịch vụ ${service.serviceName}`;
      const timestamp = moment().format("DD/MM/YYYY HH:mm:ss");
      const userName = userAccount?.userName ?? "Unknow";
      const logEntry: LogEntry = {
        timestamp,
        activity,
        userName,
        ipUsage: "123.123.123",
      };
      dispatch(addLog(logEntry));
      dispatch(saveLogToFirestore(logEntry));
      navigate("/services");
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = () => {
    success();
    form.submit();
  };
  const breadcrumbItem = [
    { label: "Dịch vụ", link: "/services" },
    { label: "Danh sách dịch vụ", link: "/services" },
    { label: isUpdate ? "Cập nhật dịch vụ" : "Thêm mới dịch vụ" },
  ];
  return (
    <Content className="content__global">
      {contextHolder}
      <HeaderPage breadcrumbItems={breadcrumbItem} />
      <div className="mx-5 w-[1000px]">
        <div className="mb-2">
          <span className="text-[1.5rem] text-[#ff7506]">Quản lý dịch vụ</span>
        </div>

        <Card>
          <div>
            <b className="text-[#ff7506] text-[1rem]">Thông tin dịch vụ</b>
            <Form layout="vertical" form={form} onFinish={handleSubmit}>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    label={
                      <b>
                        Mã dịch vụ: <span className="text-[red]">*</span>
                      </b>
                    }
                    name="serviceCode"
                    initialValue={selectedService?.serviceCode}
                  >
                    <Input placeholder="Nhập mã dịch vụ" />
                  </Form.Item>
                  <Form.Item
                    label={
                      <b>
                        Tên dịch vụ: <span className="text-[red]">*</span>
                      </b>
                    }
                    name="serviceName"
                    initialValue={selectedService?.serviceName}
                  >
                    <Input placeholder="Nhập tên dịch vụ" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label={<b>Mô tả: </b>}
                    name="description"
                    initialValue={selectedService?.description}
                  >
                    <TextArea rows={5} placeholder="Nhập mô tả" />
                  </Form.Item>
                </Col>
              </Row>
              <div className="flex flex-col">
                <b className="text-[#ff7506] text-[1rem] mb-5">
                  Quy tắc cấp số
                </b>
                <Form.Item>
                  <Checkbox />
                  <span className="mx-2">Tăng tự động từ: </span>
                  <Space>
                    <Input className="w-[60px]" />
                    <span>đến</span>
                    <Input className="w-[60px]" />
                  </Space>
                </Form.Item>
                <Form.Item>
                  <Checkbox />
                  <span className="mx-2">Prefix: </span>
                  <Space className="mx-[52px]">
                    <Input className="w-[60px]" />
                  </Space>
                </Form.Item>
                <Form.Item>
                  <Checkbox />
                  <span className="mx-2">Surfix: </span>
                  <Space className="mx-[52px]">
                    <Input className="w-[60px]" />
                  </Space>
                </Form.Item>
                <Form.Item>
                  <Checkbox />
                  <span className="mx-2">Reset mỗi ngày </span>
                </Form.Item>
                <sup className="text-[red]">* Là thông tin bắt buộc</sup>
              </div>
            </Form>
          </div>
        </Card>
      </div>
      <div className="flex justify-center">
        <Space>
          <Button className="btn__cancel" onClick={() => navigate(-1)}>
            Hủy bỏ
          </Button>
          <Button className="btn__addd" onClick={handleClick}>
            {isUpdate ? "Cập nhật" : "Thêm mới"}
          </Button>
        </Space>
      </div>
    </Content>
  );
};

export default AddService;
