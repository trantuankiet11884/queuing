import {
  Badge,
  Button,
  Card,
  DatePicker,
  Input,
  Select,
  Space,
  Table,
} from "antd";
import React, { useEffect, useState } from "react";
import { Content } from "antd/es/layout/layout";
import HeaderPage from "../../components/Header/HeaderPage";
import "./service.css";
import { useNavigate, useParams } from "react-router-dom";
import { ServiceType } from "../../interface";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchDataNumber } from "../../redux/slice/numberSlice";
import { SearchOutlined } from "@ant-design/icons";

const DetailService = () => {
  const breadcrumbItem = [
    { label: "Dịch vụ", link: "/services" },
    { label: "Danh sách dịch vụ", link: "/services" },
    { label: "Chi tiết" },
  ];

  const columns = [
    {
      title: "Số thứ tự",
      dataIndex: "stt",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (status: string) => {
        let color = "";
        let title = "";
        switch (status) {
          case "Đang chờ":
            color = "blue";
            title = "Đang thực hiện";
            break;
          case "Đã sử dụng":
            color = "green";
            title = "Đã hoàn thành";
            break;
          case "Bỏ qua":
            color = "gray";
            title = "Vắng";
            break;
          default:
            color = "";
            title = "";
        }
        return (
          <>
            <Badge color={color} />
            <span className="ml-3">{title}</span>
          </>
        );
      },
    },
  ];
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const [service, setService] = useState<ServiceType | null>(null);
  const data = useAppSelector((state) => state.services.services);
  const dataNumber = useAppSelector((state) =>
    state.numbers.numbers.filter(
      (number) => number.serviceName === service?.serviceName
    )
  );

  useEffect(() => {
    const details = data.find((service) => service.id === id);
    setService(details || null);
    dispatch(fetchDataNumber());
  }, [id, data, dispatch]);

  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const handleStatusChange = (value: string) => {
      setStatusFilter(value)
  }

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchKeyword(e.target.value)
  }

  const filterData = dataNumber.filter((number) => {
      const isStatusMatch = statusFilter === null || number.status === statusFilter;
      const isKeywordMatch = searchKeyword === "" || number.stt.toString().includes(searchKeyword.toLowerCase());

      return isStatusMatch && isKeywordMatch;
  })
  return (
    
      <Content className="content__global">
        <HeaderPage breadcrumbItems={breadcrumbItem} />
        <div className="mx-5">
          <div className="my-3">
            <span className="text-[1.5rem] text-[#ff7506]">
              Quản lý dịch vụ
            </span>
          </div>
          <div className="flex">
            <Card className="w-[30%] h-full">
              <div>
                <b className="text-[1rem] text-[#ff7e16]">Thông tin dịch vụ</b>
                <div className="my-2">
                  <b>Mã dịch vụ: </b>
                  <span className="ml-5">{service?.serviceCode}</span>
                </div>
                <div className="my-2">
                  <b>Tên dịch vụ: </b>
                  <span className="ml-5">{service?.serviceName}</span>
                </div>
                <div className="my-2">
                  <b>Mô tả: </b>
                  <span className="ml-12">{service?.description}</span>
                </div>
              </div>
              <div className="my-5">
                <b className="text-[1rem] text-[#ff7e16]">Quy tắc cấp số</b>
                <div>
                  <Space>
                    <b>Tăng tự động: </b>
                    <Input className="w-[60px]" />
                    <span>đến</span>
                    <Input className="w-[60px]" />
                  </Space>
                </div>
                <div className="my-4">
                  <b>Prefix: </b>
                  <Input className="w-[60px] ml-[52px]" />
                </div>
                <div className="my-4">
                  <b>Reset mỗi ngày</b>
                </div>
              </div>
            </Card>
            <Card className="w-[60%] mx-5">
              <div>
                <div className="flex justify-between my-3">
                  <div className="flex flex-col">
                    <span>Trạng thái</span>
                    <Select
                      options={[
                        { value: null, label: "Tất cả" },
                        { value: "Đã sử dụng", label: "Đã hoàn thành" },
                        { value: "Đang chờ", label: "Đang thực hiện" },
                        { value: "Bỏ qua", label: "Vắng" },
                      ]}
                      defaultValue={null}
                      onChange={handleStatusChange}
                      className="w-[160px]"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span>Chọn thời gian</span>
                    <Space>
                      <DatePicker className="w-[120px]" />
                      <DatePicker className="w-[120px]" />
                    </Space>
                  </div>
                  <div className="flex flex-col">
                    <span>Từ khóa</span>
                    <Input
                      placeholder="Nhập từ khóa"
                      className="w-[200px]"
                      value={searchKeyword}
                      onChange={handleKeywordChange}
                      suffix={<SearchOutlined/>}
                    />
                  </div>
                </div>
                <div>
                  <Table
                    columns={columns}
                    dataSource={filterData}
                    size="small"
                    bordered
                  />
                </div>
              </div>
            </Card>
            <div className="relative flex flex-col ml-auto">
              <Button
                className="btn__details"
                onClick={() => navigate(`/service-add/${id}`)}
              >
                Cập nhật danh sách
              </Button>
              <Button className="btn__details" onClick={() => navigate(-1)}>
                Quay lại
              </Button>
            </div>
          </div>
        </div>
      </Content>
  );
};

export default DetailService;
