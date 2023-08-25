import { Badge, Button, DatePicker, Input, Select, Space, Table } from "antd";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Content } from "antd/es/layout/layout";
import HeaderPage from "../../components/Header/HeaderPage";
import { SearchOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchData as fetchService } from "../../redux/slice/serviceSlice";
import { Option } from "antd/es/mentions";
import { fetchData as fetchDevice } from "./../../redux/slice/deviceSlice";
import { fetchDataNumber } from "../../redux/slice/numberSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { NumberType } from "../../interface";

const LevelNumber = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const serviceData = useAppSelector((state) => state.services.services);
  const deviceData = useAppSelector((state) => state.devices.devices);
  const numberData = useAppSelector((state) => state.numbers.numbers);
  useEffect(() => {
    dispatch(fetchService());
    dispatch(fetchDevice());
    dispatch(fetchDataNumber());
  }, [dispatch]);

  const [serviceFilter, setServiceFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [supplyFilter, setSupplyFilter] = useState<string | null>(null);
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const filterStatus = location.state?.filter || null;
  console.log(filterStatus);

  const handleServiceChange = (value: string) => {
    setServiceFilter(value === "null" ? null : value);
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value === "null" ? null : value);
  };

  const handleSupplyChange = (value: string) => {
    setSupplyFilter(value === "null" ? null : value);
  };

  const handleKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const filteredData = numberData.filter((number) => {
    const isServiceMatch =
      serviceFilter === null || number.serviceName === serviceFilter;
    const isStatusMatch =
      statusFilter === null || number.status === statusFilter;
    const isSupplyMatch =
      supplyFilter === null || number.supply === supplyFilter;
    const isKeywordMatch =
      searchKeyword === "" ||
      number.customerName.toLowerCase().includes(searchKeyword.toLowerCase());

    const isStatus = filterStatus === null || number.status === filterStatus;

    // Return true if the current 'number' object matches the combined filter criteria.
    return (
      isServiceMatch &&
      isStatusMatch &&
      isSupplyMatch &&
      isKeywordMatch &&
      isStatus
    );
  });

  const breadcrumbItem = [
    { label: "Cấp số", link: "/numbers" },
    { label: "Danh sách cấp số" },
  ];
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      sorter: (a: any, b: any) => a.stt - b.stt,
    },
    {
      title: "Tên khách hàng",
      dataIndex: "customerName",
    },
    {
      title: "Tên dịch vụ",
      dataIndex: "serviceName",
    },
    {
      title: "Thời gian cấp",
      dataIndex: "fromDate",
    },
    {
      title: "Hạn sử dụng",
      dataIndex: "toDate",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (status: string) => {
        let tagColor = "";
        let titleBadge = "";
        switch (status) {
          case "Đang chờ":
            tagColor = "blue";
            titleBadge = "Đang chờ";
            break;
          case "Đã sử dụng":
            tagColor = "gray";
            titleBadge = "Đã sử dụng";
            break;
          case "Bỏ qua":
            tagColor = "red";
            titleBadge = "Bỏ qua";
            break;
          default:
            tagColor = "";
            titleBadge = "";
            break;
        }
        return (
          <div>
            <Badge color={tagColor} />
            <span className="ml-2">{titleBadge}</span>
          </div>
        );
      },
    },
    {
      title: "Nguồn cấp",
      dataIndex: "supply",
    },
    {
      title: " ",
      dataIndex: "",
      render: (record: NumberType) => (
        <span
          className="underline underline-offset-1 text-[#4277FF] cursor-pointer"
          onClick={() => navigate(`/number-details/${record.id}`)}
        >
          Chi tiết
        </span>
      ),
    },
  ];
  return (
    <Content className="content__global">
      <HeaderPage breadcrumbItems={breadcrumbItem} />
      <div className="mx-5 w-[1000px]">
        <div className="my-5">
          <b className="text-[1.5rem] text-[#FF7506]">Quản lý cấp số</b>
        </div>
        <div className="flex justify-between my-3 w-full">
          <div className="flex flex-col">
            <b>Tên dịch vụ</b>
            <Select
              className="w-[9rem]"
              defaultValue={"null"}
              onChange={handleServiceChange}
            >
              <Option value={"null"}>Tất cả</Option>
              {serviceData.map((item) => (
                <Option key={item.id} value={item.serviceName}>
                  {item.serviceName}
                </Option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col">
            <b>Tình trạng</b>
            <Select
              className="w-[9rem]"
              onChange={handleStatusChange}
              value={statusFilter}
              options={[
                { value: null, label: "Tất cả" },
                { value: "Đang chờ", label: "Đang chờ" },
                { value: "Đã sử dụng", label: "Đã sử dụng" },
                { value: "Bỏ qua", label: "Bỏ qua" },
              ]}
            />
          </div>
          <div className="flex flex-col">
            <b>Nguồn cấp</b>
            <Select
              className="w-[9rem]"
              onChange={handleSupplyChange}
              defaultValue="null"
            >
              <Option value={"null"}>Tất cả</Option>
              {deviceData.map((item) => (
                <Option key={item.id} value={item.deviceName}>
                  {item.deviceName}
                </Option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col">
            <b>Chọn thời gian</b>
            <Space>
              <DatePicker className="w-[9rem]" placeholder="Từ ngày" />
              <DatePicker className="w-[9rem]" placeholder="Đến ngày" />
            </Space>
          </div>
          <div className="flex flex-col">
            <b>Từ khóa</b>
            <Input
              suffix={<SearchOutlined />}
              onChange={handleKeywordChange}
              value={searchKeyword}
              placeholder="Nhập từ khóa"
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="w-full">
            <Table
              columns={columns}
              dataSource={filteredData}
              bordered
              size="small"
              pagination={{ pageSize: 5 }}
            />
          </div>
          <div className="">
            <Button
              className="btn__add"
              onClick={() => navigate("/number-new")}
            >
              Cấp số mới
            </Button>
          </div>
        </div>
      </div>
    </Content>
  );
};

export default LevelNumber;
